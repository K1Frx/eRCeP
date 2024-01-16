import Tooltip from "react-bootstrap/esm/Tooltip"
import "./smallComponents.scss"
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";

export const customTooltip = (text: string) => (
  <Tooltip id={text} className="customTooltip" style={{position:"fixed"}}>
    {text}
  </Tooltip>
);

interface smallModalProps {
  onHideFunction: () => void,
  onClickFunction: () => void,
  title: string,
  text: string,
  buttonText: string,
  disabled?: boolean
}

export const smallModal = ({onHideFunction, onClickFunction, title, text, buttonText, disabled}: smallModalProps) => (
  <Modal show={true} onHide={onHideFunction} centered className='modalContainer deleteConfirmationModalContainer'>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {text}
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={disabled ?? false} type="button" onClick={onClickFunction}>{buttonText}</Button>
    </Modal.Footer>
  </Modal>
)