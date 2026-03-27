import type { Temporal } from '@js-temporal/polyfill';
import { Text } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

type SessionTimestampProps = {
  timestamp: Temporal.Instant;
};

const SessionTimestamp: FC<SessionTimestampProps> = ({ timestamp }) => {
  const { i18n } = useTranslation();

  return (
    <Text size="sm" c="dimmed">
      {new Intl.DateTimeFormat(i18n.language, { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date(timestamp.epochMilliseconds),
      )}
    </Text>
  );
};

export default SessionTimestamp;
