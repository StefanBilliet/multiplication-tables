import { Temporal } from '@js-temporal/polyfill';
import testI18n from '../../../shared/testing/i18n';
import renderComponent from '../../../shared/testing/renderComponent';
import SessionTimestamp from '../../components/sessionTimestamp.tsx';

test('GIVEN the Dutch locale is active WHEN a timestamp is rendered THEN it shows a localized date and time', async () => {
  await testI18n.changeLanguage('nl');

  const sut = <SessionTimestamp timestamp={Temporal.Instant.from('2026-03-01T12:00:00Z')} />;

  const { getByText } = renderComponent(sut);

  expect(
    getByText(
      new Intl.DateTimeFormat('nl', { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date('2026-03-01T12:00:00Z'),
      ),
    ),
  ).toBeVisible();
});
