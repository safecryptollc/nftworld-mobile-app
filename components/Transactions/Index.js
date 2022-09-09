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
    useMoralisQuery,
    useMoralisWeb3Api,
    useMoralisWeb3ApiCall,
} from "react-moralis";




import { useTheme } from '@react-navigation/native';
import { Badge } from "react-native-paper";
import CustomFastImage from "../CustomFastImage";
const blanceData = '[{ "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "9", "amount": "1", "token_hash": "ffab481f2e39f06cd4ee35d0db381d3d", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/9", "metadata": { "name": "Iconic Apes #9", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/09.png", "attributes": [{ "trait_type": "Background", "value": "(66)" }] }, "last_token_uri_sync": "2022-07-18T03:46:36.043Z", "last_metadata_sync": "2022-07-18T03:50:34.754Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/09.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "2", "amount": "1", "token_hash": "ff472911c666b1e1ad7e240581669d28", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/2", "metadata": { "name": "Iconic Apes #2", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/02.png", "attributes": [{ "trait_type": "Background", "value": "(64)" }] }, "last_token_uri_sync": "2022-07-18T03:46:36.042Z", "last_metadata_sync": "2022-07-18T03:46:48.915Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/02.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "22", "amount": "1", "token_hash": "feedcaee9a4bcb4a86d8faa307a66cf2", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/22", "metadata": { "name": "Iconic Apes #22", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/22.png", "attributes": [{ "trait_type": "Background", "value": "(76)" }] }, "last_token_uri_sync": "2022-07-18T03:46:32.629Z", "last_metadata_sync": "2022-07-18T03:46:36.673Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/22.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "14", "amount": "1", "token_hash": "e82774b14783c013bc04c6ff3c369c54", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/14", "metadata": { "name": "Iconic Apes #14", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/14.png", "attributes": [{ "trait_type": "Background", "value": "(48)" }] }, "last_token_uri_sync": "2022-07-18T03:46:36.043Z", "last_metadata_sync": "2022-07-18T03:50:34.754Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/14.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "29", "amount": "1", "token_hash": "dfae76e9bb51d006e7a10bcdd200df65", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/29", "metadata": { "name": "Iconic Apes #29", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/29.png", "attributes": [{ "trait_type": "Background", "value": "(52)" }] }, "last_token_uri_sync": "2022-07-18T03:46:36.041Z", "last_metadata_sync": "2022-07-18T03:46:48.915Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/29.png" }, { "token_address": "0x412af954e521f17fa13cd8f2983a1e612db6bb2b", "token_id": "16", "amount": "1", "token_hash": "df204eac4717fb23c510d72589202f09", "block_number_minted": "17471564", "updated_at": null, "contract_type": "ERC721", "name": "Iconic Apes", "symbol": "IAPES", "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmR73rRPpg8CEhH5wTGewVAQQNEEF4mGqVdx1ovaFAW7uA/16", "metadata": { "name": "Iconic Apes #16", "description": "31 Unique Iconic Apes", "image": "ipfs://QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/16.png", "attributes": [{ "trait_type": "Background", "value": "(37)" }] }, "last_token_uri_sync": "2022-07-18T03:46:32.629Z", "last_metadata_sync": "2022-07-18T03:46:36.672Z", "image": "https://gateway.ipfs.io/ipfs/QmbR9QA5BhN6JxM4PYDevMWjPmcXfZDsWHt4BF9kbzHXLu/16.png" }]';

// const data = JSON.parse(blanceData);
import { config } from "../../config";

import { useMoralisDapp } from "../../providers/MoralisDappProvider";
import NFTICon from "../Icon";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;




const Transactions = ({ navigation }) => {
    const { colors } = useTheme();
    const { chainId, marketAddress, contractABI, } =
        useMoralisDapp();


    const { Moralis, user } = useMoralis();
    const walletAddress = user?.ethAddress || '';

    const queryItemImages = useMoralisQuery("ItemImages");

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.secbackground,
        }, scrollview: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: colors.background,
        },
        labelBlock: {
            height: 50,
            padding: 10,
            backgroundColor: colors.background
        },
        label: {
            color: colors.text,
            fontSize: 20
        },
        collectionitem: {
            flexDirection: 'row',
            padding: 10,
            backgroundColor: colors.secbackground,
            borderRadius: 10,
            borderRadius: 10,
            elevation: 5, //for android
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            paddingBottom: 10,
            // backgroundColor: 'red',
            height: windowHeight / 10,
            width: windowWidth - 10,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center'



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
            paddingLeft: 10

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
            flex: 1,
            flexDirection: 'row',
            padding: 5,
            marginLeft: 10,

        }

    });

    const fetchItemImages = JSON.parse(
        JSON.stringify(queryItemImages.data, [
            "nftContract",
            "tokenId",
            "name",
            "image",
        ])
    );
    const queryMarketItems = useMoralisQuery(config.moralisTableName);


    const fetchMarketItems = JSON.parse(
        JSON.stringify(queryMarketItems.data, [
            "objectId",
            "updatedAt",
            "price",
            "nftContract",
            "itemId",
            "sold",
            "tokenId",
            "seller",
            "owner",
            "canceled",
        ])
    )
        .filter(
            (item) =>
                item.seller.toLowerCase() === walletAddress.toLowerCase() ||
                item.owner.toLowerCase() === walletAddress.toLowerCase()
        )
        .sort((a, b) =>
            a.updatedAt < b.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
        );

    const data = fetchMarketItems?.map((item, index) => ({
        key: index,
        objectId: item.objectId,
        date: moment(item.updatedAt).format("DD-MM-YYYY HH:mm"),
        collection: item.nftContract,
        item: item.tokenId,
        itemId: item.itemId,
        canceled: item.canceled,
        tags: [item.seller, item.sold],
        sold: item.sold,
        seller: item.seller,
        price: Moralis.Units.FromWei(item.price),
        image: getImage(item.nftContract, item.tokenId)
    }));

    function getImage(addrs, id) {
        const img = fetchItemImages.find(
            (element) =>
                element.nftContract.toLowerCase() === addrs.toLowerCase() &&
                element.tokenId === id
        );
        return img?.image;
    }

    function getName(addrs, id) {
        const nme = fetchItemImages.find(
            (element) =>
                element.nftContract.toLowerCase() === addrs.toLowerCase() &&
                element.tokenId === id
        );
        return nme?.name;
    }

    const ManageMetamask = () => {
        return <View style={{ height: 50, backgroundColor: colors.background, padding: 10, justifyContent: 'flex-end' }}>

            <TouchableOpacity onPress={async () => await Linking.openURL("https://metamask.app.link/dapp/market.nftworldapp.com/transactions")}
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

                    borderRadius: 15,
                    height: 50,
                    width: 50
                }}
                cacheKey={'transaction_' + nft.name.replace(/ /g, '') + '_' + nft.token_id}

            />
            <View style={styles.infoBlock}>
                <Text style={styles.name}>{nft.name} </Text>
                <Text style={styles.name}>#{nft.token_id} </Text>
            </View>
            {/* <View style={{ ...styles.infoBlock, justifyContent: 'flex-end' }}>
                <View style={{
                    backgroundColor: colors.warning,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 25,
                    padding: 4,
                    rborderRadius: 10

                }}>
                    <FontAwesomeIcon icon={faClose} color={colors.secbackground} />
                    <Text >Canceled</Text>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors.text,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 25,
                    padding: 4,
                    borderRadius: 10

                }}>
                    <FontAwesomeIcon icon={faClose} color={colors.secbackground} />
                    <Text >Cancel</Text>
                </TouchableOpacity>
                <View style={{
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    height: 25,
                    padding: 4,
                    borderRadius: 10

                }}>
                    <FontAwesomeIcon icon={faWarning} color={colors.secbackground} />
                    <Text >Waiting</Text>
                </View>
                <View style={{
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    height: 25,
                    padding: 4,
                    borderRadius: 10

                }}>
                    <FontAwesomeIcon icon={faTicket} color={colors.secbackground} />
                    <Text >Purchased</Text>
                </View>
             <Badge style={{ backgroundColor: colors.primary }}>
                    <Text>Pending</Text>
                </Badge>
                <Badge style={{ backgroundColor: colors.text }}>
                    <Text>Cancel Listing</Text>
                </Badge> 
            </View> */}

        </View>




    }



    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView
                edges={['bottom', 'left', 'right']} style={{ backgroundColor: colors.secbackground }}>
            </SafeAreaView>
            <View style={styles.labelBlock}>
                <Text style={styles.label}> Your Transactions</Text>
            </View>
            {/* <ManageMetamask /> */}
            <ScrollView contentContainerStyle={styles.scrollview} >

                {data.map((nft, key) => <Item nft={nft} index={key} key={key} />)}
                {!data.length && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    <NFTICon name={'warning'} color={colors.mute} size={30}

                    />


                    <Text style={{
                        color: colors.mute
                    }}>No Transaction Found</Text>

                </View>}
            </ScrollView>
        </View>
    );
};



export default Transactions;
