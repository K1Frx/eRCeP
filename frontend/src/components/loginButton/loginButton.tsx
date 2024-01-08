import axios from "axios";
import "./loginButton.scss"

const LoginButton = () => {

    const loginRequest = () => {
        axios
            .post("http://frxx.pythonanywhere.com/login", {
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <button onClick={loginRequest} className="loginButton">Login</button>
    );
};

export default LoginButton;
