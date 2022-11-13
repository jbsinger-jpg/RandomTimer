import { View, Text, SafeAreaView, TouchableHighlight, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './HomeScreenStyles';
import TimerContainer from './TimerContainer';
import Dialog from "react-native-dialog";
import IconFontAwesome5Design from 'react-native-vector-icons/FontAwesome5';
import * as MediaLibrary from 'expo-media-library';

const HomeScreen = () => {
    const [displayApp, setDisplayApp] = useState(false);
    const [dialogActive, setDialogActive] = useState(false);
    const [musicRowAmount] = useState([1, 2, 3, 4, 5, 6]);
    const [hasMediaLibPermsssions, setHasMediaLibPermissions] = useState(false);
    const [audioFiles, setAudioFiles] = useState([]);
    const [ringtone, setRingtone] = useState(null);

    const getAudioFiles = async () => {
        let result = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        });

        setAudioFiles(result);
    };

    useEffect(() => {
        (async () => {
            const mediaLibStatus = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibPermissions(mediaLibStatus.status === "granted");
        })();
    }, []);

    useEffect(() => {
        if (hasMediaLibPermsssions) {
            getAudioFiles();
        }
    }, [hasMediaLibPermsssions]);

    if (!hasMediaLibPermsssions)
        return <View></View>;

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
                                        <Text>Select Ringtone</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View>
                                <Dialog.Container visible={dialogActive}>
                                    <Dialog.Title>Audio Files</Dialog.Title>
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
                                        Choose from either our library or your device
                                    </Dialog.Description>
                                    <ScrollView>
                                        {audioFiles && audioFiles?.assets?.map((audio, index) => {
                                            return (
                                                <TouchableHighlight key={index} onPress={() => {
                                                    setRingtone(audio.uri);
                                                    console.log(audio.uri);
                                                }}>
                                                    <Text>{audio.filename}</Text>
                                                </TouchableHighlight>
                                            );
                                        })}
                                    </ScrollView>
                                    <Dialog.Button label="Close" onPress={() => setDialogActive(false)} />
                                </Dialog.Container>
                            </View>
                        </>
                    }
                    {displayApp &&
                        <TimerContainer setDisplayApp={setDisplayApp} ringtone={ringtone} />
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;