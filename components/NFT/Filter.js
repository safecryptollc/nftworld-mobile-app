import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { IndexPath, Layout, Select, SelectItem, View, TouchableOpacity } from '@ui-kitten/components';
import { useTheme } from '@react-navigation/native';

const Filter = () => {

    const { colors } = useTheme();
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            // padding: 5,
            // minHeight: 128,
        },
        filterOption: {
            backgroundColor: colors.background,
            color: colors.text,
            padding: 2,
            borderWidth: 0.8,
            borderColor: colors.border

        },
        label: {
            color: colors.text
        }
    });


    return (
        <View style={styles.container} >
            {/* <TouchableOpacity
            // style={{ ...styles.filterOption }}
            >
                <Text style={styles.label}>Price High to Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
            // style={{ ...styles.filterOption }}
            >
                <Text style={styles.label}>Price Low to High</Text>
            </TouchableOpacity> */}
        </View>
    );



};


export default Filter;