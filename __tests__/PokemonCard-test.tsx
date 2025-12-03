import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import * as api from '../api/pokemon';
import PokemonCard from '../components/PokemonCard';

// Mock the API calls
jest.mock('../api/pokemon');
// Mock expo-router
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const mockPokemon = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

const mockDetails = {
    id: 1,
    name: 'bulbasaur',
    sprites: {
        other: {
            'official-artwork': {
                front_default: 'https://example.com/bulbasaur.png',
            },
        },
    },
    types: [{ type: { name: 'grass' } }],
    height: 7,
    weight: 69,
    stats: [],
};

describe('PokemonCard', () => {
    it('renders correctly after loading details', async () => {
        (api.getPokemonDetails as jest.Mock).mockResolvedValue(mockDetails);
        (api.extractPokemonId as jest.Mock).mockReturnValue(1);

        const { getByText, getByTestId } = render(<PokemonCard pokemon={mockPokemon} />);

        await waitFor(() => {
            expect(getByText('#001 - bulbasaur')).toBeTruthy();
        });

        expect(getByTestId('pokemon-card-bulbasaur')).toBeTruthy();
    });
});
