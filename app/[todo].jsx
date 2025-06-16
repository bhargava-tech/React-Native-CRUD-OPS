import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodoEditLayout() {
  const { colorScheme, theme, Container } = useContext(ThemeContext);

  const { todo } = useLocalSearchParams();
  const todoObj = JSON.parse(todo);
  const [title, setTitle] = useState(todoObj?.title || "");
  const [desc, setDesc] = useState(todoObj?.description || "");
  const styles = createStyles(theme, colorScheme);
  const router = useRouter();

  const submitClick = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("TODODATA");
      const remoteData = jsonData != null ? JSON.parse(jsonData) : null;
      if (remoteData && remoteData.length) {
        const otherRemoteTodos = remoteData.filter(
          (todo) => todo.id !== todoObj.id
        );
        const allTodos = [
          ...otherRemoteTodos,
          { ...todoObj, title: title, description: desc },
        ];
        await AsyncStorage.setItem("TODODATA", JSON.stringify(allTodos));
      } else {
        await AsyncStorage.setItem(
          "TODODATA",
          JSON.stringify([{ ...todoObj, title: title, description: desc }])
        );
      }
      router.back();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container style={styles.container}>
      <View style={styles.subView}>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          placeholder="Enter title"
          placeholderTextColor="gray"
          multiline={true}
        />
        <Text style={styles.title}>Description</Text>
        <TextInput
          style={styles.inputSub}
          value={desc}
          onChangeText={(text) => {
            setDesc(text);
          }}
          placeholder="Enter Description"
          placeholderTextColor="gray"
          multiline={true}
        />
      </View>
      <View style={styles.subView1}>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            submitClick();
          }}
        >
          <Text style={styles.submit}>Submit</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
      </View>
    </Container>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingLeft: 10,
      flexDirection: "coloum",
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 30,
    },
    subView: {
      padding: 5,
      flex: 1,
      flexDirection: "coloum",
    },
    subView1: {
      marginHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    pressable: {
      flex: 1,
      color: "white",
      textAlign: "center",
      fontWeight: "500",
      borderRadius: 10,
      marginRight: 5,
      backgroundColor: theme.themeColor,
    },
    submit: {
      color: "white",
      textAlign: "center",
      padding: 15,
      fontWeight: "500",
      borderRadius: 10,
      backgroundColor: theme.themeColor,
    },
    cancel: {
      borderRadius: 10,
      fontWeight: "500",
      padding: 15,
      textAlign: "center",
      color: "white",
      backgroundColor: "gray",
    },
    input: {
      minHeight: 50,
      maxHeight: 200,
      borderColor: "gray",
      marginTop: 5,
      borderWidth: 1,
      paddingHorizontal: 10,
      fontSize: 16,
      color: theme.text,
    },
    inputSub: {
      minHeight: 50,
      maxHeight: 300,
      borderColor: "gray",
      marginTop: 5,
      borderWidth: 1,
      paddingHorizontal: 10,
      fontSize: 16,
      color: theme.text,
    },

    textNormal: {
      color: theme.text,
      fontSize: 16,
      flex: 1,
      fontWeight: "bold",
    },
    title: {
      color: theme.themeColor,
      fontSize: 16,
      marginTop: 15,
      fontWeight: "bold",
    },
  });
}
