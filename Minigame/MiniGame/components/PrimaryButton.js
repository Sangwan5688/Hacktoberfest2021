import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colours } from "../utils/colour";

function PrimaryButton({children, onPressed}) {

  return (
    <View style={styles.outerContainer}>
      <Pressable 
        style={({pressed}) => pressed ? [styles.innerContainer,styles.pressed] : styles.innerContainer} 
        onPress={onPressed} 
        android_ripple={{ color : Colours.Secondary500 }}>
        <Text style={styles.buttonText} >{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
    
  },
  innerContainer: {
    backgroundColor: Colours.Primary600,
    borderColor: Colours.Tertiary500,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
    borderRadius: 28,
  },
  buttonText: {
    textAlign: 'center',
    color: Colours.Secondary500,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
