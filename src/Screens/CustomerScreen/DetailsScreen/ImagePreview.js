import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, FlatList, SafeAreaView } from 'react-native';
// import { Header } from '../../../Components/Common';
import Header from '../../../Components/Common/Header'
import { Colors, Images } from '../../../CommonConfig';
import MedicinesImagesPreview from '../../../Components/Common/MedicinesImagesPreview'
import Carousel from 'react-native-snap-carousel';

// import PrescriptionData from '../../../DummyData/PrescriptoinDummydata';
// import PharamaciesData from '../../../DummyData/DummyData';


const Preview = props => {
    // const [selectedImage, setSelectedImage] = useState(null)
    // const pid = props.route.params.id
    // const selectedItem =PrescriptionData.find(item => item.id === pid)
    // const selectedItem =PharamaciesData.find(item => item.simg === image)
    // const currentprescription = props.route.params.prescription
    // const id = props.route.params.images
    const image_123 = props.route.params.images123
    // const item = props.item

    // console.log("\n\nData        ",currentprescription);
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
                    Title="PREVIEW"
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

            {/* <FlatList
                data={image_123.url}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({ item }) => {
                    console.log("\n\n image     ", item);
                    return (
                        <View>
                            <MedicinesImagesPreview
                                image={url}
                                id={item.id}
                                item={item}
                            />
                        </View>
                    )
                }}
            /> */}


            {/* <SafeAreaView style={{flex: 1,}}>
            <View style={{ flex: 1, flexDirection:'row', backgroundColor:Colors.PRIMARY,justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                //   ref={ref => image_123 = ref}
                  data={image_123}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={renderItem}
                />
            </View>
          </SafeAreaView> */}
           
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
        // marginLeft:10, 
        // marginRight:10
    }
});
