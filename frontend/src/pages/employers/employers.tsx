import { useContext } from "react";
import { AppContext } from "../../App";
import "./employers.scss";

const Employers = () => {
    const{setLoading} = useContext(AppContext);

    return (
        <div className="employersContainer">
           <h1 className="title">Employers</h1>
        </div>
    );
};

export default Employers;
