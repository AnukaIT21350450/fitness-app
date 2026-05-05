import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
        await axios.post("http://10.87.9.86:5000/api/auth/register", {
        name,
        email,
        password,
        });

        Alert.alert("Success", "Registered successfully");
        router.replace("/login");

    } catch (error) {
        Alert.alert("Error", "Registration failed");
    }
    };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
        Register
      </Text>

      <TextInput placeholder="Name" onChangeText={setName} style={{ borderWidth: 1, marginVertical: 10, padding: 10 }} />
      <TextInput placeholder="Email" onChangeText={setEmail} style={{ borderWidth: 1, marginVertical: 10, padding: 10 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1, marginVertical: 10, padding: 10 }} />

      <Button title="Register" onPress={registerUser} />
    </View>
  );
}