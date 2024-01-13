import { Dispatch, useContext, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
// import './errorModal.scss';
import { AppContext } from '../../../App';
import { useStorageState } from '../../../hooks/useStorageState';
import axios from 'axios';
import { employerType } from '../../../types/types';
import Form from 'react-bootstrap/esm/Form';
import "../../../assets/modalStyle.scss"
import { Formik } from 'formik';
import * as Yup from 'yup';
import "../employers.scss"
import { smallModal } from '../../../components/smallComponents/smallComponents';

const employerSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    nip: Yup.string().required('Required'),
    adress: Yup.string(),
});


interface editEmployerModalProps {
    id: number | null;
    setShow: Dispatch<React.SetStateAction<boolean>>;
    employer: employerType | null;
    getEmployers: () => void;
}

const EditEmployerModal = ({ id, setShow, employer, getEmployers }: editEmployerModalProps) => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [disabled, setDisabled] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
    const defaultEmployer: employerType = {
        name: "",
        nip: "",
        adress: ""
    }

    const patchEmployer = (values: employerType) => {
        setLoading(true);
        setDisabled(true);
        axios
            .patch(`http://frxx.pythonanywhere.com/api/employers/${id}/`, values, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setDisabled(false);
                setLoading(false);
                setShow(false);
                getEmployers();
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
                getEmployers();
            });
    }

    const createEmployer = (values: employerType) => {
        setLoading(true);
        setDisabled(true);
        axios
            .post(`http://frxx.pythonanywhere.com/api/employers/`, values, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setDisabled(false);
                setLoading(false);
                setShow(false);
                getEmployers();
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
                getEmployers();
            });
    }

    const deleteEmployer = (id: number) => {
        setLoading(true);
        setDisabled(true);
        axios
            .delete(`http://frxx.pythonanywhere.com/api/employers/${id}/`, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setDisabled(false);
                setLoading(false);
                setShow(false);
                setDeleteConfirmation(false);
                getEmployers();
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
                setDeleteConfirmation(false);
                getEmployers();
            });
    }

    return (
        <div>
            {/* {deleteConfirmation && deleteConfirmationModal} */}
            {deleteConfirmation &&
                smallModal(
                    {
                        onHideFunction: () => setDeleteConfirmation(false),
                        onClickFunction: () => deleteEmployer(id ?? 0),
                        title: "Delete Employer",
                        text: "Are you sure you want to delete this employer?",
                        buttonText: "Delete",
                        disabled: disabled
                    })
            }
            <Modal show={true} onHide={() => setShow(false)} centered className='modalContainer editEmployerModalContainer'>
                <Formik
                    enableReinitialize
                    initialValues={employer ?? defaultEmployer}
                    validationSchema={employerSchema}
                    // validateOnBlur={true}
                    // validateOnChange={false}
                    onSubmit={(values, helpers) => id ? patchEmployer(values) : createEmployer(values)}
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
                                <Modal.Title>{id ? "Edit Employer" : "Create Employer"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Form.Group className={`formGroup ${errors.name && touched.name && "groupError"}`}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        id="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name && <div className='validationError'>{errors.name}</div>}
                                </Form.Group>
                                <Form.Group className={`formGroup ${errors.nip && touched.nip && "groupError"}`}>
                                    <Form.Label>NIP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="NIP"
                                        id="nip"
                                        value={values.nip}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.nip && touched.nip && <div className='validationError'>{errors.nip}</div>}
                                </Form.Group>
                                <Form.Group className={`formGroup ${errors.adress && touched.adress && "groupError"}`}>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Adsress"
                                        id="adress"
                                        value={values.adress ?? ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.adress && touched.adress && <div className='validationError'>{errors.adress}</div>}
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                {id && <Button disabled={disabled} type="button" onClick={() => setDeleteConfirmation(true)}>Delete Employer</Button>}
                                <Button disabled={disabled} type="submit">Save Changes</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default EditEmployerModal;
