import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/configuteStore';
import App from './App';

const todayDate = (new Date()).toISOString().split('T')[0];

global.fetch = () => Promise.resolve({
  json: () => Promise.resolve({
    dates: {
      [todayDate]: {
        countries: {
          France: {
            date: todayDate,
            id: 'france',
            name: 'France',
            regions: [
              {
                date: todayDate,
                id: 'martinique',
                name: 'Martinique',
                today_new_confirmed: 284,
                today_new_deaths: 0,
              },
            ],
            today_new_confirmed: 2356,
            today_new_deaths: 33,
          },
        },
        info: {
          date: `${todayDate} 00:00CEST`,
        },
      },
    },
    metadata: {
      by: 'Narrativa & AppliedXL',
    },
    total: {
      name: 'Total',
      today_new_confirmed: 676208,
      today_new_deaths: 3621,
    },
    updated_at: `${todayDate} 12:36UTC`,
  }),
});

const MockedApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

it('renders site title', async () => {
  render(<MockedApp />);

  const siteTitle = screen.getByText(/Covid Watch/i);
  expect(siteTitle).toBeInTheDocument();
  await act(() => Promise.resolve);
});

describe('interaction test', () => {
  it('shows countries list by default', () => {
    render(<MockedApp />);

    const countryPageTitle = screen.getByText('Stat by countries');
    const franceTile = screen.getByRole('link', { name: /france/i });

    expect(countryPageTitle).toBeInTheDocument();
    expect(franceTile).toBeInTheDocument();
  });
});
