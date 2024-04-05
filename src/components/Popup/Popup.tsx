import { FC, useEffect, MouseEvent } from 'react';
import './Popup.css';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
  popupData: string | JSX.Element;
}

const Popup: FC<PopupProps> = ({ isOpen, closePopup, popupData }) => {
  const handleClosePopup = (e: MouseEvent) => {
    if ((e.target as Element).classList.contains('popup')) {
      closePopup();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`popup${isOpen ? ' popup_open' : ''}`}
      onClick={handleClosePopup}
    >
      <div className="popup__content">
        <button className="popup__close" onClick={() => closePopup()} />
        <div className="popup__data">{popupData}</div>
      </div>
    </div>
  );
};

export default Popup;
