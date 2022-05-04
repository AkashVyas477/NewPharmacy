import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Header, Button, } from '../../Components/Common';
import { Images, Colors } from '../../CommonConfig';

const PrescriptionImageScreen = props => {
    return (
        <View style={styles.main}>
            <View style={styles.header_sty} >
                {/* <StatusBar backgroundColor={selectedItem.bgColor} barStyle='light-content' /> */}
                <Header
                    Title="CREATE REQUEST"
                    onPress={() => props.navigation.goBack()}
                />
            </View>
           
                <View style={{ marginLeft: 20, marginTop: 20 }} >
                    <Text style={{ color: Colors.Sp_Text, fontSize: 15, fontWeight: 'bold' }}>
                        Upload Prescription details
                    </Text>
                </View>

                {/* Image  */}

                <View style={{ flexDirection: 'row', marginTop: 20 }} >

                    <View style={{ marginLeft: 20, }}  >
                        <Image source={Images.PlaceholderImage} style={{ height: 100, width: 100, }} />
                    </View>

                    <View style={{ marginLeft: 20, }}  >
                        <Image source={Images.PlaceholderImage} style={{ height: 100, width: 100, }} />
                    </View>

                    <View style={{ marginLeft: 10, marginBottom:20}}  >
                        <TouchableOpacity >
                        <Image source={Images.Placeholder} style={{ height: 100, width: 100, }} />
                        </TouchableOpacity>
                    </View>

                    {/* Image  */}
                </View>
            {/* divideing Screen   */}
                <View style={styles.navBar}>
                </View>
            {/* divideing Screen   */}

            <View style={styles.main}>
                <View   style={{ flexDirection:'row', justifyContent:'space-between', padding:10, marginTop:15}}>

                <View >
                <Text style={{marginLeft: 15, fontSize:17}}>
                    Medicine Name
                </Text>
                </View>

                <View>
                <TouchableOpacity>
                <Text style={{color:Colors.orange , marginRight:10 , fontSize:15, fontWeight:'bold'}}>
                    ADD
                </Text>
                </TouchableOpacity>
                </View>

                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.White
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.White
    },
    navBar: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        height:10,
      },
    // Medicine_name:{
    //     marginLeft:20, 
    //     marginTop:20,
       
    // }
});

export default PrescriptionImageScreen;