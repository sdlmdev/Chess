import { useState } from 'react';
import './App.css';
import { FigureItem, curPlayer } from './types/types.ts';
import Popup from './components/Popup/Popup.tsx';
import LostFiguresContainer from './components/Sections/LostFiguresContainer/LostFiguresContainer.tsx';
import BoardContainer from './components/Sections/BoardContainer/BoardContainer.tsx';
import MenuContainer from './components/Sections/MenuContainer/MenuContainer.tsx';

const App = () => {
  const [curPlayer, setCurPlayer] = useState<curPlayer>('white');
  const [whiteLostFigures, setWhiteLostFigures] = useState<FigureItem[] | null>(null);
  const [blackLostFigures, setBlackLostFigures] = useState<FigureItem[] | null>(null);
  const [isRestart, setIsRestart] = useState<boolean>(false);
  const [isReplacePawn, setIsReplacePawn] = useState<boolean>(false);
  const [replacementFigure, setReplacementFigure] = useState<FigureItem | null>(null);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<string | JSX.Element>('');
  const [isBlockBoard, setIsBlockBoard] = useState<boolean>(false);
  const [isOpenLostFigures, setIsOpenLostFigures] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const changeGameStatus = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCickLostFigures = () => {
    setIsOpenLostFigures(!isOpenLostFigures);
  };

  const handleCickMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const swapPlayer = () => {
    setCurPlayer(curPlayer === 'white' ? 'black' : 'white');
  };

  const closePopup = () => {
    setIsOpenPopup(false);
  };

  const restartGame = () => {
    setCurPlayer('white');
    setWhiteLostFigures(null);
    setBlackLostFigures(null);
    setIsRestart((prev) => !prev);
    setIsReplacePawn(false);
    setReplacementFigure(null);
    setIsBlockBoard(false);
    setIsPlaying(false);
  };

  const openPopup = (data: string | JSX.Element) => {
    setIsOpenPopup(true);
    setPopupData(data);
  };

  const checkUnprotectedKing = (kingStatus: boolean) => {
    if (kingStatus) {
      setIsOpenPopup(true);
      openPopup(
        <div>
          <h3>Король не был защищен</h3>
          <br />
          <p>{curPlayer === 'white' ? 'Белые' : 'Черные'} победили!</p>
        </div>
      );
      setIsBlockBoard(true);
      setIsPlaying(false);
    }
  };

  return (
    <div className="page">
      <MenuContainer
        curPlayer={curPlayer}
        isRestart={isRestart}
        openPopup={openPopup}
        setIsBlockBoard={setIsBlockBoard}
        isPlaying={isPlaying}
        changeGameStatus={changeGameStatus}
        setIsPlaying={setIsPlaying}
        isOpenMenu={isOpenMenu}
        handleCickMenu={handleCickMenu}
        restartGame={restartGame}
      />
      <BoardContainer
        curPlayer={curPlayer}
        whiteLostFigures={whiteLostFigures}
        setWhiteLostFigures={setWhiteLostFigures}
        blackLostFigures={blackLostFigures}
        setBlackLostFigures={setBlackLostFigures}
        isRestart={isRestart}
        isReplacePawn={isReplacePawn}
        setIsReplacePawn={setIsReplacePawn}
        replacementFigure={replacementFigure}
        setReplacementFigure={setReplacementFigure}
        popupData={popupData}
        isBlockBoard={isBlockBoard}
        setIsPlaying={setIsPlaying}
        checkUnprotectedKing={checkUnprotectedKing}
        swapPlayer={swapPlayer}
      />
      <LostFiguresContainer
        whiteLostFigures={whiteLostFigures}
        blackLostFigures={blackLostFigures}
        isOpenLostFigures={isOpenLostFigures}
        handleCickLostFigures={handleCickLostFigures}
      />
      <Popup
        isOpen={isOpenPopup}
        closePopup={closePopup}
        popupData={popupData}
      />
    </div>
  );
};

export default App;
