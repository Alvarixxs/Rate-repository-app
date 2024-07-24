import {View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import theme from "../../theme";
import AppBarTab from "./AppBarTab";
import {useApolloClient, useQuery} from "@apollo/client";
import {ME} from "../../graphql/queries";
import useAuthStorage from "../../hooks/useAuthStorage";
import {useNavigate} from "react-router-native";
import Text from "../utils/Text"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
    display: 'flex',
    flexDirection: 'row',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
  }
  // ...
});

const AppBar = () => {
  const {data} = useQuery(ME, { fetchPolicy: 'network-only' })
  const navigate = useNavigate()

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/")
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" text="Repositories"/>
        {data?.me ? (
          <View style={styles.subContainer}>
            <AppBarTab to="/createReview" text="Create a review" />
            <AppBarTab to="/reviews" text="My reviews" />
            <AppBarTab onPress={handleLogout} to="/" text="Sign out" />
          </View>
        ) : (
          <View style={styles.subContainer}>
            <AppBarTab to="/signin" text="Sign in" />
            <AppBarTab to="/signup" text="Sign up" />
          </View>
          )
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;