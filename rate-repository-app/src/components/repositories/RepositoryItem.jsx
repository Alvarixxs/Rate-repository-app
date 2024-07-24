import {View, StyleSheet, Image, Pressable} from "react-native";
import Text from "../utils/Text";
import theme from "../../theme";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
  },
  introContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  statContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  imgContainer: {
    padding: 10,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 5,
  },
  introText: {
    flexGrow: 1,
    flexShrink: 1,
  },
  statText: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
  },
  language: {
    color: '#fff',
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  text: {
    padding: 5,
    flexGrow: 0,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
  }
})

const RepositoryItem = ({repository, url=false}) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryItemIntro repository={repository}/>
      <RepositoryItemStatistics repository={repository} />
      {url ? (
        <RepositoryItemOpen repository={repository}/>
      ) : null}
    </View>
  )
}

const RepositoryItemIntro = ({repository}) => {
  return (
    <View style={styles.introContainer}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} src={repository.ownerAvatarUrl}></Image>
      </View>
      <View style={styles.introText}>
        <Text style={styles.text} fontWeight="bold">{repository.fullName}</Text>
        <Text style={styles.text} color="textSecondary">{repository.description}</Text>
        <View style={styles.text}>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
    </View>
  )
}

const RepositoryItemStatistics = ({repository}) => {
  const parseStat = (stat) => {
    if (stat>1000) {
      return (stat/1000).toFixed(1) + 'k'
    }
    else {
      return stat
    }
  }
  return (
    <View style={styles.statContainer}>
      <View style={styles.statText}>
        <Text fontWeight="bold">{parseStat(repository.stargazersCount)}</Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.statText}>
        <Text fontWeight="bold">{parseStat(repository.forksCount)}</Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.statText}>
        <Text fontWeight="bold">{parseStat(repository.reviewCount)}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={styles.statText}>
        <Text fontWeight="bold">{parseStat(repository.ratingAverage)}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  )
}

const RepositoryItemOpen = ({repository}) => {
  const handlePress = async () => {
    await Linking.openURL(repository.url)
  }

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText} fontWeight="bold">Open in Github</Text>
    </Pressable>
  )
}

export default RepositoryItem