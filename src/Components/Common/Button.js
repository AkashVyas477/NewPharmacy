import {StyleSheet, View, Text, TouchableOpacity,ActivityIndicator} from 'react-native';
import React from 'react';
import { Colors,Images } from '../../CommonConfig';


const Button =({
  label,
  onPress,
  color,
  backgroundColor,
  style,
  textStyle,
  showActivityIndicator,
  inidicatorColor,
  disabled,
})=>{
    return(
      <TouchableOpacity 
      delayPressIn={0}
      style={{ padding: 10 }} 
      onPress={onPress} 
      
      >
      <View style={styles.buttoncon}>
      {showActivityIndicator ? (
        <ActivityIndicator
          color={inidicatorColor ? inidicatorColor : Colors.PRIMARY_COLOR}
          size="small"
        />
      ) : (
          <Text style={[styles.ButtonLabel,{color:color ?? Colors.White}, textStyle]}>
              {label}
          </Text>
          )}
      </View>
      
  </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  ButtonLabel: {
    color: Colors.ButtonTextColor,
     textAlign: 'center',
 },
 buttoncon: {
     backgroundColor:Colors.PRIMARY,
     borderRadius: 10,
     height: 50,
     width: "100%",
     justifyContent: 'center',
 },
})
export default Button;