import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';

const MALFORMED_LEADING_SEPARATOR_PATHS = [
  '//safe-target',
  '\\\\safe-target',
  '/\\safe-target',
  '\\/safe-target',
] as const;

const NavigateToFixture = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(to);
  }

  return <button onClick={handleNavigate}>Navigate</button>;
};

describe('GHSA-wrjc-x8rr-h8h6 regression', () => {
  it.each(MALFORMED_LEADING_SEPARATOR_PATHS)(
    'normalizes %s as an internal route',
    async (to) => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/home']}>
          <Routes>
            <Route path="home" element={<NavigateToFixture to={to} />} />
            <Route path="safe-target" element={<span>Safe target</span>} />
          </Routes>
        </MemoryRouter>,
      );

      await user.click(screen.getByRole('button', { name: 'Navigate' }));

      expect(screen.getByText('Safe target')).toBeInTheDocument();
    },
  );
});
