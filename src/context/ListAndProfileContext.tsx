import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

type ListAndProfileContextType = {
  isLoading?: boolean;
  updateStatus?: (value: boolean) => void;
};

const ListAndProfileContext = createContext<ListAndProfileContextType>({});
const { Provider } = ListAndProfileContext;
const useListAndProfileContext = () => useContext(ListAndProfileContext);

// create a context provider to record loading status
function ListAndProfileProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  const updateStatus = useCallback((newValue: boolean) => {
    setLoading(newValue);
  }, []);

  return <Provider value={{ isLoading: loading, updateStatus }}>{children}</Provider>;
}

export type { ListAndProfileContextType };
export { ListAndProfileProvider, useListAndProfileContext };
