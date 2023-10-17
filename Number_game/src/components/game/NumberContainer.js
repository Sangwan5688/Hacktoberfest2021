import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/colors';

const deviceWidth = Dimensions.get('window').width;
export default function NumberContainer(props) {

  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>
        {props.children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 390 ? 17 : 24,
    margin: deviceWidth < 390 ? 10 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 390 ? 27 : 36,
    fontFamily: 'open-sans-bold'
  }
})