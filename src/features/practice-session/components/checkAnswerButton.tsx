import { Button } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type CheckAnswerButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

const CheckAnswerButton: FC<CheckAnswerButtonProps> = ({
  disabled,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <Button size="md" disabled={disabled} onClick={onClick}>
      {t("practiceSession.checkAnswerButton")}
    </Button>
  );
};

export default CheckAnswerButton;
