import { useContext } from "react";
import { AppContext } from "../../App";
import LoginButton from "../../components/loginButton/loginButton";
import "./employers.scss";

const Employers = () => {
    const{loggedIn, setLoggedIn, loading, setLoading} = useContext(AppContext);

    if (!loggedIn) return <LoginButton />;
    return (
        <div className="employersContainer">
           <h1 className="title">Employers</h1>
        </div>
    );
};

export default Employers;
