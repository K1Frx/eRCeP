import { Dispatch, useContext, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
// import './errorModal.scss';
import { AppContext } from '../../../App';
import { useStorageState } from '../../../hooks/useStorageState';
import axios from 'axios';
import { workerType } from '../../../types/types';
import Form from 'react-bootstrap/esm/Form';
import "../../../assets/modalStyle.scss"

interface editWorkerModalProps {
    setShow: Dispatch<React.SetStateAction<boolean>>;
    worker: workerType;
}

const EditWorkerModal: React.FC<editWorkerModalProps> = ({ setShow, worker }) => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [disabled, setDisabled] = useState<boolean>(false);
    // console.log("dziala");


    const [name, setName] = useState<string>(worker.first_name),
        [surname, setSurname] = useState<string>(worker.last_name),
        [birthDate, setBirthDate] = useState<string>(worker.birth_date),
        [email, setEmail] = useState<string>(worker.email),
        [phone, setPhone] = useState<string>(worker.phone_number);

    const patchWorker = (id: number) => {
        setLoading(true);
        setDisabled(true);
        console.log(worker);
        axios
            .patch(`http://frxx.pythonanywhere.com/api/workers/${id}/`, worker, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                // setWorkers(res.data.items);
                console.log(res.data);
                setDisabled(false);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
            });
    }

    const createWorker = () => {
        setLoading(true);
        setDisabled(true);
        axios
            .post(`http://frxx.pythonanywhere.com/api/workers/`, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                // setWorkers(res.data.items);
                console.log(res.data);
                setDisabled(false);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
            });
    }

    const deleteWorker = (id: number) => {
        setLoading(true);
        setDisabled(true);
        axios
            .delete(`http://frxx.pythonanywhere.com/api/workers/${id}/`, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                // setWorkers(res.data.items);
                console.log(res.data);
                setDisabled(false);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
            });
    }

    return (
        <Modal show={true} onHide={() => setShow(false)} centered className='modalContainer'>
            <Form onSubmit={(e) => { e.preventDefault(); patchWorker(worker.id) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Worker</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="formBasicEmail">
                        {/* <Form.Label>Login</Form.Label> */}
                        <Form.Control
                            type="text"
                            placeholder="Login"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type="text"
                            placeholder="Password"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type="text"
                            placeholder="Birth Date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type="text"
                            placeholder="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={disabled} type="submit">Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditWorkerModal;
