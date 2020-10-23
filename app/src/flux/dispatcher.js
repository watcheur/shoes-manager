import { Dispatcher } from "flux";
import SocketIOClient from "socket.io-client";
import url from 'url';

import Api from '../data/api';
import Constants from "./constants";

const dispatcher = new Dispatcher();

const endpoint = url.parse(Api.endpoint);
const socket = SocketIOClient(`${endpoint.protocol}//${endpoint.host}`);

socket.on(Constants.CHANNEL_ITEMS, data => {
    dispatcher.dispatch({
        actionType: data.action,
        ...data.data
    })
});

export default dispatcher;
