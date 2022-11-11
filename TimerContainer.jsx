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

const TimerContainer = () => {
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [timeInMsecs, setTimeInMsecs] = useState(5);
    const [timeType, setTimeType] = useState(1000);
    const [randomTimeValue, setrandomTimeValue] = useState(Math.random());
    const [timerDuration, setTimerDuration] = useState(timeInMsecs * timeType * randomTimeValue);
    const [resetTimer, setResetTimer] = useState(false);
    const [randomButtonPressed, setRandomButtonPressed] = useState(false);
    const [timeUnitButtonPressed, setTimeUnitButtonPressed] = useState(false);
    const [timeDurationButtonPressed, setTimeDurationButtonPressed] = useState(false);

    useEffect(() => {
        // Without timeInMsecs as a placeholder then timeDuration recursively stacks on itself...
        setrandomTimeValue(Math.random());
        setTimerDuration(timeInMsecs * timeType * randomTimeValue);
    }, [timeType, timeInMsecs]);

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
                        }}>
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
                                <Text style={randomButtonPressed ? styles.timerButtonPressedText : styles.buttonText}> RESET </Text>
                            </TouchableHighlight>
                        </View>}
                </View>
                <View style={{ alignItems: 'center', position: 'absolute', bottom: 200 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.containerRow}>
                            <Text style={timeDurationButtonPressed ? styles.timerButtonPressedText : styles.buttonText}> Time Duration</Text>
                            <TouchableHighlight
                                onPressOut={() => {
                                    setTimeDurationButtonPressed(false);
                                }}
                                onPressIn={() => {
                                    setTimeDurationButtonPressed(true);
                                }}
                            >
                                <Picker
                                    style={{ height: 50, width: 25 }}
                                    selectedValue={timeInMsecs}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) =>
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
                            </TouchableHighlight>
                        </View>
                        <View style={styles.containerRow}>
                            <Text style={timeUnitButtonPressed ? styles.timerButtonPressedText : styles.buttonText}> Time Unit </Text>
                            <TouchableHighlight
                                onPressOut={() => {
                                    setTimeUnitButtonPressed(false);
                                }}
                                onPressIn={() => {
                                    setTimeUnitButtonPressed(true);
                                }}
                            >
                                <Picker
                                    style={{ height: 50, width: 25 }}
                                    selectedValue={timeType}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTimeType(itemValue)
                                    }>
                                    <Picker.Item label="seconds" value={1000} />
                                    <Picker.Item label="minutes" value={60000} />
                                    <Picker.Item label="hours" value={3600000} />
                                </Picker>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default App;
