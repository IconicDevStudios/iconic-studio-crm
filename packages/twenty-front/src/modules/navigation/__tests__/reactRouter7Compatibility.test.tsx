import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

const RouteStateProbe = () => {
  const { objectNamePlural, objectRecordId } = useParams<{
    objectNamePlural: string;
    objectRecordId: string;
  }>();
  const location = useLocation();

  return (
    <>
      <span>{`${objectNamePlural}:${objectRecordId}`}</span>
      <span>{location.search}</span>
      <span>{location.hash}</span>
    </>
  );
};

const NestedRouteLayout = () => (
  <section>
    <span>Nested route layout</span>
    <Outlet />
  </section>
);

const HistoryControls = () => {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleForward() {
    navigate(1);
  }

  return (
    <>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleForward}>Forward</button>
    </>
  );
};

const RouterFixture = ({ initialIndex = 1 }: { initialIndex?: number }) => (
  <MemoryRouter
    initialEntries={[
      '/previous',
      '/objects/people/record-123?view=table#activity',
    ]}
    initialIndex={initialIndex}
  >
    <HistoryControls />
    <Routes>
      <Route path="previous" element={<span>Previous route</span>} />
      <Route path="objects/:objectNamePlural" element={<NestedRouteLayout />}>
        <Route path=":objectRecordId" element={<RouteStateProbe />} />
      </Route>
    </Routes>
  </MemoryRouter>
);

describe('React Router 7 compatibility', () => {
  it('preserves dynamic params, query strings, hashes, and nested routes', () => {
    render(<RouterFixture />);

    expect(screen.getByText('Nested route layout')).toBeInTheDocument();
    expect(screen.getByText('people:record-123')).toBeInTheDocument();
    expect(screen.getByText('?view=table')).toBeInTheDocument();
    expect(screen.getByText('#activity')).toBeInTheDocument();
  });

  it('preserves back and forward navigation without v6 future flags', async () => {
    const user = userEvent.setup();

    render(<RouterFixture />);

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('Previous route')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Forward' }));
    expect(screen.getByText('Nested route layout')).toBeInTheDocument();
    expect(screen.getByText('people:record-123')).toBeInTheDocument();
  });

  it('restores a synthetic deep link after a remount', () => {
    const { unmount } = render(<RouterFixture />);

    expect(screen.getByText('people:record-123')).toBeInTheDocument();

    unmount();
    render(<RouterFixture />);

    expect(screen.getByText('people:record-123')).toBeInTheDocument();
    expect(screen.getByText('?view=table')).toBeInTheDocument();
    expect(screen.getByText('#activity')).toBeInTheDocument();
  });
});
