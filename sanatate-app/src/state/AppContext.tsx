import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Member } from '../types/member';
import { Medication } from '../types/medication';
import { Reminder } from '../types/reminder';
import { Document } from '../types/document';

interface AppState {
  isOnboarded: boolean;
  members: Member[];
  medications: Medication[];
  reminders: Reminder[];
  documents: Document[];
}

interface AppContextType {
  state: AppState;
  setOnboarded: (value: boolean) => void;
  addMember: (member: Member) => void;
  addMedication: (medication: Medication) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockMembers: Member[] = [
  { id: '1', name: 'Me', role: 'self' },
  { id: '2', name: 'Filip', role: 'child' },
  { id: '3', name: 'Vlad', role: 'child' },
  { id: '4', name: 'Partner', role: 'partner' },
];

const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Paracetamol',
    form: 'syrup',
    forMembers: ['2'],
    totalUnits: 100,
    remainingUnits: 75,
    expiryDate: '2025-12-31',
    openedAt: '2024-11-01',
    openedValidForDays: 180,
  },
  {
    id: '2',
    name: 'Ibuprofen',
    form: 'tablet',
    forMembers: ['1', '4'],
    totalUnits: 20,
    remainingUnits: 15,
    expiryDate: '2025-06-30',
  },
  {
    id: '3',
    name: 'Vitamin D3',
    form: 'spray',
    forMembers: ['3'],
    totalUnits: 50,
    remainingUnits: 5,
    expiryDate: '2025-03-15',
  },
];

const mockReminders: Reminder[] = [
  {
    id: '1',
    medicationId: '1',
    memberId: '2',
    doseText: '2.5 ml',
    timesPerDay: 3,
    timesOfDay: ['08:00', '14:00', '20:00'],
    startDate: '2024-12-01',
    endDate: '2024-12-06',
    takenToday: [true, true, false],
  },
  {
    id: '2',
    medicationId: '3',
    memberId: '3',
    doseText: '1 spray',
    timesPerDay: 1,
    timesOfDay: ['09:00'],
    startDate: '2024-12-01',
    endDate: '2025-02-28',
    takenToday: [false],
  },
];

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Blood tests',
    memberId: '2',
    date: '2025-03-10',
    type: 'Lab results',
  },
  {
    id: '2',
    title: 'Hospital discharge',
    memberId: '3',
    date: '2024-11-02',
    type: 'Medical report',
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    isOnboarded: false,
    members: mockMembers,
    medications: mockMedications,
    reminders: mockReminders,
    documents: mockDocuments,
  });

  const setOnboarded = (value: boolean) => {
    setState((prev) => ({ ...prev, isOnboarded: value }));
  };

  const addMember = (member: Member) => {
    setState((prev) => ({ ...prev, members: [...prev.members, member] }));
  };

  const addMedication = (medication: Medication) => {
    setState((prev) => ({ ...prev, medications: [...prev.medications, medication] }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setOnboarded,
        addMember,
        addMedication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
