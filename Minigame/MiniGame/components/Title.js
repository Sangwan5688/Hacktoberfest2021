import { Text, StyleSheet }  from "react-native";
import { Colours } from "../utils/colour";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: Colours.Secondary500,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colours.Secondary500,
    borderRadius: 16,
    padding: 12,
  },  
});
