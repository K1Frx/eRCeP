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
import { Formik } from 'formik';


interface editWorkerModalProps {
    id: number | null;
    setShow: Dispatch<React.SetStateAction<boolean>>;
    worker: workerType | null;
    getWorkers: () => void;
}

const EditWorkerModal: React.FC<editWorkerModalProps> = ({ id, setShow, worker, getWorkers }) => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [disabled, setDisabled] = useState<boolean>(false);
    const defaultWorker: workerType = {
        birth_date: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
      }

    const patchWorker = (values: workerType) => {
        setLoading(true);
        setDisabled(true);
        axios
            .patch(`http://frxx.pythonanywhere.com/api/workers/${id}/`, values, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setDisabled(false);
                setLoading(false);
                setShow(false);
                getWorkers();
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
            <Formik
                enableReinitialize
                initialValues={worker ?? defaultWorker}
                // onSubmit={savePrice}
                onSubmit={(values, helpers) => patchWorker(values)}
            // onSubmit={(values, helpers) => { console.log(values) }}
            // validationSchema={orderSchema}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    // setFieldValue,
                    // setFieldError,
                    // touched,
                    // errors
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Worker</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                {/* <Form.Label>Login</Form.Label> */}
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    id="first_name"
                                    value={values.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            <Form.Group>
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control
                                    type="text"
                                    placeholder="Surname"
                                    id="last_name"
                                    value={values.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            <Form.Group>
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control
                                    type="text"
                                    placeholder="Birth Date"
                                    id="birth_date"
                                    value={values.birth_date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            <Form.Group>
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            <Form.Group>
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control
                                    type="text"
                                    placeholder="phone"
                                    id="phone_number"
                                    value={values.phone_number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button disabled={disabled} type="submit">Save Changes</Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default EditWorkerModal;
