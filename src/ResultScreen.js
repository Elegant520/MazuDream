import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Button } from 'react-native';

export default class ResultScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '媽祖顯靈',
    };
  };

  render() {
    return (
      <ScrollView>
        <View style={{flex:1, alignItems: 'center', width: windowWidth}}>
          <Image source={require('../assets/mazu.jpg')} style={{width: windowWidth, height: windowWidth}} />
          <Text style={styles.text}>媽祖說：{this.props.navigation.getParam('Command')}</Text>
          <View style={{paddingHorizontal: 10, marginBottom: 10, width: windowWidth}}>
            <Button title="再睡一次" onPress={() => this.props.navigation.goBack()} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  text : {
    fontSize: 40,
    padding: 10,
  },
});