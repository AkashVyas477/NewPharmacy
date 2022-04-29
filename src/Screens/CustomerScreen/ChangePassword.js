import React from 'react';
import {View, Text , StyleSheet , TextInput} from 'react-native';
import { Colors} from '../../CommonConfig';
import { Header, Button } from '../../Components/Common';

const ChangePassword = props =>{
    return(
        <View style={styles.screen}>
            <View style={styles.header}>
           <Header
           Title="CHANGE PASSWORD"
           onPress={() => props.navigation.goBack()}
           />
</View>
{/* Body */}
<View style={styles.Body}>
           <View >
                <Text style={{ paddingHorizontal: 5, marginLeft: 20, fontSize: 17 }}>
                    Current Password
                </Text>
                <View >
                    <View style={{ paddingHorizontal: 1, marginLeft: 20, marginRight: 20, fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor }}>
                        <TextInput
                            placeholder="Current Password"
                        />
                    </View>
                </View>
            </View>

            <View>
                <Text style={{ paddingHorizontal: 5, marginLeft: 20, fontSize: 17 }}>
                    New Password
                </Text>
                <View >
                    <View style={{ paddingHorizontal: 1, marginLeft: 20, marginRight: 20, fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor }}>
                        <TextInput
                            placeholder="New Password"
                        />
                    </View>
                </View>
            </View>

            <View>
                <Text style={{ paddingHorizontal: 5, marginLeft: 20, fontSize: 17 }}>
                Confirm Password
                </Text>
                <View >
                    <View style={{ paddingHorizontal: 1, marginLeft: 20, marginRight: 20, fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor }}>
                        <TextInput
                            placeholder="Confirm Password"
                        />
                    </View>
                </View>
            </View>

            </View>
        </View>
    );
};

const  styles=StyleSheet. create({
    screen:{
        flex:1,
        backgroundColor:'white',
    },
    Body:{paddingTop:10, marginBottom:20},
    header:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5, 
        padding:10
    },
});

export default ChangePassword;