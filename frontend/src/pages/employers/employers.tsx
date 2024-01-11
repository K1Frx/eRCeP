import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./employers.scss";
import axios from "axios";
import usePagination from "../../hooks/usePagination";
import { useStorageState } from "../../hooks/useStorageState";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import EditEmployerModal from "./components/editEmployerModal";
import { employerType } from "../../types/types";
import { EmployerTableFooter } from "./components/employerTableFooter";

const Employers = () => {
    const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [employerModalData, setEmployerModalData] = useState<employerType | null>(null);

    const [employers, setEmployers] = useState<employerType[]>([]);
    const [showModal, setShowModal] = useState(false);

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
                console.log(res.data);
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
            <Table >
                <thead>
                    <tr className="tableHeader">
                        {tableHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employers.map((employer, index) => (
                        <tr key={index} onClick={() => { setEmployerModalData(employer); setShowModal(true) }}>
                            <td>{employer.id}</td>
                            <td>{employer.name}</td>
                            <td>{employer.nip}</td>
                            <td>{employer.adress}</td>
                            {/* <td>{employer.email}</td>
                            <td>{employer.phone_number}</td>
                            <td><Button onClick={(e) => { alert("TODO expand"); e.stopPropagation() }}>Expand</Button></td> */}
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
