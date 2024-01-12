import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './languageSwitch.scss'
import Form from 'react-bootstrap/esm/Form';

export default function languageSwitch() {


    return (
        <div className='languageSwitchContainer'>
            <Form.Check
                type="switch"
                id="language-switch"
                label="Change Language"
                // checked={false}
                onChange={() => alert("i18n to be implemented")}
            />
            {/* <button onClick={() => alert("i18n to be implemented")} className="languageSwitchSwitch">
                <FontAwesomeIcon icon={faEarthAmericas} /> Change Language
            </button> */}
        </div>
    )
}