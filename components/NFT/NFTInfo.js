import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Image, Text, FlatList, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const fromatString = (string) => {
    return string ? string.replaceAll('_', ' ').toLowerCase()
        .replace(/\w/, firstLetter => firstLetter.toUpperCase()) : '';
}

const overrideAttrib = ['metadata', 'symbol', 'token_id', 'name', 'amount', 'token_uri', 'token_hash', 'block_number_minted', 'token_address', 'updated_at', 'image', 'last_metadata_sync', 'last_token_uri_sync'];
const NFTInfo = ({ route, navigation }) => {
    const { nft } = route.params
    const { attributes } = nft.metadata || []
    const keys = Object.keys(nft);

    const AttributeBlock = ({ attribute }) => {

        return <View style={styles.attribute}>
            <Text style={styles.trait}>{fromatString(attribute.trait_type)} </Text>
            <Text style={styles.value}>{fromatString(attribute.value)} </Text>
        </View>


    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{
                    uri: nft?.image
                }}
                alt=""
                style={{ width: 410, height: 300, }}
            />

            <Text style={styles.name}>{nft.name}</Text>
            <View style={styles.subnamerow}>
                <Text style={styles.subname}>#{nft.token_id}</Text>
                <Text style={styles.subname}>{nft.contract_type}</Text>
                {nft.symbol && <Text style={styles.subname}>{fromatString(nft.symbol)}</Text>}
                {nft.block_number_minted && <Text style={styles.subname}>{fromatString(nft.block_number_minted)}</Text>}
            </View>

            <View style={styles.row}>
                {attributes.map((attr, index) => <AttributeBlock attribute={attr} index={index} />)}


                {keys.map((key, index) => {
                    if (key != 'metadata' && nft[key] != "" && !overrideAttrib.includes(key)) {
                        return <AttributeBlock attribute={{
                            trait_type: key,
                            value: nft[key]
                        }}
                            index={index} />
                    }

                })}
            </View>

        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    }, row: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        backgroundColor: 'white',
        margin: 5

    }, name: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 18,
        color: '#414a4c',
        fontWeight: '700',
    }, subname: {
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 18,
        color: '#414a4c',
        fontWeight: '800',
    }, subnamerow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 5
    }


});

export default NFTInfo;
