import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://10.87.9.86:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      Alert.alert("Success", "Login successful");

      // send token to next screen
      router.push({
        pathname: "/workouts",
        params: { token: res.data.token },
      });

    } catch (error) {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <View style={{ flex: 1,
                    backgroundColor: "#fff",
                    padding: 20,
                    marginTop: 40 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <Button title="Login" onPress={loginUser} />
      <Button title="Go to Register" onPress={() => router.push("/register")}
/>
    </View>
  );
}