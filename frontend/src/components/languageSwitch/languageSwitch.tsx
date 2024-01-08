import { faEarthAmericas} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './languageSwitch.scss'

export default function languageSwitch() {


    return (
        <div className='languageSwitchContainer'>
        <button onClick={() => alert("i18n to be implemented")} className="languageSwitchSwitch">
            <FontAwesomeIcon icon={faEarthAmericas} /> Change Language
        </button>
        </div>
    )
}