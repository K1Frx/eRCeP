import { useState, useEffect } from 'react';

interface SearchHookResult<T> {
  search: string;
  handleSearch: (value: string) => void;
  filteredData: T[];
  resetSearch: () => void;
}

const useSearch = <T extends Record<string, any>>(
  initialData: T[],
  defaultSearch: string = ''
): SearchHookResult<T> => {
  const [search, setSearch] = useState<string>(defaultSearch);
  const [filteredData, setFilteredData] = useState<T[]>(initialData);

  useEffect(() => {
    const filterData = () => {
      if (search.trim() === '') {
        setFilteredData(initialData); // Show all data when search is empty
      } else {
        setFilteredData(
          initialData.filter((entry) =>
            Object.values(entry).some(
              (val) =>
                typeof val === 'string' &&
                val.toLowerCase().includes(search.toLowerCase())
            )
          )
        );
      }
    };

    // Call the filter function when the search term changes
    filterData();
  }, [search, initialData]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const resetSearch = () => {
    setSearch(defaultSearch);
  };

  return {
    search,
    handleSearch,
    filteredData,
    resetSearch,
  };
};

export default useSearch;
