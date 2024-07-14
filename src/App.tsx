import React, { useEffect, useState } from 'react';
import { Header } from './app/header/Header';
import { Footer } from './app/footer/Footer';
import { TableCustom } from './app/main/contragents/table/TableCustom';
import './style.css';
import { ModalCustom } from './app/main/contragents/modal/ModalCustom';
import { useContragentContext } from './app/main/contragents/context/ContragentProvider';
import { Contragent } from './app/types';

const App: React.FC = () => {
  const {
    currentContragent,
    addContragent,
    updateContragent,
    setCurrentContragent,
    removeContragent,
    contragents,
  } = useContragentContext();

  const [openedModal, setOpenedModal] = useState(false);

  useEffect(() => {
    if (currentContragent?.id) {
      setOpenedModal(true);
    }
  }, [currentContragent]);

  useEffect(() => {
    if (!openedModal) {
      setCurrentContragent(null);
    }
  }, [openedModal]);

  const closeModal = () => {
    setOpenedModal(false);
  };

  const openModal = () => {
    setOpenedModal(true);
  };

  const openModalWithContragent = (contragent: Contragent) => {
    setCurrentContragent({ ...contragent });
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
    addContragent(contragent);
  };

  const handleUpdateContragent = (contragent: Contragent) => {
    updateContragent(contragent);
  };

  const handleDeleteContragent = (contragent: Contragent) => {
    if (contragent.id) {
      removeContragent(contragent.id);
    }
  };

  return (
    <div>
      <Header openModal={setOpenedModal}></Header>
      <TableCustom
        data={contragents}
        onDeleteContragent={handleDeleteContragent}
        openModalWithContragent={openModalWithContragent}
      ></TableCustom>
      <ModalCustom
        selectedContragent={currentContragent}
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
