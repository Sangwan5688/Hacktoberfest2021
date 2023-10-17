import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import StartGameScreen from './src/screens/StartGameScreen';
import {LinearGradient} from 'expo-linear-gradient';
import {useState} from 'react';
import GameScreen from './src/screens/GameScreen';
import {Colors} from './constants/colors';
import GameOverScreen from './src/screens/GameOverScreen';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  }

  function startGameHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen startGameHandler={startGameHandler}/>

  if (userNumber) {
    screen = <GameScreen gameOverHandler={gameOverHandler} userNumber={userNumber}/>
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} userNumber={userNumber}/>
  }


  return (
    <LinearGradient colors={[Colors.primary450, Colors.accent500,]} style={styles.rootScreen}>
      <ImageBackground
        imageStyle={{opacity: 0.15}}
        style={styles.rootScreen}
        resizeMode={'cover'}
        source={require('./assets/images/background.png')}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  }
});
