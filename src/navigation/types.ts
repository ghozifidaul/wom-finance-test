export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  PostDetail: { postId: number };
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
