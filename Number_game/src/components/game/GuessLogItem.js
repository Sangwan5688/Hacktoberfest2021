import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/colors';

export default function GuessLogItem(props) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{props.itemData}</Text>
      <Text style={styles.itemText}>Opponents Guess: {props.guess}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary600,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {height: 4, width: 3},
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  itemText: {
    fontFamily: 'open-sans-regular'
  }
})