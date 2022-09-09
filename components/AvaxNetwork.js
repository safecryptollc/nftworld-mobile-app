import React, { useState } from 'react';
import { View, Modal, Text, Image } from "react-native";
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NFTICon from './Icon';

const Network = [
    {
        type: 'Network Name',
        value: 'Avalanche Mainnet C - Chain'
    },
    {
        type: ' RPC URL',
        value: 'https://api.avax.network/ext/bc/C/rpc'
    },
    {
        type: 'ChainID',
        value: '0xa86a or 43114'
    },
    {
        type: 'Symbol',
        value: 'AVAX'
    },
    {
        type: 'Block Explorer URL',
        value: ' https://cchain.explorer.avax.network'
    },
]

const AvaxNetwork = () => {
    const { colors } = useTheme();
    const [visible, setvisible] = useState(false)


    const NetworkRow = ({ data }) => {
        return <View style={{
            padding: 10
        }}>
            <View style={{
                flexDirection: 'row',
                padding: 10
            }}>

                <Text style={{ flex: 0.6, color: colors.text, fontWeight: 'bold' }}>{data.type} </Text>
                <Text style={{ flex: 1, color: colors.text }}>{data.value}</Text>
            </View>

        </View>

    }
    return (
        <View>

            <TouchableOpacity style={{
                flexDirection: 'row',
                padding: 15, backgroundColor: colors.secbackground, marginTop: 10, alignContent: 'center', justifyContent: 'center', alignItems: 'center'
            }} onPress={() => setvisible(true)}>
                <NFTICon name="info-circle" size={16} color={colors.text} />
                <Text
                    style={{
                        fontSize: 16,
                        color: colors.text,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginLeft: 10
                    }}
                >Avax Network Details</Text>
            </TouchableOpacity>
            <Modal animationType="fade"
                transparent={true}
                visible={visible}
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    // setModalVisible(!modalVisible);
                }}>
                <View
                    style={
                        {
                            flex: 1,

                            margin: 20,
                            marginTop: 50,
                            borderRadius: 20,
                            backgroundColor: colors.background,
                        }
                    }
                >
                    <View style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20
                    }}>
                        <TouchableOpacity style={{ flex: 1 }}
                            onPress={() => setvisible(false)}  >
                            <NFTICon name='close' color={colors.text} size={20} />

                        </TouchableOpacity>

                        <View style={{
                            flex: 8,
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source={require('../assets/images/avax.png')}
                                style={{
                                    width: 25,
                                    height: 25,


                                }} />
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '800',
                                    marginLeft: 10,
                                    color: colors.text

                                }}
                            > Avax Network</Text>
                        </View>




                    </View>
                    <View style={{ padding: 15, backgroundColor: colors.secbackground }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: colors.text,
                                textAlign: "justify",
                                lineHeight: 23
                            }}
                        >Avalanche is an open-source platform for launching decentralized applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem.</Text>
                    </View>

                    <View style={{ padding: 15, backgroundColor: colors.secbackground, marginTop: 10 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: colors.text,
                                fontWeight: 'bold',
                            }}
                        >Avax Network Details</Text>


                    </View>

                    {Network.map((net, index) => <NetworkRow data={net} key={index} />)}

                </View>

            </Modal>
        </View>

    );
};

export default AvaxNetwork;