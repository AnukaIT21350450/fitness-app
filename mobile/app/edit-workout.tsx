import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditWorkout() {
  const router = useRouter();
  const { token, id, title, duration } = useLocalSearchParams();

  const [newTitle, setNewTitle] = useState(title);
  const [newDuration, setNewDuration] = useState(duration);

  const updateWorkout = async () => {
    await axios.put(
      `http://10.87.9.86:5000/api/workouts/${id}`,
      {
        title: newTitle,
        duration: newDuration,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push({
      pathname: "/workouts",
      params: { token },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <TextInput
        value={newTitle}
        onChangeText={setNewTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        value={String(newDuration)}
        onChangeText={setNewDuration}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <Button title="Update" onPress={updateWorkout} />
    </View>
  );
}