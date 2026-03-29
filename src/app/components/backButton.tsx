import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type BackButtonProps = {
  to?: string;
};

const BackButton: FC<BackButtonProps> = ({ to = '/' }) => {
  const navigate = useNavigate();

  return (
    <ActionIcon radius="xl" aria-label="Back" size="lg" onClick={() => navigate(to)}>
      <IconChevronLeft stroke={1.5} />
    </ActionIcon>
  );
};

export default BackButton;
