import React from 'react';
import Logo from '../../assets/logo.svg';
import { Container } from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />

      <nav>
        {
          // Todo
        }
      </nav>
    </header>
  </Container>
);

export default Header;
