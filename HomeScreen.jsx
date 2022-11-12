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
                    {!displayApp &&
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ ...styles.containerColumn, paddingBottom: 10, paddingHorizontal: 5 }}>
                                <TouchableHighlight
                                    onPress={() => {
                                        setDisplayApp(true);
                                    }}
                                >
                                    <Text style={styles.buttonText}> App Start Button </Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{ ...styles.containerColumn, paddingBottom: 10, paddingHorizontal: 5 }}>
                                <Text> Mp3 stuff</Text>
                            </View>
                        </View>
                    }
                    {displayApp &&
                        <TimerContainer setDisplayApp={setDisplayApp} />
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;