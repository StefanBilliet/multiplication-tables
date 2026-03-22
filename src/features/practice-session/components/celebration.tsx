import type { FC } from "react";
import ReactConfetti from "react-confetti";
import { createPortal } from "react-dom";

const CONFETTI_COLORS = ["#FFD700", "#20B2AA", "#FFA500"] as const;

const Celebration: FC = () => {
  return createPortal(
    <ReactConfetti
      recycle={false}
      numberOfPieces={200}
      tweenDuration={8000}
      gravity={0.08}
      colors={[...CONFETTI_COLORS]}
    />,
    document.body,
  );
};

export default Celebration;
