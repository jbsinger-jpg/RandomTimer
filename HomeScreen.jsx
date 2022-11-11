import { View, Text, SafeAreaView, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import { styles } from './HomeScreenStyles';
import TimerContainer from './TimerContainer';

const HomeScreen = () => {
    const [displayApp, setDisplayApp] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionStyle}>
                <View style={{ alignItems: 'center', position: 'absolute', top: 70, flexDirection: 'row' }}>
                    {/* Make a button here to trigger the app and remove App start button view */}
                    {!displayApp &&
                        <View style={{ ...styles.containerRow, paddingBottom: 10, paddingHorizontal: 5 }}>
                            <TouchableHighlight
                                onPress={() => {
                                    setDisplayApp(true);
                                }}
                            >
                                <Text> App Start Button </Text>
                            </TouchableHighlight>
                        </View>
                    }
                    {displayApp &&
                        <TimerContainer />
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;