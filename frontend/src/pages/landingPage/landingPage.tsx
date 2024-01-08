import { useContext } from "react";
import { AppContext } from "../../App";
import LoginButton from "../../components/loginButton/loginButton";
import "./LandingPage.scss";

const LandingPage = () => {
    const{loggedIn, setLoggedIn, loading, setLoading} = useContext(AppContext);

    if (!loggedIn) return <LoginButton />;
    
    return (
        <div className="landingPageContainer">
           <h1 className="title"><LoginButton/></h1>
        </div>
    );
};

export default LandingPage;
