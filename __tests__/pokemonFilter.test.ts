import { renderHook } from '@testing-library/react-native';
import { useMemo } from 'react';
import { extractPokemonId } from '../api/pokemon';
import { Pokemon } from '../types';

// Hook customizado para filtrar e ordenar Pokémon (extraído da lógica de index.tsx)
const useFilteredAndSortedPokemons = (
  pokemons: Pokemon[],
  searchQuery: string,
  sortOrder: 'id' | 'name'
) => {
  return useMemo(() => {
    const lowered = searchQuery.toLowerCase();
    const filtered = pokemons.filter(p => p.name.toLowerCase().includes(lowered));
    const sorted = [...filtered];
    
    if (sortOrder === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => extractPokemonId(a.url) - extractPokemonId(b.url));
    }
    
    return sorted;
  }, [pokemons, searchQuery, sortOrder]);
};

describe('useFilteredAndSortedPokemons Hook', () => {
  const mockPokemons: Pokemon[] = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ];

  it('deve retornar todos os Pokémon sem filtro ou ordenação especial', () => {
    const { result } = renderHook(() =>
      useFilteredAndSortedPokemons(mockPokemons, '', 'id')
    );

    expect(result.current).toHaveLength(5);
    // Deve estar ordenado por ID (1, 4, 6, 7, 25)
    expect(result.current[0].name).toBe('bulbasaur');
    expect(result.current[1].name).toBe('charmander');
    expect(result.current[4].name).toBe('pikachu');
  });

  it('deve filtrar Pokémon pelo nome (busca por "char")', () => {
    const { result } = renderHook(() =>
      useFilteredAndSortedPokemons(mockPokemons, 'char', 'id')
    );

    expect(result.current).toHaveLength(2);
    expect(result.current.some(p => p.name === 'charizard')).toBe(true);
    expect(result.current.some(p => p.name === 'charmander')).toBe(true);
  });

  it('deve filtrar Pokémon ignorando case sensitivity', () => {
    const { result } = renderHook(() =>
      useFilteredAndSortedPokemons(mockPokemons, 'PIKA', 'id')
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('pikachu');
  });

  it('deve ordenar por nome alfabeticamente', () => {
    const { result } = renderHook(() =>
      useFilteredAndSortedPokemons(mockPokemons, '', 'name')
    );

    expect(result.current[0].name).toBe('bulbasaur');
    expect(result.current[1].name).toBe('charizard');
    expect(result.current[2].name).toBe('charmander');
    expect(result.current[3].name).toBe('pikachu');
    expect(result.current[4].name).toBe('squirtle');
  });

  it('deve ordenar por ID corretamente', () => {
    const { result } = renderHook(() =>
      useFilteredAndSortedPokemons(mockPokemons, '', 'id')
    );

    const ids = result.current.map(p => extractPokemonId(p.url));
    expect(ids).toEqual([1, 4, 6, 7, 25]);
  });

  it('deve retornar lista vazia quando nenhum Pokémon corresponde à busca', () => {
    const { result } = renderHook(() =>
      useFilteredAndSortedPokemons(mockPokemons, 'xyz123', 'id')
    );

    expect(result.current).toHaveLength(0);
  });

  it('deve combinar filtro e ordenação por nome', () => {
    const { result } = renderHook(() =>
      useFilteredAndSortedPokemons(mockPokemons, 'char', 'name')
    );

    expect(result.current).toHaveLength(2);
    expect(result.current[0].name).toBe('charizard');
    expect(result.current[1].name).toBe('charmander');
  });

  it('deve reagir a mudanças no searchQuery', () => {
    const { result, rerender } = renderHook<Pokemon[], { query: string }>(
      ({ query }) => useFilteredAndSortedPokemons(mockPokemons, query, 'id'),
      { initialProps: { query: '' } }
    );

    expect(result.current).toHaveLength(5);

    rerender({ query: 'squir' });
    expect(result.current).toHaveLength(1);
    expect((result.current as Pokemon[])[0].name).toBe('squirtle');
  });

  it('deve reagir a mudanças no sortOrder', () => {
    const { result, rerender } = renderHook<Pokemon[], { sort: 'id' | 'name' }>(
      ({ sort }) => useFilteredAndSortedPokemons(mockPokemons, '', sort),
      { initialProps: { sort: 'id' as 'id' | 'name' } }
    );

    expect((result.current as Pokemon[])[0].name).toBe('bulbasaur'); // ID 1

    rerender({ sort: 'name' });
    expect((result.current as Pokemon[])[0].name).toBe('bulbasaur'); // Também primeiro alfabeticamente
    expect((result.current as Pokemon[])[1].name).toBe('charizard');
  });

  it('deve lidar com lista vazia de Pokémon', () => {
    const { result } = renderHook(() =>
      useFilteredAndSortedPokemons([], 'test', 'id')
    );

    expect(result.current).toHaveLength(0);
  });
});
