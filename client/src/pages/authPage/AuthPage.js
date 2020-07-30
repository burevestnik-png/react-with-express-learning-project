import React, {useEffect, useState} from 'react';
import './AuthPage.css';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);


    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data: ' + data)
        } catch (e) {
            // unused, because caught in hook useHttp
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Your favourite links</h1>
                <div className="card light-blue">
                    <div className="card-content white-text">
                        <span className="card-title">Registration</span>

                        <div>
                            <div className="input-field">
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="specified-button waves-effect waves-light btn blue-grey darken-4"
                            disabled={loading}
                        >
                            Sign In
                        </button>
                        <button
                            className="waves-effect waves-light btn blue-grey"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;