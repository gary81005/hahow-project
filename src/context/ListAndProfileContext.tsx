import { ReactNode, createContext, useContext } from 'react';

type ListAndProfileContextType = {
  isLoading: boolean;
  updateIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListAndProfileContext = createContext<ListAndProfileContextType>({
  isLoading: false,
});
const { Provider } = ListAndProfileContext;
const useListAndProfileContext = () => useContext(ListAndProfileContext);

// create a context provider to record loading status
function ListAndProfileProvider({
  isLoading,
  updateIsLoading,
  children,
}: {
  isLoading: boolean;
  updateIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return <Provider value={{ isLoading, updateIsLoading }}>{children}</Provider>;
}

export type { ListAndProfileContextType };
export { ListAndProfileProvider, useListAndProfileContext };
