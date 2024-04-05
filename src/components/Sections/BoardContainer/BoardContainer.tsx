import { FC } from 'react';
import Board from '../../Board/Board';
import ReplacementArea from '../../ReplacementArea/ReplacementArea';
import { curPlayer, FigureItem } from '../../../types/types';
import '../Sections.css';
import './BoardContainer.css';

interface BoardContainerProps {
  curPlayer: curPlayer;
  whiteLostFigures: FigureItem[] | null;
  setWhiteLostFigures: (whiteLostFigures: FigureItem[] | null) => void;
  blackLostFigures: FigureItem[] | null;
  setBlackLostFigures: (blackLostFigures: FigureItem[] | null) => void;
  isRestart: boolean;
  isReplacePawn: boolean;
  setIsReplacePawn: (isReplacePawn: boolean) => void;
  replacementFigure: FigureItem | null;
  setReplacementFigure: (replacementFigure: FigureItem | null) => void;
  popupData: string | JSX.Element;
  isBlockBoard: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  checkUnprotectedKing: (kingStatus: boolean) => void;
  swapPlayer: () => void;
}

const BoardContainer: FC<BoardContainerProps> = ({
  curPlayer,
  whiteLostFigures,
  setWhiteLostFigures,
  blackLostFigures,
  setBlackLostFigures,
  isRestart,
  isReplacePawn,
  setIsReplacePawn,
  replacementFigure,
  setReplacementFigure,
  isBlockBoard,
  setIsPlaying,
  checkUnprotectedKing,
  swapPlayer,
}) => {
  return (
    <section className="board-section">
      <ReplacementArea
        playerColor={curPlayer}
        isReplacePawn={isReplacePawn}
        setIsReplacePawn={setIsReplacePawn}
        setReplacementFigure={setReplacementFigure}
      />
      <Board
        swapPlayer={swapPlayer}
        curPlayer={curPlayer}
        setBlackLostFigures={setBlackLostFigures}
        setWhiteLostFigures={setWhiteLostFigures}
        whiteLostFigures={whiteLostFigures}
        blackLostFigures={blackLostFigures}
        isRestart={isRestart}
        isReplacePawn={isReplacePawn}
        setIsReplacePawn={setIsReplacePawn}
        replacementFigure={replacementFigure}
        setReplacementFigure={setReplacementFigure}
        checkUnprotectedKing={checkUnprotectedKing}
        isBlockBoard={isBlockBoard}
        setIsPlaying={setIsPlaying}
      />
    </section>
  );
};

export default BoardContainer;
