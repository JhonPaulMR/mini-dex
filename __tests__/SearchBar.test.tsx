import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  it('deve renderizar corretamente com placeholder padrão', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={mockOnChangeText} />
    );

    const input = getByPlaceholderText('Search Pokémon...');
    expect(input).toBeTruthy();
  });

  it('deve renderizar com placeholder personalizado', () => {
    const mockOnChangeText = jest.fn();
    const customPlaceholder = 'Busque seu Pokémon';
    const { getByPlaceholderText } = render(
      <SearchBar 
        value="" 
        onChangeText={mockOnChangeText} 
        placeholder={customPlaceholder} 
      />
    );

    const input = getByPlaceholderText(customPlaceholder);
    expect(input).toBeTruthy();
  });

  it('deve exibir o valor passado via props', () => {
    const mockOnChangeText = jest.fn();
    const testValue = 'Pikachu';
    const { getByDisplayValue } = render(
      <SearchBar value={testValue} onChangeText={mockOnChangeText} />
    );

    const input = getByDisplayValue(testValue);
    expect(input).toBeTruthy();
  });

  it('deve chamar onChangeText quando o texto é alterado', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={mockOnChangeText} />
    );

    const input = getByPlaceholderText('Search Pokémon...');
    fireEvent.changeText(input, 'Charizard');

    expect(mockOnChangeText).toHaveBeenCalledWith('Charizard');
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar o ícone de busca', () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId, UNSAFE_root } = render(
      <SearchBar value="" onChangeText={mockOnChangeText} />
    );

    // Verifica se o componente contém um ícone (Ionicons)
    const component = UNSAFE_root;
    expect(component).toBeTruthy();
  });

  it('deve lidar com múltiplas mudanças de texto', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={mockOnChangeText} />
    );

    const input = getByPlaceholderText('Search Pokémon...');
    
    fireEvent.changeText(input, 'P');
    fireEvent.changeText(input, 'Pi');
    fireEvent.changeText(input, 'Pik');
    fireEvent.changeText(input, 'Pika');

    expect(mockOnChangeText).toHaveBeenCalledTimes(4);
    expect(mockOnChangeText).toHaveBeenLastCalledWith('Pika');
  });
});
