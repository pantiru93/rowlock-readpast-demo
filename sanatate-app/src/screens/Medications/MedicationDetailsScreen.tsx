import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Common/Card';
import { Chip } from '../../components/Common/Chip';
import { useApp } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface MedicationDetailsScreenProps {
  navigation: any;
  route: any;
}

export const MedicationDetailsScreen: React.FC<MedicationDetailsScreenProps> = ({ route }) => {
  const { state } = useApp();
  const { medicationId } = route.params;

  const medication = state.medications.find(m => m.id === medicationId);
  const relatedReminders = state.reminders.filter(r => r.medicationId === medicationId);

  if (!medication) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Medication not found</Text>
      </SafeAreaView>
    );
  }

  const getMemberName = (memberId: string) => {
    return state.members.find(m => m.id === memberId)?.name || 'Unknown';
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{medication.name}</Text>
          <Chip
            label={medication.form}
            color={colors.primary}
          />
        </View>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Form:</Text>
            <Text style={styles.detailValue}>{medication.form}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>For:</Text>
            <Text style={styles.detailValue}>
              {medication.forMembers.map(getMemberName).join(', ')}
            </Text>
          </View>
          {medication.totalUnits && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Stock:</Text>
              <Text style={styles.detailValue}>
                {medication.remainingUnits} / {medication.totalUnits} units
              </Text>
            </View>
          )}
          {medication.expiryDate && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expires:</Text>
              <Text style={styles.detailValue}>
                {new Date(medication.expiryDate).toLocaleDateString()}
              </Text>
            </View>
          )}
          {medication.openedAt && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Opened:</Text>
              <Text style={styles.detailValue}>
                {new Date(medication.openedAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        </Card>

        {relatedReminders.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Active Reminders</Text>
            {relatedReminders.map(reminder => (
              <View key={reminder.id} style={styles.reminderItem}>
                <Text style={styles.reminderText}>
                  {getMemberName(reminder.memberId)} - {reminder.doseText}
                </Text>
                <Text style={styles.reminderSubtext}>
                  {reminder.timesPerDay}x per day at {reminder.timesOfDay.join(', ')}
                </Text>
              </View>
            ))}
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  section: {
    margin: spacing.lg,
    marginTop: 0,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.body,
    fontWeight: '600',
  },
  reminderItem: {
    marginBottom: spacing.md,
  },
  reminderText: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  reminderSubtext: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    padding: spacing.xl,
  },
});
