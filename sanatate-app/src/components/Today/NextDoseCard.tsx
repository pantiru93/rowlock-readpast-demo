import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../Common/Card';
import { Chip } from '../Common/Chip';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface NextDoseCardProps {
  medicationName: string;
  dose: string;
  time: string;
  memberName: string;
}

export const NextDoseCard: React.FC<NextDoseCardProps> = ({
  medicationName,
  dose,
  time,
  memberName,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{medicationName}</Text>
        <Chip label={time} color={colors.primary} />
      </View>
      <Text style={styles.dose}>{dose}</Text>
      <Text style={styles.member}>For: {memberName}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h3,
    flex: 1,
  },
  dose: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  member: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
