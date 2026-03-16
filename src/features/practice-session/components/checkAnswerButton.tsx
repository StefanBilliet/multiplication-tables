import { Button } from "@mantine/core";
import type { FC } from "react";

type CheckAnswerButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

const CheckAnswerButton: FC<CheckAnswerButtonProps> = ({
  disabled,
  onClick,
}) => (
  <Button size="md" disabled={disabled} onClick={onClick}>
    Check answer
  </Button>
);

export default CheckAnswerButton;
