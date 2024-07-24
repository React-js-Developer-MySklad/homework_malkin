import React, { useEffect, useState } from 'react';
import { FormCell } from './FormCell';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import {Contragent, FormValues} from '../../../types';
import { Form } from 'react-final-form';

interface Props {
  selectedContragent: Contragent | null;
  openModal: () => void;
  closeModal: () => void;
  onSave: (contragent: Contragent) => void;
  opened: boolean;
}

export const ModalCustom: React.FC<Props> = (props) => {
  const [id, setId] = useState<number>();
  const [initialFormValues, setInitialFormValues] = useState({});

  useEffect(() => {
    const selectedContragent = props.selectedContragent;
    if (selectedContragent) {
      setId(selectedContragent.id);
      setInitialFormValues({
        name: selectedContragent.name,
        itn: selectedContragent.itn,
        address: selectedContragent.address,
        trrc: selectedContragent.trrc,
      });
    } else {
      setId(undefined);
      setInitialFormValues({});
    }
  }, [props.selectedContragent]);

  const onSaveClick = (values: FormValues) => {
    props.onSave({
      id: id,
      name: values.name,
      itn: values.itn,
      address: values.address,
      trrc: values.trrc,
    });
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.name) {
      errors.name = 'Поле должно быть заполнено';
    }
    if (!values.itn || !values.itn.match(/^\d{11}$/)) {
      errors.itn = 'Значение должно состоять из 11 цифр';
    }
    if (!values.address) {
      errors.address = 'Поле должно быть заполнено';
    }
    if (!values.trrc || !values.trrc.match(/^\d{9}$/)) {
      errors.trrc = 'Значение должно состоять из 9 цифр';
    }
    return errors;
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
            <Form
              onSubmit={onSaveClick}
              validate={validate}
              initialValues={initialFormValues}
              render={({ handleSubmit, submitting, pristine }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-row flex-wrap">
                      <FormCell
                          name="name"
                          label="Наименование"
                          placeholder="Сергей"
                      ></FormCell>
                      <FormCell
                          name="itn"
                          label="ИНН"
                          placeholder="11111"
                      ></FormCell>
                      <FormCell
                          name="address"
                          label="Адрес"
                          placeholder="ул. Колотушкина"
                      ></FormCell>
                      <FormCell
                          name="trrc"
                          label="КПП"
                          placeholder="222222"
                      ></FormCell>
                    </div>
                      <div className="px-2 py-3 flex flex-row space-x-3">
                        <Button
                            type="submit"
                            className="mx-3"
                            color="blue"
                            size={'md'}
                            disabled={submitting || pristine}
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
                  </form>
                )}
              ></Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
