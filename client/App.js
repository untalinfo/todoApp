import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Task from "./components/Task";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://localhost:8080/todos/1");
    const data = await response.json();
    setTodos(data);
  }

  const clearTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  function toogleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          {/* SafeAreView permite colocar todo el contenido dentro de un area visible de la pantalla */}
          <SafeAreaView>
            {/* FlatList Nos permite tener una lista con un scroll */}
            <FlatList
              data={todos}
              keyExtractor={(todo) => todo.id}
              renderItem={({ item }) => (
                <Task {...item} toggleTodo={toogleTodo} clearTodo={clearTodo} />
              )}
              ListHeaderComponent={() => (
                <Text style={styles.title}>Today</Text>
              )}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </SafeAreaView>

          <StatusBar style="auto" />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
});
