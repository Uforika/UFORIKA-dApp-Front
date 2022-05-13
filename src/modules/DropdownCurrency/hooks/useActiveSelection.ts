import { MouseEvent, useState } from 'react';
import { DropdownItemProps } from 'semantic-ui-react';
import { DropdownCurrencyItemType } from '../types';

const useActiveSelection = (options: DropdownCurrencyItemType[]) => {
  const [activeOptionId, setActiveOptionId] = useState<string | null>(options[0].id);

  const handleSelectOption = (_event: MouseEvent, { id }: DropdownItemProps) => {
    setActiveOptionId(id as string);
  };

  return {
    activeOptionId,
    handleSelectOption,
  };
};

export default useActiveSelection;
