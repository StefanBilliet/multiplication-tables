import { ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsButton: FC = () => {
  const navigate = useNavigate();

  return (
    <ActionIcon radius="xl" aria-label="Settings" size="lg" onClick={() => navigate('/settings')}>
      <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
};

export default SettingsButton;
