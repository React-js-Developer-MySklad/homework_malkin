import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ContragentContextType, Contragent } from '../../../types';
import {
  create,
  fetchContragents,
  update,
  remove,
} from '../../../../services/api';

const ContragentContext = createContext<ContragentContextType | undefined>(
  undefined
);

export const ContragentProvider = ({ children }: { children: ReactNode }) => {
  const [contragents, setContragents] = useState<Contragent[]>([]);
  const [currentContragent, setCurrentContragent] = useState<Contragent | null>(
    null
  );

  useEffect(() => {
    const getContragents = async () => {
      const contragentsFromServer = await fetchContragents();
      setContragents(contragentsFromServer);
    };
    getContragents();
  }, []);

  const addContragent = async (contragent: Contragent) => {
    const newContragent = await create(contragent);
    setContragents([...contragents, newContragent]);
  };

  const updateContragent = async (contragent: Contragent) => {
    const updatedContragent = await update(contragent);
    setContragents(
      contragents.map((existingContragent) =>
        existingContragent.id?.toString() === updatedContragent.id.toString()
          ? updatedContragent
          : existingContragent
      )
    );
  };

  const removeContragent = async (id: number) => {
    await remove(id);
    setContragents(contragents.filter((contragent) => contragent.id !== id));
  };

  return (
    <ContragentContext.Provider
      value={{
        contragents,
        addContragent,
        updateContragent,
        removeContragent,
        currentContragent,
        setCurrentContragent,
      }}
    >
      {children}
    </ContragentContext.Provider>
  );
};

export const useContragentContext = (): ContragentContextType => {
  const context = useContext(ContragentContext);
  if (context === undefined) {
    throw new Error(
      'useContragentContext must be used within a ContragentProvider'
    );
  }
  return context;
};
