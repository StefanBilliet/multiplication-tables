import { Button } from "@mantine/core";
import type { FC } from "react";

type ContinueButtonProps = {
  onClick: () => void;
};

const ContinueButton: FC<ContinueButtonProps> = ({ onClick }) => (
  <Button variant="default" size="md" onClick={onClick}>
    Continue
  </Button>
);

export default ContinueButton;
