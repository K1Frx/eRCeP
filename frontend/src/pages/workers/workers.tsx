import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./workers.scss";
import axios from "axios";
import { useStorageState } from "../../hooks/useStorageState";
import Table from "react-bootstrap/esm/Table";
import { workerType } from "../../types/types";
import EditWorkerModal from "./components/editWorkerModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import { customTooltip } from "../../components/smallComponents/smallComponents";
import Button from "react-bootstrap/esm/Button";


const Workers = () => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [workerModalData, setWorkerModalData] = useState<workerType | null>(null);

    const [workers, setWorkers] = useState<workerType[]>([]);
    const [showModal, setShowModal] = useState(false);

    const tableHeaders = ["ID", "Name", "Surname", "Birth date", "Email", "Phone", "Contracts"];

    const getWorkers = () => {
        setLoading(true);
        axios
            .get("http://frxx.pythonanywhere.com/api/workers/", {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setWorkers(res.data.items);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        getWorkers();
    }, []);

    return (
        <div className="workersContainer">
            {showModal &&
                <EditWorkerModal
                    setShow={setShowModal}
                    id={(workerModalData && workerModalData.id) ? workerModalData.id : null}
                    worker={workerModalData ?? null}
                    getWorkers={getWorkers}
                />
            }
            <Table >
                <thead>
                    <tr className="tableHeader">
                        {tableHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {workers.map((worker, index) => (
                        <tr key={index} onClick={() => { setWorkerModalData(worker); setShowModal(true) }}>
                            <td>{worker.id}</td>
                            <td>{worker.first_name}</td>
                            <td>{worker.last_name}</td>
                            <td>{worker.birth_date}</td>
                            <td>{worker.email}</td>
                            <td>{worker.phone_number}</td>
                            <td><Button onClick={(e) => {alert("TODO expand"); e.stopPropagation()}}>Expand</Button></td>
                            {/* items have unused user value */}
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
            <div className="footer">
                <div className="pagination"/>
                <OverlayTrigger trigger={["hover"]} placement="top" overlay={customTooltip("Create Worker")} delay={200}>
                <button className="addButton" onClick={() => { setWorkerModalData(null); setShowModal(true) }}>
                <FontAwesomeIcon icon={faPlus} className="addButtonIcon"/>
                </button>
                </OverlayTrigger>
            </div>
        </div>
    );
};

export default Workers;


  