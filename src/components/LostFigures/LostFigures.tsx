import { FC } from 'react';
import './LostFigures.css';
import { FigureItem } from '../../types/types';
import Figure from '../Figure/Figure';

interface LostFiguresProps {
  figures: FigureItem[] | null;
  title: string;
}

const LostFigures: FC<LostFiguresProps> = ({ figures, title }) => {
  return (
    <div className="lost-figures">
      <h3 className="lost-figures__title">{title}</h3>
      <div className="lost-figures__items">
        {figures &&
          figures.map((figure, i) => (
            <div
              className="lost-figures__item"
              key={`${figure.color}$-{figure.name}-${i}`}
            >
              <Figure logo={figure.logo} name={figure.name} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LostFigures;
