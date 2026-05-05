import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AddWorkout() {
  const router = useRouter();
  const { token } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const addWorkout = async () => {
    try {
      await axios.post(
        "http://10.87.9.86:5000/api/workouts",
        {
          title,
          duration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Workout Added");

      router.push({
        pathname: "/workouts",
        params: { token },
      });

    } catch (error) {
      Alert.alert("Error", "Failed to add workout");
    }
  };

  return (
    <View style={{  flex: 1,
                    backgroundColor: "#fff",
                    padding: 20,
                    marginTop: 40 }}>
      <TextInput
        placeholder="Workout Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Duration (mins)"
        value={duration}
        onChangeText={setDuration}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        keyboardType="numeric"
      />

      <Button title="Add Workout" onPress={addWorkout} />
    </View>
  );
}