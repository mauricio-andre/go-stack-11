import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { MyNavigationProps } from '../../@types/MyNavigationProps';
import { useAuth } from '../../context/AuthContext';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
} from './styles';

interface routeParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation<MyNavigationProps>();
  const { providerId } = route.params as routeParams;

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiro</HeaderTitle>

        <UserAvatar source={{ uri: user.avatarUrl }} />
      </Header>
    </Container>
  );
};

export default CreateAppointment;
