import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import Text from "../utils/Text";
import {useNavigate} from "react-router-native";
import React, {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {Searchbar} from "react-native-paper";
import {useDebounce} from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderSelector = ({order, setOrder}) => {
  return (
    <Picker
      selectedValue={order.toString()}
      onValueChange={(itemValue, itemIndex) => setOrder(parseInt(itemValue))}
    >
      <Picker.Item label="Latest repositories" value="0" />
      <Picker.Item label="Highest rated repositories" value="1" />
      <Picker.Item label="Lowest rated repositories" value="2" />
    </Picker>
  );
}

const SearchSelector = ({search, setSearch}) => {
  return (
    <Searchbar
      value={search}
      placeholder="Search"
      onChangeText={setSearch}
      style={{backgroundColor: '#fff'}}
    />
  )
}

const OrganizeSelector = ({order, setOrder, search, setSearch}) => {
  return (
    <View style={styles.container}>
      <SearchSelector search={search} setSearch={setSearch} />
      <OrderSelector order={order} setOrder={setOrder} />
    </View>
  )
}

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeader = () => {
    return (
      <OrganizeSelector
        order={this.props.order}
        setOrder={this.props.setOrder}
        search={this.props.search}
        setSearch={this.props.setSearch}
      />
    )
  }

  render() {
    // Get the nodes from the edges array
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
        renderItem={({item}) => (
          <Pressable onPress={()=> this.props.navigateToId(item.id)}>
            <RepositoryItem repository={item}/>
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState(0)
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const navigate = useNavigate();

  const { repositories, loading, fetchMore } = useRepositories({
    order,
    search: debouncedSearch,
    first: 8,
  });

  const navigateToId = (id) => {
    navigate(`/${id}`);
  }

  const onEndReach = async () => {
    await fetchMore()
  };

  if(loading) {
    return <Text>Loading ...</Text>
  }

  return <RepositoryListContainer
    repositories={repositories}
    order={order}
    setOrder={setOrder}
    search={search}
    setSearch={setSearch}
    navigateToId={navigateToId}
    onEndReach={onEndReach}
  />;
};

export default RepositoryList;