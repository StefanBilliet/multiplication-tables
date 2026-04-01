import { SimpleGrid } from '@mantine/core';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiplicationTableCard from './multiplicationTableCard.tsx';
import type { MultiplicationTable } from './useMultiplicationTables.tsx';

interface PracticeSectionProps {
  tables: MultiplicationTable[];
}

export const PracticeSection: FC<PracticeSectionProps> = ({ tables }: PracticeSectionProps) => {
  const navigate = useNavigate();
  const handleTableSelected = (tableId: number) => {
    navigate(`/tables/${tableId}/practice`);
  };

  return (
    <SimpleGrid component="section" cols={{ base: 1, sm: 2, md: 3 }}>
      {tables.map((table) => (
        <MultiplicationTableCard key={table.id} table={table} onSelect={handleTableSelected} />
      ))}
    </SimpleGrid>
  );
};
