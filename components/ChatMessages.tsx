import { View,Text,ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { useRef } from 'react';

import messages from "../data/messages";

export default function ChatMessages() {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <ScrollView 
      ref={scrollViewRef}
      onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}
    style={{height:"88%"}}>
        {messages.map(message => message.userID === 1 ? (<MyMessageBubble message={message} />) : <OtherMessageBubble message={message} />)}
    </ScrollView>
  );
}

// function scrollViewSizeChanged(height:number, Ref:React.MutableRefObject<null>){
//   // y since we want to scroll vertically, use x and the width-value if you want to scroll horizontally
//   Ref.current
// }

interface MessageData {
  message:Message
}
type Message = {
  text:string;
  time:string;
  userID:number;
}

function MyMessageBubble(props:MessageData) {
  const {message} = props
  return (
    <View style={{
      backgroundColor:'#dfffc7',
      width:"70%",
      alignSelf:'flex-end',
      marginVertical:3,
      marginHorizontal:16,
      padding:10,
      flexDirection:'row',
      borderRadius:5,
      borderColor:'grey',
      borderWidth:0.2
    }}>
      <Text style={{
        fontSize:16,
        width:"70%",
      }}>{message.text}</Text>
      <Text style={{
        fontSize:12,
        color:'grey'
      }}>{message.time}</Text>
    </View>
  )
}


function OtherMessageBubble(props:MessageData) {
  const {message} = props
  return (
    <View style={{
      backgroundColor:'#fcfcfc',
      width:"65%",
      alignSelf:'flex-start',
      marginVertical:3,
      marginHorizontal:16,
      paddingVertical:10,
      paddingHorizontal:5,
      flexDirection:'row',
      borderRadius:5,
      borderColor:'grey',
      borderWidth:0.2,
      alignItems:'stretch',
      alignContent:'space-between'

    }}>
      <Text style={{
        fontSize:16,
        width:"70%",
      }}>{message.text}</Text>
      <View style={{
        flexDirection:'row',
        alignContent:'flex-end',
        justifyContent:'space-between',
        width:'30%',
      }}>
        <Text style={{
          fontSize:12,
          color:'grey'
        }}>{message.time}</Text>
        <View style={{}}>
          <MaterialCommunityIcons name="read" size={16} color="#5bb6c9" />
        </View>
      </View>
    </View>
  )
}
