import React, {useState, useContext} from "react";


import {UserContext} from "../context/UserContext";

const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitLogin = async () => {
        console.log(`${login}\n${password}`)
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(
                `grant_type=&username=${login}&password=${password}&scope=&client_id=&client_secret=`
            ),
        };

        const response = await fetch("/auth/get_token", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            console.error(data.detail);
        } else {
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    };

    return (
        <section id="login">
            <div className="login-root">
                <div className="box-root padding-top--24 flex-flex flex-direction--column"
                     style={{flexGrow: 1, zIndex: 9}}>
                    <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                    </div>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15">Вход</span>
                                <form id="stripe-login" method="post">
                                    <div className="field padding-bottom--24">
                                        <label htmlFor="email">Логин</label>
                                        <input type="email" name="email" value={login}
                                               onChange={(e => setLogin(e.target.value))}/>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <div className="grid--50-50">
                                            <label htmlFor="password">Пароль</label>
                                        </div>
                                        <input type="password" name="password" value={password}
                                               onChange={event => setPassword(event.target.value)}/>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <input type="submit" name="submit" defaultValue="Continue"
                                               onClick={handleSubmit}/>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="footer-link padding-top--24">
                            <span>Don't have an account? <a href="#registration">Sign up</a></span>
                            <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                <span><a href="#">©2022 Shakespeare</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;