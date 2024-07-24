export interface ContragentContextType {
  contragents: Contragent[];
  addContragent: (contragent: Contragent) => void;
  updateContragent: (contragent: Contragent) => void;
  removeContragent: (id: number) => void;
  currentContragent: Contragent | undefined;
  setCurrentContragent: (constragent: Contragent | undefined) => void;
}

export type Contragent = {
  id: number | undefined;
  name: string;
  itn: string;
  address: string;
  trrc: string;
};
