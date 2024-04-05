import { FC } from 'react';
import './Input.css';

interface InputProps {
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ type, placeholder = '', onChange }) => {
  return (
    <input
      className="custom-input"
      type={type}
      placeholder={placeholder}
      onChange={onChange ? (e) => onChange(e) : undefined}
    />
  );
};

export default Input;
