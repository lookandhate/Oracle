import "../style.css";
import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext";

export default function Registration() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [, setToken] = useContext(UserContext)

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: login, password: password})
        }

        const response = await fetch("/auth/registration", requestOptions)
        console.log(response)
        const data = await response.json()
        if (!response.ok) {
            console.error(data.detail)
        } else {
            console.log(data)
            setToken(data.access_token)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await submitRegistration()
    }
    return (
        <section id="registration">
            <div className="login-root">
                <div className="box-root padding-top--24 flex-flex flex-direction--column"
                     style={{flexGrow: 1, zIndex: 9}}>
                    <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                        <h1><a className="header-name" href="/" rel="dofollow">Shakespeare</a></h1>
                    </div>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15">Sign in to your account</span>
                                <form id="stripe-login" method="post" action="http://localhost:1337/">
                                    <div className="field padding-bottom--24">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" value={login}
                                               onChange={(e => setLogin(e.target.value))}/>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <div className="grid--50-50">
                                            <label htmlFor="password">Password</label>
                                            <div className="reset-pass">
                                                <a href="#">Forgot your password?</a>
                                            </div>
                                        </div>
                                        <input type="password" name="password" value={password}
                                               onChange={event => setPassword(event.target.value)}/>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <input type="submit" name="submit" defaultValue="Continue" onClick={handleSubmit}/>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="footer-link padding-top--24">
                            <span>Don't have an account? <a href>Sign up</a></span>
                            <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                <span><a href="#">©2022 Shakespeare</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}