import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '../services/AuthService';

export interface UsernameValidationState {
  isValid: boolean;
  isAvailable: boolean | null;
  isChecking: boolean;
  error: string | null;
  validationClass: 'neutral' | 'checking' | 'valid' | 'invalid';
}

export const useUsernameValidation = (username: string, currentUsername?: string | null) => {
  const [state, setState] = useState<UsernameValidationState>({
    isValid: false,
    isAvailable: null,
    isChecking: false,
    error: null,
    validationClass: 'neutral'
  });

  // Debounced validation function
  const validateUsername = useCallback(async (usernameToCheck: string) => {
    // Skip if empty or same as current username
    if (!usernameToCheck.trim() || usernameToCheck === currentUsername) {
      setState({
        isValid: false,
        isAvailable: null,
        isChecking: false,
        error: null,
        validationClass: 'neutral'
      });
      return;
    }

    // Start validation
    setState(prev => ({
      ...prev,
      isChecking: true,
      validationClass: 'checking'
    }));

    try {
      // First check format validation
      const formatValidation = AuthService.validateUsername(usernameToCheck);
      
      if (!formatValidation.isValid) {
        setState({
          isValid: false,
          isAvailable: false,
          isChecking: false,
          error: formatValidation.error || 'Invalid username format',
          validationClass: 'invalid'
        });
        return;
      }

      // Then check availability
      const availability = await AuthService.checkUsernameAvailability(usernameToCheck);
      
      const finalState: UsernameValidationState = {
        isValid: formatValidation.isValid && availability.available,
        isAvailable: availability.available,
        isChecking: false,
        error: availability.available ? null : (availability.error || 'Username is already taken'),
        validationClass: availability.available ? 'valid' : 'invalid'
      };
      
      setState(finalState);
    } catch (error) {
      console.error('Username validation error:', error);
      setState({
        isValid: false,
        isAvailable: false,
        isChecking: false,
        error: 'Error checking username availability',
        validationClass: 'invalid'
      });
    }
  }, [currentUsername]);

  // Debounce the validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateUsername(username);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [username, validateUsername]);

  return state;
}; 