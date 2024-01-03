import Header from "../../components/header/header";
import "./LandingPage.scss";

const LandingPage = () => {
    return (
        <div className="landingPageContainer">
           <Header title={"Welcome"}/>
           <h1 className="title">Home Page</h1>
        </div>
    );
};

export default LandingPage;
