import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import "./workers.scss";
import axios from "axios";
import { useStorageState } from "../../hooks/useStorageState";
import Table from "react-bootstrap/esm/Table";


const Workers = () => {
    const { setLoading } = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });


    useEffect(() => {
        setLoading(true);
        axios
            .get("http://frxx.pythonanywhere.com/api/workers/", {
                headers: {
                    Authorization: `Bearer ${loginToken.store}`
                }
            }).then((res) => {
                console.log(res);
                // setError(false);
                // setDisabled(false);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                // setError(true);
                // setDisabled(false);
                setLoading(false);
            });
    }, []);


    return (
        <div className="workersContainer">
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <th key={index}>Table heading</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>2</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default Workers;
