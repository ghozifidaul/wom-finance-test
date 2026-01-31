import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { usePosts } from "../hooks/usePosts";
import { useTheme } from "../theme";
import { Post } from "../types/post";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

export function HomeScreen() {
  const { colors } = useTheme();
  const { posts, loading, error, refetch } = usePosts();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePostPress = (postId: number) => {
    navigation.navigate("PostDetail", { postId });
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={[styles.postContainer, { borderColor: colors.border }]}
      onPress={() => handlePostPress(item.id)}
      activeOpacity={0.7}
    >
      <ThemedText style={styles.postTitle} numberOfLines={2}>
        {item.title}
      </ThemedText>
      <ThemedText
        style={[styles.postBody, { color: colors.textSecondary }]}
        numberOfLines={3}
      >
        {item.body}
      </ThemedText>
    </TouchableOpacity>
  );

  if (loading && posts.length === 0) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <ThemedText
          style={[styles.loadingText, { color: colors.textSecondary }]}
        >
          Loading posts...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error && posts.length === 0) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={[styles.errorText, { color: colors.text }]}>
          {error}
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
    backgroundColor: "transparent",
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
