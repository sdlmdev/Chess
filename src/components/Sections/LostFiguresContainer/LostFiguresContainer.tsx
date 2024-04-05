import { FC } from 'react';
import '../Sections.css';
import './LostFiguresContainer.css';
import LostFigures from '../../LostFigures/LostFigures';
import { FigureItem } from '../../../types/types';

interface LostFiguresContainerProps {
  whiteLostFigures: FigureItem[] | null;
  blackLostFigures: FigureItem[] | null;
  isOpenLostFigures: boolean;
  handleCickLostFigures: () => void;
}

const LostFiguresContainer: FC<LostFiguresContainerProps> = ({
  whiteLostFigures,
  blackLostFigures,
  isOpenLostFigures,
  handleCickLostFigures,
}) => {
  return (
    <section
      className={`lost-figures-section scrollbar${
        isOpenLostFigures ? ' lost-figures-section_open' : ''
      }`}
    >
      <div
        className="lost-figures-section__label"
        onClick={handleCickLostFigures}
      >
        <div className="label-line" />
        <div className="label-line" />
      </div>
      <div className="lost-figures-section__figures scrollbar">
        <LostFigures
          figures={whiteLostFigures}
          title="Потерянные белые  фигуры"
        />
        <LostFigures
          figures={blackLostFigures}
          title="Потерянные черные фигуры"
        />
      </div>
    </section>
  );
};

export default LostFiguresContainer;
