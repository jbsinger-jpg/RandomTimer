import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Timer } from 'react-native-stopwatch-timer';
import { options, styles } from './TimerContainerStyles';
import IconFontAwesome5Design from 'react-native-vector-icons/FontAwesome5';
import { Audio } from 'expo-av';
import { Button } from 'react-native-paper';

const TimerContainer = ({ setDisplayApp, ringtone }) => {
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [timeInMsecs, setTimeInMsecs] = useState(5);
    const [timeType, setTimeType] = useState(1000);
    const [randomTimeValue, setrandomTimeValue] = useState(Math.random());
    const [timerDuration, setTimerDuration] = useState(timeInMsecs * timeType * randomTimeValue);
    const [resetTimer, setResetTimer] = useState(false);
    const [randomButtonPressed, setRandomButtonPressed] = useState(false);
    const [ringTone, setRingTone] = useState(null);
    const [timerIsDead, setTimerIsDead] = useState(false);

    async function playRingSound() {
        const { sound } = await Audio.Sound.createAsync(
            { uri: ringtone },
            { shouldPlay: true }
        );

        if (sound) {
            sound.setIsLoopingAsync(false);
            setRingTone(sound);
            sound.playAsync();
        }
    };

    async function stopRingSound() {
        if (ringTone)
            await ringTone.stopAsync();
        setTimerIsDead(false);
    };

    const handleCaretPress = () => {
        setDisplayApp(false);
        stopRingSound();
    };

    useEffect(() => {
        setrandomTimeValue(Math.random());
        setTimerDuration(timeInMsecs * timeType * randomTimeValue);
    }, [timeType, timeInMsecs]);

    useEffect(() => {
        if (timerIsDead)
            playRingSound();
    }, [timerIsDead]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionStyle}>
                <View style={{ opacity: 0 }}>
                    <Timer
                        totalDuration={timerDuration}
                        msecs
                        start={isTimerStart}
                        reset={resetTimer}
                        options={options}
                        handleFinish={() => {
                            if (!timerIsDead) {
                                setTimerIsDead(true);
                            }
                        }}
                        //can call a function On finish of the time
                        getTime={(time) => {
                            console.log(time);
                        }}
                    />
                </View>
                <View style={{ alignItems: 'center', position: 'absolute', top: 70, flexDirection: 'row' }}>
                    <View style={{ ...styles.containerRow, paddingBottom: 10, paddingHorizontal: 5 }}>
                        <Button
                            style={{
                                borderWidth: 3,
                                borderColor: 'black',
                            }}
                            color='black'
                            onPress={() => {
                                setIsTimerStart(!isTimerStart);
                                setResetTimer(false);
                                stopRingSound();
                            }}
                        >
                            <Text style={styles.buttonText}>
                                {!isTimerStart ? 'START' : 'STOP'}
                            </Text>
                        </Button>
                    </View>
                    {!isTimerStart &&
                        <View style={{ ...styles.containerRow, paddingBottom: 10, paddingHorizontal: 5 }}>
                            <Button
                                style={{
                                    borderWidth: 3,
                                    borderColor: 'black',
                                }}
                                color='black'
                                underlayColor={'gray'}
                                onPressOut={() => {
                                    setRandomButtonPressed(false);
                                }}
                                onPressIn={() => {
                                    setRandomButtonPressed(true);
                                }}
                                onPress={() => {
                                    setIsTimerStart(false);
                                    setResetTimer(true);

                                    if (!isTimerStart) {
                                        setrandomTimeValue(Math.random());
                                        setTimerDuration(timeInMsecs * timeType * randomTimeValue);
                                    }
                                }}>
                                <Text style={randomButtonPressed ? styles.timerButtonPressedText : styles.buttonText}> SHUFFLE </Text>
                            </Button>
                        </View>
                    }
                </View>
                <View style={{ alignItems: 'center', position: 'absolute', top: 400 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            ...styles.containerRow,
                            borderWidth: 3,
                            borderColor: 'black'
                        }}>
                            <Text style={styles.buttonText}> Time Duration </Text>
                            <Picker
                                style={{ height: 50, width: 40 }}
                                selectedValue={timeInMsecs}
                                mode='dialog'
                                onValueChange={(itemValue) =>
                                    setTimeInMsecs(itemValue)
                                }>
                                <Picker.Item label="5" value={5} />
                                <Picker.Item label="10" value={10} />
                                <Picker.Item label="20" value={20} />
                                <Picker.Item label="30" value={30} />
                                <Picker.Item label="40" value={40} />
                                <Picker.Item label="50" value={50} />
                                <Picker.Item label="60" value={60} />
                            </Picker>
                        </View>
                        <View style={{
                            ...styles.containerRow,
                            borderWidth: 3,
                            borderColor: 'black'
                        }}>
                            <Text style={styles.buttonText}> Time Unit </Text>
                            <Picker
                                style={{
                                    height: 50,
                                    width: 40,
                                }}
                                selectedValue={timeType}
                                mode='dialog'
                                onValueChange={(itemValue) =>
                                    setTimeType(itemValue)
                                }
                            >
                                <Picker.Item label="seconds" value={1000} />
                                <Picker.Item label="minutes" value={60000} />
                                <Picker.Item label="hours" value={3600000} />
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', position: 'absolute', left: -70, top: 600 }}>
                    <Button
                        color='black'
                        onPress={() => handleCaretPress()}
                    >
                        <IconFontAwesome5Design
                            name='caret-left'
                            size={60}
                            color='black'
                        />
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TimerContainer;
