import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Image, Text, FlatList, TextInput, Dimensions, ImageBackground, Platform } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { useNFTTokenIds } from "../../hooks/useNFTTokenIds";

import { SearchBar } from 'react-native-elements';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

import { useMoralisWeb3Api, useMoralisQuery } from "react-moralis";

import Moralis from "moralis/react-native"
import { useIPFS } from '../../hooks/useIPFS'
import CustomModal from './Modal';
import CustomFastImage from '../CustomFastImage';

// import { TextInput } from 'react-native-paper';

import { config } from '../../config';
import NFTICon from '../Icon';


const Collection = ({ route, navigation }) => {

    const { collection } = route.params
    const [search, setsearch] = useState('');
    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('pricehl');
    const [oldFilter, setOldFilter] = useState('pricelh');

    const [limit, setlimit] = useState(50);

    const [nftToBuy, setNftTobuy] = useState({ name: 'loading' });
    const [modalOpen, setModalOpen] = useState(false);

    const { colors } = useTheme();
    const { resolveLink } = useIPFS();

    const Web3Api = useMoralisWeb3Api();
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const { NFTTokenIds, totalNFTs, fetchSuccess, error } = useNFTTokenIds(collection.addrs);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            paddingLeft: 5,
            paddingRight: 5,
        },
        backButton: {
            height: 40,
            width: 40,
            borderRadius: 50,
            backgroundColor: colors.secbackground,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,

            top: 0,
            zIndex: 2
        },
        overview: {

            flexDirection: 'column',
            // borderBottomColor: 'grey',
            // borderBottomWidth: 0.8,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secbackground,
            padding: 20,
            position: 'absolute',
            zIndex: -1,
            width: '100%',
            height: 200


        },
        collectionlist: {
            position: 'relative',
            justifyContent: 'space-around'

        },
        name: {
            marginTop: 10,
            fontSize: 16,
            color: colors.text,
            fontWeight: '800',
        },
        collectionitem: {

            margin: 2,
            marginTop: 10,
            padding: 10,
            backgroundColor: colors.background,
            borderRadius: 10,
            borderRadius: 10,
            elevation: 5, //for android
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            paddingBottom: 10,
            width: windowWidth / 2 - 10,
            height: windowHeight / 3



        },
        center: {
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        }, collectionInfo: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            position: 'relative',
            marginTop: 10,
            backgroundColor: colors.secbackground,
            borderRadius: 10,
            elevation: 5, //for android
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',

        },
        infoItem: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'row',

            // backgroundColor: 'white',
            height: '100%'

        },
        label: {
            color: colors.text,
            fontWeight: '500',
            fontSize: 16,
            fontStyle: 'italic'
        }, search: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
            height: 40,
            borderColor: colors.border,
            borderWidth: 1,
            padding: 10,
            borderRadius: 12
        }, textInput: {
            backgroundColor: colors.background,
            height: 30,
            flex: 9,
            borderWidth: 0,
            color: colors.text
        },
        textInputIcon: {
            marginRight: 5,
            flex: 1
        }


    });

    const queryMarketItems = useMoralisQuery(config.moralisTableName);
    const fetchMarketItems = JSON.parse(
        JSON.stringify(queryMarketItems.data, [
            "objectId",
            "createdAt",
            "price",
            "nftContract",
            "itemId",
            "sold",
            "tokenId",
            "seller",
            "owner",
            "confirmed",
            "canceled"
        ])
    ) || [];



    const getLowestPrice = (address) => {
        let price = 0;

        const result = fetchMarketItems?.filter(
            (e) => e.nftContract.toString().toLowerCase() === address.toString().toLowerCase() && e.canceled == false
        );
        result.map((item) => {

            let tempPrice = Moralis.Units.FromWei(item.price);
            if (tempPrice && !price) {
                price = tempPrice
            } else if (price && price > tempPrice) {
                price = tempPrice;
            }
        })
        return price;
    };



    const Item = ({ collection, nft, index, navigation }) => {
        return <TouchableOpacity style={styles.collectionitem}
            onPress={() => {

                setNftTobuy(nft);
                setModalOpen(true);
            }}
        >
            <View style={{ flex: 4, padding: 10 }}>
                <CustomFastImage
                    source={{
                        uri: nft?.image,
                    }}
                    alt=""
                    style={{
                        borderRadius: 15,
                        height: '100%',
                        width: '100%',
                        resizeMode: "cover",
                        // backgroundColor: 'red'
                    }}
                    cacheKey={collection.name.replace(/ /g, '') + '_' + nft.name.replace(/ /g, '') + '_' + nft.token_id}
                    type='collection-item'
                />
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, padding: 5 }}>
                    <Text style={styles.name}>{nft.name} </Text>
                    <Text style={styles.name}>#{nft.token_id} </Text>
                </View>
                {/* 
                {nft.listed &&
                    <View style={{
                        flex: 1,
                        padding: 0,
                        flexDirection: 'row',
                        width: 60,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        alignContent: 'center'
                    }}>
                        <Image
                            source={require("../../assets/images/avax.png")}
                            alt=""
                            style={{ width: 15, height: 15, borderRadius: 50, margin: 5 }}
                        />
                        <Text style={styles.name}> {Moralis.Units.FromWei(nft.price)}</Text>

                    </View>} */}
            </View>



        </TouchableOpacity>
    }


    const fetchData = async (address, limit, search, filter) => {
        const NFTMetadata = Moralis.Object.extend("nftmetadata");
        const query = new Moralis.Query(NFTMetadata);
        query.equalTo("token_address", address.toLowerCase());
        query.descending("price");

        // if (filter == 'pricehl') {
        //     query.descending("price");
        // } else {
        //     query.ascending("price");

        // }
        query.skip(limit - 50);
        query.limit(limit);

        if (search != '') {
            query.startsWith('token_id', search);
            query.skip(0);
            query.limit(50);

        }
        const results = await query.find();
        // Do something with the returned Moralis.Object values
        let temp = [];

        for (let i = 0; i < results.length; i++) {
            let details = results[i];
            temp.push({
                token_id: details.get('token_id'),
                token_address: details.get('token_address').toLowerCase(),
                amount: details.get('amount'),
                contract_type: details.get('contract_type'),
                name: details.get('name'),
                symbol: details.get('symbol'),
                metadata: details.get('metadata'),
                token_uri: details.get('token_uri'),
                updated_at: details.get('updatedAt'),
                price: details.get('price'),
                listed: details.get('listed')
            })

        }

        return temp;
    }


    const loadData = async (address, limit, search, filter, type) => {

        let res = await getCustomNftz(address, limit, search, filter);

        if (filter === 'pricehl') {
            res = res.sort((a, b) => a.price > b.price ? -1 : 1)
        } else if (search == '') {
            res.sort((a, b) => {
                return (a.price > b.price) && b.price != '0' ? 1 : -1;
            })
        }

        if (type == 'reload') {
            setdata([...data, ...res]);
        } else {
            setdata(res);

        }
    }

    const getCustomNftz = async (addr, limit, search, filter) => {
        let res = await fetchData(addr, limit, search, filter);
        if (res && res.length) {
            for (let NFT of res) {
                if (NFT?.metadata) {
                    NFT.metadata = JSON.parse(NFT.metadata) || {};
                    NFT.image = resolveLink(NFT.metadata?.image);
                } else if (NFT?.token_uri) {
                    try {
                        await fetch(NFT.token_uri)
                            .then((response) => response.json())
                            .then((data) => {
                                NFT.image = resolveLink(data.image);
                            });
                    } catch (error) {

                    }
                }

            }
        }
        return res;


    }


    useEffect(() => {
        loadData(collection.addrs, limit, search, filter, 'auto')
    }, [collection, limit, search, filter])
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView
                edges={['bottom', 'left', 'right']} style={{ backgroundColor: colors.secbackground }}>
            </SafeAreaView>

            <View
                style={styles.collectionlist}
            >
                <View style={{ height: windowHeight / 4.5 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <NFTICon name='arrow-left' color={colors.text} size={20} />

                    </TouchableOpacity>
                    <ImageBackground style={[styles.overview
                        , {
                        flex: 1,
                        resizeMode: '',
                        borderRadius: 12,
                        height: '100%'
                    }
                    ]}
                        source={{
                            uri: collection?.banner
                        }}
                    >
                        <View style={styles.center} >
                            <CustomFastImage
                                source={{
                                    uri: collection?.image
                                }}
                                alt=""
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                                cacheKey={'cover_' + collection.name.replace(/ /g, '')}

                            />

                            <Text style={[styles.name, { color: colors.antiText }]}>{collection.name} {totalNFTs != undefined && '(' + totalNFTs + ')'}</Text>

                            <View style={styles.infoItem}>
                                <Text style={[styles.label, {
                                    color: colors.antiText
                                }]}>Floor Price</Text>
                                <Text style={[styles.label,
                                {
                                    color: colors.antiText
                                }
                                ]}> {getLowestPrice(collection.addrs)} AVAX</Text>
                            </View>

                        </View>
                    </ImageBackground>
                </View>


                <View style={styles.collectionInfo}>
                    <View style={styles.search}>
                        <NFTICon name={'search'} color={colors.primary}
                            size={12}
                            style={styles.textInputIcon}

                        />
                        <TextInput
                            style={styles.textInput}
                            onChange={e => setsearch(e.target.value)}
                        />
                    </View>
                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        {filter === 'pricehl' && <TouchableOpacity
                            onPress={() => {
                                setOldFilter('pricehl')
                                setFilter('pricelh')
                            }}
                        >
                            <Text style={styles.label}> High to Low</Text>

                        </TouchableOpacity>}
                        {filter === 'pricelh' && <TouchableOpacity
                            onPress={() => {
                                setOldFilter('pricelh')
                                setFilter('pricehl')
                            }}
                        >
                            <Text style={styles.label}> Low to High</Text>
                        </TouchableOpacity>}
                        <NFTICon name='refresh' color={colors.primary}
                            size={12}
                            style={{ marginLeft: 5 }} />



                    </View> */}

                </View>



                <ScrollView
                    contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        justifyContent: 'flex-start',
                        alignItems: 'center',

                        // backgroundColor: 'red'

                    }}
                    scrollEventThrottle={16}
                    onScroll={(e) => {
                        let paddingToBottom = 10;
                        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                        if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                            // loadData(collection.addrs, limit + 50, search, filter, 'reload')
                        }
                    }
                    }

                >
                    {data.map((nft1, index) => {
                        return <Item collection={collection} nft={nft1} index={index} navigation={navigation} key={index} />

                    })}
                </ScrollView>
                <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen} nft={nftToBuy} collection={collection} />

            </View>
        </View>

    );
};






export default Collection;