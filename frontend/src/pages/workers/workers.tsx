import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import "./workers.scss";
import axios from "axios";
import { useStorageState } from "../../hooks/useStorageState";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import { TableNode } from "@table-library/react-table-library/types/table";
import { CompactTable } from "@table-library/react-table-library/compact";
import { tableTheme } from "../../assets/consts";

const COLUMNS = [
    { label: 'Workers', renderCell: (item: TableNode) => item.name },
    { label: 'Monday', renderCell: (item: TableNode) => item.monday },
    { label: 'Tuesday', renderCell: (item: TableNode) => item.tuesday },
    { label: 'Wednesday', renderCell: (item: TableNode) => item.wednesday },
    { label: 'Thursday', renderCell: (item: TableNode) => item.thursday },
    { label: 'Friday', renderCell: (item: TableNode) => item.friday },
    { label: 'Saturday', renderCell: (item: TableNode) => item.saturday },
    { label: 'Sunday', renderCell: (item: TableNode) => item.sunday },
    { label: 'Summary', renderCell: (item: TableNode) => item.summary },
];

const Workers = () => {
    const{setLoading} = useContext(AppContext);
    let loginToken = useStorageState({ state: "loginToken" });

    const nodes: TableNode[] = [
        {
            id: '0',
            name: 'Some Dude',
            monday: "8:00",
            tuesday: "8:00",
            wednesday: "8:00",
            thursday: "8:00",
            friday: "8:00",
            saturday: "0:00",
            sunday: "0:00",
            summary: "40:00",
        },
    ]

    const data = { nodes };

    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 2,
        },
        // onChange: onPaginationChange,
    });

    // const [ids, setIds] = useState<number[]>([]);
    const handleExpand = (item: TableNode) => {
        // if (ids.includes(Number(item.id))) {
        //     setIds(ids.filter((id) => id !== Number(item.id)));
        // } else {
        //     setIds(ids.concat(Number(item.id)));
        // }
        alert("You clicked on " + item.name);
    };


    useEffect(() => {
        setLoading(true);
        axios
            .get("http://frxx.pythonanywhere.com/api/workers/", {
                headers :{
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
           <CompactTable
                columns={COLUMNS}
                data={data}
                theme={tableTheme}
                pagination={pagination}
                rowProps={{
                    onClick: handleExpand
                }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

                <span>
                    Page:
                    {pagination.state.getPages(data.nodes).map((_: TableNode, index: number) => (
                        <button
                            key={index}
                            type="button"
                            style={{
                                fontWeight: pagination.state.page === index ? "bold" : "normal",
                            }}
                            onClick={() => pagination.fns.onSetPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default Workers;
