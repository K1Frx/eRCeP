import Header from "../../components/header/header";
import "./notFound.scss";

const NotFound = () => {
    return (
        <div className="notFoundContainer">
           <Header title={"Not Found"}/>
           <h1 className="title">Not Found</h1>
        </div>
    );
};

export default NotFound;
