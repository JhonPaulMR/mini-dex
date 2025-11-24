import axios from 'axios';
import { Pokemon, PokemonDetails } from '../types';

export const API_URL = 'https://pokeapi.co/api/v2';

export interface PokemonListResponse { results: Pokemon[]; }

export interface PokemonSpeciesResponse {
  flavor_text_entries: { flavor_text: string; language: { name: string }; }[];
}

export const extractPokemonId = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : NaN;
};

// Simple in-memory caches
const detailsCache = new Map<number, PokemonDetails>();
const speciesCache = new Map<number, string>();

export async function getPokemonList(limit = 151): Promise<Pokemon[]> {
  const { data } = await axios.get<PokemonListResponse>(`${API_URL}/pokemon?limit=${limit}`);
  return data.results;
}

export async function getPokemonDetails(idOrUrl: number | string): Promise<PokemonDetails | null> {
  const id = typeof idOrUrl === 'string' && /https?:/.test(idOrUrl) ? extractPokemonId(idOrUrl) : Number(idOrUrl);
  if (!isNaN(id) && detailsCache.has(id)) return detailsCache.get(id)!;
  try {
    const { data } = await axios.get<PokemonDetails>(`${API_URL}/pokemon/${idOrUrl}`);
    if (!isNaN(id)) detailsCache.set(id, data);
    return data;
  } catch (e) {
    console.error('getPokemonDetails error', e);
    return null;
  }
}

export async function getPokemonSpecies(id: number | string): Promise<string | null> {
  const numericId = Number(id);
  if (!isNaN(numericId) && speciesCache.has(numericId)) return speciesCache.get(numericId)!;
  try {
    const { data } = await axios.get<PokemonSpeciesResponse>(`${API_URL}/pokemon-species/${id}`);
    // Prefer PT then EN
    let entry = data.flavor_text_entries.find(e => e.language.name === 'pt') || data.flavor_text_entries.find(e => e.language.name === 'en');
    if (entry) {
      const clean = entry.flavor_text.replace(/[\f\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
      if (!isNaN(numericId)) speciesCache.set(numericId, clean);
      return clean;
    }
    return null;
  } catch (e) {
    console.error('getPokemonSpecies error', e);
    return null;
  }
}
