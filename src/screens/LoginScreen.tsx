import { useState, useCallback } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useTheme } from '../theme';
import { useAuth } from '../context/AuthContext';
import { validateLoginCredentials } from '../services/auth';

export function LoginScreen() {
  const { colors } = useTheme();
  const { login, isLoading, error: authError, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  const validateField = useCallback((field: 'email' | 'password', value: string) => {
    const result = validateLoginCredentials({ 
      email: field === 'email' ? value : email, 
      password: field === 'password' ? value : password 
    });
    
    if (!result.success && result.errors) {
      setErrors(prev => ({ ...prev, [field]: result.errors?.[field] }));
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [email, password]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (touched.email) {
      validateField('email', text);
    }
    if (authError) clearError();
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (touched.password) {
      validateField('password', text);
    }
    if (authError) clearError();
  };

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    validateField('email', email);
  };

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    validateField('password', password);
  };

  const handleLogin = async () => {
    setTouched({ email: true, password: true });
    
    const validation = validateLoginCredentials({ email, password });
    
    if (!validation.success) {
      setErrors(validation.errors || {});
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      setEmail('');
      setPassword('');
      setErrors({});
      setTouched({});
    }
  };

  const isFormValid = email.length > 0 && password.length > 0 && !errors.email && !errors.password;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.container}>
          <ThemedView style={styles.headerContainer}>
            <ThemedText style={styles.title}>Welcome Back</ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sign in to continue
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.formContainer}>
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surface,
                    borderColor: errors.email ? '#FF3B30' : colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="user@example.com"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              {errors.email && touched.email && (
                <ThemedText style={styles.errorText}>{errors.email}</ThemedText>
              )}
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surface,
                    borderColor: errors.password ? '#FF3B30' : colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="password123"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={handlePasswordBlur}
                secureTextEntry
                editable={!isLoading}
              />
              {errors.password && touched.password && (
                <ThemedText style={styles.errorText}>{errors.password}</ThemedText>
              )}
            </ThemedView>

            {authError && (
              <ThemedView style={[styles.authErrorContainer, { backgroundColor: colors.surface }]}>
                <ThemedText style={styles.authErrorText}>{authError}</ThemedText>
              </ThemedView>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isFormValid && !isLoading ? colors.primary : colors.border,
                },
              ]}
              onPress={handleLogin}
              disabled={!isFormValid || isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <ThemedText style={styles.buttonText}>Sign In</ThemedText>
              )}
            </TouchableOpacity>

            <ThemedView style={styles.hintContainer}>
              <ThemedText style={[styles.hintText, { color: colors.textSecondary }]}>
                Demo credentials:
              </ThemedText>
              <ThemedText style={[styles.hintText, { color: colors.textSecondary }]}>
                user@example.com / password123
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  } as ViewStyle,
  scrollContent: {
    flexGrow: 1,
  } as ViewStyle,
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  } as ViewStyle,
  headerContainer: {
    marginBottom: 32,
    alignItems: 'center',
  } as ViewStyle,
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  } as TextStyle,
  subtitle: {
    fontSize: 16,
  } as TextStyle,
  formContainer: {
    width: '100%',
  } as ViewStyle,
  inputGroup: {
    marginBottom: 20,
  } as ViewStyle,
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  } as TextStyle,
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  } as TextStyle,
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  } as TextStyle,
  authErrorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  } as ViewStyle,
  authErrorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
  } as TextStyle,
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  } as ViewStyle,
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,
  hintContainer: {
    marginTop: 24,
    alignItems: 'center',
  } as ViewStyle,
  hintText: {
    fontSize: 12,
    textAlign: 'center',
  } as TextStyle,
});
