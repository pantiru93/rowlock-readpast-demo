import { Member } from './member';

export type MedicationForm = 'tablet' | 'syrup' | 'suppository' | 'spray' | 'other';

export interface Medication {
  id: string;
  name: string;
  form: MedicationForm;
  forMembers: Member['id'][];
  totalUnits?: number; // e.g., 20 tablets
  remainingUnits?: number;
  expiryDate?: string; // ISO date
  openedAt?: string; // ISO date (for syrups)
  openedValidForDays?: number; // e.g., 180
}
