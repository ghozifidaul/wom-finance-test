import { RouteProp, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { usePostDetail } from "../hooks/usePostDetail";
import { RootStackParamList } from "../navigation/types";
import { useTheme } from "../theme";

type PostDetailRouteProp = RouteProp<RootStackParamList, "PostDetail">;

export function PostDetailScreen() {
  const route = useRoute<PostDetailRouteProp>();
  const { postId } = route.params;
  const { colors } = useTheme();
  const { post, loading, error, refetch } = usePostDetail(postId);

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <ThemedText
          style={[styles.loadingText, { color: colors.textSecondary }]}
        >
          Loading post details...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error || !post) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={[styles.errorText, { color: colors.text }]}>
          {error || "Post not found"}
        </ThemedText>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={refetch}
        >
          <ThemedText style={styles.buttonText}>Retry</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <ThemedView style={[styles.card, { borderColor: colors.border }]}>
        <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
          Title
        </ThemedText>
        <ThemedText style={styles.title}>{post.title}</ThemedText>

        <ThemedView
          style={[styles.divider, { backgroundColor: colors.border }]}
        />

        <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
          Body
        </ThemedText>
        <ThemedText style={styles.body}>{post.body}</ThemedText>

        <ThemedView
          style={[styles.divider, { backgroundColor: colors.border }]}
        />

        <ThemedView style={styles.metaContainer}>
          <ThemedText style={[styles.metaLabel, { color: colors.textSecondary }]}>
            User ID:
          </ThemedText>
          <ThemedText style={styles.metaValue}>{post.userId}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.metaContainer}>
          <ThemedText style={[styles.metaLabel, { color: colors.textSecondary }]}>
            Post ID:
          </ThemedText>
          <ThemedText style={styles.metaValue}>{post.id}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  } as ViewStyle,
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  } as ViewStyle,
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  } as TextStyle,
  title: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
    textTransform: "capitalize",
  } as TextStyle,
  divider: {
    height: 1,
    marginVertical: 16,
  } as ViewStyle,
  body: {
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  metaContainer: {
    flexDirection: "row",
    marginBottom: 8,
  } as ViewStyle,
  metaLabel: {
    fontSize: 14,
    marginRight: 8,
  } as TextStyle,
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
  } as TextStyle,
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  } as ViewStyle,
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  } as TextStyle,
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  } as TextStyle,
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  } as TextStyle,
});
