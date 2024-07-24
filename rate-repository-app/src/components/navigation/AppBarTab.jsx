import {Pressable, StyleSheet} from "react-native";
import Text from "../utils/Text";
import {Link} from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    padding: 20,
  }
})

function AppBarTab({to, text, onPress=null}) {
  return (
    <Pressable onPress={onPress}>
      {onPress ? (
        <Text style={styles.text} fontSize="subheading" fontWeight="bold">{text}</Text>
      ) : (
        <Link to={to}>
          <Text style={styles.text} fontSize="subheading" fontWeight="bold">{text}</Text>
        </Link>
      )}
    </Pressable>
  )
}

export default AppBarTab