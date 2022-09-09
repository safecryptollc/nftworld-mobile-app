import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Address from './Address';

export default function Header() {
  return (
    <View style={styles.viewContainer}>
      <Address />
    </View>
  );
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
