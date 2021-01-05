import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loginUser } from '../../Redux/Reducers/authenticationFunctions/action';
import styles from './auth.module.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import '../../App.css'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        const { email, password } = this.state
        if (password.length > 0 && email.length > 0) {
            const data = JSON.stringify(this.state);
            this.props.loginUser(data)
        }
        else {
            alert("All fields are Required")
        }
    }

    render() {
        const { loginError, loginErrorMessage, isLoggingIn, isAuthenticated } = this.props
        //console.log(isAuthenticated)
        if (isLoggingIn) {
            return (<div>
                Loading...
            </div>)
        }
        return (
            <>
                <div className={styles.header}>
                    Sign in
                </div>
                <div className={styles.login}>
                    <div className={styles.loginCont}>
                        <div className={styles.loginsubCont}>
                            <label className={styles.label}>Username or e-mail</label>
                            <input
                                placeholder="Email"
                                className={styles.inputTag}
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                            />
                            <label className={styles.label}>Password</label>
                            <input
                                placeholder="Password"
                                className={styles.inputTag}
                                label="Password"
                                value={this.state.password}
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                            />
                            <div className={styles.checkCont}>
                                <input type="checkbox" />
                                <label className={styles.rememberMe}>Remember me</label>
                            </div>
                            <button className={styles.loginBtn} onClick={this.handleSubmit}>
                                Log in
                            </button>
                        </div>
                        {loginError ? <div style={{ color: "blue", fontWeight: "bold" }}> {loginErrorMessage.message}</div> : null}
                        <div className={styles.oauth}>Log in with</div>
                        <div className="login">
                            <div className="btn">
                                <GoogleLogin
                                    clientId="8875377077-h2v5j25t4vj68p65ib8o9u1ten4vlisv.apps.googleusercontent.com"
                                    buttonText="Login with google"
                                    onSuccess={this.handleGoogleLogin}
                                    onFailure={this.handleGoogleLoginFail}
                                />
                            </div>
                            <div className="btn">
                                <FacebookLogin
                                    appId="3514516338602898"
                                    fields="name,email,picture"
                                    callback={this.handleFacebookLogin}
                                    cssClass="fb"
                                    icon={<img src="/images/facebook.png" alt="imag" />}
                                />
                            </div>
                        </div>
                    </div>
                    <div >
                        <Link to="/password-reset" className={styles.forget}>Forget password?</Link>
                    </div>
                    <div className={styles.register}>
                        Don't have an account ? Sign Up
                        <Link to="/register" className={styles.link}> here</Link>!
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    loginErrorMessage: state.auth.loginErrorMessage,
    isAuthenticated: state.auth.isAuthenticated,

})
const mapDispatchToProps = dispatch => ({
    loginUser: (payload) => dispatch(loginUser(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);