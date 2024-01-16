import { Dispatch, useContext, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
// import './errorModal.scss';
import { AppContext } from '../../../App';
import { useStorageState } from '../../../hooks/useStorageState';
import axios from 'axios';
import { contractType, employerType, workerType } from '../../../types/types';
import Form from 'react-bootstrap/esm/Form';
import "../../../assets/modalStyle.scss"
import { Formik } from 'formik';
import * as Yup from 'yup';
import "../contracts.scss"
import { smallModal } from '../../../components/smallComponents/smallComponents';

const contractSchema = Yup.object().shape({
    worker: Yup.string().required('Required'),
    employer: Yup.string().required('Required'),
    date_start: Yup.string().matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid date format. Please use YYYY-MM-DD'
    ).required('Required'),
    date_end: Yup.string().nullable().matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid date format. Please use YYYY-MM-DD'
    ),
});


interface editContractModalProps {
    id: number | null;
    setShow: Dispatch<React.SetStateAction<boolean>>;
    contract: contractType | null;
    getContracts: () => void;
    employers: employerType[];
    workers: workerType[];
}

const EditContractModal = ({ id, setShow, contract, getContracts, employers, workers }: editContractModalProps) => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [disabled, setDisabled] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
    const defaultContract: contractType = {
        employer: "",
        worker: "",
        date_start: "",
        date_end: "",
    }

    const patchContract = (values: contractType) => {
        setLoading(true);
        setDisabled(true);
        axios
            .patch(`http://frxx.pythonanywhere.com/api/contracts/${id}/`, values, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setDisabled(false);
                setLoading(false);
                setShow(false);
                getContracts();
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
                getContracts();
            });
    }

    const createContract = (values: contractType) => {
        setLoading(true);
        setDisabled(true);
        axios
            .post(`http://frxx.pythonanywhere.com/api/contracts/`, values, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setDisabled(false);
                setLoading(false);
                setShow(false);
                getContracts();
            })
            .catch((err) => {
                console.log(err.message)
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
                getContracts();
            });
    }

    const deleteContract = (id: number) => {
        setLoading(true);
        setDisabled(true);
        axios
            .delete(`http://frxx.pythonanywhere.com/api/contracts/${id}/`, {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setDisabled(false);
                setLoading(false);
                setShow(false);
                setDeleteConfirmation(false);
                getContracts();
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setDisabled(false);
                setLoading(false);
                setDeleteConfirmation(false);
                getContracts();
            });
    }

    return (
        <div>
            {/* {deleteConfirmation && deleteConfirmationModal} */}
            {deleteConfirmation &&
                smallModal(
                    {
                        onHideFunction: () => setDeleteConfirmation(false),
                        onClickFunction: () => deleteContract(id ?? 0),
                        title: "Delete Contract",
                        text: "Are you sure you want to delete this contract?",
                        buttonText: "Delete",
                        disabled: disabled
                    })
            }
            <Modal show={true} onHide={() => setShow(false)} centered className='modalContainer editContractModalContainer'>
                <Formik
                    enableReinitialize
                    initialValues={contract ?? defaultContract}
                    validationSchema={contractSchema}
                    // validateOnBlur={true}
                    // validateOnChange={false}
                    onSubmit={(values, helpers) => id ? patchContract(values) : createContract(values)}
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
                                <Modal.Title>{id ? "Edit Contract" : "Create Contract"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group className={`formGroup ${errors.employer && touched.employer && "groupError"}`}>
                                    <Form.Label>Employer</Form.Label>
                                    {/* <Form.Control
                                        type="text"
                                        placeholder="Employer"
                                        id="employer"
                                        value={values.employer}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    /> */}
                                    <Form.Control
                                        type="text"
                                        id="employer"
                                        value={values.employer}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        as="select"
                                    >
                                        <option value="" disabled hidden>Select employer</option>
                                        {employers &&
                                            employers.map((employer, id) => (
                                                <option value={employer.id} key={id}>
                                                    {employer.name}
                                                </option>
                                            ))}
                                    </Form.Control>
                                    {errors.employer && touched.employer && <div className='validationError'>{errors.employer}</div>}
                                </Form.Group>
                                <Form.Group className={`formGroup ${errors.worker && touched.worker && "groupError"}`}>
                                    <Form.Label>Worker</Form.Label>
                                    {/* <Form.Control
                                        type="text"
                                        placeholder="Worker"
                                        id="worker"
                                        value={values.worker}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    /> */}
                                    <Form.Control
                                        type="text"
                                        id="worker"
                                        value={values.worker}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        as="select"
                                    >
                                        <option value="" disabled hidden>Select worker</option>
                                        {workers &&
                                            workers.map((worker, id) => (
                                                <option value={worker.id} key={id}>
                                                    {worker.first_name} {worker.last_name}
                                                </option>
                                            ))}
                                    </Form.Control>
                                    {errors.worker && touched.worker && <div className='validationError'>{errors.worker}</div>}
                                </Form.Group>
                                <Form.Group className={`formGroup ${errors.date_start && touched.date_start && "groupError"}`}>
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Start Date"
                                        id="date_start"
                                        value={values.date_start}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.date_start && touched.date_start && <div className='validationError'>{errors.date_start}</div>}
                                </Form.Group>
                                <Form.Group className={`formGroup ${errors.date_end && touched.date_end && "groupError"}`}>
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="End Date"
                                        id="date_end"
                                        value={values.date_end ?? ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.date_end && touched.date_end && <div className='validationError'>{errors.date_end}</div>}
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                {id && <Button disabled={disabled} type="button" onClick={() => setDeleteConfirmation(true)}>Delete Contract</Button>}
                                <Button disabled={disabled} type="submit">Save Changes</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default EditContractModal;
