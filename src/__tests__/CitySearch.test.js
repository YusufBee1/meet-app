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
    const allLocations = ['Berlin, Germany', 'Munich, Germany', 'London, UK'];
    const setCurrentCity = jest.fn();

    render(<CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Mun');

    const suggestion = await screen.findByText('Munich, Germany');
    expect(suggestion).toBeInTheDocument();
  });

  test('clicking a suggestion sets the city via setCurrentCity()', async () => {
    const allLocations = ['Berlin, Germany', 'Munich, Germany', 'London, UK'];
    const setCurrentCity = jest.fn();

    render(<CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'London');

    const suggestion = await screen.findByText('London, UK');
    await userEvent.click(suggestion);

    expect(setCurrentCity).toHaveBeenCalledWith('London, UK');
  });
});
