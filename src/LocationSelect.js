import React from 'react';
import { Platform, StyleSheet, Alert, View, Button, Dimensions, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Header } from 'react-navigation';

import UserSleepPoint from '../data/UserSleepPoint';

export default class LocationSelect extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '選擇今晚睡覺地點',
    };
  };

  constructor(props){
    super(props);

    this.state = {
      latitude: UserSleepPoint.getIns().latitude, 
      longitude: UserSleepPoint.getIns().longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,

      markerlatitude: UserSleepPoint.getIns().latitude,
      markerlongitude: UserSleepPoint.getIns().longitude,
    };
  }

  onPressUseLocal() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert(
        '錯誤',
        '此功能無法在模擬器上執行'
      );
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    console.debug('try to get location info.');
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert(
        '錯誤',
        '此功能需要取得裝置位置的權限才能夠使用'
      );
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ 
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      markerlatitude: location.coords.latitude,
      markerlongitude: location.coords.longitude,
    });
  };

  onPressSetPoint() {
    UserSleepPoint.getIns().latitude = this.state.markerlatitude;
    UserSleepPoint.getIns().longitude = this.state.markerlongitude;
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ width: windowWidth, height: windowHeight }}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
          onLongPress={ (event) => {
            this.setState({
              markerlatitude: event.nativeEvent.coordinate.latitude,
              markerlongitude: event.nativeEvent.coordinate.longitude
            });
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.markerlatitude,
              longitude: this.state.markerlongitude
            }}
            title={""}
            description={""}
          >
          </MapView.Marker>
        </MapView>
        <View style={styles.note}>
          <Text>長按地圖可以更換睡覺點</Text>
        </View>
        <View style={styles.setPoint}>
          <Button title="決定了! 今晚就在這睡!" onPress={this.onPressSetPoint.bind(this)} />
        </View>
        <View style={styles.useLocal}>
          <Button title="使用我的當前位置" onPress={this.onPressUseLocal.bind(this)} />
        </View>
      </View>
    );
  }
}

const windowHeight = Dimensions.get('window').height - Header.HEIGHT;
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  note: {
    position: 'absolute',
    left: 10,
    top: 10,
  },

  setPoint: { 
    position: 'absolute',
    right: 10,
    top: 10,
  },

  useLocal: { 
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
