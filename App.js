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

const App = () => {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timeInMsecs, setTimeInMsecs] = useState(5);
  const [timeType, setTimeType] = useState(1000);
  const [randomTimeValue, setrandomTimeValue] = useState(Math.random());
  const [timerDuration, setTimerDuration] = useState(timeInMsecs * timeType * randomTimeValue);
  const [resetTimer, setResetTimer] = useState(false);
  const [timerButtonPressed, setTimerButtonPressed] = useState(false);
  const [randomButtonPressed, setRandomButtonPressed] = useState(false);

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
            setResetTimer(true);
            setIsTimerStart(!isTimerStart);
            alert("Timer finished");
          }}
          getTime={(time) => {
            console.log(time);
          }}
        />
        <View style={{ alignItems: 'center', position: 'absolute', top: 70, flexDirection: 'row' }}>
          <TouchableHighlight
            underlayColor={'gray'}
            onPressOut={() => {
              setTimerButtonPressed(false);
            }}
            onPressIn={() => {
              setTimerButtonPressed(true);
            }}
            onPress={() => {
              setIsTimerStart(!isTimerStart);
              setResetTimer(false);
              if (isTimerStart)
                setResetTimer(true);
            }}>
            <Text style={timerButtonPressed ? styles.timerButtonPressedText : styles.buttonText}>
              {!isTimerStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
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
                setrandomTimeValue(Math.random());
                setTimerDuration(timeInMsecs * timeType * randomTimeValue);
              }}>
              <Text style={randomButtonPressed ? styles.timerButtonPressedText : styles.buttonText}> RANDOMIZE</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ alignItems: 'center', position: 'absolute', bottom: 200 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.containerRow}>
              <Text style={{ fontSize: 20 }}> Time Duration </Text>
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
            </View>
            <View style={styles.containerRow}>
              <Text style={{ fontSize: 20 }}> Time Unit </Text>
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
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
  timerButtonPressedText: {
    fontSize: 15,
    marginTop: 10,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    borderWidth: 3,
    borderColor: 'black'
  }
});

const options = {
  // Uncomment backgroundColor: 'white', fontSize: 0, and color: 'white' when testing hidden timer functionality
  container: {
    backgroundColor: '#FF0000',
    // backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    // color: 'white',
    marginLeft: 7,
  },
};