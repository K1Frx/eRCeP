import { useState, useEffect } from "react";

const calculateRange = (data: any[], rowsPerPage: number) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };
  
  
  const usePagination = <T>(data: T[], page: number, rowsPerPage: number): {slice: T[], range: number[]} => {
    const [tableRange, setTableRange] = useState<number[]>([]);
    const [slice, setSlice] = useState<any[]>([]);
  
    useEffect(() => {
      const range = calculateRange(data, rowsPerPage);
      setTableRange([...range]);
  
      const slice = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
      setSlice([...slice]);
    }, [data, setTableRange, page, setSlice]);
  
    return { slice, range: tableRange };
  };

  export default usePagination;