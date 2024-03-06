import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SharedTodoModalContent from "./ShareTodoModalContent";
import TodoModalContent from "./TodoModalContent";

function CheckMark({id, completed, toggleTodo}) {
  async function toggle() {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      headers: {
        "x-api-key": "abcdefg123456",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        value: completed ? false : true,
      }),
    });
    const data = await response.json();
    toggleTodo(id);
    console.log(data);
  }
  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.checkMark,
        { backgroundColor: completed === 0 ? "#EEF5FF" : "#176B87" },
      ]}
    ></Pressable>
  );
}
export default function Task({
  id,
  title,
  shared_with_id,
  completed,
  clearTodo,
  toggleTodo,
}) {
  const [isDeleteActive, setIsDeleteActive] = React.useState(false);
  const bottomSheetModalRef = React.useRef(null);
  const sharedBottomSheetRef = React.useRef(null);
  const snapPoints = ["25%", "48%", "75%"];
  const snapPointsShared = ["40%"];

  const handlePresentShared = () =>{
    sharedBottomSheetRef.current?.present();
  }

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  async function deleteTodo() {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });
    clearTodo(id);
    console.log(response.status);
  }
  return (
    // TouchableOpacity es un componente que permite crear elemento interactivos que responde cuando el usuario los toca
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPressOut={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={[styles.container]}
    >
      <View style={styles.containerTextCheckBox}>
        <CheckMark id={id} completed={completed} toggleTodo={toggleTodo} />
        <Text style={StyleSheet.text}>{title}</Text>
      </View>
      {shared_with_id != null ? (
        <Feather
          onPress={handlePresentShared}
          name="users"
          size={20}
          color={"#383839"}
        />
      ) : (
        <Feather
          onPress={handlePresentModal}
          name="share"
          size={20}
          color={"#383839"}
        />
      )}
      {isDeleteActive && (
        <Pressable onPress={deleteTodo} style={styles.deleteButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>x</Text>
        </Pressable>
      )}
      <BottomSheetModal
        ref={sharedBottomSheetRef}
        snapPoints={snapPointsShared}
        backgroundStyle={{ borderRadius: 40, borderWidth: 2 }}
      >
        <SharedTodoModalContent
          id={id}
          title={title}
          shared_with_id={shared_with_id}
          completed={completed}
        />
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={2}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 40, borderWidth: 2 }}
      >
        <TodoModalContent
          id={id}
          title={title}
        />
      </BottomSheetModal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B4D4FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
  },
  containerTextCheckBox: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: "bold",
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  deleteButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: "50%",
    width: 20,
    height: 20,
    position: "absolute",
    right: -5,
    top: -5,
  },
});