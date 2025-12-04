import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../components/Common/PrimaryButton';
import { useApp } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface OnboardingPermissionsScreenProps {
  navigation: any;
}

export const OnboardingPermissionsScreen: React.FC<OnboardingPermissionsScreenProps> = ({ navigation }) => {
  const { setOnboarded } = useApp();

  const handleFinish = () => {
    setOnboarded(true);
  };

  const handleEnableNotifications = () => {
    // Placeholder for future notification permission logic
    console.log('Enabling notifications...');
  };

  const handleEnableLocation = () => {
    // Placeholder for future location permission logic
    console.log('Enabling location...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Enable Permissions</Text>
          <Text style={styles.subtitle}>
            Help us provide you with the best experience
          </Text>
        </View>

        <View style={styles.permissions}>
          <View style={styles.permission}>
            <Text style={styles.permissionIcon}>🔔</Text>
            <Text style={styles.permissionTitle}>Notifications</Text>
            <Text style={styles.permissionText}>
              Receive timely reminders for medications and important alerts
            </Text>
            <PrimaryButton
              title="Enable Notifications"
              onPress={handleEnableNotifications}
              style={styles.permissionButton}
            />
          </View>

          <View style={styles.permission}>
            <Text style={styles.permissionIcon}>📍</Text>
            <Text style={styles.permissionTitle}>Location (Optional)</Text>
            <Text style={styles.permissionText}>
              Get reminders when you're near a pharmacy for expiring medications
            </Text>
            <PrimaryButton
              title="Enable Location"
              onPress={handleEnableLocation}
              style={styles.permissionButton}
            />
          </View>
        </View>

        <PrimaryButton
          title="Finish"
          onPress={handleFinish}
          style={styles.finishButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  permissions: {
    flex: 1,
  },
  permission: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  permissionIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  permissionTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  permissionText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  permissionButton: {
    alignSelf: 'stretch',
  },
  finishButton: {
    marginTop: spacing.lg,
  },
});
