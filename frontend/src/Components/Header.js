import React, {Component, useContext} from "react";
import Fade from "react-reveal";
import {UserContext} from "../context/UserContext";

const NavBarElement = (props) => {
    return (
        <a className="smoothscroll" href={props.hrefTag}>
            {props.textVal}
        </a>
    )
}


const Header = () => {
    const [token] = useContext(UserContext)
    // if (!this.props.data) return null;
    return (
        <header id="home">
            <nav id="nav-wrap">
                <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
                    Show navigation
                </a>
                <a className="mobile-btn" href="#home" title="Hide navigation">
                    Hide navigation
                </a>

                <ul id="nav" className="nav">
                    <li className="current">

                        <NavBarElement hrefTag="#home" textVal="Домашняя страница"/>
                    </li>

                    <li>
                        <NavBarElement hrefTag="#about" textVal="О проекте"/>
                    </li>

                    <li>
                        <NavBarElement hrefTag="#demofunctional" textVal="Демо версия"/>
                    </li>

                    <li>
                        <NavBarElement hrefTag="#registration" textVal="Регистрация"/>
                    </li>
                </ul>
            </nav>

            <div className="row banner">
                <div className="banner-text">
                    <Fade bottom>
                        <h1 className="responsive-headline">Shakespeare project</h1>
                    </Fade>
                    <hr/>
                    <Fade bottom duration={2000}>
                        <ul className="social">
                            <a href='#demofunctional' className="button btn button-header1">
                                Перейти к демо версии
                            </a>
                            <a href='/' className="button btn header-button2">
                                Зарегистрироваться
                            </a>
                        </ul>
                    </Fade>
                </div>
            </div>

            <p className="scrolldown">
                <a className="smoothscroll" href="#about">
                    <i className="icon-down-circle"></i>
                </a>
            </p>
        </header>
    );

}

export default Header;
