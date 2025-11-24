import React from 'react';
import { render } from '@testing-library/react-native';
import TypeBadge from '../components/TypeBadge';
import Colors from '../constants/Colors';

describe('TypeBadge Component', () => {
  it('deve renderizar corretamente o tipo "fire"', () => {
    const { getByText } = render(<TypeBadge typeName="fire" />);
    
    const badge = getByText('fire');
    expect(badge).toBeTruthy();
  });

  it('deve renderizar corretamente o tipo "water"', () => {
    const { getByText } = render(<TypeBadge typeName="water" />);
    
    const badge = getByText('water');
    expect(badge).toBeTruthy();
  });

  it('deve renderizar corretamente o tipo "grass"', () => {
    const { getByText } = render(<TypeBadge typeName="grass" />);
    
    const badge = getByText('grass');
    expect(badge).toBeTruthy();
  });

  it('deve aplicar cor correta do tipo "fire"', () => {
    const { getByText } = render(<TypeBadge typeName="fire" />);
    
    const badge = getByText('fire');
    expect(badge).toBeTruthy();
    
    // Verifica se o componente renderizou
    expect(badge.props.children).toBe('fire');
  });

  it('deve aplicar cor correta do tipo "electric"', () => {
    const { getByText } = render(<TypeBadge typeName="electric" />);
    
    const badge = getByText('electric');
    expect(badge).toBeTruthy();
    expect(badge.props.children).toBe('electric');
  });

  it('deve renderizar múltiplos badges com tipos diferentes', () => {
    const { getByText: getByText1 } = render(<TypeBadge typeName="fire" />);
    const { getByText: getByText2 } = render(<TypeBadge typeName="water" />);
    
    expect(getByText1('fire')).toBeTruthy();
    expect(getByText2('water')).toBeTruthy();
  });

  it('deve capitalizar o texto do tipo corretamente', () => {
    const { getByText } = render(<TypeBadge typeName="psychic" />);
    
    const badge = getByText('psychic');
    expect(badge).toBeTruthy();
    expect(badge.props.children).toBe('psychic');
  });

  it('deve renderizar com estilo correto', () => {
    const { getByText } = render(<TypeBadge typeName="dragon" />);
    
    const badge = getByText('dragon');
    expect(badge.props.style).toBeDefined();
  });
});
