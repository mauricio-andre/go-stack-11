import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { MyNavigationProps } from '../../@types/MyNavigationProps';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from './styles';

interface RouteParams extends RouteProp<ParamListBase> {
  params: {
    providerId: string;
  };
}

export interface Provider {
  id: string;
  name: string;
  avatarUrl: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute<RouteParams>();
  const { goBack } = useNavigation<MyNavigationProps>();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    route.params.providerId,
  );

  useEffect(() => {
    api.get(`/providers`).then(response => {
      setProviders(response.data);
    });
  }, [route.params.providerId]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiro</HeaderTitle>

        <UserAvatar source={{ uri: user.avatarUrl }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={selectedProvider === provider.id}
            >
              <ProviderAvatar source={{ uri: provider.avatarUrl }} />
              <ProviderName selected={selectedProvider === provider.id}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
    </Container>
  );
};

export default CreateAppointment;
