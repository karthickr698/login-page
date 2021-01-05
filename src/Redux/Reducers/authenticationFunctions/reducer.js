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

export default (
    state = {
        isLoggingIn: false,
        loginError: false,
        loginErrorMessage: {},
        isAuthenticated: false,
        isPasswordReset: false,
        isPasswordResetSuccess: false,
        isPasswordResetError: false,
        isPasswordResetMessage: {},
        isSignUp: false,
        isSignUpError: false,
        isSignUpSuccess: false,
        isSignUpErrorMessage: {},
        user_data: {},
    },
    action
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user_data:action.payload
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true,
                loginErrorMessage: action.payload
            };
        case PASSWORD_RESET_REQUEST:
            return {
                ...state,
                isPasswordReset: true,
                isPasswordResetError: false
            };
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                isPasswordReset: false,
                isPasswordResetSuccess:true
                
            };
        case PASSWORD_RESET_FAILURE:
            return {
                ...state,
                isPasswordReset: false,
                isPasswordResetError: true,
                isPasswordResetMessage: action.payload
            };
        case REGISTER_REQUEST:
            return {
                ...state,
                isSignUp: true
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                isSignUp: false,
                isSignUpError: true,
                isSignUpErrorMessage: action.payload
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isSignUp: false,
                isSignUpSuccess: true
            };
        default:
            return state;
    }
};