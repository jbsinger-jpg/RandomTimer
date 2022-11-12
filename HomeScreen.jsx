import { View, Text, SafeAreaView, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import { styles } from './HomeScreenStyles';
import TimerContainer from './TimerContainer';
import Dialog from "react-native-dialog";
import IconFontAwesome5Design from 'react-native-vector-icons/FontAwesome5';



const HomeScreen = () => {
    const [displayApp, setDisplayApp] = useState(false);
    const [dialogActive, setDialogActive] = useState(false);
    const [musicRowAmount, setMusicRowAmount] = useState([1, 2, 3, 4, 5, 6]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionStyle}>
                <View style={{ alignItems: 'center', position: 'absolute', top: 70, flexDirection: 'row' }}>
                    {!displayApp &&
                        <>
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
                                    <TouchableHighlight onPress={() => setDialogActive(!dialogActive)}>
                                        <Text>Select Ringtone from App</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={{ ...styles.containerColumn, paddingBottom: 10, paddingHorizontal: 5 }}>
                                    <TouchableHighlight onPress={() => setDialogActive(!dialogActive)}>
                                        <Text> Select Ringtone From Device</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View>
                                <Dialog.Container visible={dialogActive}>
                                    <Dialog.Title>Video Files</Dialog.Title>
                                    {musicRowAmount.map(num => {
                                        return (
                                            <View key={num} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 85, alignItems: 'center', right: 100 }}>
                                                <IconFontAwesome5Design
                                                    name='music'
                                                    size={30}
                                                    color='black'
                                                />
                                                <Text>Ringtone {num}</Text>
                                            </View>
                                        );
                                    })}
                                    <Dialog.Description>
                                        Please select a ringtone
                                    </Dialog.Description>
                                    <Dialog.Button label="Close" onPress={() => setDialogActive(false)} />
                                </Dialog.Container>
                            </View>
                        </>
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