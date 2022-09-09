import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,

  TouchableOpacity,
  KeyboardAvoidingView,

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


// import { useWalletConnect } from "../WalletConnect";
import LottieView from "lottie-react-native";

import Animation from "../splashLottie.json";


import { useTheme } from '@react-navigation/native';
import NFTICon from "./Icon";



const WrongChain = ({ navigation }) => {
  const { web3, Moralis, user, authenticate, authError, isAuthenticated, isAuthenticating } =
    useMoralis();
  const { colors } = useTheme();


  const connector = useWalletConnect();


  const handleCryptoLogin = async () => {
    const user = await authenticate({ connector, signingMessage: "Sign To React World App" });
  };




  // const checkAuth = async () => {
  //   let chainId = await Moralis.getChainId()
  //   if (isAuthenticated && chainId === 43114) {
  //     navigation.replace("BottomNav");
  //   }
  // }
  // useEffect(() => {
  //   checkAuth();
  // }, [isAuthenticated]);

  return (
    <Provider>
      <View style={styles.mainBody}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}>

          <View style={{ flex: 1, }}>
            <KeyboardAvoidingView enabled style={{ flex: 1, backgroundColor: colors.background }}>
              <View style={{ alignItems: "center", flex: 1, justifyContent: 'center', alignContent: 'center', padding: 20 }}>
                <NFTICon name={'warning'} size={50} color={colors.primary} />
                <Text style={{ color: colors.text, fontSize: 20, textAlign: 'center', marginTop: 10 }}> Sorry We dont support this chain yet . Please be on AVAX network</Text>
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
              <TouchableOpacity onPress={handleCryptoLogin} style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Reconnect Wallet</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};
export default WrongChain;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
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
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "black",
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
