import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

export const tableTheme = useTheme([
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