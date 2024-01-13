import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { customTooltip } from "../../../components/smallComponents/smallComponents";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import { contractType } from "../../../types/types";
import Form from "react-bootstrap/esm/Form";

interface contractTableFooterProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    range: number[];
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setContractModalData: React.Dispatch<React.SetStateAction<contractType | null>>;
}

export const ContractTableFooter = ({ page, setPage, range, rowsPerPage, setRowsPerPage, setShowModal, setContractModalData }: contractTableFooterProps) => (
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
        <OverlayTrigger placement="top" overlay={customTooltip("Create Contract")} delay={200}>
            {/* TO ADD trigger={["hover"]} */}
            <button className="addButton" onClick={() => { setContractModalData(null); setShowModal(true) }}>
                <FontAwesomeIcon icon={faPlus} className="addButtonIcon" />
            </button>
        </OverlayTrigger>
    </div>

)