import { StyleSheet, TouchableOpacity, Text, View ,ImageBackground,TextInput} from 'react-native';

import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import ChatMessages from '../components/ChatMessages';

export default function Chat() {
  const whatsappBackgroundImg = '../assets/images/whatsapp.png'
  
  return (
    <View style={{flex:1}}>
     <ImageBackground style={{flex:1}} source={require(whatsappBackgroundImg)} resizeMode="cover" >
    <ChatMessages />
     <SendButton />
    </ImageBackground>
    </View>
  );
}



function SendButton() {
  return (<View style={{
    height:'12%',
    padding:'3%',
    flexDirection:'row'
  }}>
    {/* Textbox bit */}
    <View style={{
      backgroundColor:'white',
      width:'80%',
      flexDirection:'row',
      alignItems:'center',
      // alignContent:'center',
      // justifyContent:'center',
      height:'70%',
      paddingHorizontal:'2%',
      borderRadius:5
    }}>

      <Entypo name="emoji-happy" size={24} color="#7e8689" />
      <TextInput style={{width:'75%',marginHorizontal:'3%',fontSize:20,color:'#0e0e0e',opacity:0.3}} value="Type a message"/>

      <Entypo name="camera" size={24} color="#7e8689" />
    </View>
    <View style={{ height:'70%',width:'25%',alignItems:'center',justifyContent:'center',alignContent:'center'}}>
      <View style={{backgroundColor:'#008879',borderRadius:50,height:50,width:50,alignItems:'center',justifyContent:'center'}}>
        <FontAwesome5 name="microphone" size={24} color="white" />
      </View>
    </View>
  </View>)
}

