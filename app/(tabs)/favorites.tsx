import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, Button } from 'react-native';
import Colors from '../../constants/Colors';
import { useFocusEffect } from 'expo-router';
import PokemonCard from '../../components/PokemonCard';
import { Pokemon } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractPokemonId } from '../../api/pokemon';

const FAVORITES_KEY = '@poke_favorites';

export default function FavoritesScreen() {
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        setLoading(true);
        setError(null);
        try {
          const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
          const ids: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
          ids.sort((a, b) => a - b);
          const pokemonData: Pokemon[] = ids.map(id => ({
            name: `pokemon-${id}`,
            url: `https://pokeapi.co/api/v2/pokemon/${id}/`
          }));
          setFavoritePokemons(pokemonData);
        } catch (e) {
          console.error('Failed to load favorites.', e);
          setError('Failed to load favorites');
        } finally {
          setLoading(false);
        }
      };
      
      loadFavorites();
    }, [])
  );

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
        <Text style={styles.emptyText}>{error}</Text>
        <View style={{ height: 12 }} />
        <Button title="Retry" onPress={() => { /* refocus triggers load */ }} color={Colors.dark.tint} />
      </View>
    );
  }

  if (favoritePokemons.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>You have no favorite Pokémon yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritePokemons}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        keyExtractor={(item) => item.url}
        numColumns={2}
        contentContainerStyle={styles.list}
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
  emptyText: {
    fontSize: 18,
    color: '#bbb',
  },
});