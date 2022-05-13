import React, { Component } from "react";
import Fade from "react-reveal";

class About extends Component {
  render() {
    // if (!this.props.data) return null;


    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">

            <div className="nine columns main-col">
              <h1>About project</h1>

              <p>Мы написали программу, чтобы помочь вам:</p>
              <ul>
                <li>Сокращать текст</li>
                <li>Составлять пересказ по английскому за пару минут</li>
              </ul>
              <p>Но основная цель проекта - получить зачет по дисциплине Интернет программирование!</p>
              <div className="row">
                <div className="columns download">
                  <p>
                    <a href='/' className="button">
                      Перейти к регистрации
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default About;
