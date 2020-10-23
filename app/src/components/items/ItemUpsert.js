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
    FormSelect,
    DatePicker,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "shards-react"

import Api from '../../data/api';

export default class ItemUpsert extends React.Component {
    itemId = '';

    defaultState = {
        loading: false,
        loadingItem: false,
        item: null,
        error: '',
        name: '',
        brand: '',
        color: '',
        type: '',
        material: '',
        matching: [],
        price: 0,
        date: ''
    };

    constructor(props) {
        super(props);

        if (props.itemId)
            this.itemId = props.itemId;

        this.state = this.defaultState;

        this.handleChangeMatching = this.handleChangeMatching.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.state.loading)
            return;

        try {
            this.setState({ loading: true, error: '' })
            let data = {
                name: this.state.name,
                brand: this.state.brand,
                color: this.state.color,
                type: this.state.type,
                material: this.state.material,
                matchingColors: this.state.matching,
                price: parseFloat(this.state.price),
                releaseDate: this.state.date
            };

            if (!this.itemId) {
                const res = await Api.CreateItem(data);
                if (res.data) {
                    alert('Item created');
                    this.setState(this.defaultState);
                }
            }
            else {
                const res = await Api.UpdateItem(this.itemId, data);
                if (res.data) {
                    alert('Item updated');
                    this.setState({ loading: false })
                }
            }
        }
        catch (error) {
            this.setState({ loading: false, error: error.message })
        }
    }

    handleChangeMatching = (event) => {
        const { options } = event.target;
        const value = [];

        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({ matching: value })
      };

    componentDidMount = async () => {
        if (this.itemId) {
            this.setState({ loadingItem: true, error: '' })
            try 
            {
                const res = await Api.GetItem(this.itemId);
                if (res.data) {
                    this.setState({
                        loadingItem: false,
                        name: res.data.data.name,
                        brand: res.data.data.brand,
                        color: res.data.data.color,
                        type: res.data.data.type,
                        material: res.data.data.material,
                        matching: res.data.data.matchingColors,
                        price: res.data.data.price,
                        date: new Date(res.data.data.releaseDate)
                    })
                }
            } catch (error) {
                this.setState({ loading: false, error: error.message })
            }
        }
    }

    render() {
        const { loading, loadingItem, error } = this.state;
        const { title } = this.props;
        const colors = ['WHITE', 'BLACK', 'RED', 'ORANGE', 'BLUE', 'GREEN', 'PURPLE'];

        return (
            <Card small className="mb-4 items-list">
                <CardHeader>
                    <h5 className="m-0 text-center">
                        {loading || loadingItem && (
                            <i className="material-icons spin">refresh</i>
                        )}
                        {title || 'Add Item'}
                    </h5>
                </CardHeader>
                {!loadingItem && (
                <CardBody className="p-2 border-top">
                    {error && (
                        <div
                            className="bg-warning text-white text-center"
                            style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)" }}>
                            <i className="material-icons">warning</i> {error}
                        </div>
                    )}
                    <Form onSubmit={this.handleSubmit}>
                        <Row form>
                            <Col>
                                <label htmlFor="feName">Name</label>
                                <FormInput
                                    id="feName"
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={this.state.name}
                                    onChange={(event) => { this.setState({ name: event.target.value }); }}
                                />
                            </Col>
                            <Col>
                                <label htmlFor="feBrand">Brand</label>
                                <FormInput
                                    id="feBrand"
                                    type="text"
                                    placeholder="Brand"
                                    required
                                    value={this.state.brand}
                                    onChange={(event) => { this.setState({ brand: event.target.value }); }}
                                />
                            </Col>
                            <Col>
                                <label htmlFor="feColor">Color</label>
                                <FormSelect
                                    id="feColor"
                                    required
                                    value={this.state.color}
                                    onChange={(event) => { this.setState({ color: event.target.value }) }}
                                >
                                    <option value=''>Pick a color</option>
                                    {colors.map((color, idx) =>
                                        <option key={idx} value={color}>{color.capitalize()}</option>
                                    )}
                                </FormSelect>
                            </Col>
                            <Col>
                                <label htmlFor="feType">Type</label>
                                <FormSelect
                                    id="feType"
                                    required
                                    value={this.state.type}
                                    onChange={(event) => { this.setState({ type: event.target.value }) }}
                                >
                                    <option value=''>Pick a type</option>
                                    {['SPORT', 'CASUAL', 'CEREMONY'].map((item, idx) =>
                                        <option key={idx} value={item}>{item.capitalize()}</option>
                                    )}
                                </FormSelect>
                            </Col>
                        </Row>
                        <Row form className="my-2">
                            <Col>
                                <label htmlFor="feMaterial">Material</label>
                                <FormSelect
                                    id="feMaterial"
                                    required
                                    value={this.state.material}
                                    onChange={(event) => { this.setState({ material: event.target.value }) }}
                                >
                                    <option value=''>Pick a material</option>
                                    {['LEATHER', 'CLOTH','SYNTHETIC'].map((item, idx) =>
                                        <option key={idx} value={item}>{item.capitalize()}</option>
                                    )}
                                </FormSelect>
                            </Col>
                            <Col>
                                <label htmlFor="feMatching">Matching Color</label>
                                <FormSelect
                                    id="feMatching"
                                    required
                                    multiple
                                    value={this.state.matching}
                                    onChange={this.handleChangeMatching}
                                >
                                    <option value=''>Pick a material</option>
                                    {colors.map((item, idx) =>
                                        <option key={idx} value={item}>{item.capitalize()}</option>
                                    )}
                                </FormSelect>
                            </Col>
                            <Col>
                                <label htmlFor="fePrice">Price</label>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon type="prepend">
                                        <InputGroupText>€</InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput
                                        required
                                        value={this.state.price} onChange={
                                            (ev) => {
                                                if (!isNaN(parseFloat(ev.target.value)) && isFinite(ev.target.value) || ev.target.value === '')
                                                    this.setState({ price: ev.target.value })
                                            }
                                        } />
                                </InputGroup>
                            </Col>
                            <Col>
                                <label htmlFor="feDate">Release Date</label><br />
                                <DatePicker
                                    id="feDate"
                                    selected={this.state.date}
                                    onChange={(value) => { this.setState({ date: (value ? value : '') }); }}
                                    placeholderText="Release date"
                                    className="text-center"
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit" disabled={this.state.loading}>
                                    <i className={`material-icons`}>{this.state.loading ? 'refresh' : 'save'}</i> {this.itemId ? 'Modify' :'Add'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
                )}
            </Card>
        )
    }
}