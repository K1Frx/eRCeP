import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { customTooltip } from "../../../components/smallComponents/smallComponents";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import { employerType } from "../../../types/types";
import Form from "react-bootstrap/esm/Form";

interface employerTableFooterProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    range: number[];
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEmployerModalData: React.Dispatch<React.SetStateAction<employerType | null>>;
}

export const EmployerTableFooter = ({ page, setPage, range, rowsPerPage, setRowsPerPage, setShowModal, setEmployerModalData }: employerTableFooterProps) => (
    <div className="footer">
        <div className="pageOptions">
            <Form.Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                {/* <option disabled hidden>Page Size</option> */}
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </Form.Select>
            <div className="pagination">
                {range.map((el, index) => (
                    <Button
                        key={index}
                        className={`paginationButton ${page - 1 === index ? "activeButton" : ""} `}
                        onClick={() => setPage(el)}
                    >
                        {el}
                    </Button>
                ))}
            </div>
        </div>
        <OverlayTrigger placement="top" overlay={customTooltip("Create Employer")} delay={200}>
            {/* TO ADD trigger={["hover"]} */}
            <button className="addButton" onClick={() => { setEmployerModalData(null); setShowModal(true) }}>
                <FontAwesomeIcon icon={faPlus} className="addButtonIcon" />
            </button>
        </OverlayTrigger>
    </div>

)