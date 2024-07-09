import React, { useEffect, useState } from 'react';
import { Header } from './app/header/Header';
import { Footer } from './app/footer/Footer';
import { Contragent } from './app/main/contragents/table/Contragent';
import { TableCustom } from './app/main/contragents/table/TableCustom';
import './style.css';
import { ModalCustom } from './app/main/contragents/modal/ModalCustom';

const App: React.FC = () => {
  const initialData: Contragent[] = [];
  initialData.push(new Contragent(1, 'dsdsd', 'dasds', 'dsadasd', 'dsadasd'));

  const [data, setData] = useState<Contragent[]>(initialData);
  const [openedModal, setOpenedModal] = useState(false);
  const [selectedContragent, setSelectedContragent] =
    useState<Contragent | null>(null);

  useEffect(() => {
    if (selectedContragent?.id) {
      setOpenedModal(true);
    }
  }, [selectedContragent]);

  useEffect(() => {
    if (!openedModal) {
      setSelectedContragent(Contragent.emptyContragent);
    }
  }, [openedModal]);

  const closeModal = () => {
    setOpenedModal(false);
  };

  const openModal = () => {
    setOpenedModal(true);
  };

  const openModalWithContragent = (contragent: Contragent) => {
    setSelectedContragent(
      new Contragent(
        contragent.id,
        contragent.name,
        contragent.itn,
        contragent.address,
        contragent.trrc
      )
    );
  };

  const handleContragent = (contragent: Contragent) => {
    if (contragent.id) {
      handleUpdateContragent(contragent);
    } else {
      handleAddContragent(contragent);
    }
    closeModal();
  };

  const handleAddContragent = (contragent: Contragent) => {
    if (contragent) {
      contragent.id = Math.floor(Math.random() * 100000);
    }
    setData([...data, contragent]);
  };

  const handleUpdateContragent = (contragent: Contragent) => {
    const updatedContragents = data.map((existingContragent) =>
      existingContragent.id === contragent.id ? contragent : existingContragent
    );
    setData(updatedContragents);
  };

  const handleDeleteContragent = (contragent: Contragent) => {
    const updatedContragents = data.filter(
      (existingContragent) => existingContragent.id !== contragent.id
    );
    setData(updatedContragents);
  };

  return (
    <div>
      <Header openModal={setOpenedModal}></Header>
      <TableCustom
        data={data}
        onDeleteContragent={handleDeleteContragent}
        openModalWithContragent={openModalWithContragent}
      ></TableCustom>
      <ModalCustom
        selectedContragent={selectedContragent}
        opened={openedModal}
        openModal={openModal}
        closeModal={closeModal}
        onSave={handleContragent}
      ></ModalCustom>
      <Footer></Footer>
    </div>
  );
};

export default App;
