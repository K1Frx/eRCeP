import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./workers.scss";
import axios from "axios";
import { useStorageState } from "../../hooks/useStorageState";
import Table from "react-bootstrap/esm/Table";


const Workers = () => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const tableHeaders = ["ID", "Name", "Surname", "Birth date", "Email", "Phone", "Contracts"]
    const [workers, setWorkers] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://frxx.pythonanywhere.com/api/workers/", {
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
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
                        <tr key={index}>
                            <td>{worker.id}</td>
                            <td>{worker.first_name}</td>
                            <td>{worker.last_name}</td>
                            <td>{worker.birth_date}</td>
                            <td>{worker.email}</td>
                            <td>{worker.phone_number}</td>
                            <td>{worker.contracts ?? "empty"}</td> 
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
