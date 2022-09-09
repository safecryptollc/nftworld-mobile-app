import React from "react";
import {
    StyleSheet,
    TextInput,
    StatusBar,
    View,
    Text,
    ScrollView,
    Button,
    SafeAreaView,
    TouchableOpacity, Image,
    Dimensions,
    Linking
} from "react-native";
import {
    useMoralis,
    useMoralisWeb3Api,
    useMoralisWeb3ApiCall,
} from "react-moralis";

import { useTheme } from '@react-navigation/native';
import CustomFastImage from "../CustomFastImage";
import { useNFTBalance } from "../../hooks/useNFTBalance";
import { ActivityIndicator } from "react-native-paper";
import NFTICon from "../Icon";


const blanceData = '[{ "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "9", "amount": "1", "token_hash": "ffab481f2e39f06cd4ee35d0db381d3d", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/9", "metadata": { "name": "Iconic Apes #9", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/09.png", "attributes": [{ "trait_type": "Background", "value": "(66)" }] }, "last_token_uri_sync": "2022-07-18T03:46:36.043Z", "last_metadata_sync": "2022-07-18T03:50:34.754Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/09.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "2", "amount": "1", "token_hash": "ff472911c666b1e1ad7e240581669d28", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/2", "metadata": { "name": "Iconic Apes #2", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/02.png", "attributes": [{ "trait_type": "Background", "value": "(64)" }] }, "last_token_uri_sync": "2022-07-18T03:46:36.042Z", "last_metadata_sync": "2022-07-18T03:46:48.915Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/02.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "22", "amount": "1", "token_hash": "feedcaee9a4bcb4a86d8faa307a66cf2", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/22", "metadata": { "name": "Iconic Apes #22", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/22.png", "attributes": [{ "trait_type": "Background", "value": "(76)" }] }, "last_token_uri_sync": "2022-07-18T03:46:32.629Z", "last_metadata_sync": "2022-07-18T03:46:36.673Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/22.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "14", "amount": "1", "token_hash": "e82774b14783c013bc04c6ff3c369c54", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/14", "metadata": { "name": "Iconic Apes #14", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/14.png", "attributes": [{ "trait_type": "Background", "value": "(48)" }] }, "last_token_uri_sync": "2022-07-18T03:46:36.043Z", "last_metadata_sync": "2022-07-18T03:50:34.754Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/14.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "29", "amount": "1", "token_hash": "dfae76e9bb51d006e7a10bcdd200df65", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/29", "metadata": { "name": "Iconic Apes #29", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/29.png", "attributes": [{ "trait_type": "Background", "value": "(52)" }] }, "last_token_uri_sync": "2022-07-18T03:46:36.041Z", "last_metadata_sync": "2022-07-18T03:46:48.915Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/29.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "16", "amount": "1", "token_hash": "df204eac4717fb23c510d72589202f09", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/16", "metadata": { "name": "Iconic Apes #16", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/16.png", "attributes": [{ "trait_type": "Background", "value": "(37)" }] }, "last_token_uri_sync": "2022-07-18T03:46:32.629Z", "last_metadata_sync": "2022-07-18T03:46:36.672Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/16.png" }]';

const data = JSON.parse(blanceData);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Profile = ({ navigation }) => {
    const { colors } = useTheme();


    const { NFTBalance, fetchSuccess, isLoading } = useNFTBalance();


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        }, scrollview: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: colors.background,
            justifyContent: 'space-between'


        },
        labelBlock: {
            height: 50,
            padding: 10
        },
        label: {
            color: colors.text,
            fontSize: 20
        },
        collectionitem: {

            margin: 2,
            marginTop: 10,
            padding: 10,
            // backgroundColor: colors.background,
            borderRadius: 10,
            borderRadius: 10,
            elevation: 5, //for android
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            paddingBottom: 10,



        },
        center: {
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        }, collectionInfo: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: 50,
            position: 'relative',
            marginTop: 10,
            backgroundColor: colors.secbackground,
            borderRadius: 10,
            elevation: 5, //for android
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            paddingBottom: 10,

        },
        infoItem: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            padding: 5,
            // backgroundColor: 'white',
            height: '100%'

        }, name: {
            marginTop: 10,
            fontSize: 16,
            color: colors.text,
            fontWeight: '800',
        },
        infoBlock: {
            flexDirection: 'row',
            padding: 5,

        }

    });


    const Item = ({ nft, index }) => {
        return <View style={styles.collectionitem}
            onPress={() => { }

            }
            key={index}
        >
            <CustomFastImage
                source={{
                    uri: nft?.image
                }}
                alt=""
                style={{
                    height: 200,
                    width: windowWidth / 2 - 30,
                    borderRadius: 15
                }}
                cacheKey={'profile_' + nft.name.replace(/ /g, '') + '_' + nft.token_id}

            />
            <View style={styles.infoBlock}>
                <View style={{
                    flex: 1,
                    alignContent: 'center',
                    alignItems: 'flex-start'
                }}>
                    <Text style={styles.name}>{nft.name} </Text>
                    <Text style={styles.name}>#{nft.token_id} </Text>
                </View>
                <View style={{
                    flex: 1,
                    alignContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center'

                }}>


                    {/* <TouchableOpacity style={{ padding: 8, backgroundColor: colors.primary, borderRadius: 10 }}>
                        <Text style={{ color: colors.antiText }}>Listxs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 8, backgroundColor: colors.warning, borderRadius: 10 }}>
                        <Text style={{ color: colors.antiText }}>Approve</Text>
                    </TouchableOpacity> */}


                </View>

            </View>



        </View>
    }



    const ManageMetamask = () => {
        return <View style={{ height: 50, backgroundColor: colors.background, padding: 10, justifyContent: 'flex-end' }}>

            <TouchableOpacity onPress={async () => await Linking.openURL("https://metamask.app.link/dapp/market.nftworldapp.com/mycollection")}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <Image
                    style={{ maxWidth: '100%', alignSelf: 'center', height: 25, width: 25 }}
                    source={require("../../assets/images/metamask.png")}

                />

                <Text style={{ color: colors.text, marginLeft: 10 }}>Manage on Metamask</Text>
            </TouchableOpacity>

        </View>
    }
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView
                edges={['bottom', 'left', 'right']} style={{ backgroundColor: colors.secbackground }}>
            </SafeAreaView>
            <View style={styles.labelBlock}>
                <Text style={styles.label}> Your NFT's</Text>
            </View>

            {/* {NFTBalance.length && true || <ManageMetamask />} */}
            <ScrollView contentContainerStyle={styles.scrollview} >




                {NFTBalance.map((nft, key) => <Item nft={nft} index={key} key={key} />)}
                {!NFTBalance.length && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    {isLoading && <ActivityIndicator />}
                    {!isLoading &&
                        <>
                            <NFTICon name={'warning'} color={colors.mute} size={30}

                            />


                            <Text style={{
                                color: colors.mute
                            }}>No NFT's Found</Text>
                        </>
                    }


                </View>}
            </ScrollView>
        </View>
    );
};



export default Profile;
