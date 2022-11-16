import {
  ImageBackground,
  SafeAreaView,
  View,
} from 'react-native';
import HomeScreen from './HomeScreen';
import { styles } from './AppStyles';

const App = () => {
  return (
    <ImageBackground source={require('./backgroundImage.jpg')} style={styles.backgroundImage} >
      <SafeAreaView style={styles.container}>
        <View style={styles.sectionStyle}>
          <HomeScreen />
        </View>
      </SafeAreaView >
    </ImageBackground>
  );
};

export default App;
