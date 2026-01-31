import { StyleSheet, Text, View } from "react-native";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
});
