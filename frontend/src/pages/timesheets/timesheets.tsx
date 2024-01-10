import { useContext } from "react";
import { AppContext } from "../../App";
import "./timesheets.scss";


const Timesheets = () => {
    const { setLoading } = useContext(AppContext);
   
    return (
        <div className="timesheetsContainer">

        </div>
    );
};

export default Timesheets;
