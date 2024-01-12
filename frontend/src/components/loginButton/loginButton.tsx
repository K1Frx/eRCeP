import "./loginButton.scss"
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useStorageState } from "../../hooks/useStorageState";
import { Form } from "react-bootstrap";
import axios from "axios";

const LoginButton = () => {
    const { setError, setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });
    const [disabled, setDisabled] = useState<boolean>(false);
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<boolean>(false);

    const loginFunc = ({ login, password }: { login: string, password: string }) => {
        setLoading(true);
        setDisabled(true);
        axios.post("http://frxx.pythonanywhere.com/login/", {
            timeout: 5000,
            username: login,
            password: password,
        }).then((res) => {
            loginToken.setStorageState(res.data.token);
            // navigate("/timesheets");
            setLoginError(false);
            setDisabled(false);
            setLoading(false);
        })
            .catch((err) => {
                setDisabled(false);
                setLoading(false);
                if (err.code === 'ECONNABORTED') {
                    setError(err.message);
                    return;
                }
                setLoginError(true);
            });
    }

    const logoutFunc = () => {
        setLoading(true);
        setDisabled(true);
        setTimeout(() => {
            loginToken.setStorageState("");
            setDisabled(false);
            setLoading(false);
        }, 500);
    }

    return (
        <div className="loginButtonContainer">
            {loginToken && loginToken.store === "" ?
                <>
                    <h1>You need to login</h1>
                    <Form onSubmit={(e) => { e.preventDefault(); loginFunc({ login: login, password: password }) }}>
                        <Form.Group controlId="formBasicEmail">
                            {/* <Form.Label>Login</Form.Label> */}
                            <Form.Control
                                type="text"
                                placeholder="Login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {loginError && <p className="error">Wrong login or password</p>}
                        <button className="loginButton" disabled={disabled}>Login</button>
                    </Form>

                </>
                :
                <>
                    <h1>You are logged in</h1>
                    <button onClick={logoutFunc} className="loginButton" disabled={disabled}>Logout</button>
                </>
            }
        </div>
    );
};

export default LoginButton;
