import { useEffect, useState } from "react";
import "./Header.scss";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Header = () => {
    const [t] = useTranslation();
    const location = useLocation();
    const [title, setTitle] = useState(t("header.welcome"));
    const [parts, setParts] = useState(location.pathname.split("/"));

    console.log(parts);

    useEffect(() => {
        setParts(prevParts => {
            const newParts = location.pathname.split("/");
            if (newParts[newParts.length - 1] === "") {setTitle(t("header.welcome")); return newParts;};
            setTitle(t(`header.${newParts[newParts.length - 1]}`));
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
