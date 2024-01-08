import { useEffect, useState } from "react";
import "./Header.scss";
import { useLocation } from "react-router-dom";


const Header = () => {
    const location = useLocation();
    const [title, setTitle] = useState("Welcome");
    const [parts, setParts] = useState(location.pathname.split("/"));

    useEffect(() => {
        setParts(prevParts => {
            const newParts = location.pathname.split("/");
            if (newParts[newParts.length - 1] === "") {setTitle("Welcome"); return newParts;};
            setTitle(newParts[newParts.length - 1].charAt(0).toUpperCase() + newParts[newParts.length - 1].slice(1));
            return newParts;
        });
    }, [location]);

    return (
        <header className="headerContainer">
            {title}
        </header>
    );
};

export default Header;
