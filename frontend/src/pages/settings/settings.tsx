import "./settings.scss";
import ThemeSwitch from "../../components/themeSwitch/themeSwitch";
import LanguageSwitch from "../../components/languageSwitch/languageSwitch";

const Settings = () => {

    return (
        <div className="settingsContainer">
            <ThemeSwitch />
            <LanguageSwitch />
        </div>
    );
};

export default Settings;
