export interface Reminder {
  id: string;
  medicationId: string;
  memberId: string;
  doseText: string; // "2.5 ml" or "1 tablet"
  timesPerDay: number;
  timesOfDay: string[]; // ["08:00", "14:00", "20:00"]
  startDate: string;
  endDate: string;
  takenToday?: boolean[];
}

