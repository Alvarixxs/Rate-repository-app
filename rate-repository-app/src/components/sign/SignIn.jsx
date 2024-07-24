import Text from '../utils/Text';
import { useFormik } from 'formik';
import {Pressable, TextInput, View, StyleSheet} from "react-native";
import theme from "../../theme";
import * as yup from 'yup';
import useSignIn from "../../hooks/useSignIn";
import useAuthStorage from '../../hooks/useAuthStorage';
import {useNavigate} from "react-router-native";
import {useState} from "react";


const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    padding: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: '#fff',
    alignSelf: 'center',
  },
  inputError: {
    borderColor: theme.colors.error,
  }
})

export const SignInContainer = ({onSubmit, message}) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('username is required'),
    password: yup
      .string()
      .required('password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.username && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        style={[styles.input, formik.errors.password && styles.inputError]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error}}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text} fontWeight="bold">Sign in</Text>
      </Pressable>
      {message ? (
        <Text style={{color: theme.colors.error}}>{message}</Text>
      ): null}
    </View>
  )
}

const SignIn = () => {
  const authStorage = useAuthStorage();
  const [signIn] = useSignIn(authStorage);
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/")
    } catch (e) {
      console.log(e);
      setMessage(e.message)
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} message={message} />
  )
}

export default SignIn;