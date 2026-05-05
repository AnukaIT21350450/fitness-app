import { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";

export default function Workouts() {
  const { token } = useLocalSearchParams();
  const router = useRouter();
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get(
        "http://10.87.9.86:5000/api/workouts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorkouts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await axios.delete(
        `http://10.87.9.86:5000/api/workouts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchWorkouts(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <View style={{  flex: 1,
                    backgroundColor: "#fff",
                    padding: 20,
                    marginTop: 40}}>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
        My Workouts
      </Text>
        
        <Button
            title="Logout"
            onPress={() => router.push("/login")}
        />
        <Button
            title="Add Workout"
            onPress={() =>
                router.push({
                    pathname: "/add-workout",
                    params: { token },
            })
         }
        />

      <FlatList
        data={workouts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
            <View style={{ backgroundColor: "#f5f5f5", padding: 10, marginVertical: 5, borderRadius: 8 }}>
            <Text style={{ color: "#000" }}>
                {item.title} - {item.duration} min
            </Text>

            {/* 🔥 EDIT BUTTON */}
            <Button title="Edit" onPress={() =>
                router.push({
                    pathname: "/edit-workout",
                    params: {
                        id: item._id,
                        title: item.title,
                        duration: item.duration,
                        token,
                    },
                    })
                }/>

            {/* ❌ DELETE BUTTON */}
            <Button title="Delete" onPress={() => deleteWorkout(item._id)} />
            </View>
            )}
      />
    </View>
  );
}