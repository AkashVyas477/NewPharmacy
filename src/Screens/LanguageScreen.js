import React from 'react';
import {View, Text , StyleSheet} from 'react-native';
// import Selector from './Components/Common/LanguageSelector';
import Selector  from '../Components/Common/LanguageSelector'
import Header from '../Components/Common/Header'
import { useTranslation } from 'react-i18next';

const LanguageScreen = props =>{
    const {t}= useTranslation();
    return(
        <View style={styles.screen}>

            <View style={styles.header_sty}>
                <Header
                    Title={t('common:LanguageScreen')}
                    onPress={() => props.navigation.goBack()
                   
                    // props.navigation.dispatch(
                    //     CommonActions.reset({
                    //         index:0,
                    //         routes:[{name:'PharamacistDrawer'}]
                    //     })
                    // )
                    }
                />
            </View>
            <Selector />
        </View>
    );
};

const  styles=StyleSheet. create({
    screen:{
        flex:1,
        backgroundColor:'white',
    },
     header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
});

export default LanguageScreen;