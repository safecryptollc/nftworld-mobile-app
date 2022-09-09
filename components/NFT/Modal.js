import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity, ScrollView, Image, Linking } from "react-native";
import { useTheme } from '@react-navigation/native';
import { useWeb3ExecuteFunction, useWeb3Contract } from "react-moralis";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Moralis from "moralis/react-native"


import { config } from "../../config";
import OpenApp from "react-open-app";
import CustomFastImage from "../CustomFastImage";
import NFTICon from "../Icon";


const fromatString = (string) => {
    return string ? string.replaceAll('_', ' ').toLowerCase()
        .replace(/\w/, firstLetter => firstLetter.toUpperCase()) : '';
}


const CustomModal = ({ nft, collection, modalOpen, setModalOpen }) => {

    const { height, width } = Dimensions.get('window');


    const { colors } = useTheme();

    const contractProcessor = useWeb3ExecuteFunction();



    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",


        },
        modalView: {
            margin: 20,
            backgroundColor: colors.secbackground,
            borderRadius: 20,
            padding: 10,
            // alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            height: height - 150,
            width: width - 50,
            borderRadius: 25,
            borderColor: colors.background,
            borderWidth: 0.7,
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2
        },
        buttonOpen: {
            backgroundColor: "#F194FF",
        },
        buttonClose: {
            backgroundColor: "#2196F3",
        },
        textStyle: {
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 20
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
        },
        backButton: {
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            position: 'absolute',
            top: 0,
            zIndex: 2
        }, container: {
            backgroundColor: colors.background,
            flex: 1,

        }, row: {
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors.background,

        }, trait: {
            fontSize: 15,
            fontWeight: '800',
            textAlign: 'center'
        }, value: {
            fontSize: 16,
            fontWeight: '300',
            textAlign: 'center'
        }, attribute: {
            flexDirection: 'column',
            width: 180,
            borderColor: 'grey',
            borderWidth: 0.7,
            padding: 10,
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 3,
            borderRadius: 10,
            backgroundColor: "#c1dfe8"
        },
        row: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'space-around',
            justifyContent: 'space-around',
            padding: 10,
            borderColor: 'white',
            borderWidth: 0.7,
            backgroundColor: colors.background,
            margin: 5

        }, name: {
            marginTop: 10,
            marginBottom: 10,
            textAlign: 'center',
            fontSize: 18,
            color: colors.text,
            fontWeight: '700',
        }, subname: {
            marginBottom: 5,
            textAlign: 'center',
            fontSize: 18,
            color: colors.text,
            fontWeight: '800',
        }, subnamerow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            // backgroundColor: colors.secbackground,
            margin: 5,
            padding: 10,
            borderRadius: 5
        }, buyButton: {
            backgroundColor: colors.icon,
            padding: 20, margin: 10

        }, button: {
            marginTop: 10,
            backgroundColor: colors.icon,
            padding: 20,
            margin: 10
        }

    });



    // const fetchMarketItems = JSON.parse(
    //     JSON.stringify(queryMarketItems.data, [
    //         "objectId",
    //         "createdAt",
    //         "price",
    //         "nftContract",
    //         "itemId",
    //         "sold",
    //         "tokenId",
    //         "seller",
    //         "owner",
    //         "confirmed",
    //         'canceled'
    //     ])
    // );
    const getMarketItem = (nft) => {
        // const result = fetchMarketItems?.find(
        //     (e) =>
        //         e.nftContract === nft?.token_address &&
        //         e.tokenId === nft?.token_id &&
        //         e.sold === false && e.canceled == false
        // );
        // return result;
    };

    async function purchase() {

        // const tokenDetails = getMarketItem(nft);
        // console.log(nft);
        const tokenPrice = Moralis.Units.Token(nft.price, "18");;
        const purchaseItemFunction = "createMarketSale";
        const ops = {
            contractAddress: config.marketAddress,
            functionName: purchaseItemFunction,
            abi: JSON.parse(config.abi),
            params: {
                nftContract: nft.token_address,
                itemId: nft.token_id,
            },
            msgValue: tokenPrice,
        };

        try {
            await contractProcessor.fetch({
                params: ops,
                onSuccess: () => {
                    console.log('success');
                },
                onError: (error) => {
                    console.log('error');
                    console.log(error);

                },
            }).catch(error => console.log(error));
        } catch (error) {
            console.log(error)
        }


    }


    const test = async (address, token_id) => {
        const NFTMarketData = Moralis.Object.extend(config.moralisTableName);
        const query = new Moralis.Query(NFTMarketData);
        query.equalTo("token_address", address.toLowerCase());
        query.equalTo("token_id", token_id.toLowerCase());
        const results = await query.find();
        console.log(results);
    }



    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalOpen}
                onRequestClose={() => {

                    setModalOpen(!modalOpen);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>


                        <ScrollView contentContainerStyle={styles.container}>
                            <TouchableOpacity onPress={() => setModalOpen(!modalOpen)} style={styles.backButton}>
                                <NFTICon name='close' color={colors.text} size={20} />

                            </TouchableOpacity>
                            <View style={{ height: 300 }}>
                                <CustomFastImage
                                    source={{
                                        uri: nft?.image
                                    }}
                                    alt=""
                                    style={{ width: '100%', height: '100%', borderRadius: 25 }}
                                    cacheKey={collection.name.replace(/ /g, '') + '_' + nft.name.replace(/ /g, '') + '_' + nft.token_id}


                                />
                            </View>

                            <TouchableOpacity >

                                <Text style={styles.name}>{nft.name}   </Text>
                            </TouchableOpacity>

                            <View style={styles.subnamerow}>
                                <Text style={styles.subname}>#{nft.token_id}</Text>
                                <Text style={styles.subname}>{nft.contract_type}</Text>
                                {nft.symbol && <Text style={styles.subname}>{fromatString(nft.symbol)}</Text>}
                                {nft.block_number_minted && <Text style={styles.subname}>{fromatString(nft.block_number_minted)}</Text>}
                            </View>

                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
                                {collection.description && <View style={{ padding: 20, borderRadius: 12, margin: 5, backgroundColor: colors.secbackground, minHeight: 100 }}>
                                    <Text style={{ color: colors.text }}>{collection.description}</Text>

                                </View>}
                                <View style={styles.buyButtonBlock}>



                                    {!nft.listed && <View style={styles.buyButton}>
                                        <Text style={styles.name}>Not Listed For Sale</Text>
                                    </View >}


                                    {nft.listed &&
                                        [
                                            <View key="nftpricekey">
                                                <View
                                                    style={[styles.button, {
                                                        flexDirection: 'column',
                                                        alignItems: 'center',

                                                        justifyContent: 'center'

                                                    }]}
                                                >
                                                    <Text style={styles.name}>{nft.price / ("1e" + 18) + ' AVAX'}</Text>


                                                </View>
                                                {/* <TouchableOpacity style={[styles.button, {
                                                    flexDirection: 'column',
                                                    alignItems: 'center',

                                                    justifyContent: 'center'

                                                }]}
                                                    onPress={async () => await Linking.openURL(`https://metamask.app.link/dapp/market.nftworldapp.com/from-app/${collection.addrs}/${nft.token_id}`)}
                                                >
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Image
                                                            style={{ maxWidth: '100%', alignSelf: 'center', height: 25, width: 25 }}
                                                            source={require("../../assets/images/metamask.png")}
                                                        />
                                                        <Text style={styles.name}> Browse with Metamask </Text>

                                                    </View>


                                                </TouchableOpacity> */}
                                            </View>

                                        ]}



                                </View>

                            </View>



                        </ScrollView >




                    </View>
                </View >
            </Modal >

        </View >
    );
};



export default CustomModal;