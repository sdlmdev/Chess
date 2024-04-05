import pawnW from '../assets/images/Chess_plt45.svg';
import pawnB from '../assets/images/Chess_pdt45.svg';
import rookW from '../assets/images/Chess_rlt45.svg';
import rookB from '../assets/images/Chess_rdt45.svg';
import knightW from '../assets/images/Chess_nlt45.svg';
import knightB from '../assets/images/Chess_ndt45.svg';
import bishopW from '../assets/images/Chess_blt45.svg';
import bishopB from '../assets/images/Chess_bdt45.svg';
import queenW from '../assets/images/Chess_qlt45.svg';
import queenB from '../assets/images/Chess_qdt45.svg';
import kingW from '../assets/images/Chess_klt45.svg';
import kingB from '../assets/images/Chess_kdt45.svg';
import { FigureNames } from '../types/types';
import {
  canMoveBishop,
  canMoveKing,
  canMoveKnight,
  canMovePawn,
  canMoveQueen,
  canMoveRook,
} from '../utils/helpers';

export const blackFiguresToReplace = [
  {
    name: FigureNames.ROOK,
    logo: rookB,
    color: 'black',
    canMove: canMoveRook,
  },
  {
    name: FigureNames.KNIGHT,
    logo: knightB,
    color: 'black',
    canMove: canMoveKnight,
  },
  {
    name: FigureNames.BISHOP,
    logo: bishopB,
    color: 'black',
    canMove: canMoveBishop,
  },
  {
    name: FigureNames.QUEEN,
    logo: queenB,
    color: 'black',
    canMove: canMoveQueen,
  },
];

export const whiteFiguresToReplace = [
  {
    name: FigureNames.ROOK,
    logo: rookW,
    color: 'white',
    canMove: canMoveRook,
  },
  {
    name: FigureNames.KNIGHT,
    logo: knightW,
    color: 'white',
    canMove: canMoveKnight,
  },
  {
    name: FigureNames.BISHOP,
    logo: bishopW,
    color: 'white',
    canMove: canMoveBishop,
  },
  {
    name: FigureNames.QUEEN,
    logo: queenW,
    color: 'white',
    canMove: canMoveQueen,
  },
];

export const figures = [
  {
    name: FigureNames.PAWN,
    logo: pawnW,
    startPosition: [6, 0],
    color: 'white',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnW,
    startPosition: [6, 1],
    color: 'white',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnW,
    startPosition: [6, 2],
    color: 'white',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnW,
    startPosition: [6, 3],
    color: 'white',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnW,
    startPosition: [6, 4],
    color: 'white',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnW,
    startPosition: [6, 5],
    color: 'white',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnW,
    startPosition: [6, 6],
    color: 'white',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnW,
    startPosition: [6, 7],
    color: 'white',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.ROOK,
    logo: rookW,
    startPosition: [7, 0],
    color: 'white',
    canMove: canMoveRook,
  },
  {
    name: FigureNames.ROOK,
    logo: rookW,
    startPosition: [7, 7],
    color: 'white',
    canMove: canMoveRook,
  },
  {
    name: FigureNames.KNIGHT,
    logo: knightW,
    startPosition: [7, 1],
    color: 'white',
    canMove: canMoveKnight,
  },
  {
    name: FigureNames.KNIGHT,
    logo: knightW,
    startPosition: [7, 6],
    color: 'white',
    canMove: canMoveKnight,
  },
  {
    name: FigureNames.BISHOP,
    logo: bishopW,
    startPosition: [7, 2],
    color: 'white',
    canMove: canMoveBishop,
  },
  {
    name: FigureNames.BISHOP,
    logo: bishopW,
    startPosition: [7, 5],
    color: 'white',
    canMove: canMoveBishop,
  },
  {
    name: FigureNames.QUEEN,
    logo: queenW,
    startPosition: [7, 3],
    color: 'white',
    canMove: canMoveQueen,
  },
  {
    name: FigureNames.KING,
    logo: kingW,
    startPosition: [7, 4],
    color: 'white',
    canMove: canMoveKing,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnB,
    startPosition: [1, 0],
    color: 'black',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnB,
    startPosition: [1, 1],
    color: 'black',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnB,
    startPosition: [1, 2],
    color: 'black',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnB,
    startPosition: [1, 3],
    color: 'black',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnB,
    startPosition: [1, 4],
    color: 'black',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnB,
    startPosition: [1, 5],
    color: 'black',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnB,
    startPosition: [1, 6],
    color: 'black',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.PAWN,
    logo: pawnB,
    startPosition: [1, 7],
    color: 'black',
    canMove: canMovePawn,
  },
  {
    name: FigureNames.ROOK,
    logo: rookB,
    startPosition: [0, 0],
    color: 'black',
    canMove: canMoveRook,
  },
  {
    name: FigureNames.ROOK,
    logo: rookB,
    startPosition: [0, 7],
    color: 'black',
    canMove: canMoveRook,
  },
  {
    name: FigureNames.KNIGHT,
    logo: knightB,
    startPosition: [0, 1],
    color: 'black',
    canMove: canMoveKnight,
  },
  {
    name: FigureNames.KNIGHT,
    logo: knightB,
    startPosition: [0, 6],
    color: 'black',
    canMove: canMoveKnight,
  },
  {
    name: FigureNames.BISHOP,
    logo: bishopB,
    startPosition: [0, 2],
    color: 'black',
    canMove: canMoveBishop,
  },
  {
    name: FigureNames.BISHOP,
    logo: bishopB,
    startPosition: [0, 5],
    color: 'black',
    canMove: canMoveBishop,
  },
  {
    name: FigureNames.QUEEN,
    logo: queenB,
    startPosition: [0, 3],
    color: 'black',
    canMove: canMoveQueen,
  },
  {
    name: FigureNames.KING,
    logo: kingB,
    startPosition: [0, 4],
    color: 'black',
    canMove: canMoveKing,
  },
];

export const WHITE_START_LINE = 7;
export const BLACK_START_LINE = 0;
