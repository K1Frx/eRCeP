import { useEffect, useState } from 'react'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './themeSwitch.scss'

export default function ThemeSwitch() {

    const [theme, setTheme] = useState<string>((localStorage.getItem("themeKey") ?? document.documentElement.getAttribute('data-theme')) ?? 'light');

    const toggleTheme = () => {
        switch (theme) {
            case "light":
                document.documentElement.setAttribute('data-theme', 'dark');
                setTheme("dark");
                localStorage.setItem("themeKey", "dark");
                break;
            case "dark":
                document.documentElement.setAttribute('data-theme', 'light');
                setTheme("light");
                localStorage.setItem("themeKey", "light");
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        switch (true) {
            case localStorage.getItem("themeKey") === "dark":
                document.documentElement.setAttribute('data-theme', 'dark');
                setTheme("dark");
                localStorage.setItem("themeKey", "dark");
                break;
            case localStorage.getItem("themeKey") === "light":
                document.documentElement.setAttribute('data-theme', 'light');
                setTheme("light");
                localStorage.setItem("themeKey", "light");
                break;
            case window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches:
                document.documentElement.setAttribute('data-theme', 'dark');
                setTheme("dark");
                localStorage.setItem("themeKey", "dark");
                break;
            default:
                document.documentElement.setAttribute('data-theme', 'light');
                setTheme("light");
                localStorage.setItem("themeKey", "light");
                break;
        }
    }, []);

    return (
        <div className='themeSwitchContainer'>
        <button onClick={toggleTheme} className="themeSwitch">
            {theme === "light" ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />} Change Theme
        </button>
        </div>
    )
}