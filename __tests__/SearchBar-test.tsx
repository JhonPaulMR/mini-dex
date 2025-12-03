import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
    it('renders correctly', () => {
        const { getByTestId, getByPlaceholderText } = render(
            <SearchBar value="" onChangeText={() => { }} />
        );

        expect(getByTestId('search-bar-container')).toBeTruthy();
        expect(getByPlaceholderText('Search Pokémon...')).toBeTruthy();
    });

    it('calls onChangeText when text changes', () => {
        const onChangeTextMock = jest.fn();
        const { getByTestId } = render(
            <SearchBar value="" onChangeText={onChangeTextMock} />
        );

        const input = getByTestId('search-input');
        fireEvent.changeText(input, 'pikachu');

        expect(onChangeTextMock).toHaveBeenCalledWith('pikachu');
    });

    it('displays the correct value', () => {
        const { getByDisplayValue } = render(
            <SearchBar value="charizard" onChangeText={() => { }} />
        );

        expect(getByDisplayValue('charizard')).toBeTruthy();
    });
});
