import { useContext } from "react";
import { AppContext } from "../../App";
import "./admin.scss";

const Admin = () => {
    const { setLoading } = useContext(AppContext);
    return (
        <div className="adminContainer">
           <h1 className="title">Admin</h1>
        </div>
    );
};

export default Admin;
