import { useContext } from "react";
import { AppContext } from "../../App";
import "./about.scss";
import LoginButton from "../../components/loginButton/loginButton";

const About = () => {
    const{loggedIn, setLoggedIn, loading, setLoading} = useContext(AppContext);

    if (!loggedIn) return <LoginButton />;
    return (
        <div className="aboutContainer">
           <h1 className="title">About</h1>
        </div>
    );
};

export default About;
