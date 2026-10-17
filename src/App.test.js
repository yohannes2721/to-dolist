import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('adds, completes, edits, and deletes a todo', () => {
  render(<App />);

  const input = screen.getByRole('textbox', { name: /todo task/i });
  fireEvent.change(input, { target: { value: 'Buy groceries' } });
  fireEvent.click(screen.getByRole('button', { name: /add task/i }));

  expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  const checkbox = screen.getByRole('checkbox', { name: /mark buy groceries as complete/i });
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  fireEvent.click(screen.getByRole('button', { name: /edit/i }));
  fireEvent.change(input, { target: { value: 'Buy groceries and fruit' } });
  fireEvent.click(screen.getByRole('button', { name: /save/i }));
  expect(screen.getByText('Buy groceries and fruit')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /delete/i }));
  expect(screen.queryByText('Buy groceries and fruit')).not.toBeInTheDocument();
});
