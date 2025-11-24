import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, Button, Text, RefreshControl } from 'react-native';
import Colors from '../../constants/Colors';
import PokemonCard from '../../components/PokemonCard';
import SearchBar from '../../components/SearchBar';
import { Pokemon } from '../../types';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getPokemonList, extractPokemonId } from '../../api/pokemon';

type SortOrder = 'id' | 'name';

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('id');
  const { showActionSheetWithOptions } = useActionSheet();

  const loadPokemons = useCallback(async (indicateLoading = true) => {
    if (indicateLoading) setLoading(true);
    setError(null);
    try {
      const data = await getPokemonList(1025);
      setPokemons(data);
    } catch (e: any) {
      console.error('Failed to fetch pokemons', e);
      setError('Failed to load Pokémon list.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  const filteredAndSortedPokemons = useMemo(() => {
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

  const openSortOptions = useCallback(() => {
    const options = ['Sort by Number', 'Sort by Name', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: 'Sort Pokémon List',
      },
      (buttonIndex?: number) => {
        if (buttonIndex === 0) {
          setSortOrder('id');
        } else if (buttonIndex === 1) {
          setSortOrder('name');
        }
      }
    );
  }, [showActionSheetWithOptions]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPokemons(false);
  }, [loadPokemons]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <View style={{ height: 12 }} />
        <Button title="Retry" onPress={() => loadPokemons()} color={Colors.dark.tint} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <Button title="Sort Options" onPress={openSortOptions} color={Colors.dark.tint} />
      <FlatList
        data={filteredAndSortedPokemons}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        keyExtractor={(item) => item.name}
        numColumns={2}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.tint} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={!loading ? <Text style={styles.emptyText}>No results.</Text> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  list: {
    paddingHorizontal: 8,
  },
  errorText: {
    color: Colors.dark.text,
    fontSize: 16,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 40,
  },
});