import { StyleSheet, View } from 'react-native';

import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from '../repositories/RepositoryList';
import AppBar from '../navigation/AppBar';
import theme from '../../theme';
import SignIn from "../sign/SignIn";
import SingleRepository from "../repositories/SingleRepository";
import ReviewForm from "../review/ReviewForm";
import SignUp from "../sign/SignUp";
import MyReviews from "../review/MyReviews";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.main,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/createReview" element={<ReviewForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;