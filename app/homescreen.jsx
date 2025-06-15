import {
  Text,
  Image,
  View,
  Platform,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { todoList } from "@/data/Todos";
import deleteIcon from "@/assets/images/delete.png";
import addIcon from "@/assets/images/add-icon.png";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Molengo_400Regular, useFonts } from "@expo-google-fonts/molengo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  LinearTransition as AnimType,
} from "react-native-reanimated";

export default function HomePage() {
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  const [todos, setTodos] = useState(todoList.sort((a, b) => b.id - a.id));
  const [newTodo, setNewTodo] = useState(``);
  const [loaded, error] = useFonts({ Molengo_400Regular });

  if (!loaded && !error) {
    return null;
  }

  const onAddPress = () => {
    console.log(`Add button pressed - ${newTodo}`);
    if (newTodo) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([
        { id: newId, title: newTodo, description: "", completed: false },
        ...todos,
      ]);
      setNewTodo("");
    }
  };

  const togleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const removeTodo = (id) => {
    console.log(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const styles = createStyles(theme, colorScheme);

  return (
    <Container style={styles.container}>
      <View style={styles.mainView}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          value={newTodo}
          onChangeText={setNewTodo}
          placeholderTextColor="gray"
        />
        <Pressable
          onPress={() => {
            onAddPress();
          }}
        >
          <Image style={styles.addimage} source={addIcon} />
        </Pressable>
        <Pressable
          onPress={() => {
            setColorScheme(colorScheme === "dark" ? "light" : "dark");
          }}
        >
          {colorScheme === "dark" ? (
            <Ionicons name="moon" size={30} color="white" />
          ) : (
            <Ionicons name="sunny" size={30} color="gray" />
          )}
        </Pressable>
      </View>
      <Animated.FlatList
        data={todos}
        style={styles.flatList}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <Text
              style={[styles.textNormal, item.completed && styles.textRemoved]}
              onPress={() => {
                togleTodo(item.id);
              }}
            >
              {item.title}
            </Text>
            <Pressable
              onPress={() => {
                removeTodo(item.id);
              }}
            >
              <Image style={styles.image} source={deleteIcon} />
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        itemLayoutAnimation={AnimType}
        keyboardDismissMode={"on-drag"}
      />
    </Container>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingLeft: 10,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 30,
    },
    flatList: {
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "gray",
    },

    view: {
      flex: 1,
      padding: 20,
      flexDirection: "row",
      marginTop: 5,
      borderBottomWidth: 1,
      borderBottomStartRadius: 5,
      borderBottomEndRadius: 5,
      borderBottomColor: "gray",
    },
    textNormal: {
      color: theme.text,
      fontSize: 16,
      fontFamily: "Molengo_400Regular",
      flex: 1,
      fontWeight: "bold",
    },
    textRemoved: {
      color: "gray",
      fontSize: 16,
      fontFamily: "Molengo_400Regular",
      flex: 1,
      textDecorationLine: "line-through",
      fontWeight: "bold",
    },
    image: {
      width: 24,
      height: 24,
      alignItems: "flex-end",
    },
    input: {
      height: 40,
      paddingHorizontal: 10,
      fontSize: 15,
      fontFamily: "Molengo_400Regular",
      borderRightWidth: 1,
      marginEnd: 10,
      borderRightColor: "gray",
      flex: 1,
      color: theme.text,
    },
    mainView: {
      flexDirection: "row",
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
    },
    addimage: {
      width: 30,
      marginEnd: 5,
      marginLeft: 5,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 2,
      height: 30,
    },
  });
}
