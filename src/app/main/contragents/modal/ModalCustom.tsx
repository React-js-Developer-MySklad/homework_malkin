import React, { useEffect, useState } from 'react';
import { Contragent } from '../table/Contragent';
import { FormCell } from './FormCell';
import { Button, Modal } from 'flowbite-react';
import './contragentModal.css';

interface Props {
  selectedContragent: Contragent | null;
  openModal: () => void;
  closeModal: () => void;
  onSave: (contragent: Contragent) => void;
  opened: boolean;
}

export const ModalCustom: React.FC<Props> = (props) => {
  const [id, setId] = useState<number>();
  const [name, setName] = useState('');
  const [itn, setItn] = useState('');
  const [address, setAddress] = useState('');
  const [trrc, setTrrc] = useState('');

  useEffect(() => {
    const selectedContragent = props.selectedContragent;
    if (selectedContragent) {
      setId(selectedContragent.id);
      setName(selectedContragent.name);
      setItn(selectedContragent.itn);
      setAddress(selectedContragent.address);
      setTrrc(selectedContragent.trrc);
    } else {
      setId(undefined);
      setName('');
      setItn('');
      setAddress('');
      setTrrc('');
    }
  }, [props.selectedContragent]);

  const onSaveClick = () => {
    props.onSave(new Contragent(id, name, itn, address, trrc));
  };

  return (
    <>
      <div>
        <Modal position={"center"} className="mx-auto max-w-[460px]" show={props.opened} size="md" onClose={props.closeModal}>
          <Modal.Header className="text-lg px-5 py-5">Контрагент</Modal.Header>
          <Modal.Body>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <FormCell
                type={'text'}
                labelName={'Наименование'}
                placeholder={'Сергей'}
                propertyName={'name'}
                setProperty={setName}
                value={name}
              ></FormCell>
              <FormCell
                type={'text'}
                labelName={'ИНН'}
                placeholder={'1111'}
                propertyName={'itn'}
                setProperty={setItn}
                value={itn}
              ></FormCell>
              <FormCell
                type={'address'}
                labelName={'Адрес'}
                placeholder={'ул. Пушкина'}
                propertyName={'address'}
                setProperty={setAddress}
                value={address}
              ></FormCell>
              <FormCell
                type={'trrc'}
                labelName={'КПП'}
                placeholder={'222222'}
                propertyName={'trrc'}
                setProperty={setTrrc}
                value={trrc}
              ></FormCell>
              <div className="flex flex-row gap-3">
                <Button
                  className="px-3"
                  color="blue"
                  size={'md'}
                  onClick={onSaveClick}
                >
                  Сохранить
                </Button>
                <Button
                  className="px-3"
                  color="blue"
                  size={'md'}
                  onClick={props.closeModal}
                >
                  Отменить
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
