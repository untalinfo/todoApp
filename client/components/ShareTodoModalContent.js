
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function SharedTodoModalContent({
  id,
  title,
  shared_with_id,
  completed
}) {
  const [author, setAuthor] = useState({});
  const [sharedWith, setSharedWith] = useState({});

  useEffect(() => {
    fetchInfo();
  }, [])
  
  const fetchInfo = async () => {
    const response = await fetch(
      `http://localhost:8080/todos/shared_todos/${id}`,
      {
        method: "GET",
      }
    );
    const { author, shared_with } = await response.json();
    setAuthor(author);
    setSharedWith(shared_with);
  };

  

  return (
    <View style={styles.container} >
      <Text style={[styles.title, { marginBottom: 20 }]}>Shared Tasks</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={[styles.title]}>Status</Text>
      <View
        style={[
          styles.status,
          { backgroundColor: completed === 1 ? "#176B87" : "#FF3EA5" },
        ]}
      >
        <Text style={[styles.title, { color: "#EEF5FF" }]}>
          {completed === 1 ? "Completed" : "Incompleted"}
        </Text>
      </View>
      <Text style={[styles.title]}>PARTICIPANTS</Text>
      <View style={{ flexDirection: "row", gap: 8, paddingTop: 6 }}>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "#EEF5FF" }]}>
            {author?.name}
          </Text>
        </View>
        <View style={styles.participant}>
          <Text style={[styles.description, { color: "#EEF5FF" }]}>
            {sharedWith?.name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    fontWeight: "normal",
    letterSpacing: 0.5,
    fontSize: 13,
    fontWeight: 600,
  },
  participant: {
    backgroundColor: "#86B6F6",
    borderRadius: 30,
    padding: 6,
    textAlign: "center",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  status: {
    marginBottom: 20,
    borderRadius: 30,
    padding: 6,
  },
});