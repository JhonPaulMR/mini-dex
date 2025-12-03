import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import { Pokemon, PokemonDetails } from '../types';
import { extractPokemonId, getPokemonDetails } from '../api/pokemon';

type Props = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: Props) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    const id = extractPokemonId(pokemon.url);
    (async () => {
      const result = await getPokemonDetails(id);
      if (active) setDetails(result);
    })();
    return () => { active = false; };
  }, [pokemon]);

  if (!details) {
    return (
      <View style={[styles.card, styles.loadingContainer]}>
        <ActivityIndicator size="small" color="#888" />
      </View>
    );
  }

  const handlePress = () => {
    if (!details) return;
    router.push({ pathname: '/pokemon/[id]', params: { id: details.id } });
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress}
      testID={`pokemon-card-${details.name}`}
      accessibilityLabel={details.name}
    >
      <Image
        source={{ uri: details.sprites.other['official-artwork'].front_default }}
        style={styles.image}
      />
      <Text style={styles.name} testID={`pokemon-name-${details.name}`}>
        #{String(details.id).padStart(3, '0')} - {details.name}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: 10,
    padding: 10,
    margin: 8,
    alignItems: "center",
    width: "45%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loadingContainer: {
    justifyContent: "center",
    height: 180,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    color: Colors.dark.text,
  },
});

export default PokemonCard;