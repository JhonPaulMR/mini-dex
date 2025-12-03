import { useActionSheet } from '@expo/react-native-action-sheet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Button, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { extractPokemonId, getPokemonList } from '../../api/pokemon';
import PokemonCard from '../../components/PokemonCard';
import SearchBar from '../../components/SearchBar';
import Colors from '../../constants/Colors';
import { Pokemon } from '../../types';

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
      <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
        <TouchableOpacity
          onPress={openSortOptions}
          style={{ backgroundColor: Colors.dark.tint, padding: 10, borderRadius: 5, alignItems: 'center' }}
          testID="sort-button"
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Sort Options</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredAndSortedPokemons}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        keyExtractor={(item) => item.name}
        numColumns={2}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.tint} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={!loading ? <Text style={styles.emptyText} testID="empty-list-text">No results.</Text> : null}
        testID="pokemon-list"
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