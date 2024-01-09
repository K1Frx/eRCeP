import "./settings.scss";
import ThemeSwitch from "../../components/themeSwitch/themeSwitch";
import LanguageSwitch from "../../components/languageSwitch/languageSwitch";
import { useContext } from "react";
import { AppContext } from "../../App";

const Settings = () => {
    const{setLoading} = useContext(AppContext);

    return (
        <div className="settingsContainer">
            <ThemeSwitch />
            <LanguageSwitch />
        </div>
    );
};

export default Settings;
