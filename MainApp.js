import {
    StyleSheet, Text, useColorScheme, LogBox
} from "react-native";


import { createStackNavigator } from "@react-navigation/stack";
import {
    NavigationContainer,
} from "@react-navigation/native";
import { useTheme } from '@react-navigation/native';

import NFTICon from './components/Icon'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import CryptoAuth from "./components/CryptoAuth";
import WrongChain from "./components/WrongChain";
import NFTMarketPlace from "./components/NFT/NFTMarketPlace";
import Collection from "./components/NFT/Collection";
import NFTInfo from "./components/NFT/NFTInfo";
import Wallet from './components/Wallet'

import Profile from "./components/Profile/Index";
import Transactions from "./components/Transactions/Index";
import { colors } from "react-native-elements";






const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

LogBox.ignoreLogs
    (['Warning: The provided value \'moz',
        'Warning: The provided value \'ms-stream'
    ]);
const liteTheme = {
    dark: false,
    colors: {
        primary: '#90f073',
        background: '#191e2b',
        secbackground: "#1b2433",
        card: 'rgb(255, 255, 255)',
        text: '#fff',
        antiText: '#000',
        warning: '#f5af64',
        mute: 'grey',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
        icon: '#8ab4f8'
    },
};


const darkTheme = {
    dark: true,
    colors: {
        primary: '#90f073',
        background: '#191e2b',
        secbackground: "#1b2433",
        card: 'rgb(255, 255, 255)',
        text: '#fff',
        antiText: '#000',
        warning: '#f5af64',
        mute: 'grey',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
        icon: '#8ab4f8'
    },
};


function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="NFTMarketPlace"
        >
            <Stack.Screen name="NFTMarketPlace" component={NFTMarketPlace} />
            <Stack.Screen name="Collection" component={Collection} />
            <Stack.Screen name="NFTInfo" component={NFTInfo} />
            {/* <Stack.Screen name="Assets" component={Assets} /> */}
        </Stack.Navigator>
    );
}
// const Activecolor =
function BottomNav() {
    const { colors } = useTheme();


    return (
        <Tab.Navigator
            shifting={false}
            activeColor="#315399"
            barStyle={
                {
                    backgroundColor: colors.secbackground,
                    height: 80,
                    // position: 'absolute',
                    // bottom: 20,
                    // left: 20,
                    // right: 20,
                    // padding: 10,
                    borderRadius: 20,
                    // borderColor: colors.text,
                    // borderWidth: 1,
                    elevation: 0,
                    shadow: {
                        shadowColor: colors.background,
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                        elevation: 5
                    }
                }
            }
            screenOptions={{ headerShown: false }}
        >

            <Tab.Screen
                name="NFTHome"
                options={{
                    tabBarLabel: <Text style={{
                        color: colors.text
                    }
                    } > Home</Text>,
                    tabBarIcon: ({ color, focused }) =>
                        <NFTICon name='home' size={15} color={colors.icon} />

                }}
                component={MyStack}
            />


            <Tab.Screen
                name="Profile"
                options={{
                    tabBarLabel: <Text style={{
                        color: colors.text
                    }
                    } > Your NFTs</Text>,
                    tabBarIcon: ({ color }) => (
                        <NFTICon name='file-image-o' size={15} color={colors.icon} />

                    ),
                }}
                component={Profile}
            />
            <Tab.Screen
                name="Transfer"
                options={{
                    tabBarLabel: <Text style={{
                        color: colors.text
                    }
                    } > Transactions </Text>,
                    tabBarIcon: ({ color }) => (
                        <NFTICon name='paper-plane' size={15} color={colors.icon} />

                    ),
                }}
                component={Transactions}
            />
            <Tab.Screen
                name="Wallett"
                options={{
                    tabBarLabel: <Text style={{
                        color: colors.text
                    }
                    } > Profile </Text>,
                    tabBarIcon: ({ color }) => (
                        <NFTICon name='user' size={15} color={colors.icon} />

                    ),
                }}
                component={Wallet}
            />
        </Tab.Navigator >
    );
}
export default function App() {
    const scheme = useColorScheme();
    return (
        <NavigationContainer
            theme={scheme === 'dark' ? darkTheme : liteTheme}
        // theme={dark}
        >
            <Stack.Navigator initialRouteName="BottomNav"
                screenOptions={{ headerShown: false }}
            >
                {/* 
                <Stack.Screen
                    name="Auth"
                    component={CryptoAuth}
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    name="BottomNav"
                    component={BottomNav}
                    screenOptions={{ headerShown: false }}
                // Hiding header for Navigation Drawer
                />
                <Stack.Screen
                    name="WrongChain"
                    component={WrongChain}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

// Sentry.wrap(App);


const styles = StyleSheet.create({
    touchbarIcon: {
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        overflow: 'visible',
        top: -20,
        width: 100,
        flex: 1,
        zIndex: 1

    }, label: {
        marginTop: 5,
        fontSize: 12,
        color: colors.text
    }


});