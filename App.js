import React from 'react';
import { SafeAreaView,StyleSheet,Text } from 'react-native';
import LoginScreen from './Screens/LoginScreen'
const App =()=>{
  return(
    <SafeAreaView>
      <LoginScreen/>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:'#F9FBFC'
  },
});

export default App;


