import { BoardCell } from '../types/types';

export const canMove = (cell: BoardCell, selectedCell: BoardCell) => {
  if (cell.figure?.color === selectedCell.figure?.color) {
    return false;
  }

  return true;
};

export const isEmptyVertical = (
  targetX: number,
  targetY: number,
  cellX: number,
  cellY: number,
  board: any[][]
): boolean => {
  if (targetY !== cellY) return false;

  const min = Math.min(cellX, targetX);
  const max = Math.max(cellX, targetX);

  for (let i = min + 1; i < max; i++) {
    if (board[i][cellY].figure) {
      return false;
    }
  }

  return true;
};

export const isEmptyHorizontal = (
  targetX: number,
  targetY: number,
  cellX: number,
  cellY: number,
  board: any[][]
): boolean => {
  if (targetX !== cellX) return false;

  const min = Math.min(cellY, targetY);
  const max = Math.max(cellY, targetY);

  for (let i = min + 1; i < max; i++) {
    if (board[cellX][i].figure) {
      return false;
    }
  }

  return true;
};

export const isEmptyDiagonal = (
  targetX: number,
  targetY: number,
  cellX: number,
  cellY: number,
  board: any[][]
): boolean => {
  const x = Math.abs(targetX - cellX);
  const y = Math.abs(targetY - cellY);

  if (x !== y) return false;

  const dx = targetX > cellX ? 1 : -1;
  const dy = targetY > cellY ? 1 : -1;

  for (let i = 1; i < x; i++) {
    if (board[cellX + i * dx][cellY + i * dy].figure) {
      return false;
    }
  }

  return true;
};

export const canMoveQueen = (
  cell: BoardCell,
  selectedCell: BoardCell,
  board: any[][]
) => {
  if (!canMove(cell, selectedCell)) {
    return false;
  }

  if (
    cell &&
    isEmptyVertical(
      cell.position[0],
      cell.position[1],
      selectedCell.position[0],
      selectedCell.position[1],
      board
    )
  ) {
    return true;
  }

  if (
    cell &&
    isEmptyHorizontal(
      cell.position[0],
      cell.position[1],
      selectedCell.position[0],
      selectedCell.position[1],
      board
    )
  ) {
    return true;
  }

  if (
    cell &&
    isEmptyDiagonal(
      cell.position[0],
      cell.position[1],
      selectedCell.position[0],
      selectedCell.position[1],
      board
    )
  ) {
    return true;
  }

  return false;
};

export const canMoveRook = (
  cell: BoardCell,
  selectedCell: BoardCell,
  board: any[][]
) => {
  if (!canMove(cell, selectedCell)) {
    return false;
  }

  if (
    cell &&
    isEmptyVertical(
      cell.position[0],
      cell.position[1],
      selectedCell.position[0],
      selectedCell.position[1],
      board
    )
  ) {
    return true;
  }

  if (
    cell &&
    isEmptyHorizontal(
      cell.position[0],
      cell.position[1],
      selectedCell.position[0],
      selectedCell.position[1],
      board
    )
  ) {
    return true;
  }

  return false;
};

export const canMoveBishop = (
  cell: BoardCell,
  selectedCell: BoardCell,
  board: any[][]
) => {
  if (!canMove(cell, selectedCell)) {
    return false;
  }

  if (
    cell &&
    isEmptyDiagonal(
      cell.position[0],
      cell.position[1],
      selectedCell.position[0],
      selectedCell.position[1],
      board
    )
  ) {
    return true;
  }

  return false;
};

export const canMoveKnight = (cell: BoardCell, selectedCell: BoardCell) => {
  if (!canMove(cell, selectedCell)) {
    return false;
  }

  const dx = Math.abs(selectedCell.position[0] - cell.position[0]);
  const dy = Math.abs(selectedCell.position[1] - cell.position[1]);

  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
};

export const canMoveKing = (cell: BoardCell, selectedCell: BoardCell) => {
  if (!canMove(cell, selectedCell)) {
    return false;
  }

  const dx = Math.abs(selectedCell.position[0] - cell.position[0]);
  const dy = Math.abs(selectedCell.position[1] - cell.position[1]);

  return dx <= 1 && dy <= 1;
};

export const canMovePawn = (cell: BoardCell, selectedCell: BoardCell) => {
  if (!canMove(cell, selectedCell)) {
    return false;
  }

  const direction = selectedCell.figure?.color === 'white' ? -1 : 1;
  const dx = cell.position[0] - selectedCell.position[0];
  const dy = Math.abs(cell.position[1] - selectedCell.position[1]);

  if (dx === direction && dy === 0 && !cell.figure) {
    return true;
  }

  if (
    dx === direction &&
    dy === 1 &&
    cell.figure &&
    cell.figure.color !== selectedCell.figure?.color
  ) {
    return true;
  }

  if (
    dx === 2 * direction &&
    dy === 0 &&
    selectedCell.figure?.isFirstStep &&
    !cell.figure
  ) {
    return true;
  }

  return false;
};
