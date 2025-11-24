#!/bin/bash

# Script auxiliar para executar testes da Mini Pokedex
# Uso: ./run-tests.sh [unit|e2e|all]

echo "🧪 Mini Pokedex - Test Runner"
echo "=============================="
echo ""

# Função para rodar testes unitários
run_unit_tests() {
    echo "📝 Executando testes unitários..."
    npm test
}

# Função para instruções de testes E2E
run_e2e_tests() {
    echo "🎭 Instruções para testes E2E (Maestro):"
    echo ""
    echo "1. Certifique-se de que o Maestro está instalado:"
    echo "   curl -Ls \"https://get.maestro.mobile.dev\" | bash"
    echo ""
    echo "2. Inicie o servidor Expo em outro terminal:"
    echo "   npx expo start"
    echo ""
    echo "3. Abra o app no Expo Go (dispositivo ou emulador)"
    echo ""
    echo "4. Execute os testes Maestro:"
    echo "   maestro test .maestro/"
    echo ""
    echo "Ou execute um teste específico:"
    echo "   maestro test .maestro/01-search-pokemon.yaml"
    echo "   maestro test .maestro/02-navigate-details.yaml"
    echo "   maestro test .maestro/03-sort-pokemon.yaml"
    echo "   maestro test .maestro/04-tabs-navigation.yaml"
    echo ""
}

# Verificar argumento
case "$1" in
    unit)
        run_unit_tests
        ;;
    e2e)
        run_e2e_tests
        ;;
    all)
        run_unit_tests
        echo ""
        echo "=============================="
        echo ""
        run_e2e_tests
        ;;
    *)
        echo "Uso: ./run-tests.sh [unit|e2e|all]"
        echo ""
        echo "Opções:"
        echo "  unit  - Executa testes unitários (Jest)"
        echo "  e2e   - Mostra instruções para testes E2E (Maestro)"
        echo "  all   - Executa testes unitários e mostra instruções E2E"
        echo ""
        echo "Exemplos:"
        echo "  ./run-tests.sh unit"
        echo "  ./run-tests.sh e2e"
        echo "  ./run-tests.sh all"
        exit 1
        ;;
esac
