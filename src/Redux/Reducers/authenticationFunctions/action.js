import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILURE,
    PASSWORD_RESET_REQUEST,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
} from "./actionTypes";
import axios from 'axios';
import { baseUrl } from '../../../config'

const requestRegister = () => {
    return {
        type: REGISTER_REQUEST
    };
};

const registerSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload
    };
};

const registerFailure = (payload) => {
    return {
        type: REGISTER_FAILURE,
        payload
    };
};

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    };
};

const loginError = (payload) => {
    return {
        type: LOGIN_FAILURE,
        payload
    };
};

const passwordResetRequest = () => {
    return {
        type: PASSWORD_RESET_REQUEST
    };
};

const receivePasswordReset = () => {
    return {
        type: PASSWORD_RESET_SUCCESS
    };
};

const passwordResetError = (payload) => {
    return {
        type: PASSWORD_RESET_FAILURE,
        payload
    };
};

export const registerUser = (payload) => dispatch => {
    dispatch(requestRegister());
    if (payload.email === "rkarthick410@gmail.com") {
        dispatch(registerSuccess("data"))
    }
    else {
        dispatch(registerFailure("err"))
    }
    // return axios({
    //     method: 'POST',
    //     url: baseUrl + "api/auth/signup/",
    //     headers: { 'Content-Type': 'application/json;charset=utf-8' },
    //     payload
    // })
    //     .then(res => {
    //         if (res.status !== 200)
    //             throw new Error()
    //         dispatch(registerSuccess(res.data))
    //     })
    //     .catch(err => dispatch(registerFailure(err)))
};
export const loginUser = (payload) => dispatch => {
    dispatch(requestLogin());
    const data = JSON.parse(payload)
    console.log(data.email)
    if (data.email == "rkarthick410@gmail.com") {
        dispatch(receiveLogin("res.data"))
    }
    else {
        dispatch(loginError("err"))
    }
    // return axios({
    //     method: 'POST',
    //     url: baseUrl + "api/auth/login/",
    //     headers: { 'Content-Type': 'application/json;charset=utf-8' },
    //     payload
    // })
    //     .then(res => {
    //         if (res.status !== 200)
    //             throw new Error()
    //         dispatch(receiveLogin(res.data))
    //     })
    //     .catch(err => dispatch(loginError(err)))
};

export const passwordReset = (payload) => dispatch => {
    dispatch(passwordResetRequest());
    console.log(payload)
    return axios({
        method: 'POST',
        url: baseUrl + "api/auth/request-password-reset/",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        payload
    })
        .then(res => {
            if (res.status !== 200)
                throw new Error()
            dispatch(receivePasswordReset(res.data))
        })
        .catch(err => dispatch(passwordResetError(err)))
};



