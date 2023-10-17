import {
  Alert,
  Dimensions,
  KeyboardAvoidingView, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import {useState} from 'react';
import {Colors} from '../../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';

export default function StartGameScreen(props) {
  const [enteredNumber, setEnteredNumber] = useState('')

  const {width, height} = useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText)
  }

  function resetInput() {
    setEnteredNumber('')
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'The number you entered should be greater than 0 and less than 99',
        [{
          text: 'close',
          style: 'destructive',
          onPress: resetInput
        }])
      return
    } else {
      props.startGameHandler(chosenNumber)
    }
  }

  const marginTop = height < 400 ? 30 : 100;

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={10} behavior={'position'}>
        <View style={[styles.rootContainer, {marginTop}]}>
          <Title>Guess My Number</Title>
          <Card>
            <Text style={styles.instructionTextStyle}>Please enter a number</Text>
            <TextInput
              value={enteredNumber}
              autoCapitalize={'none'}
              keyboardType={'number-pad'}
              autoCorrect={false}
              style={styles.input}
              maxLength={2}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={{flex: 1}}>
                <PrimaryButton onPress={resetInput}>Reset</PrimaryButton>
              </View>
              <View style={{flex: 1}}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    width: 55,
    textAlign: 'center',
    alignSelf: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  rootContainer: {
    flex: 1,
    // marginTop:
    alignItems: 'center'
  },
  instructionTextStyle: {
    color: Colors.primary600,
    fontSize: 24,
    fontFamily: 'open-sans-regular'
  }
});
