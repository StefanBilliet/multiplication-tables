import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import renderComponent from '../../../shared/testing/renderComponent.tsx';
import BackButton from '../../components/backButton.tsx';

test('GIVEN the BackButton is rendered, WHEN it is clicked, THEN it navigates to the home page', async () => {
  const { user } = renderComponent(
    <MemoryRouter initialEntries={['/practice-history']}>
      <Routes>
        <Route path="/" element={<div>Home screen</div>} />
        <Route path="/practice-history" element={<BackButton />} />
      </Routes>
    </MemoryRouter>,
  );

  await user.click(screen.getByRole('button', { name: 'Back' }));

  expect(screen.getByText('Home screen')).toBeVisible();
});
