import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../state/AppContext';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import { OnboardingIntroScreen } from '../screens/Onboarding/OnboardingIntroScreen';
import { OnboardingMembersScreen } from '../screens/Onboarding/OnboardingMembersScreen';
import { OnboardingPermissionsScreen } from '../screens/Onboarding/OnboardingPermissionsScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const { state } = useApp();

  return (
    <NavigationContainer>
      {!state.isOnboarded ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="OnboardingIntro" component={OnboardingIntroScreen} />
          <Stack.Screen name="OnboardingMembers" component={OnboardingMembersScreen} />
          <Stack.Screen name="OnboardingPermissions" component={OnboardingPermissionsScreen} />
        </Stack.Navigator>
      ) : (
        <BottomTabsNavigator />
      )}
    </NavigationContainer>
  );
}
