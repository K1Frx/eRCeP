import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./employers.scss";
import axios from "axios";
import usePagination from "../../hooks/usePagination";
import { useStorageState } from "../../hooks/useStorageState";
import Table from "react-bootstrap/esm/Table";
import EditEmployerModal from "./components/editEmployerModal";
import { employerType } from "../../types/types";
import { EmployerTableFooter } from "./components/employerTableFooter";
import useSearch from "../../hooks/useSearch";
import Form from "react-bootstrap/esm/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const Employers = () => {
    const navigate = useNavigate();
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [employerModalData, setEmployerModalData] = useState<employerType | null>(null);

    const [employers, setEmployers] = useState<employerType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const { search, handleSearch, filteredData } = useSearch(employers);

    const tableHeaders = ["ID", "Name", "NIP", "Address"];

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

    useEffect(() => {
        getEmployers();
    }, []);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { slice, range } = usePagination(employers, page, rowsPerPage);


    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]); //pagination effect

    return (
        <div className="employersContainer">
            {showModal &&
                <EditEmployerModal
                    setShow={setShowModal}
                    id={(employerModalData && employerModalData.id) ? employerModalData.id : null}
                    employer={employerModalData ?? null}
                    getEmployers={getEmployers}
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
                    {filteredData.map((employer, index) => (
                        <tr key={index} onClick={() => { setEmployerModalData(employer); setShowModal(true) }}>
                            <td>{employer.id}</td>
                            <td>{employer.name}</td>
                            <td>{employer.nip}</td>
                            <td>{employer.adress}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
            <EmployerTableFooter
                page={page}
                setPage={setPage}
                range={range}
                setShowModal={setShowModal}
                setEmployerModalData={setEmployerModalData}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </div>
    );
};

export default Employers;
