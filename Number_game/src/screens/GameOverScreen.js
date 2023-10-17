import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import TitleAndroid from '../components/ui/Title';
import {Colors} from '../../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

// const deviceWidth = Dimensions.get('window').width;
export default function GameOverScreen(props) {
  const {width, height} = useWindowDimensions();

  let imageSize = 300;

  if (width < 390) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 80
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
  }

  return (
    <ScrollView style={{flex: 1}}>
      <SafeAreaView style={styles.rootContainer}>
        <TitleAndroid>
          GAME OVER!
        </TitleAndroid>
        <View style={styles.imageContainerStyle}>
          <Image style={[styles.imageContainer, imageStyle]} source={require('../../assets/images/success.png')}/>
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the <Text
          style={styles.highlight}>{props.userNumber}</Text>
        </Text>
        <PrimaryButton onPress={props.onStartNewGame}>Play Again!</PrimaryButton>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    marginTop: 22,
    alignItems: 'center'
  },
  imageContainerStyle: {
    // borderRadius: deviceWidth < 390 ? 100 : 200,
    // width: deviceWidth < 390 ? 200 : 300,
    // height: deviceWidth < 390 ? 200 : 300,
    borderWidth: 3,
    borderColor: Colors.primary600,
    overflow: 'hidden',
    margin: 36,
  },
  imageContainer: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontFamily: 'open-sans-regular',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  }
})