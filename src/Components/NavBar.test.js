import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from './NavBar';

test('navbar title displayed', () => {
  render(<NavBar />);
  const getGroundText = screen.getByText('GetGround book app');
  expect(getGroundText).toBeInTheDocument();
});
