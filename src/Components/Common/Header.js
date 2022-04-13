import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { Colors,Images } from '../../CommonConfig';

const Header = props => {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => (props.navigation.goBack())}
          style={styles.headerStyle}>
            <Image source={Images.Arrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{props.Title}</Text>
      </View>
    );
  };
  
const styles = StyleSheet.create({
    wrapper: {flexDirection: 'row', alignItems: 'center', flex: 1},
    headerStyle: {flex: 0.5, height: 30, width:40, },
    backIcon: {resizeMode: 'contain', height:30, width: 30 },
    headerText: {
        fontSize:20,
      color:Colors.Sp_Text,
      fontWeight:'bold',
    //   paddingLeft:10
    },
  });
  export default Header;
  