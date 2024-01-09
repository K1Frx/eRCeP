import axios from "axios";
import "./loginButton.scss"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useStorageState } from "../../hooks/useStorageState";
import { faSheqel } from "@fortawesome/free-solid-svg-icons";

const LoginButton = () => {
    const { setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [content, setContent] = useState<{ text: string, button: string }>({ text: "You need to login", button: "Login" });
    const [disabled, setDisabled] = useState<boolean>(false);

    const textChange = () => {
        if (loginToken && loginToken.store) {
            setContent({ text: "You need to login", button: "Login" });
        }
        else {
            setContent({ text: "You are logged in", button: "Logout" });
        }
    }

    const loginRequest = () => {
        setLoading(true);
        setDisabled(true);
        textChange();
        axios
            .post("http://frxx.pythonanywhere.com/login/", {
                username: "frxx",
                password: "52645",
            })
            .then((res) => {
                console.log(res);
                loginToken.setStorageState(res.data.token);
                setDisabled(false);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setDisabled(false);
                setLoading(false);
            });
    }

    const logout = () => {
        setLoading(true);
        setDisabled(true);
        setTimeout(() => {
            textChange();
            loginToken.setStorageState("");
            setDisabled(false);
            setLoading(false);
        }, 500);
    }


    return (
        <div className="loginButtonContainer">
            <h1>{content.text}</h1>
            <button onClick={loginToken && loginToken.store ? logout : loginRequest} className="loginButton" disabled={disabled}>{content.button}</button>
        </div>
    );
};

export default LoginButton;
