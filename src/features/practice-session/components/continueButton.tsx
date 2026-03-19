import { Button } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type ContinueButtonProps = {
  onClick: () => void;
};

const ContinueButton: FC<ContinueButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Button variant="default" size="md" onClick={onClick}>
      {t("practiceSession.continueButton")}
    </Button>
  );
};

export default ContinueButton;
