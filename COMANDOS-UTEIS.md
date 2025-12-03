# Comandos Úteis - Mini Pokedex

Referência rápida de todos os comandos importantes.

---

## Testes Unitários

### Executar todos os testes
```bash
npm test
```

### Modo watch (re-executa automaticamente)
```bash
npm run test:watch
```

### Cobertura de código
```bash
npm run test:coverage
```

### Teste específico
```bash
npm test SearchBar
npm test TypeBadge
npm test pokemonApi
npm test pokemonFilter
```

### Limpar cache do Jest
```bash
npm test -- --clearCache
```

### Executar com mais detalhes
```bash
npm test -- --verbose
```

---

## Testes E2E (Maestro)

### Instalar Maestro (primeira vez)
```bash
# Linux/Mac
curl -Ls "https://get.maestro.mobile.dev" | bash

# Verificar instalação
maestro --version
```

### Executar todos os flows
```bash
maestro test .maestro/
```

### Executar flow específico
```bash
maestro test .maestro/01-search-pokemon.yaml
maestro test .maestro/02-navigate-details.yaml
maestro test .maestro/03-sort-pokemon.yaml
maestro test .maestro/04-tabs-navigation.yaml
```

### Modo debug interativo
```bash
maestro studio
```

### Listar dispositivos disponíveis
```bash
maestro test --device
```

### Executar com mais logs
```bash
maestro test .maestro/ --debug-output
```

---

## Aplicação

### Iniciar servidor Expo
```bash
npx expo start
```

### Iniciar em plataforma específica
```bash
npm run android
npm run ios
npm run web
```

### Limpar cache do Expo
```bash
npx expo start -c
```

---

## Dependências

### Instalar dependências
```bash
npm install
```

### Instalar dependências de teste (se necessário)
```bash
npm install --save-dev jest @testing-library/react-native jest-expo @types/jest
```

### Atualizar dependências
```bash
npm update
```

---

## Documentação

### Visualizar estrutura do projeto
```bash
tree -L 2 -I 'node_modules|.expo|coverage'
```

### Listar todos os arquivos de teste
```bash
find . -name "*.test.*" -o -name "*.yaml" | grep -v node_modules
```

### Contar testes
```bash
npm test -- --listTests | wc -l
```

---

## Debug

### Ver hierarquia de elementos (Maestro)
```bash
maestro studio
# Depois use: maestro hierarchy
```

### Verificar logs do Jest
```bash
npm test -- --no-coverage --verbose
```

### Ver erros de lint/compilação
```bash
npx tsc --noEmit
```

---

## Utilitários

### Script auxiliar
```bash
./run-tests.sh unit     # Testes unitários
./run-tests.sh e2e      # Instruções E2E
./run-tests.sh all      # Ambos
```

### Contar linhas de código dos testes
```bash
find __tests__ -name "*.test.*" -exec wc -l {} + | tail -1
```

### Ver tamanho da documentação
```bash
cat *.md | wc -w
```

---

## Estatísticas

### Ver cobertura por arquivo
```bash
npm run test:coverage -- --collectCoverageFrom='components/**/*.tsx'
```

### Ver tempo de execução dos testes
```bash
npm test -- --verbose | grep "Time:"
```

### Listar todos os testes por nome
```bash
npm test -- --listTests
```

---

## CI/CD (Opcional)

### Executar como CI
```bash
npm test -- --ci --coverage --maxWorkers=2
```

### Gerar relatório de cobertura HTML
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

---

## Manutenção

### Remover node_modules e reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
```

### Limpar todos os caches
```bash
npm test -- --clearCache
npx expo start -c
rm -rf node_modules/.cache
```

### Verificar dependências desatualizadas
```bash
npm outdated
```

---

## Checklist Rápido

Antes de apresentar:
```bash
# 1. Testes unitários passando
npm test

# 2. App rodando
npx expo start

# 3. Maestro instalado
maestro --version

# 4. Pelo menos um flow E2E funciona
maestro test .maestro/01-search-pokemon.yaml
```

---

## Dicas

### Executar testes mudos (sem output)
```bash
npm test -- --silent
```

### Ver apenas falhas
```bash
npm test -- --onlyFailures
```

### Executar testes em paralelo
```bash
npm test -- --maxWorkers=4
```

### Executar apenas testes modificados
```bash
npm test -- --onlyChanged
```

---

## Emergência

Se tudo falhar:
```bash
# 1. Limpar tudo
rm -rf node_modules package-lock.json .expo coverage

# 2. Reinstalar
npm install

# 3. Limpar cache
npm test -- --clearCache

# 4. Tentar novamente
npm test
```

---

## Maestro no Dispositivo Real

### Android
```bash
# Conectar via USB
adb devices

# Executar teste
maestro test .maestro/01-search-pokemon.yaml
```

### iOS (requer macOS)
```bash
# Listar simuladores
xcrun simctl list devices

# Executar teste
maestro test .maestro/01-search-pokemon.yaml
```

---

## Comandos para Demonstração

Sequência recomendada para apresentação:

```bash
# 1. Mostrar estrutura
tree -L 2 -I 'node_modules|.expo|coverage'

# 2. Executar testes unitários
npm test

# 3. Ver cobertura
npm run test:coverage

# 4. Iniciar app (outro terminal)
npx expo start

# 5. Executar flow E2E
maestro test .maestro/01-search-pokemon.yaml
```

---

**Dica:** Salve este arquivo nos favoritos do seu terminal para acesso rápido!

```bash
# Adicionar ao .bashrc ou .zshrc
alias mini-test='cat ~/path/to/mini-dex/COMANDOS-UTEIS.md'
```

---

**Última atualização:** Novembro 2025
