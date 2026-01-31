import { 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl,
  ViewStyle,
  TextStyle 
} from "react-native";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";
import { useTheme } from "../theme";
import { usePosts } from "../hooks/usePosts";
import { Post } from "../types/post";

export function HomeScreen() {
  const { theme, toggleTheme, colors } = useTheme();
  const { posts, loading, error, refetch } = usePosts();

  const renderPost = ({ item }: { item: Post }) => (
    <ThemedView style={[styles.postContainer, { borderColor: colors.border }]}>
      <ThemedText style={styles.postTitle} numberOfLines={2}>
        {item.title}
      </ThemedText>
      <ThemedText style={[styles.postBody, { color: colors.textSecondary }]} numberOfLines={3}>
        {item.body}
      </ThemedText>
    </ThemedView>
  );

  const renderHeader = () => (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.title}>Posts</ThemedText>
      <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
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

  if (loading && posts.length === 0) {
    return (
      <ThemedView style={styles.centerContainer}>
        {renderHeader()}
        <ActivityIndicator size="large" color={colors.primary} />
        <ThemedText style={[styles.loadingText, { color: colors.textSecondary }]}>
          Loading posts...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error && posts.length === 0) {
    return (
      <ThemedView style={styles.centerContainer}>
        {renderHeader()}
        <ThemedText style={[styles.errorText, { color: colors.text }]}>
          {error}
        </ThemedText>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={refetch}
        >
          <ThemedText style={styles.buttonText}>
            Retry
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={styles.headerContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  } as ViewStyle,
  headerContainer: {
    marginBottom: 20,
  } as ViewStyle,
  header: {
    alignItems: "center",
    paddingVertical: 20,
  } as ViewStyle,
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  } as TextStyle,
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7,
  } as TextStyle,
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
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
  listContent: {
    padding: 16,
  } as ViewStyle,
  postContainer: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
  } as ViewStyle,
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "capitalize",
  } as TextStyle,
  postBody: {
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
});
