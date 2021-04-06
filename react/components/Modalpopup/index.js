import React, { Component } from 'react';
import { withRuntimeContext } from 'vtex.render-runtime'
import { ModalDialog } from 'vtex.styleguide'

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
    window.location.href = "/aviso-de-privacidad";
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
            label: 'Si',
          }}
          cancelation={{
            onClick: this.redirectOnCancel,
            label: 'No',
          }}
          isOpen={this.state.showModal}
          >
          <div className="dark-gray">
            <h1>¿Tienes 18 años?</h1>
            <p>
              Por favor verifica tu edad. Debes tener 18 años mínimos para ingresar a este sitio.
            </p>
          </div>
        </ModalDialog>
      </div>
    );
  }
};

export default withRuntimeContext(AdulthoodModal);
