import React, {Component, useState} from "react";
import {Fade, Slide} from "react-reveal"


const Demoform = () => {
    const [resultText, changeResultText] = useState("")
    const [inputText, changeInputText] = useState("")
    const handleNNClick = async (token) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Bearer": token
            },
            body: JSON.stringify(

            ),
        };

        const response = await fetch("/auth/get_token", requestOptions);
        const data = await response.json();
    }

    const handleAlgorithmClick = async (token) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Bearer": token
            },
            body: JSON.stringify(

            ),
        };

        const response = await fetch("/auth/get_token", requestOptions);
        const data = await response.json();
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
                        <form action="" method="post" id="contactForm">
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
                                            handleButtonClick={handleAlgorithmClick(null)}/>
                                <SubmitText label="" type="Нейросеть"
                                            handleButtonClick={handleNNClick(null)}/>
                                <Result/>
                            </fieldset>
                        </form>

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
