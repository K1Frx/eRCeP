import { useContext } from "react";
import { AppContext } from "../../App";
import "./timesheets.scss";
import { CompactTable } from '@table-library/react-table-library/compact';
import { TableNode } from "@table-library/react-table-library/types/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";



const theme = useTheme([
    getTheme(),
    {
        Table: `
        // overflow: visible;
        `,
        HeaderRow: `
        background-color: #ffd699;
        `,
        HeaderCell: `
        height:3rem;
        min-width: 11rem;
        :after {
            content: '';
            height: 50%; //You can change this if you want smaller/bigger borders
            width: 1px;
            position: absolute;
            right: 0;
            top: 25%; // If you want to set a smaller height and center it, change this value
            background-color: #ccc;
        };
        `,
        Row: `
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:nth-of-type(odd) {
          background-color: #fff4e3;
        }

        &:nth-of-type(even) {
          background-color: #ffebcd;
        }
        &:hover {
            background-color: #ffcc99;
        }
        `,
        Cell: `
        height:3rem;
        min-width: 11rem;

        `
    },
]);

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


const Timesheets = () => {
    const { setLoading } = useContext(AppContext);
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
    // if (!loggedIn) return <LoginButton />;
    return (
        <div className="timesheetsContainer">
            <CompactTable
                columns={COLUMNS}
                data={data}
                theme={theme}
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

export default Timesheets;
