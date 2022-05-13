import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";

class Demoform extends Component {
  render() {
    // if (!this.props.data) return null;
    return (
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
              <form action="" method="post" id="contactForm" >
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
                    ></textarea>
                  </div>

                  <div>
                    <label>
                      Обработать с помощью:
                    </label>
                      <button className="submit">Алгоритм</button>

                  </div>

                  <div>
                    <label></label>
                    <button className="submit">Нейросеть</button>
                  </div>

                  <div>
                    <label htmlFor="input-text">
                      Результат <span className="required"></span>
                    </label>
                    <textarea
                      cols="50"
                      rows="15"
                      id="contactMessage"
                      name="contactMessage"
                    ></textarea>
                  </div>


                </fieldset>
              </form>

              <div id="message-warning"> Error boy</div>
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
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
}

export default Demoform;
