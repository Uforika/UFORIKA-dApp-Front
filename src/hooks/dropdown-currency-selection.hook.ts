import { TOKEN } from '@constants/token.constants';
import { useCallback, useState } from 'react';
import { DropdownCurrencyItemType } from 'src/modules/DropdownCurrency/types';

const useDropdownCurrencySelection = (options: DropdownCurrencyItemType[]) => {
  const [activeOptionId, setActiveOptionId] = useState<TOKEN | null>(options[0].id);

  const onSelectOption = useCallback((id: TOKEN) => {
    setActiveOptionId(id);
  }, []);

  return {
    activeOptionId,
    onSelectOption,
  };
};

export default useDropdownCurrencySelection;
