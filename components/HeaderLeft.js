import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useRoute, useNavigationState } from '@react-navigation/native';

function useIsFirstRouteInParent() {
    const route = useRoute();
    const isFirstRouteInParent = useNavigationState(
        (state) => state.routes[0].key === route.key
    );

    return isFirstRouteInParent;
}

function usePreviousRouteName() {
    return useNavigationState((state) =>
        state.routes[state.index - 1]?.name
            ? state.routes[state.index - 1].name
            : 'None'
    );
}


export default function Header(props) {
    const route = useRoute();


    return useIsFirstRouteInParent && <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text>Back</Text>
    </TouchableOpacity>

}
const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
});
