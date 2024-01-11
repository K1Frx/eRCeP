import { useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { AppContext } from '../../App';
import "../../assets/modalStyle.scss"

interface ErrorModalProps {
    errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage }) => {
    const { setShowError } = useContext(AppContext);
    // const [show, setShow] = useState(false);

    const refresh = () => {setShowError(false);}; // location.reload(); TODO
    const mainMenuRoute = () => {setShowError(false); location.href = "/"};
    
    return (
        <Modal show={true} onHide={refresh} centered className="modalContainer">
        <Modal.Header closeButton>
          <Modal.Title>Whoops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button onClick={refresh}>
            Refresh
          </Button>
          <Button onClick={mainMenuRoute}>
            Return to Main Page
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default ErrorModal;
