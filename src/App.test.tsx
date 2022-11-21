import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const inputTitle = screen.getByText(/YouTube Looper/i);
  expect(inputTitle).toBeInTheDocument();
});
