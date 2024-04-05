import { FC } from 'react';
import './Figure.css';
import { FigureNames, FigureProps } from '../../types/types';

const Figure: FC<FigureProps> = ({
  logo = undefined,
  name = FigureNames.FIGURE,
}) => {
  return (
    <div id={name} className="figure">
      <img src={logo} alt={name} className="figure__item" />
    </div>
  );
};

export default Figure;
