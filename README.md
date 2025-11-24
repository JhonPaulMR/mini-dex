# Mini Pokedex | Avaliação de Dispositivos Móveis

Este projeto é uma pequena aplicação mobile desenvolvida como parte da avaliação da disciplina de Programação para Dispositivos Móveis. O aplicativo é uma Pokedex funcional que permite aos usuários explorar os 151 Pokémon da primeira geração.

O objetivo principal foi aplicar os conceitos fundamentais do desenvolvimento mobile com React Native, incluindo componentização, navegação entre telas, gerenciamento de estado, consumo de APIs externas e estilização.

## Testes Automatizados

### O que são Testes Unitários vs. Testes E2E?

#### Testes Unitários
Os **testes unitários** focam em testar partes isoladas do código de forma independente, como componentes individuais, funções ou módulos. O objetivo é verificar se cada "unidade" de código funciona corretamente de forma isolada, sem depender de outros sistemas externos.

**Características dos Testes Unitários:**
- **Rápidos**: Executam em milissegundos
- **Isolados**: Não dependem de APIs, banco de dados ou interface gráfica real
- **Focados**: Testam uma única funcionalidade por vez
- **Fáceis de debugar**: Quando falham, é fácil identificar exatamente o que quebrou
- **Usam mocks**: Simulam dependências externas (APIs, navegação, AsyncStorage)

**Exemplos neste projeto:**
- Teste do componente `SearchBar` verificando se o campo de busca aceita entrada de texto
- Teste do componente `TypeBadge` verificando se renderiza corretamente os tipos de Pokémon
- Teste da função `extractPokemonId` verificando se extrai corretamente o ID da URL
- Teste do hook customizado de filtragem e ordenação de Pokémon

#### Testes E2E (End-to-End)
Os **testes E2E** simulam o comportamento real do usuário interagindo com a aplicação completa. Eles testam o fluxo completo da aplicação, desde a interface até o backend, verificando se todos os sistemas funcionam corretamente juntos.

**Características dos Testes E2E:**
- **Realistas**: Simulam ações reais de usuários (tocar, digitar, arrastar)
- **Integrados**: Testam toda a aplicação funcionando em conjunto
- **Mais lentos**: Levam segundos ou minutos para executar
- **Frágeis**: Podem falhar por diversos motivos (rede, timing, mudanças de UI)
- **Valiosos**: Capturam problemas que só aparecem quando tudo está integrado

**Exemplos neste projeto:**
- Testar a busca de um Pokémon específico e verificar se os resultados aparecem
- Navegar para os detalhes de um Pokémon e verificar se as informações são exibidas
- Testar a ordenação da lista por nome ou número
- Navegar entre as abas (Pokedex e Favoritos)

### Resumo da Diferença

| Aspecto | Testes Unitários | Testes E2E |
|---------|------------------|------------|
| **Escopo** | Componente/função isolada | Aplicação completa |
| **Velocidade** | Muito rápidos (~ms) | Lentos (~segundos) |
| **Confiabilidade** | Alta | Média (mais instáveis) |
| **Debugging** | Fácil | Mais difícil |
| **Custo** | Baixo | Alto |
| **Quando usar** | Sempre, para cada componente | Para fluxos críticos do usuário |

## Funcionalidades

O aplicativo conta com as seguintes funcionalidades:

* **Listagem Completa**: Exibe a lista com todos os 151 Pokémon da primeira geração.
* **Busca por Nome**: Permite filtrar a lista de Pokémon em tempo real para encontrar um específico.
* **Ordenação**: Utiliza um ActionSheet para permitir que o usuário ordene a lista por número (padrão) ou por ordem alfabética.
* **Tela de Detalhes**: Ao selecionar um Pokémon, uma tela dedicada exibe suas informações completas, incluindo:
    * Imagem oficial
    * Altura e peso
    * Tipos (com cores correspondentes)
    * Status base (HP, Ataque, Defesa, etc.)
    * Descrição da Pokédex (buscada em português, com fallback para inglês)
* **Sistema de Favoritos**: O usuário pode marcar seus Pokémon preferidos, e essa seleção é salva localmente no dispositivo, persistindo mesmo após fechar o aplicativo.
* **Tela de Favoritos**: Uma aba dedicada exibe apenas os Pokémon que foram marcados como favoritos.

## Tecnologias Utilizadas

* **React Native**
* **Expo (SDK)**
* **TypeScript**
* **Expo Router** para um sistema de navegação baseado em arquivos.
* **Axios** para realizar as chamadas à [PokéAPI](https://pokeapi.co/).
* **AsyncStorage** para a persistência local da lista de favoritos.
* **@expo/react-native-action-sheet** para a implementação do menu de ordenação.

## Telas do Aplicativo

Abaixo estão as principais telas desenvolvidas para a aplicação.

*__Nota: Para adicionar as imagens, tire prints do seu aplicativo em execução, suba os arquivos para o GitHub no seu repositório e substitua as URLs de placeholder abaixo. [Veja aqui como adicionar imagens ao Readme.md](https://docs.github.com/pt/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).__*

### Tela Principal (Listagem e Busca)
![Tela de Listagem](https://raw.githubusercontent.com/SEU-USUARIO/SEU-REPOSITORIO/main/screenshots/pokedex-list.png)

### Tela de Detalhes do Pokémon
![Tela de Detalhes](https://raw.githubusercontent.com/SEU-USUARIO/SEU-REPOSITORIO/main/screenshots/pokemon-details.png)

### Tela de Favoritos
![Tela de Favoritos](https://raw.githubusercontent.com/SEU-USUARIO/SEU-REPOSITORIO/main/screenshots/favorites-list.png)


## Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos
* [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
* [Git](https://git-scm.com/)
* O aplicativo **Expo Go** instalado no seu smartphone (iOS ou Android)

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd mini-dex
    ```

3.  **Instale todas as dependências:**
    ```bash
    npm install
    ```
    *ou, se você usa Yarn:*
    ```bash
    yarn install
    ```

4.  **Inicie o servidor de desenvolvimento do Expo:**
    ```bash
    npx expo start
    ```

5.  **Execute no seu dispositivo:**
    * Após o comando anterior, um QR Code será exibido no terminal.
    * Abra o aplicativo **Expo Go** no seu celular e escaneie o QR Code para carregar o projeto.

## Como Executar os Testes

### Testes Unitários (Jest + React Testing Library)

Os testes unitários podem ser executados em qualquer ambiente (não requerem emulador ou dispositivo físico).

**Executar todos os testes:**
```bash
npm test
```

**Executar testes em modo watch (re-executa automaticamente quando há mudanças):**
```bash
npm run test:watch
```

**Executar testes com relatório de cobertura:**
```bash
npm run test:coverage
```

**O que está sendo testado:**
- **SearchBar.test.tsx**: 6 testes verificando renderização, entrada de texto e callbacks
- **TypeBadge.test.tsx**: 8 testes verificando renderização de badges de tipos de Pokémon
- **pokemonApi.test.ts**: 10 testes verificando a função `extractPokemonId`
- **pokemonFilter.test.ts**: 10 testes verificando o hook customizado de filtragem e ordenação

**Total: 34 testes unitários**

### Testes E2E (Maestro)

Os testes E2E requerem a aplicação rodando em um dispositivo físico ou emulador.

#### Instalação do Maestro

**No Linux/Mac:**
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

**No Windows:**
Siga as instruções em: https://maestro.mobile.dev/getting-started/installing-maestro

#### Executar os Testes E2E

1. **Inicie o servidor Expo:**
   ```bash
   npx expo start
   ```

2. **Abra o app no Expo Go** (no seu dispositivo ou emulador)

3. **Em outro terminal, execute os testes Maestro:**

   **Executar todos os testes:**
   ```bash
   maestro test .maestro/
   ```

   **Executar um teste específico:**
   ```bash
   maestro test .maestro/01-search-pokemon.yaml
   ```

**O que está sendo testado:**
- **01-search-pokemon.yaml**: Teste de busca e filtro de Pokémon
  - Verifica carregamento inicial
  - Testa busca por "pika" e valida resultados
  - Testa busca sem resultados

- **02-navigate-details.yaml**: Teste de navegação para detalhes
  - Busca por "charizard"
  - Navega para a tela de detalhes
  - Verifica informações (Height, Weight)
  - Testa navegação de volta

- **03-sort-pokemon.yaml**: Teste de ordenação
  - Testa ordenação por nome
  - Testa ordenação por número
  - Verifica o botão de cancelar

- **04-tabs-navigation.yaml**: Teste de navegação entre abas
  - Navega entre Pokedex e Favoritos
  - Testa pull-to-refresh

**Total: 4 fluxos E2E**

#### Ambiente de Testes E2E

Os testes E2E podem ser executados em:
- **Android**: Emulador ou dispositivo físico
- **iOS**: Simulador ou dispositivo físico (requer macOS)
- **Expo Go**: Usando `appId: host.exp.exponent`

**Nota importante:** Os arquivos `.yaml` do Maestro já estão configurados para funcionar com o Expo Go. Se você fizer build standalone do app, precisará atualizar o `appId` nos arquivos YAML.

### Estrutura dos Testes

```
mini-dex/
├── __tests__/                    # Testes unitários
│   ├── SearchBar.test.tsx
│   ├── TypeBadge.test.tsx
│   ├── pokemonApi.test.ts
│   └── pokemonFilter.test.ts
├── .maestro/                     # Testes E2E
│   ├── 01-search-pokemon.yaml
│   ├── 02-navigate-details.yaml
│   ├── 03-sort-pokemon.yaml
│   └── 04-tabs-navigation.yaml
├── jest.config.js                # Configuração do Jest
└── jest-setup.js                 # Mocks e configurações globais
```

---