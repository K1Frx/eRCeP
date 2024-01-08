import { useContext } from "react";
import { AppContext } from "../../App";
import LoginButton from "../../components/loginButton/loginButton";
import "./admin.scss";

const Admin = () => {
    const{loggedIn, setLoggedIn, loading, setLoading} = useContext(AppContext);

    if (!loggedIn) return <LoginButton />;
    return (
        <div className="adminContainer">
           <h1 className="title">Admin</h1>
        </div>
    );
};

export default Admin;
