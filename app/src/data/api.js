import axios from 'axios';

class Api {
    BearerToken = "";

    constructor() {
        this.axios = axios.create();
        this.endpoint = "http://api.my-shoes-manager.fr:3005";

        if (process.env.NODE_ENV && process.env.NODE_ENV === 'development')
            this.endpoint = "http://localhost:3005";

        const local_endpoint = localStorage.getItem('api');
        if (local_endpoint && local_endpoint.length > 0)
            this.endpoint = local_endpoint;
    }

    GenerateHeaders(headers) {
        let head = {
            'Accept': 'application/json',
            ...headers
        }
        if (this.BearerToken || localStorage.getItem('token'))
            head.Authorization = `Bearer ${this.BearerToken || localStorage.getItem('token')}`;

        return head
    }

    Get = (endpoint, args, headers) => {
        return this.axios.get(`${this.endpoint}${endpoint}`, {
            headers: this.GenerateHeaders(headers),
            params: {
                ...args
            }
        });
    }

    Delete = (endpoint, args, headers) => {
        return this.axios.delete(`${this.endpoint}${endpoint}`, {
            headers: this.GenerateHeaders(headers),
            params: {
                ...args
            }
        });
    }

    Post = (endpoint, data, args, headers) => {
        return this.axios.post(`${this.endpoint}${endpoint}`, {...data }, {
            headers: this.GenerateHeaders({
                'Content-Type': 'application/json',
                ...headers
            }),
            params: {
                ...args
            }
        });
    }

    Put = (endpoint, data, args, headers) => {
        return this.axios.put(`${this.endpoint}${endpoint}`, {...data }, {
            headers: this.GenerateHeaders({
                'Content-Type': 'application/json',
                ...headers
            }),
            params: {
                ...args
            }
        });
    }

    GetEndpoint = () => this.endpoint;

    Login = (username, password) => this.Post('/auth/login', { username: username, password: password });

    GetItems = (args) => this.Get('/items', args);
    GetItem = (id) => this.Get(`/items/${id}`);
    UpdateItem = (id, data) => this.Put(`/items/${id}`, data);
    CreateItem = (data) => this.Post('/items', data);
    DeleteItem = (id) => this.Delete(`/items/${id}`);
}

export default new Api()