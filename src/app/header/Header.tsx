import React from 'react';
import '../header/header.css';
import '../../style.css';
import 'flowbite';
import { Button } from 'flowbite-react';
import msLogo from '../images/msLogo.svg';
import addContragentIcon from '../images/addContragent.svg';

interface Props {
  openModal: (opened: boolean) => void;
}

export const Header: React.FC<Props> = (props) => (
  <header>
    <div className="header-wrapper flex flex-wrap gap-2">
      <span className="header-item ms-logo">
        <img src={msLogo} alt={'msLogo'}></img>
      </span>
      <Button
        className="px-2"
        color="blue"
        size={'md'}
        onClick={() => props.openModal(true)}
      >
        <img src={addContragentIcon} alt={'icon'}></img>
        Добавить
      </Button>
    </div>
  </header>
);
