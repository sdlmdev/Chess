import { useState, useEffect, FC } from 'react';
import './Board.css';
import Cell from '../Cell/Cell';
import {
  figures,
  BLACK_START_LINE,
  WHITE_START_LINE,
} from '../../constants/constants';
import { BoardCell, FigureNames, FigureItem } from '../../types/types';

interface BoardProps {
  swapPlayer: () => void;
  curPlayer: string;
  setWhiteLostFigures: (figures: FigureItem[]) => void;
  setBlackLostFigures: (figures: FigureItem[]) => void;
  whiteLostFigures: FigureItem[] | null;
  blackLostFigures: FigureItem[] | null;
  isRestart: boolean;
  isReplacePawn: boolean;
  setIsReplacePawn: (isReplacePawn: boolean) => void;
  replacementFigure: FigureItem | null;
  setReplacementFigure: (replacementFigure: FigureItem | null) => void;
  checkUnprotectedKing: (kingStatus: boolean) => void;
  isBlockBoard: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const Board: FC<BoardProps> = ({
  swapPlayer,
  curPlayer,
  setWhiteLostFigures,
  setBlackLostFigures,
  whiteLostFigures,
  blackLostFigures,
  isRestart,
  isReplacePawn,
  setIsReplacePawn,
  replacementFigure,
  setReplacementFigure,
  checkUnprotectedKing,
  isBlockBoard,
  setIsPlaying,
}) => {
  const [board, setBoard] = useState(
    Array(8)
      .fill(null)
      .map(() => Array(8).fill(null))
  );
  const [selectedCell, setSelectedCell] = useState<BoardCell | null>(null);
  const [isWhiteKingUnderAttack, setIsWhiteKingUnderAttack] = useState<boolean>(false);
  const [isBlackKingUnderAttack, setIsBlackKingUnderAttack] = useState<boolean>(false);
  const [whiteKing, setWhiteKing] = useState<BoardCell | null>(null);
  const [blackKing, setBlackKing] = useState<BoardCell | null>(null);
  const [isCheckKingsStatus, setIsCheckKingsStatus] = useState<boolean>(false);

  const clearAvailableCells = () => {
    const newBoard = [...board];

    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        newBoard[i][j].isAvailable = false;
      }
    }

    setBoard(newBoard);
  };

  const onCellClick = (cell: BoardCell) => {
    if (cell.figure) {
      if (
        cell.position[0] === selectedCell?.position[0] &&
        cell.position[1] === selectedCell?.position[1]
      ) {
        setSelectedCell(null);
        clearAvailableCells();
      } else {
        if (cell.figure.color === curPlayer) {
          setSelectedCell(cell);
        }
      }
    }

    if (selectedCell) {
      if (
        selectedCell.figure?.name === FigureNames.KING &&
        cell.figure?.name === FigureNames.ROOK
      ) {
        castling(cell);
      } else {
        moveFigure(cell);
      }
    }
  };

  const fillBoard = () => {
    const initialBoard = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    figures.forEach((figure) => {
      const [x, y] = figure.startPosition;

      initialBoard[x][y] = {
        figure: {
          logo: figure.logo,
          name: figure.name,
          color: figure.color,
          canMove: figure.canMove,
        },
        isAvailable: false,
        position: [x, y],
      };

      if (
        figure.name === FigureNames.PAWN ||
        figure.name === FigureNames.KING ||
        figure.name === FigureNames.ROOK
      ) {
        initialBoard[x][y].figure.isFirstStep = true;
      }

      if (figure.name === FigureNames.ROOK) {
        initialBoard[x][y].figure.isCastling = false;
      }
    });

    initialBoard.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (!cell) {
          initialBoard[x][y] = {
            isAvailable: false,
            position: [x, y],
          };
        }
      });
    });

    setBoard(initialBoard);
  };

  const checkPawnForReplace = (cell: BoardCell, figure: FigureItem) => {
    if (figure?.name === FigureNames.PAWN) {
      if (
        (figure.color === 'white' && cell.position[0] === BLACK_START_LINE) ||
        (figure.color === 'black' && cell.position[0] === WHITE_START_LINE)
      ) {
        setIsReplacePawn(true);
      }
    }
  };

  const replacePawn = (figureForReplace: FigureItem) => {
    const newBoard = [...board];
    const lineForReplcae =
      figureForReplace.color === 'white' ? BLACK_START_LINE : WHITE_START_LINE;
    const newLine = newBoard[lineForReplcae].map((cell) => {
      if (cell.figure?.name === FigureNames.PAWN) {
        return {
          figure: figureForReplace,
          isAvailable: false,
          position: [cell.position[0], cell.position[1]],
        };
      }

      return cell;
    });

    newBoard[lineForReplcae] = newLine;
    setBoard(newBoard);
  };

  const updateKingsPosition = () => {
    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell && cell.figure?.name === FigureNames.KING) {
          if (cell.figure.color === 'white') {
            setWhiteKing(board[x][y]);
          } else {
            setBlackKing(board[x][y]);
          }
        }
      });
    });
  };

  const checkIsKingUnderAttack = () => {
    let isWhiteKingUnderAttack = false;
    let isBlackKingUnderAttack = false;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const cell = board[i][j];

        if (cell && cell.figure) {
          if (
            whiteKing &&
            whiteKing.figure &&
            cell.figure.canMove(whiteKing, cell, board)
          ) {
            isWhiteKingUnderAttack = true;
          }

          if (
            blackKing &&
            blackKing.figure &&
            cell.figure.canMove(blackKing, cell, board)
          ) {
            isBlackKingUnderAttack = true;
          }
        }
      }
    }

    setIsWhiteKingUnderAttack(isWhiteKingUnderAttack);
    setIsBlackKingUnderAttack(isBlackKingUnderAttack);
    setIsCheckKingsStatus(true);
  };

  const castling = (cell: BoardCell) => {
    if (
      selectedCell &&
      selectedCell.figure?.name === FigureNames.KING &&
      cell.figure?.name === FigureNames.ROOK
    ) {
      if (cell.figure.isFirstStep
        && selectedCell.figure.isFirstStep
        && cell.figure.isCastling
      ) {
        const newBoard = [...board];
        const [kingX, kingY] = selectedCell.position;
        const [rookX, rookY] = cell.position;
  
        if (rookY > kingY) {
          newBoard[kingX][kingY + 2] = newBoard[kingX][kingY];
          newBoard[kingX][kingY] = {
            isAvailable: false,
            position: [kingX, kingY],
          };
          newBoard[kingX][kingY + 1] = newBoard[rookX][rookY];
          newBoard[rookX][rookY] = {
            isAvailable: false,
            position: [rookX, rookY],
          };
  
          newBoard[kingX][kingY + 2].figure.isFirstStep = false;
          newBoard[kingX][kingY + 1].figure.isFirstStep = false;
          newBoard[kingX][kingY + 1].figure.isCastling = false;
        } else {
          newBoard[kingX][kingY - 2] = newBoard[kingX][kingY];
          newBoard[kingX][kingY] = {
            isAvailable: false,
            position: [kingX, kingY],
          };
          newBoard[kingX][kingY - 1] = newBoard[rookX][rookY];
          newBoard[rookX][rookY] = {
            isAvailable: false,
            position: [rookX, rookY],
          };
  
          newBoard[kingX][kingY - 2].figure.isFirstStep = false;
          newBoard[kingX][kingY - 1].figure.isFirstStep = false;
          newBoard[kingX][kingY - 1].figure.isCastling = false;
        }
  
        setBoard(newBoard);
        setSelectedCell(null);
        swapPlayer();
        clearAvailableCells();
      }
    }
  };

  const moveFigure = (cell: BoardCell) => {
    if (
      selectedCell &&
      selectedCell.position[0] !== undefined &&
      selectedCell.position[1] !== undefined &&
      selectedCell.figure?.canMove(cell, selectedCell, board)
    ) {
      checkPawnForReplace(cell, selectedCell.figure);

      const newBoard = [...board];
      const newCell = {
        figure: selectedCell.figure,
        isAvailable: false,
        position: [cell.position[0], cell.position[1]],
      };

      if (
        newCell.figure.name === FigureNames.PAWN ||
        newCell.figure.name === FigureNames.KING ||
        newCell.figure.name === FigureNames.ROOK
      ) {
        newCell.figure.isFirstStep = false;
      }

      if (newCell.figure.name === FigureNames.KING) {
        if (newCell.figure.color === 'white') {
          setWhiteKing(newCell);
        } else {
          setBlackKing(newCell);
        }
      }

      if (cell.figure) {
        if (cell.figure.color === 'white') {
          setWhiteLostFigures(
            whiteLostFigures
              ? [...whiteLostFigures, cell.figure]
              : [cell.figure]
          );
        } else {
          setBlackLostFigures(
            blackLostFigures
              ? [...blackLostFigures, cell.figure]
              : [cell.figure]
          );
        }
      }

      newBoard[selectedCell.position[0]][selectedCell.position[1]] = {
        isAvailable: false,
        position: [selectedCell.position[0], selectedCell.position[1]],
      };
      newBoard[cell.position[0]][cell.position[1]] = newCell;

      setBoard(newBoard);
      setSelectedCell(null);
      swapPlayer();
      clearAvailableCells();
    }
  };

  const isCanCastling = () => {
    const castlingOptions = {
      whiteShort: false,
      whiteLong: false,
      blackShort: false,
      blackLong: false,
    };

    if (selectedCell?.figure?.name === FigureNames.KING) {
      if (selectedCell.figure.isFirstStep) {
        const row = selectedCell.position[0];

        if (selectedCell.figure.color === 'white') {
          if (
            board[row][7].figure?.name === FigureNames.ROOK &&
            board[row][7].figure?.isFirstStep &&
            !board[row][5].figure &&
            !board[row][6].figure
          ) {
            castlingOptions.whiteShort = true;
          }

          if (
            board[row][0].figure?.name === FigureNames.ROOK &&
            board[row][0].figure?.isFirstStep &&
            !board[row][1].figure &&
            !board[row][2].figure &&
            !board[row][3].figure
          ) {
            castlingOptions.whiteLong = true;
          }
        } else {
          if (
            board[row][7].figure?.name === FigureNames.ROOK &&
            board[row][7].figure?.isFirstStep &&
            !board[row][5].figure &&
            !board[row][6].figure
          ) {
            castlingOptions.blackShort = true;
          }

          if (
            board[row][0].figure?.name === FigureNames.ROOK &&
            board[row][0].figure?.isFirstStep &&
            !board[row][1].figure &&
            !board[row][2].figure &&
            !board[row][3].figure
          ) {
            castlingOptions.blackLong = true;
          }
        }
      }
    }

    return castlingOptions;
  };

  const checkCellsToMove = () => {
    if (selectedCell && selectedCell.figure) {
      const newBoard = [...board];

      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          const cell = newBoard[i][j];

          cell.isAvailable = selectedCell.figure?.canMove(
            cell,
            selectedCell,
            board
          );
        }
      }

      if (selectedCell.figure.name === FigureNames.KING) {
        const castlingOptions = isCanCastling();

        if (castlingOptions.whiteShort) {
          newBoard[7][7].figure.isCastling = true;
        }

        if (castlingOptions.whiteLong) {
          newBoard[7][0].figure.isCastling = true;
        }

        if (castlingOptions.blackShort) {
          newBoard[0][7].figure.isCastling = true;
        }

        if (castlingOptions.blackLong) {
          newBoard[0][0].figure.isCastling = true;
        }
      }

      setBoard(newBoard);
    }
  };

  useEffect(() => {
    fillBoard();
    setSelectedCell(null);
  }, [isRestart]);

  useEffect(() => {
    checkCellsToMove();

    if (selectedCell) {
      setIsPlaying(true);
    }
  }, [selectedCell]);

  useEffect(() => {
    if (replacementFigure) {
      replacePawn(replacementFigure);
      setReplacementFigure(null);
    }
  }, [replacementFigure]);

  useEffect(() => {
    updateKingsPosition();
  }, [board]);

  useEffect(() => {
    checkIsKingUnderAttack();
  }, [selectedCell, board, curPlayer]);

  useEffect(() => {
    checkUnprotectedKing(
      curPlayer === 'white' ? isBlackKingUnderAttack : isWhiteKingUnderAttack
    );
    setIsCheckKingsStatus(false);
  }, [isCheckKingsStatus]);

  return (
    <div className="board-container">
      <div className="board-container_type_row">
        <div className="board-numbers">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="board-numbers__item">
                {8 - i}
              </div>
            ))}
        </div>
        <div className="board">
          <div
            className={`board__overlay${isReplacePawn || isBlockBoard ? ' board_blocked' : ''}`}
          />
          {board.map((row, x) =>
            row.map((cell, y) => (
              <Cell
                selectedCell={selectedCell}
                key={`${x}-${y}`}
                x={x}
                y={y}
                figure={cell && cell.figure ? cell.figure : null}
                id={`${x}-${y}`}
                onClick={onCellClick}
                isSelected={
                  selectedCell
                    ? selectedCell.position[0] === x &&
                      selectedCell.position[1] === y
                    : false
                }
                isAvailable={board[x][y]?.isAvailable || false}
                isWhiteKingUnderAttack={isWhiteKingUnderAttack}
                isBlackKingUnderAttack={isBlackKingUnderAttack}
              />
            ))
          )}
        </div>
      </div>
      <div className="board-letters">
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="board-letters__item">
              {String.fromCharCode(65 + i)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Board;
