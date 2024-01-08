import "./settings.scss";
import ThemeSwitch from "../../components/themeSwitch/themeSwitch";
import LanguageSwitch from "../../components/languageSwitch/languageSwitch";

const Settings = () => {
    // const{loggedIn, setLoggedIn, loading, setLoading} = useContext(AppContext);

    // if (!loggedIn) return <LoginButton />;
    return (
        <div className="settingsContainer">
            <ThemeSwitch />
            <LanguageSwitch />
        </div>
    );
};

export default Settings;
