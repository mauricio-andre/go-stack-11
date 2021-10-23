import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Extra {
  value: number;
  quantity: number;
}

interface Order {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  formattedPrice: string;
  thumbnailUrl: string;
  extras: Extra[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const response = await api.get<Order[]>('/orders');

      const ordersList = response.data.map(order => {
        const totalFood = order.quantity * order.price;
        const totalExtra = order.extras.reduce((previous, current) => {
          return previous + current.quantity * current.value;
        }, 0);

        const total = totalFood + totalExtra;

        return {
          ...order,
          formattedPrice: formatValue(total),
        };
      });

      setOrders(ordersList);
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnailUrl }}
                />
              </FoodImageContainer>

              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>

                <FoodDescription>{item.description}</FoodDescription>

                <FoodPricing>{item.formattedPrice}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
