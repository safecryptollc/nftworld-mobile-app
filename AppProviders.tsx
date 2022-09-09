import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import WalletConnectProvider, { WalletConnectProviderProps } from "@walletconnect/react-native-dapp";
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from "./WalletConnect";
import { enableViaWalletConnect } from "./enableMoralisViaMoralis";
import { MoralisDappProvider } from "./providers/MoralisDappProvider";
import { Platform } from "react-native";
import { expo } from "./app.json";
const { scheme } = expo;

interface ProvidersProps {
  readonly children: JSX.Element;
}

import { MoralisProvider } from "react-moralis";

import Moralis from "moralis/react-native.js";
Moralis.setAsyncStorage(AsyncStorage);
//@ts-ignore
Moralis.enable = enableViaWalletConnect;
console.log(AsyncStorage.getAllKeys(), "KEYS");

const walletConnectOptions: WalletConnectProviderProps = {
  redirectUrl: Platform.OS === "web" ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: ["metamask"],
  },
  clientMeta: {
    description: "Connect to NFTWorldApp",
    url: "https://www.nftworldapp.com",
    icons: ["https://walletconnect.org/walletconnect-logo.png"],
    name: "NFTWorldApp",
  },
  // renderQrcodeModal: Qrcode,
};

export const AppProviders = ({ children }: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId="L36JGtQzJ3Z92O5gopR4K4a9CcrSG9Mt1q50z0OZ"
        serverUrl="https://tvcxnqdb2wdj.usemoralis.com:2053/server"
        environment="native"
      >
        <MoralisDappProvider>{children}</MoralisDappProvider>
      </MoralisProvider>
    </WalletConnectProvider>
  );
};
