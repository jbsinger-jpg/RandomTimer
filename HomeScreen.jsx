import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './HomeScreenStyles';
import TimerContainer from './TimerContainer';
import Dialog from "react-native-dialog";
import * as MediaLibrary from 'expo-media-library';
import { Button, Card } from 'react-native-paper';

const HomeScreen = () => {
    const [displayApp, setDisplayApp] = useState(false);
    const [dialogActive, setDialogActive] = useState(false);
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
                                    <Button
                                        color='black'
                                        onPress={() => {
                                            setDisplayApp(true);
                                        }}
                                    >
                                        <Text style={styles.buttonText}> App Start Button </Text>
                                    </Button>
                                </View>
                                <View style={{ ...styles.containerColumn, paddingBottom: 10, paddingHorizontal: 5 }}>
                                    <Button color='black' onPress={() => setDialogActive(!dialogActive)}>
                                        <Text style={styles.buttonText}>Select Ringtone</Text>
                                    </Button>
                                </View>
                            </View>
                            <View>
                                <Dialog.Container visible={dialogActive}>
                                    <Dialog.Title style={styles.buttonText}>Audio Files</Dialog.Title>
                                    <Dialog.Description style={styles.buttonText}>
                                        Choose from your device
                                    </Dialog.Description>
                                    <ScrollView>
                                        {audioFiles && audioFiles?.assets?.map((audio, index) => {
                                            return (
                                                <View style={{ margin: 10 }}>
                                                    <Card elevation={2} mode='outlined'>
                                                        <Card.Title title={audio.filename} />
                                                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                                                        <Card.Actions>
                                                            <Button
                                                                style={styles.buttonText}
                                                                color='black'
                                                                onPress={() => {
                                                                    setRingtone(audio.uri);
                                                                    console.log(audio);
                                                                }}>
                                                                <Text>Select "{audio.filename}"</Text>
                                                            </Button>
                                                        </Card.Actions>
                                                    </Card>
                                                </View>
                                            );
                                        })}
                                    </ScrollView>
                                    <Dialog.Button style={styles.buttonText} color='black' label="Close" onPress={() => setDialogActive(false)} />
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