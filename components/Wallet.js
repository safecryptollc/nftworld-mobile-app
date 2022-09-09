import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,

} from "react-native";
import {
    Button,
    Paragraph,
    Dialog,
    Portal,
    Provider,
    ActivityIndicator,
} from "react-native-paper";

import {
    useMoralis,

} from "react-moralis";

import { useWalletConnect } from "../WalletConnect";



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
    )}`;
}

import { useTheme } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import AvaxNetwork from "./AvaxNetwork";

import Header from "./NFT/Header";
const LoginScreen = ({ navigation }) => {
    const { web3, Moralis, user, authenticate, authError, isAuthenticated, isAuthenticating } =
        useMoralis();
    const connector = useWalletConnect();
    const { colors } = useTheme();




    const [visible, setVisible] = React.useState(false);
    const [walletAddress, setWalletAddress] = React.useState('');

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);


    const handleCryptoLogin = async () => {

        // navigation.replace("BottomNav");

        const user = await authenticate({
            connector, signingMessage: "Sign To NFTWorld App",
            chainId: 43114,
            onComplete: async () => {

                console.log('complted');
            }
        },
        );
    };

    useEffect(() => {
        if (isAuthenticated) {
            setWalletAddress(user.attributes.ethAddress)
        }
    }, [isAuthenticated, user])



    const removeWallet = async () => {
        const session = await killSession().then(res => console.log(res)).catch(error => console.log(error));

    };


    const checkAuth = async () => {
        let chainId = await Moralis.getChainId()
        if (isAuthenticated && chainId === 43114) {
            navigation.replace("BottomNav");
        } else if (isAuthenticated && chainId != 43114) {
            navigation.replace("WrongChain");
        }
    }


    const styles = StyleSheet.create({
        mainBody: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
            alignContent: "center",
            backgroundColor: colors.background
        },
        SectionStyle: {
            flexDirection: "row",
            height: 40,
            marginTop: 20,
            marginLeft: 35,
            marginRight: 35,
            margin: 10,
        },
        buttonStyle: {
            backgroundColor: colors.icon,
            borderWidth: 0,
            color: colors.text,
            borderColor: "#7DE24E",
            height: 40,
            alignItems: "center",
            borderRadius: 30,
            marginLeft: 35,
            marginRight: 35,
            marginTop: 20,
            marginBottom: 25,
        },
        buttonTextStyle: {
            color: colors.text,
            paddingVertical: 10,
            fontSize: 16,
            fontWeight: "600",
        },
        inputStyle: {
            flex: 1,
            color: colors.text,
            paddingLeft: 15,
            paddingRight: 15,
            borderWidth: 1,
            borderRadius: 30,
            borderColor: colors.secbackground,
        },
        registerTextStyle: {
            color: colors.text,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 14,
            alignSelf: "center",
            padding: 10,
        },
        errorTextStyle: {
            color: "red",
            textAlign: "center",
            fontSize: 14,
        },
    });

    return (
        <Provider>
            {/* <Header /> */}
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    backgroundColor: colors.background
                    // backgroundColor: colors.background
                }}>
                {/* <Image
          style={{ flex: 1, maxWidth: '100%', alignSelf: 'center' }}
          source={require("../assets/images/nftworld.gif")}
        /> */}
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",

                }}>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: "center" }}>


                            <Image
                                source={require("../assets/images/login.png")}
                                style={{
                                    width: 120,
                                    height: 120,
                                    resizeMode: "contain",
                                    margin: 30,

                                }}
                            />

                            <Text style={{ color: 'white', fontWeight: '700', fontSize: 30 }}>
                                NFT WORLD
                            </Text>


                        </View>

                        <View>
                            {authError && (
                                <Portal>
                                    <Dialog visible={visible} onDismiss={hideDialog}>
                                        <Dialog.Title>Authentication error:</Dialog.Title>
                                        <Dialog.Content>
                                            <Paragraph>
                                                {authError ? authError.message : ""}
                                            </Paragraph>
                                        </Dialog.Content>
                                        <Dialog.Actions>
                                            <Button onPress={hideDialog}>Done</Button>
                                        </Dialog.Actions>
                                    </Dialog>
                                </Portal>
                            )}
                            {isAuthenticating && (
                                <ActivityIndicator animating={true} color={"red"} />
                            )}
                        </View>

                        {walletAddress == '' && <TouchableOpacity onPress={handleCryptoLogin} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>Connect with Wallet</Text>
                        </TouchableOpacity>}

                        {walletAddress != '' && <View style={{ padding: 20 }}>
                            <View style={{ padding: 40, backgroundColor: colors.secbackground, borderRadius: 12 }}>
                                <Text style={{ fontSize: 20, marginBottom: 20, color: 'white', textAlign: 'center' }}>Connected to : {walletAddress}</Text>
                                <TouchableOpacity onPress={handleCryptoLogin} style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle}>Change / Reconnect</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        }
                        <AvaxNetwork />
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                            <Text style={{
                                color: colors.text,
                                fontSize: 12,
                                textAlign: 'center'
                            }}>Version : 1.0.5</Text>

                        </View>
                    </KeyboardAvoidingView>
                </View>

            </View >
        </Provider >
    );
};
export default LoginScreen;


