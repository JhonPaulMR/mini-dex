import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { PokemonDetails } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import TypeBadge from '../../components/TypeBadge';
import { getPokemonDetails, getPokemonSpecies } from '../../api/pokemon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@poke_favorites';
 

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const [description, setDescription] = useState<string>('Carregando descrição...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      let active = true;
      (async () => {
        setError(null);
        const [detailsResult, descriptionResult] = await Promise.all([
          getPokemonDetails(id),
          getPokemonSpecies(id)
        ]);
        if (!active) return;
        if (!detailsResult) {
          setError('Failed to load details');
        }
        setDetails(detailsResult);
        setDescription(descriptionResult || 'Nenhuma descrição encontrada.');
      })();
      return () => { active = false; };
    }
  }, [id]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        const favs = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(favs);
        if (details) setIsFavorite(favs.includes(details.id));
      } catch (e) {
        console.error('Failed to load favorites.', e);
      }
    };
    loadFavorites();
  }, [details]);
  
  const toggleFavorite = async () => {
    if (!details) return;
    
    let newFavorites: number[];
    if (isFavorite) {
        newFavorites = favorites.filter(favId => favId !== details.id);
    } else {
        newFavorites = [...favorites, details.id];
    }

    try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
        setIsFavorite(!isFavorite);
    } catch (e) {
        console.error('Failed to save favorites', e);
    }
  };

  if (!details && !error) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: Colors.dark.text }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {details && (
        <Stack.Screen
          options={{
            headerTitle: details.name.charAt(0).toUpperCase() + details.name.slice(1),
            headerStyle: { backgroundColor: Colors.dark.background },
            headerTintColor: Colors.dark.text,
            headerTitleStyle: { color: Colors.dark.text },
            headerRight: () => (
              <TouchableOpacity onPress={toggleFavorite} style={{ marginRight: 15 }}>
                <Ionicons
                  name={isFavorite ? 'star' : 'star-outline'}
                  size={28}
                  color={isFavorite ? 'gold' : '#888'}
                />
              </TouchableOpacity>
            ),
          }}
        />
      )}
      <View style={styles.header}>
        {details && (
          <>
            <Image
              source={{ uri: details.sprites.other['official-artwork'].front_default }}
              style={styles.image}
            />
            <Text style={styles.name}>#{String(details.id).padStart(3, '0')} - {details.name}</Text>
          </>
        )}
        <View style={styles.typesContainer}>
          {details?.types.map(({ type }) => (
            <TypeBadge key={type.name} typeName={type.name as keyof typeof Colors.types} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pokédex Entry</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Physical Attributes</Text>
        {details && (
          <>
            <Text style={styles.statText}>Height: {details.height / 10} m</Text>
            <Text style={styles.statText}>Weight: {details.weight / 10} kg</Text>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Base Stats</Text>
        {details?.stats.map(({ stat, base_stat }) => (
          <View key={stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{stat.name.replace('-', ' ')}</Text>
            <Text style={styles.statValue}>{base_stat}</Text>
            <View style={styles.statBarBackground}>
              <View style={[styles.statBar, { width: `${Math.min(base_stat / 1.5, 100)}%` }]} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.dark.card,
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginVertical: 10,
    color: Colors.dark.text,
  },
  typesContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.dark.text,
  },
  statText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#ddd',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: "italic",
    color: '#ccc',
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statName: {
    fontSize: 16,
    textTransform: "capitalize",
    width: "40%",
    color: '#ddd',
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    width: "15%",
    textAlign: "right",
    color: Colors.dark.text,
  },
  statBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
    marginLeft: 10,
    overflow: "hidden",
  },
  statBar: {
    height: "100%",
    backgroundColor: Colors.dark.tint,
    borderRadius: 5,
  },
});