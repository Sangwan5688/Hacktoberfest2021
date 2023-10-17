import {Alert, FlatList, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Title from '../components/ui/Title';
import {useEffect, useState} from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import {Colors} from '../../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;
export default function GameScreen(props) {
  const initialGuess = generateRandomBetween(1, 100, props.userNumber);
  const [currentGues, setCurrentGues] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([]);
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    if (currentGues === props.userNumber) {
      props.gameOverHandler(guessRounds.length);
    }
  }, [currentGues, props.userNumber, props.gameOverHandler]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuesshandler(direction) {
    if ((direction === 'lower' && currentGues < props.userNumber) || (direction === 'greater' && currentGues > props.userNumber)) {
      Alert.alert('Do not Lie', 'You know that this is wrong...', [{text: 'sorry!', style: 'cancel'}])
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGues;
    } else {
      minBoundary = currentGues + 1;
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGues);
    setCurrentGues(newRndNumber);
    setGuessRounds(prevState => [newRndNumber, ...prevState]);
  }

  const guessedRoundListLength = guessRounds.length;
  let content =
    <>
      <NumberContainer>{currentGues}</NumberContainer>
      <Card>
        <Text style={styles.instructionTextStyle}>Lower or Higher</Text>
        <View style={styles.buttonsContainer}>
          <View style={{flex: 1}}>
            <PrimaryButton
              onPress={nextGuesshandler.bind(this, 'lower')}>
              <Ionicons size={24} color={'white'}
                        name={'md-remove'}/>
            </PrimaryButton>
          </View>
          <View style={{flex: 1}}>
            <PrimaryButton
              onPress={nextGuesshandler.bind(this, 'greater')}>
              <Ionicons size={24} color={'white'}
                        name={'md-add'}/>
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>

  if (width > height) {
    content =
      <>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <PrimaryButton
              onPress={nextGuesshandler.bind(this, 'lower')}>
              <Ionicons size={24} color={'white'}
                        name={'md-remove'}/>
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGues}</NumberContainer>
          <View style={{flex: 1}}>
            <PrimaryButton
              onPress={nextGuesshandler.bind(this, 'greater')}>
              <Ionicons size={24} color={'white'}
                        name={'md-add'}/>
            </PrimaryButton>
          </View>
        </View>
      </>
  }

  return (
    <View style={styles.container}>
      <Title>Oponents Guess</Title>
      {content}
      <View style={styles.listStyle}>
        <FlatList
          keyExtractor={(item) => item}
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem guess={itemData.item}
                                                  itemData={guessedRoundListLength - itemData.index}/>}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    padding: 14,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionTextStyle: {
    color: Colors.primary600,
    fontSize: 24,
    marginBottom: 15,
  },
  listStyle: {
    flex: 1,
    padding: 25
  }
})