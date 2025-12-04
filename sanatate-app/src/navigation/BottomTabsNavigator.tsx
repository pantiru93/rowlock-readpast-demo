import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TodayScreen } from '../screens/Today/TodayScreen';
import { MedicationsListScreen } from '../screens/Medications/MedicationsListScreen';
import { MedicationDetailsScreen } from '../screens/Medications/MedicationDetailsScreen';
import { AddMedicationScreen } from '../screens/Medications/AddMedicationScreen';
import { RemindersScreen } from '../screens/Reminders/RemindersScreen';
import { DocumentsScreen } from '../screens/Documents/DocumentsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();
const MedicationsStack = createNativeStackNavigator();

function MedicationsNavigator() {
  return (
    <MedicationsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
      }}
    >
      <MedicationsStack.Screen
        name="MedicationsList"
        component={MedicationsListScreen}
        options={{ headerShown: false }}
      />
      <MedicationsStack.Screen
        name="MedicationDetails"
        component={MedicationDetailsScreen}
        options={{ title: 'Medication Details', headerShown: true }}
      />
      <MedicationsStack.Screen
        name="AddMedication"
        component={AddMedicationScreen}
        options={{ title: 'Add Medication', headerShown: true }}
      />
    </MedicationsStack.Navigator>
  );
}

export function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Today') {
            iconName = focused ? 'today' : 'today-outline';
          } else if (route.name === 'Medications') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'Reminders') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Documents') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Medications" component={MedicationsNavigator} />
      <Tab.Screen name="Reminders" component={RemindersScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
