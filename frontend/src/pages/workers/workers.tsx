import { useContext } from "react";
import { AppContext } from "../../App";
import "./workers.scss";

const Workers = () => {
    const{setLoading} = useContext(AppContext);

    return (
        <div className="workersContainer">
           <h1 className="title">Workers</h1>
        </div>
    );
};

export default Workers;
