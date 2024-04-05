import { FC } from 'react';
import './ReplacementArea.css';
import {
  whiteFiguresToReplace,
  blackFiguresToReplace,
} from '../../constants/constants';
import Cell from '../Cell/Cell';
import { FigureItem } from '../../types/types';

interface ReplacementAreaProps {
  playerColor: string;
  isReplacePawn: boolean;
  setIsReplacePawn: (isReplacePawn: boolean) => void;
  setReplacementFigure: (replacementFigure: FigureItem | null) => void;
}

const ReplacementArea: FC<ReplacementAreaProps> = ({
  playerColor,
  isReplacePawn,
  setIsReplacePawn,
  setReplacementFigure,
}) => {
  const figuresToReplace =
    playerColor === 'white' ? blackFiguresToReplace : whiteFiguresToReplace;

  const handleReplacement = (figure: FigureItem) => {
    setReplacementFigure(figure);
    setIsReplacePawn(false);
  };

  return (
    <div
      className={`replacement-area${isReplacePawn ? ' replacement-area_visible' : ''}`}
    >
      {figuresToReplace.map((figure, index) => (
        <div className="replacement-area__item" key={`${-1}-${index}`}>
          <Cell
            figure={figure}
            x={-1}
            y={-1}
            id={`${-1}-${index}`}
            onClick={() => handleReplacement(figure)}
          />
        </div>
      ))}
    </div>
  );
};

export default ReplacementArea;
