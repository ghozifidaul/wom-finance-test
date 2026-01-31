# WOM Finance App

A React Native mobile application built with Expo featuring authentication, data fetching, and theme management.

## Overview

This is a cross-platform mobile application built with Expo and React Native. It demonstrates modern React Native development patterns including:

- **Authentication**: Secure login system with session persistence
- **Data Fetching**: REST API integration with custom hooks
- **Theming**: Light/dark mode support with persistent preferences
- **Navigation**: Type-safe navigation with React Navigation
- **Form Validation**: Client-side validation using Zod

## Tech Stack

- **Framework**: [Expo](https://expo.dev) ~54.0.32
- **React**: 19.1.0
- **React Native**: 0.81.5
- **TypeScript**: ~5.9.2
- **Navigation**: React Navigation v7 with native-stack
- **HTTP Client**: Axios
- **Validation**: Zod
- **Storage**: AsyncStorage
- **Icons**: @expo/vector-icons (Ionicons)

## Project Structure

```
wom-finance-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ThemedText.tsx   # Text component with theme support
│   │   ├── ThemedView.tsx   # View component with theme support
│   │   ├── ThemeToggle.tsx  # Theme switcher button
│   │   └── LogoutButton.tsx # Logout confirmation button
│   ├── context/             # React Context providers
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── hooks/               # Custom React hooks
│   │   ├── usePosts.ts      # Fetch posts list
│   │   └── usePostDetail.ts # Fetch single post
│   ├── navigation/          # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── screens/             # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── PostDetailScreen.tsx
│   ├── services/            # Business logic & API
│   │   ├── api.ts           # API client & posts endpoints
│   │   └── auth.ts          # Authentication logic
│   ├── theme/               # Theming system
│   │   ├── colors.ts        # Color definitions
│   │   ├── ThemeContext.tsx # Theme provider
│   │   └── index.ts
│   └── types/               # TypeScript definitions
│       ├── auth.ts
│       └── post.ts
├── assets/                  # Images & static assets
├── App.tsx                  # Root app component
├── index.js                 # Entry point
├── package.json
├── app.json                 # Expo configuration
└── tsconfig.json
```

## Architecture

### Navigation

Uses **React Navigation v7** with a native stack navigator:

- **Login**: Unauthenticated entry point
- **Home**: Posts list (authenticated)
- **PostDetail**: Individual post view (authenticated)

Navigation state is managed by `RootNavigator.tsx` with conditional rendering based on authentication status.

### State Management

Two main context providers at the root level:

1. **ThemeProvider** (`src/theme/ThemeContext.tsx`)
   - Manages light/dark theme
   - Persists preference to AsyncStorage
   - Provides colors and toggle function

2. **AuthProvider** (`src/context/AuthContext.tsx`)
   - Manages authentication state
   - Handles login/logout flows
   - Restores session from AsyncStorage on app launch
   - Validates JWT tokens

### Data Fetching

Custom hooks for data operations:

- **usePosts**: Fetches list of posts from JSONPlaceholder API
- **usePostDetail**: Fetches individual post by ID

Both hooks manage loading states, error handling, and retry functionality.

### Theming System

- **colors.ts**: Defines color palettes for light/dark modes
- **ThemedText & ThemedView**: Wrapper components that automatically apply theme colors
- **ThemeToggle**: Header button to switch themes

### Authentication

Mock authentication system with:

- Hardcoded credentials: `user@example.com` / `password123`
- Zod validation for form inputs
- JWT token generation (client-side mock)
- Token validation and expiration checking
- Persistent sessions using AsyncStorage

### Form Validation

Uses **Zod** for schema validation:

- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Real-time validation with error display

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Expo CLI (optional, can use npx)
- iOS Simulator (macOS only) or Android Emulator

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npx expo start
   ```

3. Run on your preferred platform:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on physical device

### Demo Credentials

Use these credentials to log in:

- **Email**: `user@example.com`
- **Password**: `password123`

## Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start with Android emulator
- `npm run ios` - Start with iOS simulator
- `npm run web` - Start web version
- `npm run lint` - Run ESLint

## Key Features

1. **Authentication Flow**
   - Login form with validation
   - Session persistence across app restarts
   - Secure logout with confirmation

2. **Posts Browser**
   - List of posts from JSONPlaceholder API
   - Pull-to-refresh functionality
   - Error handling with retry option
   - Tap to view post details

3. **Theme Management**
   - Light/dark mode toggle in header
   - Persistent theme preference
   - Smooth transitions between themes

4. **Responsive UI**
   - Keyboard-aware layout on login screen
   - Loading states and error boundaries
   - Accessible touch targets

## API Integration

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock REST API:

- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch single post

## Development Notes

- All components use TypeScript for type safety
- Strict mode enabled in tsconfig.json
- Path aliasing configured (`@/*` maps to project root)
- ESLint configured with Expo rules
- VS Code settings include auto-fix and organize imports on save

## License

Private - All rights reserved
