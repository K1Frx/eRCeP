import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./workers.scss";
import axios from "axios";
import { useStorageState } from "../../hooks/useStorageState";
import Table from "react-bootstrap/esm/Table";
import { workerType } from "../../types/types";
import EditWorkerModal from "./components/editWorkerModal";


const Workers = () => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });

    const [workers, setWorkers] = useState<workerType[]>([
        {
            id: 0,
            birth_date: "",
            email: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            user: null
          }          
    ]);
    const [showModal, setShowModal] = useState(false);

    const tableHeaders = ["ID", "Name", "Surname", "Birth date", "Email", "Phone", "Contracts"]


    useEffect(() => {
        setLoading(true);
        axios
            .get("http://frxx.pythonanywhere.com/api/workers/", {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                console.log(res);
                setWorkers(res.data.items);
                // setError(false);
                // setDisabled(false);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                // setError(true);
                // setDisabled(false);
                setLoading(false);
            });
    }, []);

    return (
        <div className="workersContainer">
            {showModal && <EditWorkerModal setShow={setShowModal} worker={workers[0]} />}
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
                        <tr key={index} onClick={() => setShowModal(true)}>
                            <td>{worker.id}</td>
                            <td>{worker.first_name}</td>
                            <td>{worker.last_name}</td>
                            <td>{worker.birth_date}</td>
                            <td>{worker.email}</td>
                            <td>{worker.phone_number}</td>
                            <td>Expand</td> 
                            {/* items have unused user value */}
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default Workers;
