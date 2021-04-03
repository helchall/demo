import React from "react";
import ReactDOM from "react-dom";

// Nous allons juste modifier notre composant pour marcher avec n'importe quel contenu, disons que nous voulons afficher un formulaire de connexion et d'inscription avec le même composant.
import PropTypes from "prop-types";

// Le composant prend deux paramètres (props), isShowing qui est un booléen et hide une fonction. Le contenu du modal n'est afficher que si isShowing vaut true, si c'est le cas, on crée un portal dans lequel on affiche le modal.

// Alors un Portal c'est quoi? Les portals en React permettent d'afficher un composant dans le DOM en dehors de son composant parent.

// Disons que nous avons bouton qui doit enclencher notre composant Modal et que ce bouton est défini dans la barre de navigation, si nous n'utilisons pas un portal, notre Modal sera rendu dans la barre de navigation, et nous ne voulons pas de cela.

// Nous utilisons donc ReactDOM.createPortal() en lui envoyant comme premier paramètre le composant à afficher et comme deuxième paramètre l'emplacement où afficher le composant, à la fin de la balise body dans notre cas.

const Modal = ({ isShowing, hide, title, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h4>{title}</h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">{props.children}</div>
              </div>
            </div>
          </div>

          <style jsx="true">{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 1040;
              background-color: rgba(0, 0, 0, 0.5);
            }

            .modal-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              z-index: 1050;
              width: 100%;
              overflow-x: hidden;
              overflow-y: auto;
              outline: 0;
              display: flex;
              align-items: center;
            }

            .modal {
              z-index: 100;
              background: #fff;
              height: auto;
              margin: auto;
              border-radius: 5px;
              max-width: 500px;
              width: 80%;
              padding: 1rem;
              display: block;
              left: 50%;
              transform: translateX(-50%);
            }

            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .modal-close-button {
              font-size: 1.4rem;
              font-weight: 700;
              color: #000;
              cursor: pointer;
              border: none;
              background: transparent;
            }
          `}</style>
        </>,
        document.body
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;
