# Mini Pokedex

O Projeto consiste em ser uma pokedex funcional, contendo informações de cada pokemon, como tiragem, descrição, status e uma pequena imagem do pokemon

O objetivo principal foi aplicar os conceitos fundamentais do desenvolvimento mobile com React Native, incluindo componentização, navegação entre telas, gerenciamento de estado e estilização. Além disto foi implementado o uso da API RESTful PokeAPI para pegar informações dos pokemons, para este projeto foi restringido apenas aos 151 primeiros pokemons da 1° Geração

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

### Tela Principal (Listagem e Busca)
<img width="300" height="666" alt="image" src="https://github.com/user-attachments/assets/583d3c22-cb0e-490b-a189-142b19cf5c77" />

### Tela de Detalhes do Pokémon
<img width="300" height="666" alt="image" src="https://github.com/user-attachments/assets/bbcb012e-a339-4e4a-8a45-427a4976649d" />

### Tela de Favoritos
<img width="300" height="666" alt="image" src="https://github.com/user-attachments/assets/b9b8383c-f1a5-4afc-8f85-b54e635b3fd0" />


## Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos
* [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
* [Git](https://git-scm.com/)
* O aplicativo **Expo Go** instalado no seu smartphone (iOS ou Android)

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/JhonPaulMR/mini-dex
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
    *ou*
    ```bash
    yarn start
    ```

5.  **Execute no seu dispositivo:**
    * Após o comando anterior, um QR Code será exibido no terminal.
    * Abra o aplicativo **Expo Go** no seu celular e escaneie o QR Code para carregar o projeto.

---
