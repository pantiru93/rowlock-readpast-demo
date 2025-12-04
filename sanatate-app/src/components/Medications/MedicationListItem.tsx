import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../Common/Card';
import { Chip } from '../Common/Chip';
import { Medication } from '../../types/medication';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface MedicationListItemProps {
  medication: Medication;
  memberName: string;
  onPress: () => void;
}

export const MedicationListItem: React.FC<MedicationListItemProps> = ({
  medication,
  memberName,
  onPress,
}) => {
  const getExpiryStatus = () => {
    if (!medication.expiryDate) return null;
    
    const today = new Date();
    const expiry = new Date(medication.expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { label: 'Expired', color: colors.error };
    } else if (daysUntilExpiry < 30) {
      return { label: `Expires in ${daysUntilExpiry}d`, color: colors.warning };
    }
    return null;
  };

  const expiryStatus = getExpiryStatus();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{medication.name}</Text>
            <Text style={styles.form}>{medication.form}</Text>
          </View>
          {expiryStatus && (
            <Chip
              label={expiryStatus.label}
              color={expiryStatus.color}
            />
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.member}>For: {memberName}</Text>
          {medication.remainingUnits !== undefined && (
            <Text style={styles.stock}>
              Stock: {medication.remainingUnits}/{medication.totalUnits || '?'}
            </Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    ...typography.h3,
    marginBottom: spacing.xs / 2,
  },
  form: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  member: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  stock: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
