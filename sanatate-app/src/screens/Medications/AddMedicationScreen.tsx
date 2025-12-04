import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../components/Common/PrimaryButton';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface AddMedicationScreenProps {
  navigation: any;
}

export const AddMedicationScreen: React.FC<AddMedicationScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [form, setForm] = useState('');
  const [totalUnits, setTotalUnits] = useState('');

  const handleSave = () => {
    // Placeholder - in real app would save to state/backend
    console.log('Saving medication:', { name, form, totalUnits });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Add Medication</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Medication Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Paracetamol"
              placeholderTextColor={colors.textDisabled}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Form *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., tablet, syrup, spray"
              placeholderTextColor={colors.textDisabled}
              value={form}
              onChangeText={setForm}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Total Units</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 20"
              placeholderTextColor={colors.textDisabled}
              value={totalUnits}
              onChangeText={setTotalUnits}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.note}>
            * Required fields. More details can be added later.
          </Text>

          <PrimaryButton
            title="Save Medication"
            onPress={handleSave}
            disabled={!name || !form}
            style={styles.button}
          />
        </View>
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
  content: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xl,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
  },
  note: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.md,
  },
});
