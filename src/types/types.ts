export enum FigureNames {
  PAWN = 'Пешка',
  ROOK = 'Ладья',
  KNIGHT = 'Конь',
  BISHOP = 'Слон',
  QUEEN = 'Ферзь',
  KING = 'Король',
  FIGURE = 'Фигура',
}

export type curPlayer = 'white' | 'black';

export interface BoardCell {
  isAvailable: boolean;
  position: number[];
  figure: FigureItem | null;
}

export interface FigureProps {
  logo: string | undefined;
  name: string;
}

export interface FigureItem {
  isCastling?: boolean;
  name: FigureNames;
  logo: string;
  color: string;
  canMove: (
    cell: BoardCell,
    selectedCell: BoardCell,
    board: any[][]
  ) => boolean;
  isFirstStep?: boolean;
}

export interface CellProps {
  selectedCell?: BoardCell | null;
  x: number;
  y: number;
  figure?: FigureItem | null;
  isAvailable?: boolean;
  id: string;
  onClick?: (cell: BoardCell) => void;
  isSelected?: boolean;
  isWhiteKingUnderAttack?: boolean;
  isBlackKingUnderAttack?: boolean;
}
