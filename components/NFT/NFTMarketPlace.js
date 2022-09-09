import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Image, Text, Dimensions, Platform } from 'react-native';
import { useMoralis } from 'react-moralis';
import { useNFTBalance } from '../../hooks/useNFTBalance';
import { useMoralisDapp } from '../../providers/MoralisDappProvider';
import { useTheme } from '@react-navigation/native';
import { Divider, Card } from '@ui-kitten/components';
// import Animation from '../../splashLottie1.json';
// import LottieView from "lottie-react-native";
import { ActivityIndicator } from 'react-native-paper';

import { getNativeByChain } from '../../helpers/networks';

import { getCollectionsByChain } from "../../helpers/collections";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { SearchBar } from 'react-native-elements';
import Header from './Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomFastImage from '../CustomFastImage';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const NFTMarketPlace = ({ navigation }) => {
    const [search, setsearch] = useState('')
    const { NFTBalance, isLoading } = useNFTBalance();
    const { chainId } = useMoralisDapp();
    const { Moralis, user, web3 } = useMoralis();
    const { colors } = useTheme();

    const NFTCollections = getCollectionsByChain('0xa86a');




    const styles = StyleSheet.create({
        collectionBlock: {
            height: 220,
            width: 180,
            backgroundColor: colors.secbackground,
            borderColor: 'grey',
            borderWidth: 1,
            marginBottom: 10,
            borderRadius: 5,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            borderWidth: 0,
            // shadowOffset: { width: 2, height: 2 },
            // shadowColor: colors.text,
            // shadowOpacity: 0.5,
            elevation: 5,

        },
        image: {
            height: 170,
            width: 155,
            borderRadius: 15,
        },
        featuredImage: {
            height: 150,
            width: 180,
            borderRadius: 15,

        },
        headerText: {
            color: colors.text,
            fontWeight: '700',
            fontSize: 19,
            paddingLeft: 10,
            textAlign: 'center'
        },
        itemContainer: {
            backgroundColor: 'white',
            padding: 10,
            borderColor: 'red',
            borderWidth: 1,
            borderStyle: 'solid',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            marginVertical: 10,
            borderRadius: 30,
            // elevation: 5, //for android
            // shadowColor: '#171717',
            // shadowOffset: { width: 0, height: 6 },
            // shadowOpacity: 0.2,
            // shadowRadius: 3,
            paddingBottom: 10,
        },
        itemView: {
            backgroundColor: 'white',
            width: '95%',
            flexDirection: 'column',
            shadowColor: 'black',
            shadowRadius: 40,
        },
        nameBig: {
            fontSize: 20,
            color: '#414a4c',
            fontWeight: '600',
        },
        name: {
            fontSize: 14,
            color: colors.text,
            marginTop: 5,
            fontWeight: '800',
        },
        logo: {
            height: 450,
            borderRadius: 20,
        },
        assetsViewer: {
            borderRadius: 10,
            backgroundColor: 'white',
        }, nfflist: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 20
        },
        FeaturedCollectionBlock: {
            height: 220,
            width: 200,
        },
        iPadCollectionBlock: {
            height: 300,
            width: 300,
            marginLeft: 15

        }
    });
    const Collect = ({ nft, index, navigation }) => <TouchableOpacity
        style={[styles.collectionBlock,
        nft.feautred && styles.FeaturedCollectionBlock,
        nft.feautred && Platform.isPad && { width: windowWidth / 4, height: 400 },
        !nft.feautred && Platform.isPad && styles.iPadCollectionBlock
        ]}
        key={index}
        onPress={() => navigation.navigate('Collection', { collection: nft })}
    >
        <CustomFastImage
            source={{
                uri: nft?.image
            }}
            alt=""
            style={[styles.image,
            nft.feautred && styles.featuredImage,
            nft.feautred && Platform.isPad && { width: '95%' },
            Platform.isPad && { height: '90%' },
            !nft.feautred && Platform.isPad && { width: '100%' }
            ]}
            // cacheKey={nft?.image}
            cacheKey={nft.name.replace(/ /g, '') + '_' + index}
        />
        <Text style={[styles.name, { color: 'white' }]}>{nft.name} </Text>

    </TouchableOpacity>

    return (
        <View style={{
            flex: 1,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: colors.secbackground,
            // backgroundColor: 'red',
        }}>
            <SafeAreaView
                edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.secbackground }}>


                <Header />

            </SafeAreaView>

            <Text style={[
                styles.headerText, { marginTop: 20, color: 'white' }
            ]}> Featured Collections</Text>


            <ScrollView
                contentContainerStyle={{
                    backgroundColor: colors.secbackground,
                    paddingBottom: Platform.isPad ? 0 : 30,
                    paddingTop: Platform.isPad ? 30 : 0

                }}

                showsHorizontalScrollIndicator={false}
                horizontal={true}
                key={"Scsrollview"}
            >

                <View style={
                    [{ flexDirection: 'row', justifyContent: 'center', height: 300 },
                    Platform.isPad && { height: 700 }
                    ]}>
                    {NFTCollections?.filter(x => x.feautred === true)?.map((nft, index) => <Collect
                        navigation={navigation}
                        nft={nft}
                        index={index}
                        key={index} />
                    )

                    }

                </View>
            </ScrollView>
            <View style={{ padding: 15, backgroundColor: colors.background, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderBottom: colors.background, borderWidth: 0.8, borderTopWidth: 0 }}>
                <Text style={styles.headerText}> Exclusive Collections</Text>

            </View>

            <ScrollView
                contentContainerStyle={{
                    backgroundColor: colors.background,
                    paddingTop: 0,
                }}
                showsVerticalScrollIndicator={false}
                key={"Scrollview"}
            >
                <View style={[styles.nfflist,
                Platform.isPad && {
                    justifyContent: 'flex-start',
                    alignItems: 'center',

                }
                ]}>

                    {NFTCollections?.filter(x => x.feautred === false)?.map((nft, index) => {
                        return <Collect
                            navigation={navigation}
                            nft={nft}
                            index={index}
                            key={index}
                        />
                    })
                    }
                </View>

            </ScrollView>
        </View >
    );
};



export default NFTMarketPlace;
