import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> component', () => {
  test('renders text input field', () => {
    render(<CitySearch allLocations={[]} setCurrentCity={() => {}} />);
    const cityTextBox = screen.getByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
  });

  test('renders a list of suggestions when user types in the textbox', async () => {
    const allLocations = ['Berlin', 'Munich', 'London'];
    const setCurrentCity = jest.fn();

    render(<CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'Ber');

    const suggestion = screen.getByText('Berlin');
    expect(suggestion).toBeInTheDocument();
  });

  test('clicking a suggestion sets the city via setCurrentCity()', async () => {
    const allLocations = ['Berlin', 'Munich', 'London'];
    const setCurrentCity = jest.fn();

    render(<CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Mun');

    const suggestion = screen.getByText('Munich');
    await userEvent.click(suggestion);

    expect(setCurrentCity).toHaveBeenCalledWith('Munich');
  });
});

