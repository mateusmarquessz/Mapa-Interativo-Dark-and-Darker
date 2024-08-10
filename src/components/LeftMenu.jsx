import React from 'react';
import './LeftMenu.css';

const LeftMenu = () => {
  return (
    <div className="menu left-menu">
      <div className="logo-container">
        <img src='https://darkanddarker.wiki.spellsandguns.com/images/c/c9/Dark-and-darker-main.png' alt="Logo do Jogo" className="logo" />
      </div>
      <div className="site-name">
        Mapa Interativo Dark and Darker
      </div>
    </div>
  );
};

export default LeftMenu;
