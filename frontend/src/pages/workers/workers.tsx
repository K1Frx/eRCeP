import { useContext } from "react";
import { AppContext } from "../../App";
import LoginButton from "../../components/loginButton/loginButton";
import "./workers.scss";

const Workers = () => {
    const{loggedIn, setLoggedIn, loading, setLoading} = useContext(AppContext);

    if (!loggedIn) return <LoginButton />;
    return (
        <div className="workersContainer">
           <h1 className="title">Workers</h1>
        </div>
    );
};

export default Workers;
