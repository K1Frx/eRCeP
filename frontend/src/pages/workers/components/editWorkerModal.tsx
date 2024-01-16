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
import * as Yup from 'yup';
import "../workers.scss"
import { smallModal } from '../../../components/smallComponents/smallComponents';

const workerSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email'
    ),
    phone_number: Yup.string().matches(
        /^\+.*/,
        'Invalid phone number format. Use format: +999999999'
    ).matches(
        /^\+\d{9,15}$/,
        'Invalid phone number format. Number must contain 9-15 digits'
    ),
    birth_date: Yup.string().matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid date format. Please use YYYY-MM-DD'
    ).required('Required'),
});


interface editWorkerModalProps {
    id: number | null;
    setShow: Dispatch<React.SetStateAction<boolean>>;
    worker: workerType | null;
    getWorkers: () => void;
}

const EditWorkerModal = ({ id, setShow, worker, getWorkers }: editWorkerModalProps) => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [disabled, setDisabled] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
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
                getWorkers();
            });
    }

    const createWorker = (values: workerType) => {
        setLoading(true);
        setDisabled(true);
        axios
            .post(`http://frxx.pythonanywhere.com/api/workers/`, values, {
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
                getWorkers();
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
                setShow(false);
                setDeleteConfirmation(false);
                getWorkers();
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
                setDeleteConfirmation(false);
                getWorkers();
            });
    }

    return (
        <div>
            {/* {deleteConfirmation && deleteConfirmationModal} */}
            {deleteConfirmation &&
                smallModal(
                    {
                        onHideFunction: () => setDeleteConfirmation(false),
                        onClickFunction: () => deleteWorker(id ?? 0),
                        title: "Delete Worker",
                        text: "Are you sure you want to delete this worker?",
                        buttonText: "Delete",
                        disabled: disabled
                    })
            }
            <Modal show={true} onHide={() => setShow(false)} centered className='modalContainer editWorkerModalContainer'>
                <Formik
                    enableReinitialize
                    initialValues={worker ?? defaultWorker}
                    validationSchema={workerSchema}
                    // validateOnBlur={true}
                    // validateOnChange={false}
                    onSubmit={(values, helpers) => id ? patchWorker(values) : createWorker(values)}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        // setFieldValue,
                        // setFieldError,
                        touched,
                        errors
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>{id ? "Edit Worker" : "Create Worker"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Form.Group className={`formGroup ${errors.first_name && touched.first_name && "groupError"}`}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        id="first_name"
                                        value={values.first_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.first_name && touched.first_name && <div className='validationError'>{errors.first_name}</div>}
                                </Form.Group>
                                <Form.Group className={`formGroup ${errors.last_name && touched.last_name && "groupError"}`}>
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Surname"
                                        id="last_name"
                                        value={values.last_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.last_name && touched.last_name && <div className='validationError'>{errors.last_name}</div>}
                                </Form.Group>
                                <Form.Group className={`formGroup ${errors.birth_date && touched.birth_date && "groupError"}`}>
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Birth Date"
                                        id="birth_date"
                                        value={values.birth_date}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.birth_date && touched.birth_date && <div className='validationError'>{errors.birth_date}</div>}
                                </Form.Group>
                                <Form.Group className={`formGroup ${errors.email && touched.email && "groupError"}`}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email && <div className='validationError'>{errors.email}</div>}
                                </Form.Group>
                                <Form.Group className={`formGroup ${errors.phone_number && touched.phone_number && "groupError"}`}>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="phone"
                                        id="phone_number"
                                        value={values.phone_number}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.phone_number && touched.phone_number && <div className='validationError'>{errors.phone_number}</div>}
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                {id && <Button disabled={disabled} type="button" onClick={() => setDeleteConfirmation(true)}>Delete Worker</Button>}
                                <Button disabled={disabled} type="submit">Save Changes</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default EditWorkerModal;
