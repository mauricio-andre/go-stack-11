import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
} from './styles';
import { useCart } from '../../hooks/cart';
import formatValue from '../../utils/formatValue';

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface FlatListProductRenderItemProps {
  item: Product;
}

const Cart: React.FC = () => {
  const { increment, decrement, products } = useCart();

  async function handleIncrement(id: string): Promise<void> {
    await increment(id);
  }

  async function handleDecrement(id: string): Promise<void> {
    await decrement(id);
  }

  const cartTotal = useMemo(() => {
    const total = products.reduce((price, product) => {
      return price + product.price * product.quantity;
    }, 0);

    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const total = products.reduce((quantity, product) => {
      return quantity + product.quantity;
    }, 0);

    return total;
  }, [products]);

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={(props: FlatListProductRenderItemProps) => (
            <Product>
              <ProductImage source={{ uri: props.item.imageUrl }} />

              <ProductTitleContainer>
                <ProductTitle>{props.item.title}</ProductTitle>

                <ProductPriceContainer>
                  <ProductSinglePrice>
                    {formatValue(props.item.price)}
                  </ProductSinglePrice>

                  <TotalContainer>
                    <ProductQuantity>{`${props.item.quantity}x`}</ProductQuantity>

                    <ProductPrice>
                      {formatValue(props.item.price * props.item.quantity)}
                    </ProductPrice>
                  </TotalContainer>
                </ProductPriceContainer>
              </ProductTitleContainer>

              <ActionContainer>
                <ActionButton
                  testID={`increment-${props.item.id}`}
                  onPress={() => handleIncrement(props.item.id)}
                >
                  <FeatherIcon name="plus" color="#E83F5B" size={16} />
                </ActionButton>

                <ActionButton
                  testID={`decrement-${props.item.id}`}
                  onPress={() => handleDecrement(props.item.id)}
                >
                  <FeatherIcon name="minus" color="#E83F5B" size={16} />
                </ActionButton>
              </ActionContainer>
            </Product>
          )}
        />
      </ProductContainer>

      <TotalProductsContainer>
        <FeatherIcon name="shopping-cart" color="#fff" size={24} />

        <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>

        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;
