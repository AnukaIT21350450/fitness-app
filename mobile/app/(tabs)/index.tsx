import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1,
                    backgroundColor: "#fff",
                    padding: 20,
                    marginTop: 40 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
        Fitness App
      </Text>

      <Text style={{ marginVertical: 10 }}>
        Welcome to Personal Training Manager
      </Text>

      <Button
        title="Go to Login"
        onPress={() => router.push("/login")}
      />
    </View>
  );
}