import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Header } from '../../../Components/Common';
import { Colors, Images } from '../../../CommonConfig';
import MedicinesImagesPreview from '../../../Components/Common/MedicinesImagesPreview'
import Carousel from 'react-native-snap-carousel';
import { useTranslation } from 'react-i18next';




const Preview = props => {
    const {t}= useTranslation()
    const image_123 = props.route.params.images123
    console.log("\n\nData        ", image_123);



    const renderItem=({item,index})=>{
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 50,
              marginLeft: 25,
              marginRight: 25, }}>
            <Image source={{ uri: image_123.url }} resizeMode='center' style={styles.preview} />
          </View>

        )
    }


    return (
        <View style={styles.screen}>
            <View style={styles.header_sty}>
                <Header
                    Title={t('common:PREVIEW')}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            >
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: image_123.url }} resizeMode='center' style={styles.preview} />
                </View>
            </ScrollView>
           
        </View>
    );
};

export default Preview;

const styles = StyleSheet.create({
    screen: {
        flex: 1

    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    Preview: {
        height: 210,
        width: '90%',
        borderRadius: 40,
        overflow: 'hidden',
        marginTop: 180,
        marginLeft: 5,
        marginRight: 5
    },
    preview:
    {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        resizeMode: 'contain',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 100,
    }
});
