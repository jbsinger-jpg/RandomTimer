import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Timer } from 'react-native-stopwatch-timer';
import { options, styles } from './TimerContainerStyles';
import IconFontAwesome5Design from 'react-native-vector-icons/FontAwesome5';


const TimerContainer = ({ setDisplayApp }) => {
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [timeInMsecs, setTimeInMsecs] = useState(5);
    const [timeType, setTimeType] = useState(1000);
    const [randomTimeValue, setrandomTimeValue] = useState(Math.random());
    const [timerDuration, setTimerDuration] = useState(timeInMsecs * timeType * randomTimeValue);
    const [resetTimer, setResetTimer] = useState(false);
    const [randomButtonPressed, setRandomButtonPressed] = useState(false);

    useEffect(() => {
        setrandomTimeValue(Math.random());
        setTimerDuration(timeInMsecs * timeType * randomTimeValue);
    }, [timeType, timeInMsecs]);

    const handleCaretPress = () => {
        setDisplayApp(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionStyle}>
                <Timer
                    totalDuration={timerDuration}
                    msecs
                    start={isTimerStart}
                    reset={resetTimer}
                    options={options}
                    handleFinish={() => {
                        alert('Custom Completion Function');
                    }}
                    //can call a function On finish of the time
                    getTime={(time) => {
                        console.log(time);
                    }}
                />
                <View style={{ alignItems: 'center', position: 'absolute', top: 70, flexDirection: 'row' }}>
                    <TouchableHighlight
                        onPress={() => {
                            setIsTimerStart(!isTimerStart);
                            setResetTimer(false);
                        }}
                    >
                        <Text style={styles.buttonText}>
                            {!isTimerStart ? 'START' : 'STOP'}
                        </Text>
                    </TouchableHighlight>
                    {!isTimerStart &&
                        <View style={{ ...styles.containerRow, paddingBottom: 10, paddingHorizontal: 5 }}>
                            <TouchableHighlight
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
                            </TouchableHighlight>
                        </View>}
                </View>
                <View style={{ alignItems: 'center', position: 'absolute', top: 400 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.containerRow}>
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
                        <View style={styles.containerRow}>
                            <Text style={styles.buttonText}> Time Unit </Text>
                            <Picker
                                style={{ height: 50, width: 40 }}
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
                <View style={{ alignItems: 'flex-start', position: 'absolute', left: -35, top: 600 }}>
                    <IconFontAwesome5Design
                        name='caret-left'
                        size={40}
                        onPress={() => handleCaretPress()}
                        color='black'
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TimerContainer;
