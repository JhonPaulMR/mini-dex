import { extractPokemonId } from '../api/pokemon';

describe('Pokemon API Utils', () => {
  describe('extractPokemonId', () => {
    it('deve extrair o ID corretamente de uma URL padrão da PokeAPI', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/25/';
      const id = extractPokemonId(url);
      
      expect(id).toBe(25);
    });

    it('deve extrair o ID de URLs sem barra final', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/150';
      const id = extractPokemonId(url);
      
      expect(id).toBe(150);
    });

    it('deve extrair ID de Pokémon com 1 dígito', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/1/';
      const id = extractPokemonId(url);
      
      expect(id).toBe(1);
    });

    it('deve extrair ID de Pokémon com 3 dígitos', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/151/';
      const id = extractPokemonId(url);
      
      expect(id).toBe(151);
    });

    it('deve extrair ID de Pokémon com 4 dígitos', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/1025/';
      const id = extractPokemonId(url);
      
      expect(id).toBe(1025);
    });

    it('deve retornar NaN para URL inválida', () => {
      const url = 'https://pokeapi.co/api/v2/type/fire/';
      const id = extractPokemonId(url);
      
      expect(isNaN(id)).toBe(true);
    });

    it('deve retornar NaN para URL sem número', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/';
      const id = extractPokemonId(url);
      
      expect(isNaN(id)).toBe(true);
    });

    it('deve retornar NaN para string vazia', () => {
      const url = '';
      const id = extractPokemonId(url);
      
      expect(isNaN(id)).toBe(true);
    });

    it('deve lidar com URLs com diferentes protocolos', () => {
      const url = 'http://pokeapi.co/api/v2/pokemon/50/';
      const id = extractPokemonId(url);
      
      expect(id).toBe(50);
    });

    it('deve processar múltiplas URLs consecutivamente', () => {
      const urls = [
        'https://pokeapi.co/api/v2/pokemon/1/',
        'https://pokeapi.co/api/v2/pokemon/25/',
        'https://pokeapi.co/api/v2/pokemon/151/',
      ];
      
      const ids = urls.map(extractPokemonId);
      
      expect(ids).toEqual([1, 25, 151]);
    });
  });
});
