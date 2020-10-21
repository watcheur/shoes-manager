import axios from 'axios';

class Api {
    constructor() {
        this.axios = axios.create();
        this.endpoint = "http://api.my-shoes-manager.fr:3005";

        if (process.env.NODE_ENV && process.env.NODE_ENV === 'development')
            this.endpoint = "http://localhost:3005";

        const local_endpoint = localStorage.getItem('api');
        if (local_endpoint && local_endpoint.length > 0)
            this.endpoint = local_endpoint;
    }

    Get = (endpoint, args) => {
        return this.axios.get(`${this.endpoint}${endpoint}`, {
            headers: {
                'Accept': 'application/json'
            },
            params: {
                ...args
            }
        });
    }

    Delete = (endpoint, args) => {
        return this.axios.delete(`${this.endpoint}${endpoint}`, {
            headers: {
                'Accept': 'application/json'
            },
            params: {
                ...args
            }
        });
    }

    Post = (endpoint, data, args) => {
        console.log("data", data);
        return this.axios.post(`${this.endpoint}${endpoint}`, {...data }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: {
                ...args
            }
        });
    }

    Put = (endpoint, data, args) => {
        return this.axios.put(`${this.endpoint}${endpoint}`, {...data }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: {
                ...args
            }
        });
    }

    GetEndpoint = () => this.endpoint;

    Login = (username, password) => this.Post('/login', { username: username, password: password });
}

export default new Api()