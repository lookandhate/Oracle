import React, {Component, useContext, useState} from "react";
import {Fade, Slide} from "react-reveal"
import {UserContext} from "../context/UserContext";


const Demoform = () => {
    const [resultText, changeResultText] = useState("")
    const [inputText, changeInputText] = useState("")
    const handleNNClick = async (token) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(
                {
                    "text": inputText,
                    "min_length": inputText.length * 0.2,
                    "max_length": inputText.length * 0.8
                }
            ),
        };

        const response = await fetch("/api/t5_paraphrase_unauth", requestOptions);
        const data = await response.json();
        changeResultText(data.summarized)
    }

    const handleAlgorithmClick = async (token) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(
                {
                    "text": inputText,
                    "sentences_to_return": inputText.split('.').length / 2
                }
            ),
        };

        const response = await fetch("/api/paraphrase_unauth", requestOptions);
        const data = await response.json();
        console.log(data)
        changeResultText(data.summarized)
    }


    const SubmitText = (props) => {
        return (
            <div>
                <label>{props.label}</label>
                <button className="submit" onClick={props.handleButtonClick}>{props.type}</button>
            </div>

        )
    }

    const Result = (props) => {
        return (
            <div>
                <label htmlFor="input-text">
                    Результат <span className="required"></span>
                </label>
                <textarea
                    cols="50"
                    rows="15"
                    id="contactMessage"
                    name="contactMessage"
                    disabled="true"
                >{resultText}</textarea>
            </div>
        )
    }

    return (
        // if (!this.props.data) return null;
        <section id="demofunctional">
            <Fade bottom duration={1000}>
                <div className="row section-head">
                    <div className="ten columns">
                        <h1>Demo Shakespeare</h1>
                    </div>
                </div>
            </Fade>

            <div className="row">
                <Slide left duration={1000}>
                    <div className="eight columns">
                        <fieldset>
                            <div>
                                <label htmlFor="input-text">
                                    Введите текст
                                </label>
                                <textarea
                                    cols="30"
                                    rows="10"
                                    id="input-text"
                                    name="input-text-area"
                                    onChange={event => changeInputText(event.target.value)}
                                >{inputText}</textarea>
                            </div>

                            <SubmitText label="Обработать с помощью:" type="Алгоритм"
                                        handleButtonClick={handleAlgorithmClick}/>
                            <SubmitText label="" type="Нейросеть"
                                        handleButtonClick={handleNNClick}/>
                            <Result/>
                        </fieldset>

                        <div id="message-warning"> Error boy</div>
                        <div id="message-success">
                            <i className="fa fa-check"></i>Your message was sent, thank you!
                            <br/>
                        </div>
                    </div>
                </Slide>

                <Slide right duration={1000}>
                    <aside className="four columns footer-widgets">
                    </aside>
                </Slide>
            </div>
        </section>
    );
}

export const FullAccessForm = () => {
    const [resultText, changeResultText] = useState("")
    const [inputText, changeInputText] = useState("")
    const [token, setToken] = useContext(UserContext)
    const handleNNClick = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(
                {
                    "text": inputText,
                    "min_length": inputText.length * 0.2,
                    "max_length": inputText.length * 0.8
                }
            ),
        };

        const response = await fetch("/api/t5_paraphrase", requestOptions);
        const data = await response.json();
        changeResultText(data.summarized)
    }

    const handleAlgorithmClick = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(
                {
                    "text": inputText,
                    "sentences_to_return": inputText.split('.').length / 2
                }
            ),
        };

        const response = await fetch("/api/paraphrase", requestOptions);
        const data = await response.json();
        console.log(data)
        changeResultText(data.summarized)
    }


    const SubmitText = (props) => {
        return (
            <div>
                <label>{props.label}</label>
                <button className="submit" onClick={props.handleButtonClick}>{props.type}</button>
            </div>

        )
    }

    const Result = (props) => {
        return (
            <div>
                <label htmlFor="input-text">
                    Результат <span className="required"></span>
                </label>
                <textarea
                    cols="50"
                    rows="15"
                    id="contactMessage"
                    name="contactMessage"
                    disabled="true"
                >{resultText}</textarea>
            </div>
        )
    }

    return (
        // if (!this.props.data) return null;
        <section id="demofunctional">
            <Fade bottom duration={1000}>
                <div className="row section-head">
                    <div className="ten columns">
                        <h1>Demo Shakespeare</h1>
                    </div>
                </div>
            </Fade>

            <div className="row">
                <Slide left duration={1000}>
                    <div className="eight columns">

                        <fieldset>
                            <div>
                                <label htmlFor="input-text">
                                    Введите текст
                                </label>
                                <textarea
                                    cols="30"
                                    rows="10"
                                    id="input-text"
                                    name="input-text-area"
                                    onChange={event => changeInputText(event.target.value)}
                                >{inputText}</textarea>
                            </div>

                            <SubmitText label="Обработать с помощью:" type="Алгоритм"
                                        handleButtonClick={handleAlgorithmClick}/>
                            <SubmitText label="" type="Нейросеть"
                                        handleButtonClick={handleNNClick}/>
                            <Result/>
                        </fieldset>


                        <div id="message-warning"> Error boy</div>
                        <div id="message-success">
                            <i className="fa fa-check"></i>Your message was sent, thank you!
                            <br/>
                        </div>
                    </div>
                </Slide>

                <Slide right duration={1000}>
                    <aside className="four columns footer-widgets">
                    </aside>
                </Slide>
            </div>
        </section>
    );
}

export default Demoform;

