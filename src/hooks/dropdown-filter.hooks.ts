import { SyntheticEvent, useMemo, useState } from 'react';
import { DropdownProps } from 'semantic-ui-react';

export const useDropdownFilter = (options: { name: string, type: string }[]) => {

  const [filterValue, setFilterValue] = useState('all');

  const onFilterChange = (_: SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    if (typeof data.value === 'string') {
      setFilterValue(data.value);
    }
  };

  const filteredNftOptions = useMemo(() => {
    if (filterValue === 'all') {
      return options;
    }

    return options.filter(({ type }) => type === filterValue);
  }, [filterValue, options]);

  return {
    filteredNftOptions,
    onFilterChange,
    filterValue,
  };

};
