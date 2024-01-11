import { useState, useEffect } from "react";
import { workerType } from "../types/types";

const calculateRange = (data: workerType[], rowsPerPage: number) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };
  
  
  const usePagination = (data: workerType[], page: number, rowsPerPage: number) => {
    const [tableRange, setTableRange] = useState<number[]>([]);
    const [slice, setSlice] = useState<workerType[]>([]);
  
    useEffect(() => {
      const range = calculateRange(data, rowsPerPage);
      setTableRange([...range]);
  
      const slice = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
      setSlice([...slice]);
    }, [data, setTableRange, page, setSlice]);
  
    return { slice, range: tableRange };
  };

  export default usePagination;