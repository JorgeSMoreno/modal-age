import React, { Component } from 'react';
import { withRuntimeContext } from 'vtex.render-runtime'
import { ModalDialog } from 'vtex.styleguide'
import logo from '../assets/logo.png'

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function createCookie (name, value, days) {
  var expires;
  if (days) { 
      expires = "; expires=" + days.toGMTString();
  }
  else {
      expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

class AdulthoodModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    if(this.props.runtime.page == "store.custom#aviso-de-privacidad") {
      this.setState({ showModal: false })
    } else {
      if(getCookie("popupAge")) {
        this.setState({ showModal: false })
      } else {
        this.setState({ showModal: true })
      }
    }
  }

  redirectOnCancel = () => {
    location.replace("http://www.alcoholinformate.org.mx/")
  };

  handleModalToggle = () => {
    var expireDate = new Date();
        expireDate = new Date(expireDate.getFullYear(), expireDate.getMonth(), expireDate.getDate()+10);

    createCookie("popupAge", true, expireDate) 
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div className="adulthook-modal">
        <ModalDialog
          centered
          showCloseIcon={false}
          confirmation={{
            onClick: this.handleModalToggle,
            label: 'Yep',
          }}
          cancelation={{
            onClick: this.redirectOnCancel,
            label: 'Nop',
          }}
          isOpen={this.state.showModal}
          >
          <div className="dark-gray">
          <img src={logo} width="163px" />
            <h2 className="f3 white">¡Hola!</h2>
            <h1 className="f2 white">¿Ya eres mayor de edad?</h1>
            <p className="f5 white">
              Al ingresar a este sitio declaras tener <br/>
              la edad legal en tu país para poder beber alcohol
            </p>
          </div>
        </ModalDialog>
      </div>
    );
  }
};

export default withRuntimeContext(AdulthoodModal);
