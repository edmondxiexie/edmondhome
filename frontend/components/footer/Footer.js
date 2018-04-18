import React, { Component } from "react";

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="container footer-base">
        <hr />

        <div className="footer-content">
          <div className="copyright">
            <div>
              © 2018 Copyright by&nbsp;<a
                href="https://www.linkedin.com/in/edmondxie/"
                target="_blank"
              >
                Jiayi Edmond Xie
              </a>. Individual Project.
            </div>
          </div>

          <div className="contact">
            <div className="contact-traditional">
              <label>Contact Author</label>
              <div>
                <i className="fa fa-user" aria-hidden="true" />
                <span>Jiayi Edmond Xie</span>
              </div>
              <div>
                <i className="fa fa-phone" aria-hidden="true" />
                <span>412-932-0155</span>
              </div>
              <div>
                <i className="fa fa-envelope" aria-hidden="true" />
                <span>xiejy36@gmail.com</span>
              </div>
            </div>
            <div className="contact-social">
              <a
                href="https://github.com/edmondxiexie/edmondhome"
                target="_blank"
              >
                <i className="fa fa-github" aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/in/edmondxie/" target="_blank">
                <i className="fa fa-linkedin" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100009769728183"
                target="_blank"
              >
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
