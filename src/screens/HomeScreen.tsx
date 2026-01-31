import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";
import { useTheme } from "../theme";

export function HomeScreen() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Title</ThemedText>
      <ThemedText style={styles.subtitle}>
        Current theme: {theme}
      </ThemedText>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={toggleTheme}
      >
        <ThemedText style={styles.buttonText}>
          Toggle Theme
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    opacity: 0.7,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
