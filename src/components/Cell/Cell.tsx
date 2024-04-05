import { FC } from 'react';
import './Cell.css';
import Figure from '../Figure/Figure';
import { CellProps, FigureNames } from '../../types/types';

const Cell: FC<CellProps> = ({
  x,
  y,
  selectedCell,
  figure = null,
  isAvailable = false,
  id,
  onClick,
  isSelected = false,
  isBlackKingUnderAttack = false,
  isWhiteKingUnderAttack = false,
}) => {
  const isBlack = (x + y) % 2 === 1;
  const isCurCell =
    selectedCell?.position[0] === x && selectedCell?.position[1] === y;
  const isKingUnderAttac =
    figure?.name === FigureNames.KING &&
    (figure.color === 'white'
      ? isWhiteKingUnderAttack
      : isBlackKingUnderAttack);

  return (
    <div
      className={`cell${
        isBlack ? ' cell_type_black' : ' cell_type_white'
      }${isSelected ? ' cell_selected' : ''}${
        (isAvailable && !figure) ||
        (figure &&
          selectedCell?.figure?.color === figure.color &&
          selectedCell?.figure?.name === FigureNames.KING &&
          figure?.name === FigureNames.ROOK &&
          figure?.isCastling)
          ? ' cell_available'
          : ''
      }${
        ((isAvailable && figure) || isKingUnderAttac) &&
        !isCurCell &&
        selectedCell?.figure?.color !== figure.color
          ? ' cell_attack'
          : ''
      }`}
      id={id}
      onClick={() =>
        onClick?.({
          figure,
          isAvailable,
          position: [x, y],
        })
      }
    >
      {figure && <Figure logo={figure.logo} name={figure.name} />}
    </div>
  );
};

export default Cell;
