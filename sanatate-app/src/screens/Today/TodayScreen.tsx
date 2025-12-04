import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NextDoseCard } from '../../components/Today/NextDoseCard';
import { Card } from '../../components/Common/Card';
import { Chip } from '../../components/Common/Chip';
import { useApp } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface TodayScreenProps {
  navigation: any;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({ navigation }) => {
  const { state } = useApp();

  const getMemberName = (memberId: string) => {
    return state.members.find(m => m.id === memberId)?.name || 'Unknown';
  };

  const getUpcomingDoses = () => {
    return state.reminders.map(reminder => {
      const medication = state.medications.find(m => m.id === reminder.medicationId);
      const nextDoseIndex = reminder.takenToday?.findIndex(taken => !taken) ?? 0;
      const nextDoseTime = reminder.timesOfDay[nextDoseIndex] || reminder.timesOfDay[0];
      
      return {
        medicationName: medication?.name || 'Unknown',
        dose: reminder.doseText,
        time: nextDoseTime,
        memberName: getMemberName(reminder.memberId),
      };
    });
  };

  const getExpiringSoon = () => {
    const today = new Date();
    return state.medications.filter(med => {
      if (!med.expiryDate) return false;
      const expiry = new Date(med.expiryDate);
      const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry > 0 && daysUntilExpiry < 30;
    });
  };

  const getLowStock = () => {
    return state.medications.filter(med => {
      if (!med.remainingUnits || !med.totalUnits) return false;
      return med.remainingUnits < med.totalUnits * 0.2;
    });
  };

  const upcomingDoses = getUpcomingDoses();
  const expiringSoon = getExpiringSoon();
  const lowStock = getLowStock();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Today</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Doses</Text>
          {upcomingDoses.length > 0 ? (
            upcomingDoses.map((dose, index) => (
              <NextDoseCard key={index} {...dose} />
            ))
          ) : (
            <Card>
              <Text style={styles.emptyText}>No upcoming doses for today</Text>
            </Card>
          )}
        </View>

        {expiringSoon.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expiring Soon</Text>
            {expiringSoon.map(med => (
              <Card key={med.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <Text style={styles.alertTitle}>{med.name}</Text>
                  <Chip label="Expiring" color={colors.warning} />
                </View>
                <Text style={styles.alertText}>
                  For: {getMemberName(med.forMembers[0])}
                </Text>
              </Card>
            ))}
          </View>
        )}

        {lowStock.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Low Stock</Text>
            {lowStock.map(med => (
              <Card key={med.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <Text style={styles.alertTitle}>{med.name}</Text>
                  <Chip label="Low Stock" color={colors.error} />
                </View>
                <Text style={styles.alertText}>
                  Remaining: {med.remainingUnits} / {med.totalUnits}
                </Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Medications', { screen: 'AddMedication' })}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color={colors.white} />
      </TouchableOpacity>
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
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  section: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  alertCard: {
    marginBottom: spacing.md,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  alertTitle: {
    ...typography.h3,
    flex: 1,
  },
  alertText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
