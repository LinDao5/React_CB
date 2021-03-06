import React from 'react'
import {Button} from 'antd'

import RegisterForm from "./RegisterForm";
import './style.scss'

class Register extends React.Component {
  state = {
    backgroundImage: 'url(resources/images/login/4.jpg)',
    fullSize: true,
  }

  generateBackground = () => {
    let {backgroundImage} = this.state

    let min = 1
    let max = 5
    let picNumber = Math.floor(Math.random() * (max - min + 1)) + min
    backgroundImage = 'url(resources/images/login/' + picNumber + '.jpg)'
    this.setState({
      backgroundImage: backgroundImage,
    })
  }

  switchSize = () => {
    let {fullSize} = this.state
    fullSize = !fullSize
    this.setState({
      fullSize: fullSize,
    })
  }

  render() {
    const {backgroundImage, fullSize} = this.state

    return (
      <div
        className={fullSize === false ? 'login' : 'login login--fullscreen'}
        style={{backgroundImage: backgroundImage}}
      >
        <div className="login__header">
          <div className="row">
            <div className="col-lg-8">
              <div className="login__header__logo">
                <a href="javascript: void(0);">
                  <img
                    src="resources/images/login/logo-inverse.png"
                    alt="GGConnect Data Manager"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="login__block">
          <div className="row">
            <div className="col-xl-12">
              <div className="login__block__promo text-white text-center">
                <h1 className="mb-3 text-white">
                  <strong>WELCOME TO GG Connnect</strong>
                </h1>
                <p>
                  Please input following information to get registered.
                </p>
              </div>
              <div className="login__block__inner">
                <div className="login__block__form">
                  <h4 className="text-uppercase">
                    <strong>Please Register</strong>
                  </h4>
                  <br/>
                  <RegisterForm/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="login__footer text-center">
        </div>
      </div>
    )
  }
}

export default Register
