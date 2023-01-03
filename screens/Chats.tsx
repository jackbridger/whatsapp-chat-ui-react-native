import { StyleSheet,Image,Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import {  } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ChatsScreen({ navigation }: RootTabScreenProps<'Chats'>) {
  
  return (
    <View style={styles.container}>

      <ChatPreview />  
    
    </View>
  );
}

function ChatPreview() {
  const navigation = useNavigation();

  const imgSrc = '../assets/images/wave.png'
  const _onPress = () => {
    navigation.navigate('Chat')
  }

  return <TouchableOpacity onPress={_onPress} style={{width:'90%',height:'12%',flexDirection:'row',justifyContent:'space-around', }}>
    
  <View style={{flexDirection:'row',width:"90%", height:"100%",alignItems:'center'}}>
    <Image style={{width: 50, height: 50, marginRight:10, borderRadius:50}}  source={require(imgSrc)} />
    <View>
      <Text style={{fontWeight:'bold',color: '#3d3d3d'}}>Weekend</Text>
      <Text style={{color: '#313131'}}>Sofia: Sticker</Text>
    </View>
  </View>
  <View style={{flexDirection:'row',alignItems:'center'}}>
    <View style={{flexDirection:'column',alignItems:'center'}}>
    <Text style={{color:'#09d261'}}>9:29</Text>
    <View style={{backgroundColor:'#09d261', height:20,width:20,borderRadius:50,padding:0,margin:0,alignItems:'center',justifyContent:'center'}}>
      <Text style={{color:'white',fontWeight:'bold',padding:0,margin:0}}>2</Text>
    </View>
  </View>
  </View>
</TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    color: '#313131',
    backgroundColor:'#ffffff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#eef4f2',
    padding: '3%'
  },
  message: {
    color: '#313131'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
