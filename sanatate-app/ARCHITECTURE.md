# App Architecture Diagram

## Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      App.tsx (Entry Point)                   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            AppProvider (State Management)            │    │
│  │  - isOnboarded state                                 │    │
│  │  - members, medications, reminders, documents        │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                  │
│                            ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              RootNavigator                           │    │
│  │  Checks isOnboarded status                           │    │
│  └─────────────────────────────────────────────────────┘    │
│              │                           │                    │
│              ▼                           ▼                    │
│   ┌──────────────────┐       ┌──────────────────────┐       │
│   │ Onboarding Stack │       │  Bottom Tabs         │       │
│   │ (if not onboarded│       │  (if onboarded)      │       │
│   └──────────────────┘       └──────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Onboarding Stack Navigator

```
┌────────────────────────────────────────────────────────┐
│            Onboarding Flow (Stack)                      │
├────────────────────────────────────────────────────────┤
│                                                         │
│  1. OnboardingIntroScreen                              │
│     • Welcome message                                  │
│     • 3 feature highlights                             │
│     • Continue button                                  │
│                    ↓                                    │
│  2. OnboardingMembersScreen                            │
│     • Add family members                               │
│     • Name input                                       │
│     • Continue button                                  │
│                    ↓                                    │
│  3. OnboardingPermissionsScreen                        │
│     • Request notifications                            │
│     • Request location (optional)                      │
│     • Finish button → setOnboarded(true)               │
│                                                         │
└────────────────────────────────────────────────────────┘
```

## Main App - Bottom Tabs Navigator

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Bottom Tabs                                  │
├─────────────┬──────────────┬─────────────┬─────────────┬───────────┤
│   Today     │ Medications  │  Reminders  │  Documents  │  Profile  │
│  (Calendar) │   (Cross)    │    (Bell)   │   (File)    │  (Person) │
└─────────────┴──────────────┴─────────────┴─────────────┴───────────┘
      │              │              │              │             │
      ▼              ▼              ▼              ▼             ▼
```

### Tab 1: Today (Single Screen)

```
┌───────────────────────────────────┐
│       TodayScreen                  │
├───────────────────────────────────┤
│ • Header: "Today"                 │
│ • Section: Next Doses             │
│   - NextDoseCard (x N)            │
│ • Section: Expiring Soon          │
│   - Alert cards                   │
│ • Section: Low Stock              │
│   - Alert cards                   │
│ • FAB: + (Add Medication)         │
└───────────────────────────────────┘
```

### Tab 2: Medications (Stack Navigator)

```
┌───────────────────────────────────────────────┐
│     Medications Stack Navigator               │
├───────────────────────────────────────────────┤
│                                               │
│  MedicationsListScreen (Default)              │
│  ├─ Header with + button                     │
│  ├─ Search bar                                │
│  └─ FlatList of MedicationListItem            │
│          │                                     │
│          ├─ [Tap medication] ───────────┐    │
│          │                               ▼    │
│          │          MedicationDetailsScreen   │
│          │          ├─ Medication info        │
│          │          ├─ Details card           │
│          │          └─ Active reminders       │
│          │                                     │
│          └─ [+ Button] ──────────────┐        │
│                                       ▼        │
│                     AddMedicationScreen        │
│                     ├─ Name input              │
│                     ├─ Form input              │
│                     └─ Save button             │
│                                               │
└───────────────────────────────────────────────┘
```

### Tab 3: Reminders (Single Screen)

```
┌───────────────────────────────────┐
│      RemindersScreen               │
├───────────────────────────────────┤
│ • Header: "Reminders"             │
│ • FlatList of reminder cards      │
│   - Member + Medication name      │
│   - Status chip                   │
│   - Dose text                     │
│   - Time chips (taken/not taken)  │
│   - Duration dates                │
└───────────────────────────────────┘
```

### Tab 4: Documents (Single Screen)

```
┌───────────────────────────────────┐
│      DocumentsScreen               │
├───────────────────────────────────┤
│ • Header: "Documents" with +      │
│ • FlatList of document cards      │
│   - Icon                          │
│   - Title                         │
│   - Member • Date                 │
│   - Type                          │
│ • Empty state with icon           │
└───────────────────────────────────┘
```

### Tab 5: Profile (Single Screen)

```
┌───────────────────────────────────┐
│        ProfileScreen               │
├───────────────────────────────────┤
│ • Header: "Profile"               │
│ • User info card                  │
│   - Avatar                        │
│   - Name                          │
│   - Role                          │
│ • Section: Family Members         │
│   - Member cards with chips       │
│ • Section: Settings               │
│   - Notifications (toggle)        │
│   - Location status               │
│   - Health data integration       │
│ • Section: About                  │
│   - App version                   │
└───────────────────────────────────┘
```

## Component Hierarchy

```
App
└── SafeAreaProvider
    └── AppProvider (Context)
        └── RootNavigator
            │
            ├── [Not Onboarded] Stack Navigator
            │   ├── OnboardingIntroScreen
            │   ├── OnboardingMembersScreen
            │   └── OnboardingPermissionsScreen
            │
            └── [Onboarded] Bottom Tabs Navigator
                ├── Tab: Today
                │   └── TodayScreen
                │       └── NextDoseCard (component)
                │
                ├── Tab: Medications
                │   └── Stack Navigator
                │       ├── MedicationsListScreen
                │       │   └── MedicationListItem (component)
                │       ├── MedicationDetailsScreen
                │       └── AddMedicationScreen
                │
                ├── Tab: Reminders
                │   └── RemindersScreen
                │
                ├── Tab: Documents
                │   └── DocumentsScreen
                │
                └── Tab: Profile
                    └── ProfileScreen
```

## State Management Flow

```
┌─────────────────────────────────────────────────────┐
│              AppContext (State)                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  State:                                              │
│  ├── isOnboarded: boolean                           │
│  ├── members: Member[]                              │
│  ├── medications: Medication[]                      │
│  ├── reminders: Reminder[]                          │
│  └── documents: Document[]                          │
│                                                      │
│  Actions:                                            │
│  ├── setOnboarded(value)                            │
│  ├── addMember(member)                              │
│  └── addMedication(medication)                      │
│                                                      │
├─────────────────────────────────────────────────────┤
│  Consumed by:                                        │
│  • RootNavigator (isOnboarded)                      │
│  • TodayScreen (all data)                           │
│  • MedicationsListScreen (medications, members)     │
│  • RemindersScreen (reminders, medications, members)│
│  • DocumentsScreen (documents, members)             │
│  • ProfileScreen (members)                          │
│  • OnboardingPermissionsScreen (setOnboarded)       │
└─────────────────────────────────────────────────────┘
```

## Theme System

```
┌─────────────────────────────────────────────────────┐
│                  Theme System                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│  colors.ts                                           │
│  ├── primary: #1F7A8C                               │
│  ├── secondary: #66BB6A                             │
│  ├── warning: #FF9800                               │
│  ├── error: #F44336                                 │
│  ├── background: #F5F7FA                            │
│  └── ... (15+ color definitions)                    │
│                                                      │
│  spacing.ts                                          │
│  ├── xs: 4px                                        │
│  ├── sm: 8px                                        │
│  ├── md: 16px                                       │
│  ├── lg: 24px                                       │
│  └── ... (6 spacing values)                         │
│                                                      │
│  typography.ts                                       │
│  ├── h1, h2, h3                                     │
│  ├── body, bodySmall                                │
│  ├── caption                                        │
│  └── button                                         │
│                                                      │
├─────────────────────────────────────────────────────┤
│  Used by all screens and components for consistency │
└─────────────────────────────────────────────────────┘
```

## Type Definitions

```
┌─────────────────────────────────────────────────────┐
│              TypeScript Types                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│  member.ts                                           │
│  ├── MemberRole = 'self' | 'child' | 'partner'     │
│  └── Member interface                               │
│                                                      │
│  medication.ts                                       │
│  ├── MedicationForm = 'tablet' | 'syrup' | ...     │
│  └── Medication interface                           │
│                                                      │
│  reminder.ts                                         │
│  ├── Reminder interface                             │
│  └── Document interface                             │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Reusable Components

```
┌─────────────────────────────────────────────────────┐
│            Common Components                         │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Card                                                │
│  • White rounded container with shadow              │
│  • Used everywhere for content grouping             │
│                                                      │
│  PrimaryButton                                       │
│  • Blue rounded button                              │
│  • Supports disabled state                          │
│  • Used for all primary actions                     │
│                                                      │
│  Chip                                                │
│  • Small colored label                              │
│  • Customizable colors                              │
│  • Used for tags, status, badges                    │
│                                                      │
├─────────────────────────────────────────────────────┤
│          Feature-Specific Components                 │
├─────────────────────────────────────────────────────┤
│                                                      │
│  NextDoseCard (Today screen)                        │
│  • Shows upcoming medication dose                   │
│  • Displays time, medication, dose, member          │
│                                                      │
│  MedicationListItem (Medications list)              │
│  • Clickable medication card                        │
│  • Shows name, form, member, stock, expiry          │
│  • Color-coded expiry status                        │
│                                                      │
└─────────────────────────────────────────────────────┘
```
