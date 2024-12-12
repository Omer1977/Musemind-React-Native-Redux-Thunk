//import liraries
import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainNavigator from './src/router/rootNavigator';
import {Provider} from 'react-redux';
import store from './src/store';

// create a component
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
