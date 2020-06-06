import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, ScrollView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { MapView } from 'expo';
import md5 from 'react-native-md5';

import UserSleepPoint from '../data/UserSleepPoint';
import DreamSet from '../data/DreamSet';

export default class ResultScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '睡個好覺讓媽祖托夢',
    };
  };

  componentDidMount(){
    this.setState({
      latitude: UserSleepPoint.getIns().latitude, 
      longitude: UserSleepPoint.getIns().longitude,
    });
  }

  constructor(props){
    super(props);

    this.state = {
      Gender : 2,
      Years : "62",
      
      latitude: 0, 
      longitude: 0,
    };
  }

  onPressMakeDream(){
    let str = this.state.Gender.toString() + "_" + this.state.Years + ":" + this.state.latitude + "/" + this.state.longitude;
    let result = md5.hex_md5(str);
    let total = 0;
    let tmp = '';
    for(let i=0;i<32;i++){
      tmp += result.charCodeAt(i).toString();
      if(tmp.length > 4 || i==31){
        let num = parseInt(tmp, 10);
        total += num;
        tmp = '';
      }
    }
    let code = total % 10000;
    let getCommand = '';
    for(let i=0;i<DreamSet.length;i++){
      let cmdGroup = DreamSet[i];
      if(cmdGroup.Min <= code && code <= cmdGroup.Max){
        let cmdList = cmdGroup.Command;
        let rd = Math.floor(Math.random() * cmdList.length);
        getCommand = cmdList[rd];
        break;
      }
    }

    this.props.navigation.navigate('ResultScreen', {
      Command : getCommand
    });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <StatusBar />
        <View style={{paddingHorizontal: 10, marginTop: 10}}>
          <Text style={styles.text}>我是媽祖最忠實的：</Text>
          <View style={{flexDirection: 'row'}}>
            <CheckBox title="男信徒" checked={this.state.Gender == 1} onPress={() => this.setState({Gender:1})} />
            <CheckBox title="女信徒" checked={this.state.Gender == 2} onPress={() => this.setState({Gender:2})} />
            <CheckBox title="跨性別" checked={this.state.Gender == 3} onPress={() => this.setState({Gender:3})} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>我今年歲數：</Text>
            <TextInput style={styles.input} 
              onChangeText={(Years) => this.setState({Years})}
              value={this.state.Years} keyboardType='number-pad'/>
          </View>
          <Text style={styles.text}>我今天晚上要睡在這裡：</Text>
          <Button title="選擇睡覺地點" onPress={() => {
            this.props.navigation.navigate('LocationSelect', {
              onGoBack: () => this.componentDidMount(),
            });
          }} />
          <MapView
              style={{ height: windowHeight * 0.35 }}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              scrollEnabled = {false}
              onPress={() => {
                this.props.navigation.navigate('LocationSelect', {
                  onGoBack: () => this.componentDidMount(),
                });
              }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude
              }}
              title={""}
              description={""}
            />
          </MapView>
        </View>
        <View style={{paddingHorizontal: 10, marginBottom: 10}}>
          <Button title="善男信女誠心請媽祖前來託夢" onPress={this.onPressMakeDream.bind(this)} />
        </View>
      </View>
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  text : {
    fontSize : 22
  },

  input: {
    marginLeft: 5,
    width: 60,
    height: 25,
    fontSize: 22,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
});