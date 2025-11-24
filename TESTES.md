# Resumo dos Testes - Mini Pokedex

## Atividade Avaliativa 2 - Programação para Dispositivos Móveis

Este documento resume os testes implementados para a aplicação Mini Pokedex.

---

## ✅ Testes Unitários Implementados

### 1. SearchBar.test.tsx (6 testes)
Componente de busca que permite filtrar Pokémon pelo nome.

**Testes implementados:**
- ✓ Renderização com placeholder padrão
- ✓ Renderização com placeholder personalizado
- ✓ Exibição do valor passado via props
- ✓ Callback onChangeText é chamado corretamente
- ✓ Renderização do ícone de busca
- ✓ Múltiplas mudanças de texto são tratadas

**Por que é útil?**
O SearchBar é um componente crítico para a experiência do usuário. Esses testes garantem que:
- O usuário sempre pode digitar no campo
- O callback de busca funciona corretamente
- O componente se comporta de forma previsível

---

### 2. TypeBadge.test.tsx (8 testes)
Componente que exibe badges coloridas para os tipos de Pokémon (fire, water, grass, etc).

**Testes implementados:**
- ✓ Renderização de diferentes tipos (fire, water, grass, psychic, dragon, electric)
- ✓ Aplicação correta das cores
- ✓ Capitalização do texto
- ✓ Estilos aplicados corretamente

**Por que é útil?**
O TypeBadge é usado extensivamente na aplicação para mostrar tipos de Pokémon. Garantir que:
- Todos os tipos são renderizados corretamente
- As cores são aplicadas (parte da identidade visual)
- Múltiplos badges podem coexistir

---

### 3. pokemonApi.test.ts (10 testes)
Testa a função utilitária `extractPokemonId` que extrai o ID do Pokémon de URLs da PokeAPI.

**Testes implementados:**
- ✓ Extração de IDs com 1, 2, 3 e 4 dígitos
- ✓ URLs com e sem barra final
- ✓ Diferentes protocolos (http/https)
- ✓ URLs inválidas retornam NaN
- ✓ Processamento de múltiplas URLs consecutivamente

**Por que é útil?**
Esta função é crucial para:
- Ordenação da lista por ID
- Navegação para detalhes do Pokémon
- Carregamento de favoritos
Um erro aqui quebraria várias funcionalidades.

---

### 4. pokemonFilter.test.ts (10 testes) - **DESAFIO: Teste de Hook Customizado!**
Testa o hook `useFilteredAndSortedPokemons` que implementa a lógica de filtragem e ordenação da lista.

**Testes implementados:**
- ✓ Retorno de todos os Pokémon sem filtros
- ✓ Filtragem por nome (case-insensitive)
- ✓ Ordenação por nome (alfabética)
- ✓ Ordenação por ID (numérica)
- ✓ Lista vazia quando não há resultados
- ✓ Combinação de filtro + ordenação
- ✓ Reatividade a mudanças no searchQuery
- ✓ Reatividade a mudanças no sortOrder
- ✓ Tratamento de lista vazia

**Por que é útil?**
Este é o "cérebro" da aplicação que:
- Permite busca instantânea de Pokémon
- Mantém a lista organizada
- Oferece diferentes visualizações dos dados
Um bug aqui afetaria diretamente a UX principal.

**🏆 Este teste demonstra habilidade avançada:**
- Uso de `renderHook` do React Testing Library
- Teste de hooks customizados
- Verificação de reatividade (rerender)
- Cobertura de edge cases (lista vazia, sem resultados)

---

## 🧪 Testes E2E Implementados (Maestro)

### 1. 01-search-pokemon.yaml
**Fluxo testado:** Busca e filtro de Pokémon

**Passos:**
1. Abre a aplicação
2. Verifica elementos iniciais (SearchBar, botão Sort)
3. Aguarda carregamento da lista
4. Digita "pika" no campo de busca
5. Verifica que Pikachu aparece nos resultados
6. Testa busca sem resultados ("xyzabc123")
7. Verifica mensagem "No results"

**Por que é importante?**
- Garante que a busca funciona end-to-end (UI → lógica → API)
- Valida tratamento de casos sem resultados

---

### 2. 02-navigate-details.yaml
**Fluxo testado:** Navegação para detalhes do Pokémon

**Passos:**
1. Abre a aplicação
2. Busca por "charizard"
3. Toca no card do Charizard
4. Verifica informações na tela de detalhes (Height, Weight)
5. Volta para a lista
6. Verifica que retornou à tela principal

**Por que é importante?**
- Testa navegação completa (Expo Router)
- Garante que dados são carregados na tela de detalhes
- Valida navegação de volta

---

### 3. 03-sort-pokemon.yaml
**Fluxo testado:** Ordenação da lista

**Passos:**
1. Abre a aplicação
2. Toca em "Sort Options"
3. Seleciona "Sort by Name"
4. Verifica que a lista foi reordenada
5. Toca novamente em "Sort Options"
6. Seleciona "Sort by Number"
7. Testa botão "Cancel"

**Por que é importante?**
- Valida ActionSheet (componente nativo)
- Testa mudança de estado global (ordenação)
- Garante que diferentes visualizações funcionam

---

### 4. 04-tabs-navigation.yaml
**Fluxo testado:** Navegação entre abas

**Passos:**
1. Abre a aplicação
2. Verifica que está na tab Pokedex
3. Navega para tab Favorites
4. Verifica elementos da tela de favoritos
5. Volta para tab Pokedex
6. Testa pull-to-refresh

**Por que é importante?**
- Valida Tab Navigator (React Navigation)
- Testa transição entre diferentes contextos
- Garante que pull-to-refresh funciona

---

## 📊 Estatísticas

| Tipo de Teste | Quantidade | Componentes/Fluxos Testados |
|---------------|------------|------------------------------|
| **Testes Unitários** | 34 | 3 componentes + 1 hook + 1 função utilitária |
| **Testes E2E** | 4 | 4 fluxos críticos da aplicação |
| **TOTAL** | 38 | - |

---

## 🎯 Cobertura de Requisitos da Avaliação

✅ **Diferença entre testes unitários e E2E**: Explicado no README.md com tabela comparativa

✅ **Testes unitários para 2+ componentes**: Implementados 4 suites de testes
- SearchBar (6 testes)
- TypeBadge (8 testes)
- pokemonApi (10 testes)
- pokemonFilter - Hook customizado (10 testes) 🏆

✅ **Testes E2E**: Implementados 4 flows Maestro
- Busca de Pokémon
- Navegação para detalhes
- Ordenação da lista
- Navegação entre tabs

✅ **README atualizado**: Instruções completas de instalação e execução dos testes

✅ **Ambiente de execução documentado**: Especificado Android/iOS/Expo Go para E2E

---

## 🚀 Como Executar

### Testes Unitários
```bash
npm test
```

### Testes E2E
```bash
# Terminal 1: Iniciar Expo
npx expo start

# Terminal 2: Executar Maestro
maestro test .maestro/
```

---

## 📚 Referências Utilizadas

- [Expo Unit Testing Guide](https://docs.expo.dev/develop/unit-testing/)
- [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro)
- [Maestro Documentation](https://maestro.mobile.dev/)
- [Jest Documentation](https://jestjs.io/)

---

**Desenvolvido por:** [Seu Nome]
**Disciplina:** Programação para Dispositivos Móveis
**Data:** Novembro 2025
