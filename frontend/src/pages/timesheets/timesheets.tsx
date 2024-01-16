import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import "./timesheets.scss";
import axios from "axios";
import { useStorageState } from "../../hooks/useStorageState";
import Table from "react-bootstrap/esm/Table";
import { timesheetType } from "../../types/types";
import EditTimesheetModal from "./components/editTimesheetModal";
import Button from "react-bootstrap/esm/Button";
import usePagination from "../../hooks/usePagination";
import { TimesheetTableFooter } from "./components/timesheetTableFooter";
import Form from "react-bootstrap/esm/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import useSearch from "../../hooks/useSearch";
import { useNavigate } from "react-router-dom";



const Timesheets = () => {
    const navigate = useNavigate();
        const { setShowError, setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [timesheetModalData, setTimesheetModalData] = useState<timesheetType | null>(null);

    const [timesheets, setTimesheets] = useState<timesheetType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const { search, handleSearch, filteredData } = useSearch(timesheets);

    const tableHeaders = ["Worker", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Summary"];

    const getTimesheets = () => {
        setLoading(true);
        axios
            .get("http://frxx.pythonanywhere.com/api/timesheets/?start=2023-01-01&end=2025-01-31", {
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                console.log(res.data.items);
                setTimesheets(res.data.items);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        getTimesheets();
    }, []);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { slice, range } = usePagination(timesheets, page, rowsPerPage);


    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]); //pagination effect

    return (
        <div className="timesheetsContainer">
            {/* {showModal &&
                <EditTimesheetModal
                    setShow={setShowModal}
                    id={(timesheetModalData && timesheetModalData.id) ? timesheetModalData.id : null}
                    timesheet={timesheetModalData ?? null}
                    getTimesheets={getTimesheets}
                />
            } */}
            {/* TODO implement timesheet adding and patching */}
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
                    {filteredData.map((timesheet, index) => (
                        <tr key={index} onClick={() => alert("patching timesheets not implemented")}>
                            {/* onClick={() => { setTimesheetModalData(timesheet); setShowModal(true) }} */}
                            <td>{timesheet.worker}</td>
                            { Array.from({length: 7}).map((_, index) => (
                            <td key={index}>
                                {timesheet.start_time ? new Date(timesheet.start_time).getHours()+":" : "URLOP"}{new Date(timesheet.start_time ?? '').getMinutes() < 10 ? '0' : ""}{timesheet.start_time ? new Date(timesheet.start_time).getMinutes()+" - " : ""}
                                {timesheet.end_time ?  new Date(timesheet.end_time).getHours()+":" : ""}{new Date(timesheet.end_time ?? '').getMinutes() < 10 ? '0' : ""}{timesheet.end_time ? new Date(timesheet.end_time).getMinutes() : ""}
                            </td>
                            ))}
                            <td>{timesheet.sum_min}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
            <TimesheetTableFooter
                page={page}
                setPage={setPage}
                range={range}
                setShowModal={setShowModal}
                setTimesheetModalData={setTimesheetModalData}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </div>
    );
};

export default Timesheets;


