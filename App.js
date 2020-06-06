import React from 'react';
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer, } from "react-navigation";
import { Icon } from 'react-native-elements';

import MainScreen from './src/MainScreen';
import LocationSelect from './src/LocationSelect';
import ResultScreen from './src/ResultScreen';

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#000',
  },
  headerBackImage: (
    <Icon
      name="navigate-before"
      size={30}
      color="white"
    />
  ),
  headerTitleStyle:(
    {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 22,
    }
  ),
}

const AppNavigator = createStackNavigator(
  {
    MainScreen:     { screen: MainScreen },
    LocationSelect: { screen: LocationSelect, },
    ResultScreen:   { screen: ResultScreen, },
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'float',
    defaultNavigationOptions: defaultOptions,
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
