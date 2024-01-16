import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./workers.scss";
import axios from "axios";
import { useStorageState } from "../../hooks/useStorageState";
import Table from "react-bootstrap/esm/Table";
import { workerType } from "../../types/types";
import EditWorkerModal from "./components/editWorkerModal";
import Button from "react-bootstrap/esm/Button";
import usePagination from "../../hooks/usePagination";
import { WorkerTableFooter } from "./components/workerTableFooter";
import Form from "react-bootstrap/esm/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import useSearch from "../../hooks/useSearch";
import { useNavigate } from "react-router-dom";



const Workers = () => {
    const navigate = useNavigate();
        const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [workerModalData, setWorkerModalData] = useState<workerType | null>(null);

    const [workers, setWorkers] = useState<workerType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const { search, handleSearch, filteredData } = useSearch(workers);

    const tableHeaders = ["ID", "Name", "Surname", "Birth date", "Email", "Phone"];

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
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { slice, range } = usePagination(workers, page, rowsPerPage);


    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]); //pagination effect

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
            <div className="searchContainer">
                <Form.Control
                    type="text"
                    placeholder={`Search`}
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="searchBar"
                />
                <FontAwesomeIcon icon={faSearch} className="searchIcon"/>
            </div>
            <Table >
                <thead>
                    <tr className="tableHeader">
                        {tableHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((worker, index) => (
                        <tr key={index} onClick={() => { setWorkerModalData(worker); setShowModal(true) }}>
                            <td>{worker.id}</td>
                            <td>{worker.first_name}</td>
                            <td>{worker.last_name}</td>
                            <td>{worker.birth_date}</td>
                            <td>{worker.email}</td>
                            <td>{worker.phone_number}</td>
                            {/* items have unused user value */}
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
            <WorkerTableFooter
                page={page}
                setPage={setPage}
                range={range}
                setShowModal={setShowModal}
                setWorkerModalData={setWorkerModalData}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </div>
    );
};

export default Workers;


