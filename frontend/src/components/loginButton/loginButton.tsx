import axios from "axios";
import "./loginButton.scss"
import { useContext } from "react";
import { AppContext } from "../../App";

const LoginButton = () => {
    const { loggedIn, setLoggedIn, loading, setLoading } = useContext(AppContext);

    const loginRequest = () => {
        setLoading(true);
        axios
            .post("http://frxx.pythonanywhere.com/login", {
            })
            .then((res) => {
                console.log(res);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

    }


    return (
        <div className="loginButtonContainer">
            <h1>You need to login</h1>
            <button onClick={loginRequest} className="loginButton">Login</button>
        </div>
    );
};

export default LoginButton;
