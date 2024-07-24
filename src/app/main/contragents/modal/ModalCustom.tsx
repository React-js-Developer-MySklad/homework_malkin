import React, { useEffect, useState } from 'react';
import { FormCell } from './FormCell';
import { Button, Modal } from 'flowbite-react';
import { Contragent } from '../../../types';

interface Props {
  selectedContragent: Contragent | undefined;
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
    props.onSave({
      id: id,
      name: name,
      itn: itn,
      address: address,
      trrc: trrc,
    });
  };

  return (
    <>
      <Modal
        position={'center'}
        show={props.opened}
        size="2xl"
        onClose={props.closeModal}
      >
        <Modal.Header className="text-lg">Контрагент</Modal.Header>
        <Modal.Body>
          <div className="flex flex-row flex-wrap">
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
          </div>
          <div className="px-2 py-3 flex flex-row space-x-3">
            <Button
              className="mx-3"
              color="blue"
              size={'md'}
              onClick={onSaveClick}
            >
              Сохранить
            </Button>
            <Button
              className="mx-3"
              color="blue"
              size={'md'}
              onClick={props.closeModal}
            >
              Отменить
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
