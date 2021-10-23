import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </View>
  );
};

export default App;
