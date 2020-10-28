import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail, isEmpty } from 'validator';

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">This field is required</small>;
    }
}

const email = (value) => {
    if (!isEmail(value)) {
        return <small className="form-text text-danger">Invalid email format</small>;
    }
}

const minLength = (value) => {
    if (value.trim().length < 6) {
        return <small className="form-text text-danger">Password must be at least 6 characters long</small>;
    }
}

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
        };
    }

    onSubmit(e){
        e.preventDefault();
        this.form.validateAll();

        if ( this.checkBtn.context._errors.length === 0 ) {
            alert('success');
        }
    }

    onChangeHandler(e) {
        // this.setState({
        //     email: e.target.value,
        //     password: e.target.value,
        // })
    }

    render() {
        return (
            <div className="container">
                <div className="login-container">
                    <div className="form-box">
                        <Form onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                            <Input
                                name="email"
                                onChange={this.onChangeHandler}
                                type="text"
                                placeholder="Email"
                                className="form-control"
                                validations={[required, email]}
                            />
                            <Input
                                name="password"
                                onChange={this.onChangeHandler}
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                validations={[required, minLength]}
                            />
                            <button className="btn btn-info btn-block login" type="submit">Login</button>
                            <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
