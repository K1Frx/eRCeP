import { useContext } from "react";
import { AppContext } from "../../App";
import LoginButton from "../../components/loginButton/loginButton";
import "./settings.scss";

const Settings = () => {
    const{loggedIn, setLoggedIn, loading, setLoading} = useContext(AppContext);

    if (!loggedIn) return <LoginButton />;
    return (
        <div className="settingsContainer">
           <h1 className="title">Settings</h1>
        </div>
    );
};

export default Settings;
