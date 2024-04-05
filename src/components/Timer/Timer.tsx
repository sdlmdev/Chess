import { FC, useState, useEffect, useRef } from 'react';
import './Timer.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

interface TimerProps {
  curPlayer: string;
  isRestart: boolean;
  openPopup: (data: string | JSX.Element) => void;
  setIsBlockBoard: (isBlockBoard: boolean) => void;
  isPlaying: boolean;
  changeGameStatus: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const Timer: FC<TimerProps> = ({
  curPlayer,
  isRestart,
  openPopup,
  setIsBlockBoard,
  isPlaying,
  changeGameStatus,
  setIsPlaying,
}) => {
  const [time, setTime] = useState(300);
  const [blackTime, setBlackTime] = useState(time);
  const [whiteTime, setWhiteTime] = useState(time);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const decrementTime = () => {
    if (curPlayer === 'white') {
      setWhiteTime((prev) => prev - 1);
    } else {
      setBlackTime((prev) => prev - 1);
    }
  };

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    timer.current = setInterval(decrementTime, 1000);
  };

  const getEndTimeBlock = (playerColor: string): JSX.Element => {
    return (
      <div>
        <h3>Время вышло</h3>
        <br />
        <p>Победили {playerColor}</p>
      </div>
    );
  };

  const stopGame = () => {
    setIsBlockBoard(true);

    if (timer.current) {
      clearInterval(timer.current);
    }
  };

  const setCustomeTime = (time: number) => {
    if (time < 1) time = 1;
    if (time > 100000) time = 100000;
    if (timer.current) {
      clearInterval(timer.current);
    }

    setIsPlaying(false);
    setTime(time);
    setBlackTime(time);
    setWhiteTime(time);
  };

  const handleTimerClick = () => {
    changeGameStatus();

    if (!isPlaying) {
      startTimer();
    } else {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [curPlayer]);

  useEffect(() => {
    setBlackTime(time);
    setWhiteTime(time);
  }, [isRestart]);

  useEffect(() => {
    if (blackTime <= 0) {
      openPopup(getEndTimeBlock('белые'));
      stopGame();
    }

    if (whiteTime <= 0) {
      openPopup(getEndTimeBlock('черные'));
      stopGame();
    }
  }, [blackTime, whiteTime]);

  useEffect(() => {
    if (!isPlaying) {
      if (timer.current) {
        clearInterval(timer.current);
      }
    } else {
      startTimer();
    }
  }, [isPlaying]);

  return (
    <div className="timer scrollbar">
      <div className="timer__time">
        <h3 className="timer__title">Время белых: {whiteTime}</h3>
        <h3 className="timer__title">Время черных: {blackTime}</h3>
      </div>
      <Input
        type="number"
        placeholder="Введите время"
        onChange={(e) => setCustomeTime(+e.target.value)}
      />
      <Button text="Старт/Стоп" onClick={() => handleTimerClick()} />
    </div>
  );
};

export default Timer;
