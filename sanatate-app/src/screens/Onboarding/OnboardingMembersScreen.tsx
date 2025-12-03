import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../components/Common/PrimaryButton';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface OnboardingMembersScreenProps {
  navigation: any;
}

export const OnboardingMembersScreen: React.FC<OnboardingMembersScreenProps> = ({ navigation }) => {
  const [members, setMembers] = useState<string[]>(['Me']);
  const [newMember, setNewMember] = useState('');

  const addMember = () => {
    if (newMember.trim()) {
      setMembers([...members, newMember.trim()]);
      setNewMember('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Family Members</Text>
          <Text style={styles.subtitle}>
            Who will you be managing medications for?
          </Text>
        </View>

        <View style={styles.membersList}>
          {members.map((member, index) => (
            <View key={index} style={styles.memberItem}>
              <Text style={styles.memberText}>{member}</Text>
            </View>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add family member name"
            placeholderTextColor={colors.textDisabled}
            value={newMember}
            onChangeText={setNewMember}
            onSubmitEditing={addMember}
          />
          <PrimaryButton title="Add" onPress={addMember} style={styles.addButton} />
        </View>

        <PrimaryButton
          title="Continue"
          onPress={() => navigation.navigate('OnboardingPermissions')}
          style={styles.continueButton}
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
  membersList: {
    marginBottom: spacing.lg,
  },
  memberItem: {
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  memberText: {
    ...typography.body,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  input: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addButton: {
    paddingHorizontal: spacing.lg,
  },
  continueButton: {
    marginTop: 'auto',
  },
});
