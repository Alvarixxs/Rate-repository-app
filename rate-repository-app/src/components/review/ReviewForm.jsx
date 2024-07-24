import Text from '../utils/Text';
import { useFormik } from 'formik';
import {Pressable, TextInput, View, StyleSheet} from "react-native";
import theme from "../../theme";
import * as yup from 'yup';
import {useNavigate} from "react-router-native";
import {useMutation} from "@apollo/client";
import {CREATE_REVIEW} from "../../graphql/mutations";
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

export const ReviewFormContainer = ({onSubmit, message}) => {
  const initialValues = {
    username: '',
    repository: '',
    rating: '',
    text: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('username is required'),
    repository: yup
      .string()
      .required('repository name is required'),
    rating: yup
      .number()
      .required('rating is required')
      .min(0, 'rating must be larger or equal to 0')
      .max(100, 'rating must be less or equal to 100'),
    text: yup
      .string()
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
        placeholder="Repository owner name"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, formik.errors.repository && styles.inputError]}
        placeholder="Repository name"
        value={formik.values.repository}
        onChangeText={formik.handleChange('repository')}
      />
      {formik.touched.repository && formik.errors.repository && (
        <Text style={{ color: theme.colors.error}}>{formik.errors.repository}</Text>
      )}
      <TextInput
        style={[styles.input, formik.errors.rating && styles.inputError]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[styles.input, formik.errors.text && styles.inputError]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        multiline
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.text}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text} fontWeight="bold">Create a review</Text>
      </Pressable>
      {message ? (
        <Text style={{color: theme.colors.error}}>{message}</Text>
      ): null}
    </View>
  )
}

const ReviewForm = () => {
  const navigate = useNavigate()
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const [message, setMessage] = useState(null)

  const onSubmit = async (values) => {
    const { username, repository, rating, text } = values;

    try {
      const newReview = {
        ownerName: username,
        rating: parseInt(rating),
        repositoryName: repository,
        text: text === '' ? undefined : text
      }
      const {data} = await mutate({variables: {review: newReview}});
      navigate(`/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e)
      setMessage(e.message)
    }
  };

  return (
    <ReviewFormContainer onSubmit={onSubmit} message={message}/>
  )
}

export default ReviewForm;