import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/Common/Card';
import { useApp } from '../../state/AppContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface DocumentsScreenProps {
  navigation: any;
}

export const DocumentsScreen: React.FC<DocumentsScreenProps> = () => {
  const { state } = useApp();

  const getMemberName = (memberId: string) => {
    return state.members.find(m => m.id === memberId)?.name || 'Unknown';
  };

  const handleAddDocument = () => {
    console.log('Add document placeholder');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
        <TouchableOpacity onPress={handleAddDocument} style={styles.addButton}>
          <Ionicons name="add" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={state.documents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.documentCard}>
            <View style={styles.documentHeader}>
              <Ionicons name="document-text" size={32} color={colors.primary} />
              <View style={styles.documentInfo}>
                <Text style={styles.documentTitle}>{item.title}</Text>
                <Text style={styles.documentMeta}>
                  {getMemberName(item.memberId)} • {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text style={styles.documentType}>{item.type}</Text>
              </View>
            </View>
          </Card>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={64} color={colors.textDisabled} />
            <Text style={styles.emptyText}>No documents yet</Text>
            <Text style={styles.emptySubtext}>
              Add medical documents, test results, and reports
            </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  addButton: {
    padding: spacing.xs,
  },
  list: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  documentCard: {
    marginBottom: spacing.md,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  documentInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  documentTitle: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  documentMeta: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  documentType: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.bodySmall,
    color: colors.textDisabled,
    textAlign: 'center',
  },
});
