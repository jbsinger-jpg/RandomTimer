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
  const [timerDuration, setTimerDuration] = useState(0);
  const [timeInMsecs, setTimeInMsecs] = useState(0);
  const [timeType, setTimeType] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    setResetTimer(true);
    // setTimerDuration(timeInMsecs * timeType);
  }, []);

  useEffect(() => {
    // Without timeInMsecs as a placeholder then timeDuration recursively stacks on itself...
    setTimerDuration(timeInMsecs * timeType);
  }, [timeType, timeInMsecs]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart(!isTimerStart);
              setResetTimer(false);
            }}>
            <Text style={styles.buttonText}>
              {!isTimerStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart(false);
              setResetTimer(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
          <Picker
            style={{ height: 50, width: 150 }}
            selectedValue={timeInMsecs}
            mode='dropdown'
            onValueChange={(itemValue, itemIndex) =>
              setTimeInMsecs(itemValue)
            }>
            <Picker.Item label="0" value={0} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="20" value={20} />
            <Picker.Item label="30" value={30} />
            <Picker.Item label="40" value={40} />
            <Picker.Item label="50" value={50} />
            <Picker.Item label="60" value={60} />
          </Picker>

          <Picker
            style={{ height: 50, width: 150 }}
            selectedValue={timeType}
            mode='dropdown'
            onValueChange={(itemValue, itemIndex) =>
              setTimeType(itemValue)
            }>
            <Picker.Item label="null" value={0} />
            <Picker.Item label="seconds" value={1000} />
            <Picker.Item label="minutes" value={60000} />
            <Picker.Item label="hours" value={3600000} />
          </Picker>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
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
    // fontSize: 0,
    color: '#FFF',
    // color: 'white',
    marginLeft: 7,
  },
};