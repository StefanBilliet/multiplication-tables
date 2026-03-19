import { Button } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackToTablesButton: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button size="md" variant="default" onClick={() => navigate("/")}>
      {t("practiceSession.backToTablesButton")}
    </Button>
  );
};

export default BackToTablesButton;
