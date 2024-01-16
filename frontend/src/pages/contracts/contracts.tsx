import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./contracts.scss";
import axios from "axios";
import usePagination from "../../hooks/usePagination";
import { useStorageState } from "../../hooks/useStorageState";
import Table from "react-bootstrap/esm/Table";
import EditContractModal from "./components/editContractModal";
import { contractType, employerType, workerType } from "../../types/types";
import { ContractTableFooter } from "./components/contractTableFooter";
import useSearch from "../../hooks/useSearch";
import Form from "react-bootstrap/esm/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

const Contracts = () => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [contractModalData, setContractModalData] = useState<contractType | null>(null);

    const [contracts, setContracts] = useState<contractType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const { search, handleSearch, filteredData } = useSearch(contracts);

    const tableHeaders = ["ID", "Employer", "Worker", "Start Date", "End Date"];

    const [employers, setEmployers] = useState<employerType[]>([]);
    const getEmployers = () => {
        setLoading(true);
        axios
            .get("http://frxx.pythonanywhere.com/api/employers/", {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setEmployers(res.data.items);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setLoading(false);
            });
    };

    const [workers, setWorkers] = useState<workerType[]>([]);
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

    const getContracts = () => {
        setLoading(true);
        axios
            .get("http://frxx.pythonanywhere.com/api/contracts/", {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                setContracts(res.data.items);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        getEmployers();
        getWorkers();
        getContracts();
    }, []);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { slice, range } = usePagination(contracts, page, rowsPerPage);


    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]); //pagination effect

    return (
        <div className="contractsContainer">
            {showModal &&
                <EditContractModal
                    setShow={setShowModal}
                    id={(contractModalData && contractModalData.id) ? contractModalData.id : null}
                    contract={contractModalData ?? null}
                    getContracts={getContracts}
                    employers={employers}
                    workers={workers}
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
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
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
                    {filteredData.map((contract, index) => (
                        <tr key={index} onClick={() => { setContractModalData(contract); setShowModal(true) }}>
                            <td>{contract.id}</td>
                            <td>
                                {employers.find(employer => employer.id === contract.employer)?.name || 'Unknown Employer'}
                            </td>
                            <td>
                                {workers.find(worker => worker.id === contract.worker)?.first_name || 'Unknown Employer'} {workers.find(worker => worker.id === contract.worker)?.last_name || 'Unknown Employer'}
                            </td>
                            <td>{contract.date_start}</td>
                            <td>{contract.date_end}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
            <ContractTableFooter
                page={page}
                setPage={setPage}
                range={range}
                setShowModal={setShowModal}
                setContractModalData={setContractModalData}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </div>
    );
};

export default Contracts;
