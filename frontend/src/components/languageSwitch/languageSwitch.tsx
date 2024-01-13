import './languageSwitch.scss'
import Form from 'react-bootstrap/esm/Form';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStorageState } from '../../hooks/useStorageState';

export default function languageSwitch() {
    const { t, i18n } = useTranslation();
    let language = useStorageState({ state: "language" });
    const [isLoadingLanguage, setLoadingLanguage] = useState(false);


    useEffect(() => {
        if (!isLoadingLanguage && language.store && language.store !== i18n.language) {
            const load = async () => {
                setLoadingLanguage(true);
                await i18n.changeLanguage(language.store!).then(() => setLoadingLanguage(false));
            };
            load();
        }
    }, [language]);


    return (
        <div className='languageSwitchContainer'>
            {t("settings.languageSelect")}
            <Form.Select
                value={language.store ?? 'en'}
                onChange={(e) => { language.setStorageState(e.target.value ?? 'en'); }}
            >
                {/* <option disabled hidden>Open this select menu</option> */}
                <option value="en">English</option>
                <option value="pl">Polski</option>
            </Form.Select>
            {/* <Form.Check
                type="switch"
                id="language-switch"
                label="Change Language"
            // checked={false}
            /> */}
            {/* <button onClick={() => alert("i18n to be implemented")} className="languageSwitchSwitch">
                <FontAwesomeIcon icon={faEarthAmericas} /> Change Language
            </button> */}
        </div>
    )
}