import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";

class Header extends Component {
  render() {
    if (!this.props.data) return null;
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
              <a className="smoothscroll" href="#home">
                Домашняя страница
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#about">
                О проекте
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#resume">
                Демо версия
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#portfolio">
                Регистрация
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1  className="responsive-headline">Shakespeare project</h1>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <a href='/' className="button btn project-btn">
                  Перейти к демо версии
                </a>
                <a href='/' className="button btn github-btn">
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
}

export default Header;
