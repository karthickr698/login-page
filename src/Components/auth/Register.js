import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../Redux/Reducers/authenticationFunctions/action';
import styles from './auth.module.css';
import { Link } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            password2: "",
            full_name: "",
            country: "",
            pwdFocus: false,
            pwd_length: false,
            pwd_lower: false,
            pwd_upper: false,
            pwd_specialChar: false,
            pwd_number: false
        }
    }

    handleChange = (e) => {
        if (e.target.name === "password") {
            let checkPwd = this.state.password + e.target.value
            var lowerCaseLetters = /[a-z]/g;
            var upperCaseLetters = /[A-Z]/g;
            var numbers = /[0-9]/g;
            var regex = /^[A-Za-z0-9 ]+$/
            if (checkPwd.match(lowerCaseLetters)) {
                this.setState({ pwd_lower: true })
            } else {
                this.setState({ pwd_lower: false })
            }
            if (checkPwd.match(upperCaseLetters)) {
                this.setState({ pwd_upper: true })
            } else {
                this.setState({ pwd_upper: false })
            }
            if (checkPwd.match(numbers)) {
                this.setState({ pwd_number: true })
            } else {
                this.setState({ pwd_number: false })
            }
            if (checkPwd.length >= 8) {
                this.setState({ pwd_length: true })
            } else {
                this.setState({ pwd_length: false })
            }
            if (!regex.test(checkPwd)) {
                this.setState({ pwd_specialChar: true })
            } else {
                this.setState({ pwd_specialChar: false })
            }
        }
        this.setState({ [e.target.name]: e.target.value })
    }

    handleFocus = () => {
        this.setState({ pwdFocus: true })
    }
    handleBlur = () => {
        this.setState({ pwdFocus: false })
    }

    handleSubmit = () => {
        const { email, username, password, password2, full_name, country } = this.state
        if ((password.length > 0 &&
            email.length > 0 &&
            password2.length > 0 &&
            username.length > 0 &&
            full_name.length > 0 &&
            country.length > 0)
        ) {
            if (password !== password2)
                alert("password and confirm password not correct")
            else {
                const data = JSON.stringify(this.state);
                this.props.registerUser(data)
            }
        }
        else {
            alert("All fields are Required")
        }
    }

    render() {
        const { isSignUpError, isSignUpErrorMessage } = this.props
        return (
            <>
                <div className={styles.header}>
                    Sign Up
                </div>
                <div className={styles.login}>
                    <div className={
                        this.state.pwdFocus ? styles.loginCont + ' ' + styles.registerpwdCont : styles.loginCont + ' ' + styles.registerCont}>
                        <div className={styles.registersubCont}>
                            <label className={styles.registerLabel}>Username*</label>
                            <input
                                placeholder="Email"
                                className={styles.inputTag}
                                value={this.state.username}
                                name="username"
                                onChange={this.handleChange}
                            />
                            <label className={styles.registerLabel}>Full Name*</label>
                            <input
                                placeholder="Name"
                                className={styles.inputTag}
                                value={this.state.full_name}
                                name="full_name"
                                onChange={this.handleChange}
                            />
                            <label className={styles.registerLabel}>Country*</label>
                            <input
                                placeholder="Country"
                                className={styles.inputTag}
                                value={this.state.country}
                                name="country"
                                onChange={this.handleChange}
                            />
                            <label className={styles.registerLabel}>E-mail*</label>
                            <input
                                placeholder="Email"
                                className={styles.inputTag}
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                            /><label className={styles.registerLabel}>Password*</label>
                            <input
                                placeholder="Password"
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                className={styles.inputTag}
                                value={this.state.password}
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                            />
                            <div className={this.state.pwdFocus ? styles.message : styles.msg}>
                                <h3>Password hould have :</h3>
                                <p className={this.state.pwd_lower ? styles.valid : styles.invalid}>Atleast <b>One lowercase</b> letter</p>
                                <p className={this.state.pwd_upper ? styles.valid : styles.invalid}>Atleast <b>One capital (uppercase)</b> letter</p>
                                <p className={this.state.pwd_number ? styles.valid : styles.invalid}>Atleast <b>One number</b></p>
                                <p className={this.state.pwd_length ? styles.valid : styles.invalid}>Atleast <b>8 characters</b></p>
                                <p className={this.state.pwd_specialChar ? styles.valid : styles.invalid}>Atleast <b>One Special Character</b></p>
                            </div>
                            <label className={styles.registerLabel}>Repeat Password*</label>
                            <input
                                placeholder="Confirm Password"
                                className={styles.inputTag}
                                value={this.state.password2}
                                name="password2"
                                type="password"
                                onChange={this.handleChange}
                            />
                            <button className={styles.registerBtn + ' ' + styles.loginBtn} onClick={this.handleSubmit}>
                                Sign up
                            </button>
                        </div>
                        {isSignUpError ? <div style={{ color: "blue", fontWeight: "bold" }}>{isSignUpErrorMessage.message}</div> : null}
                    </div>
                    <div className={styles.register}>
                        Already have an account ? Sign in
                        <Link to="/login" className={styles.link}> here</Link>!
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isSignUp: state.auth.isSignUp,
    isSignUpError: state.auth.isSignUpError,
    isSignUpErrorMessage: state.auth.isSignUpErrorMessage,
    isSignUpSuccess: state.auth.isSignUpSuccess,

})
const mapDispatchToProps = dispatch => ({
    registerUser: (payload) => dispatch(registerUser(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);