import { Api } from "../data";

export async function loginUser(dispatch, username, password) {
    try {
        dispatch({ type: 'REQUEST_LOGIN' });

        let response = await Api.Login(username, password);
        
        if (response.data.data.accessToken) {
            Api.BearerToken = response.data.data.accessToken;
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.data });
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            localStorage.setItem('token', Api.BearerToken);
            return response.data.data;
        }
    
        dispatch({ type: 'LOGIN_ERROR', error: response.message });
        return;
    } catch (error) {
        console.log("err", error);
        dispatch({ type: 'LOGIN_ERROR', error: "Auth failed" });
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}