# Mini Pokedex | Avaliação de Dispositivos Móveis

Este projeto é uma pequena aplicação mobile desenvolvida como parte da avaliação da disciplina de Programação para Dispositivos Móveis. O aplicativo é uma Pokedex funcional que permite aos usuários explorar os 151 Pokémon da primeira geração.

O objetivo principal foi aplicar os conceitos fundamentais do desenvolvimento mobile com React Native, incluindo componentização, navegação entre telas, gerenciamento de estado, consumo de APIs externas e estilização.

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
    cd nome-do-seu-projeto
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

---