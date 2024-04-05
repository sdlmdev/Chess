import { FC } from 'react';
import Timer from '../../Timer/Timer';
import Button from '../../UI/Button/Button';
import '../Sections.css';
import './MenuContainer.css';
import { curPlayer } from '../../../types/types';

interface MenuContainerProps {
  curPlayer: curPlayer;
  isRestart: boolean;
  openPopup: (data: string | JSX.Element) => void;
  setIsBlockBoard: (isBlockBoard: boolean) => void;
  isPlaying: boolean;
  changeGameStatus: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isOpenMenu: boolean;
  handleCickMenu: () => void;
  restartGame: () => void;
}

const MenuContainer: FC<MenuContainerProps> = ({
  curPlayer,
  isRestart,
  openPopup,
  setIsBlockBoard,
  isPlaying,
  changeGameStatus,
  setIsPlaying,
  isOpenMenu,
  handleCickMenu,
  restartGame,
}) => {
  return (
    <section
      className={`menu-section scrollbar${isOpenMenu ? ' menu-section_open' : ''}`}
    >
      <div className="menu-section__label" onClick={handleCickMenu}>
        <div className="label-line" />
        <div className="label-line" />
      </div>
      <div className="menu-section__content scrollbar">
        <Timer
          curPlayer={curPlayer}
          isRestart={isRestart}
          openPopup={openPopup}
          setIsBlockBoard={setIsBlockBoard}
          isPlaying={isPlaying}
          changeGameStatus={changeGameStatus}
          setIsPlaying={setIsPlaying}
        />
        <Button text="Обновить игру" onClick={restartGame} />
      </div>
    </section>
  );
};

export default MenuContainer;
