import {Platform, StyleSheet, Text} from 'react-native';

export default function Title(props) {
  return (
    <Text style={styles.title}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    // two different ways you can write code for a specific platform.
    // borderWidth: Platform.OS === 'android' ? 2 : 2,
    // borderWidth: Platform.select({android: 2, ios: 2}),
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    fontFamily: 'open-sans-bold',
    maxWidth: '80%',
    width: 300
  }
})