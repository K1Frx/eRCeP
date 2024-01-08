import "./settings.scss";
import ThemeSwitch from "../../components/themeSwitch/themeSwitch";

const Settings = () => {
    // const{loggedIn, setLoggedIn, loading, setLoading} = useContext(AppContext);

    // if (!loggedIn) return <LoginButton />;
    return (
        <div className="settingsContainer">
            <ThemeSwitch />
        </div>
    );
};

export default Settings;
