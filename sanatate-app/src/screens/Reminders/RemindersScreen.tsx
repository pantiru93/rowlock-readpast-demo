import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Common/Card';
import { Chip } from '../../components/Common/Chip';
import { useApp } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface RemindersScreenProps {
  navigation: any;
}

export const RemindersScreen: React.FC<RemindersScreenProps> = () => {
  const { state } = useApp();

  const getMemberName = (memberId: string) => {
    return state.members.find(m => m.id === memberId)?.name || 'Unknown';
  };

  const getMedicationName = (medicationId: string) => {
    return state.medications.find(m => m.id === medicationId)?.name || 'Unknown';
  };

  const getNextDoseTime = (reminder: any) => {
    const nextDoseIndex = reminder.takenToday?.findIndex((taken: boolean) => !taken) ?? 0;
    return reminder.timesOfDay[nextDoseIndex] || reminder.timesOfDay[0];
  };

  const getAllTaken = (reminder: any) => {
    return reminder.takenToday?.every((taken: boolean) => taken) ?? false;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>
      </View>

      <FlatList
        data={state.reminders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.reminderCard}>
            <View style={styles.reminderHeader}>
              <Text style={styles.reminderTitle}>
                {getMemberName(item.memberId)} – {getMedicationName(item.medicationId)}
              </Text>
              {getAllTaken(item) ? (
                <Chip label="All taken" color={colors.secondary} />
              ) : (
                <Chip label={`Next: ${getNextDoseTime(item)}`} color={colors.primary} />
              )}
            </View>

            <View style={styles.reminderDetails}>
              <Text style={styles.reminderDose}>{item.doseText}</Text>
              <Text style={styles.reminderSchedule}>
                {item.timesPerDay}x per day
              </Text>
            </View>

            <View style={styles.reminderTimes}>
              {item.timesOfDay.map((time, index) => (
                <View
                  key={index}
                  style={[
                    styles.timeChip,
                    item.takenToday?.[index] && styles.timeChipTaken,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      item.takenToday?.[index] && styles.timeTextTaken,
                    ]}
                  >
                    {time}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={styles.reminderDuration}>
              {new Date(item.startDate).toLocaleDateString()} –{' '}
              {new Date(item.endDate).toLocaleDateString()}
            </Text>
          </Card>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No active reminders</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  list: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  reminderCard: {
    marginBottom: spacing.md,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  reminderTitle: {
    ...typography.h3,
    flex: 1,
    marginRight: spacing.sm,
  },
  reminderDetails: {
    marginBottom: spacing.md,
  },
  reminderDose: {
    ...typography.body,
    marginBottom: spacing.xs / 2,
  },
  reminderSchedule: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  reminderTimes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  timeChip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeChipTaken: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  timeText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  timeTextTaken: {
    color: colors.white,
  },
  reminderDuration: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
