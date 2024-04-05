import { FC } from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="custom-btn" onClick={() => onClick()}>
      {text}
    </button>
  );
};

export default Button;
