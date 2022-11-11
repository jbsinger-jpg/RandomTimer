import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { styles } from './HomeScreenStyles';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionStyle}>
                <View style={{ alignItems: 'center', position: 'absolute', top: 70, flexDirection: 'row' }}>
                    {/* Make a button here to trigger the app and remove App start button view */}
                    <View style={{ ...styles.containerRow, paddingBottom: 10, paddingHorizontal: 5 }}>
                        <Text> App Start Button </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
