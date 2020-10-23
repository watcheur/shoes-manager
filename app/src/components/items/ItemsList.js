import React from 'react';
import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    ButtonGroup, 
    Button, 
    Row,
    Col, 
    Form,
    FormInput,
    FormSelect
} from "shards-react"

import Api from '../../data/api';
import { Dispatcher, Constants } from '../../flux';

export default class ItemsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            page: 0,
            limit: props.limit || 10,
            items: [],

            name: '',
            brand: '',
            color: '',
            type: '',
            material: ''
        };

        this.dispatcherToken = null;
        this.deleteItem = this.deleteItem.bind(this);
        this.filterItem = this.filterItem.bind(this);
    }

    deleteItem(item) {
        let items = [...this.state.items];
        let index = this.state.items.indexOf(this.state.items.find(c => c._id === item._id));
        if (index >= 0) {
            items.splice(index, 1);
            this.setState({items: items});
        }

        try {
            this.setState({ loading: true });
            const res = Api.DeleteItem(item._id);
            this.setState({ loading: false });
            if (res.data)
                alert('Item deleted');
        }
        catch (error) {
            this.setState({ loading: false, error: error.message })
        }
    }

    async loadItems() {
        this.setState({ isLoading: true, error: '' });
        try {
            let res = await Api.GetItems();
            if (res.data.data)
                this.setState({ loading: false, error: '', items: res.data.data })
        }
        catch (error) {
            this.setState({ loading: false, error: error.message })
        }

    }

    filterItem(item) {
        let checks = 0;
        let required = 0;

        ['name', 'brand', 'color', 'type', 'material'].forEach((el, idx) => {
            if (this.state[el]) {
                required++;
                if (item[el].match(new RegExp(this.state[el], "i")))
                    checks++;
            }
        })


        return checks == required;
    }

    componentDidMount() {
        this.dispatcherToken = Dispatcher.register(payload => {
            console.log("payload", payload);
            switch (payload.actionType) {
                case Constants.ITEM_CREATED:
                    {
                        let items = [...this.state.items];
                        items.push(payload.item);
                        this.setState({ items: items });
                    }
                    break;
                case Constants.ITEM_UPDATED:
                    {
                        let items = [...this.state.items];
                        let index = this.state.items.indexOf(this.state.items.find(c => c._id === payload.item._id));
                        if (index >= 0) {
                            items[index] = payload.item;
                            this.setState({ items: items });
                        }
                    }
                    break;
                case Constants.ITEM_DELETED:
                    {
                        let items = [...this.state.items];
                        let index = this.state.items.indexOf(this.state.items.find(c => c._id === payload.item._id));
                        if (index >= 0) {
                            items.splice(index, 1);
                            this.setState({ items: items });
                        }
                    }
                    break;
            }
        });

        this.loadItems();
    }

    componentWillUnmount() {
        Dispatcher.unregister(this.dispatcherToken);
    }

    render() {
        let { items, loading, error, page, limit } = this.state;
        const { title } = this.props;

        items = items.filter(this.filterItem);

        return (
            <Card small className="mb-4 overflow-hidden items-list">
                <CardHeader>
                    <h5 className="m-0 text-center">
                        {loading && (
                            <i className="material-icons spin">refresh</i>
                        )}
                        {title || 'Items'}
                    </h5>
                </CardHeader>
                <CardBody className="p-2 border-top">
                    <Row>
                        <Col md="2">
                            <FormInput
                                id="feName"
                                type="text"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={(event) => { this.setState({ name: event.target.value }); }}
                            />
                        </Col>
                        <Col md="2">
                            <FormInput
                                id="feBrand"
                                type="text"
                                placeholder="Brand"
                                value={this.state.brand}
                                onChange={(event) => { this.setState({ brand: event.target.value }); }}
                            />
                        </Col>
                        <Col md="2">
                            <FormSelect
                                id="feColor"
                                value={this.state.color}
                                onChange={(event) => { this.setState({ color: event.target.value }) }}
                            >
                                <option value=''>Pick a color</option>
                                {['WHITE', 'BLACK', 'RED', 'ORANGE', 'BLUE', 'GREEN', 'PURPLE'].map((color, idx) =>
                                    <option key={idx} value={color}>{color.capitalize()}</option>
                                )}
                            </FormSelect>
                        </Col>
                        <Col md="2">
                            <FormSelect
                                id="feType"
                                value={this.state.type}
                                onChange={(event) => { this.setState({ type: event.target.value }) }}
                            >
                                <option value=''>Pick a type</option>
                                {['SPORT', 'CASUAL', 'CEREMONY'].map((item, idx) =>
                                    <option key={idx} value={item}>{item.capitalize()}</option>
                                )}
                            </FormSelect>
                        </Col>
                        <Col md="2">
                            <FormSelect
                                id="feMaterial"
                                value={this.state.material}
                                onChange={(event) => { this.setState({ material: event.target.value }) }}
                            >
                                <option value=''>Pick a material</option>
                                {['LEATHER', 'CLOTH','SYNTHETIC'].map((item, idx) =>
                                    <option key={idx} value={item}>{item.capitalize()}</option>
                                )}
                            </FormSelect>
                        </Col>
                    </Row>
                </CardBody>
                <CardBody className="p-0 pb-3">
                    <table className="table mb-0 h-50 text-center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Color</th>
                                <th>Type</th>
                                <th>Material</th>
                                <th>Matching Colors</th>
                                <th>Price</th>
                                <th>Release</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="h-50">
                            {error && <tr>
                                <td colSpan="9"
                                    className="bg-warning text-white text-center"
                                    style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)" }}>
                                    <i className="material-icons">warning</i> {error}
                                </td>
                            </tr>}
                            {items.length == 0 && (<tr colSpan="9"><td>Nothing here...</td></tr>)}
                            {items.slice(page * limit, page * limit + limit).map((item, idx) => 
                                <tr>
                                    <td>{item.name.capitalize()}</td>
                                    <td><strong>{item.brand.capitalize()}</strong></td>
                                    <td>{item.color}</td>
                                    <td>{item.type.capitalize()}</td>
                                    <td>{item.material.capitalize()}</td>
                                    <td>{(item.matchingColors || []).join(', ')}</td>
                                    <td>{item.price.toFixed(2)} €</td>
                                    <td>{new Date(item.releaseDate).toLocaleDateString('en-GB')}</td>
                                    <td>
                                        <a href={`/items/${item._id}`}><i className="material-icons">edit</i></a>
                                    </td>
                                    <td>
                                        <a onClick={(ev) => { ev.preventDefault(); this.deleteItem(item); }}><i className="material-icons red">delete</i></a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="text-right">
                    {items && (
                        <ButtonGroup size="sm" className="text-center">
                            {[...Array(Math.ceil(items.length / limit))].map((x, i) =>
                                <Button idx={i} onClick={(ev) => this.setState({ page: i })} theme="light">{i + 1}</Button>
                            )}
                        </ButtonGroup>
                    )}
                </CardFooter>
            </Card>
        )
    }
}