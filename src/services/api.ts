import axios, { isAxiosError } from 'axios';
import { Post } from '../types/post';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Network error: No response received. Please check your internet connection.');
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
    throw new Error('An unexpected error occurred while fetching posts.');
  }
}

export async function fetchPostDetail(postId: number): Promise<Post> {
  try {
    const response = await api.get<Post>(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Network error: No response received. Please check your internet connection.');
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
    throw new Error('An unexpected error occurred while fetching post details.');
  }
}

export default api;
