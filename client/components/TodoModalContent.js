
import { useState } from "react";
import { Alert, Button, Keyboard, StyleSheet, Text, View } from 'react-native';
import { TextInput } from "react-native-gesture-handler"

export default function TodoModalContent({ id, title }) {
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(
      `http://localhost:8080/todos/shared_todos`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          todo_id: id,
          user_id: 1, //Hard coded value (user 2)
          email: email, //Hard coded value (user 2)
        })
      }
    );
    const data = await response.json();
    console.log(data);
    Keyboard.dismiss(); //Sirve para ocultar el teclado virutal, especialemente para despues que el usuario haya temrinado de ingresar un texto
    setEmail("");
    setFocus(false);
    Alert.alert(
      "Congratulations!!!",
      `You successfully shared $ ${title} with ${email}.`,
      [{ text: "Okay"}]
    );
  };

  console.log("EMAIL", email)

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Shared Tasks</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={[styles.description]}>
        Entener the email of the user you want to share your task with. Share a
        task with someone and stay in sinc with your goals everyday.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => {
          setEmail(text.toLowerCase())
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType="email-address"
        style={[
          styles.input,
          focus && { borderWidth: 2, borderColor: "#176B87" },
        ]}
        placeholder="Enter an Email Address..."
      />
      <Button
        onPress={handleSubmit}
        title="Share This Task With Someone"
        disabled={email.length === 0}
      />
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
    color: "#9BBEC8",
    fontWeight: "normal",
    width: "100%",
    fontSize: 13,
    fontWeight: 600,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: "#B4D4FF",
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
  },
});