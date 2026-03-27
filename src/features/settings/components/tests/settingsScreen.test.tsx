import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import renderComponent from '../../../../shared/testing/renderComponent.tsx';
import SettingsScreen from '../settingsScreen.tsx';

test('GIVEN the settings screen is open, WHEN the back button is clicked, THEN the app returns to the home screen', async () => {
  const { user } = renderComponent(
    <MemoryRouter initialEntries={['/settings']}>
      <Routes>
        <Route path="/" element={<div>Home screen</div>} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </MemoryRouter>,
  );

  await user.click(screen.getByLabelText(/back/i));

  expect(screen.getByText('Home screen')).toBeVisible();
});

test('GIVEN the hesitation rule is disabled by default, WHEN the user clicks to enable it, THEN the store state updates', async () => {
  const { user } = renderComponent(
    <MemoryRouter initialEntries={['/settings']}>
      <Routes>
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </MemoryRouter>,
  );
  const hesitationOption = screen.getByRole('checkbox', {
    name: /Timer on questions/i,
  });

  await user.click(hesitationOption);

  expect(hesitationOption).toBeChecked();
});
