import {
  SafeAreaView,
  View,
} from 'react-native';
import HomeScreen from './HomeScreen';
import { styles } from './AppStyles';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionStyle}>
        <HomeScreen />
      </View>
    </SafeAreaView >
  );
};

export default App;
