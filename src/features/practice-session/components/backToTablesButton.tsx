import { Button } from "@mantine/core";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const BackToTablesButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Button size="md" variant="default" onClick={() => navigate("/")}>
      Back to tables
    </Button>
  );
};

export default BackToTablesButton;
