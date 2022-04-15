import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

const MockedHeader = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

it('shows title', () => {
  render(<MockedHeader />);
  const title = screen.getByRole('heading', { name: /Covid Watch/i });
  expect(title).toBeVisible();
});
