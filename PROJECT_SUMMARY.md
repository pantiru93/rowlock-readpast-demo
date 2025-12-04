# Sănătate - React Native + Expo Health Management App

## Project Overview

This repository now contains a fully-functional **React Native mobile application** built with **Expo and TypeScript** for managing family medications, reminders, and medical documents.

## What Was Built

### 🏗️ Complete App Architecture

A production-ready mobile app structure with:

- ✅ **Expo TypeScript project** with managed workflow
- ✅ **React Navigation v6** with bottom tabs and stack navigation
- ✅ **5 main tabs**: Today, Medications, Reminders, Documents, Profile
- ✅ **3-screen onboarding flow** for first-time users
- ✅ **Clean folder structure** following React Native best practices
- ✅ **Type-safe codebase** with comprehensive TypeScript types
- ✅ **Custom design system** with consistent theming
- ✅ **Mock data** for immediate testing

### 📁 Project Location

The app is located in the `sanatate-app/` directory.

### 🎨 Design System

A complete design system with:

- **Colors**: Primary (#1F7A8C), Secondary (#66BB6A), Warning (#FF9800), Error (#F44336)
- **Typography**: 7 text styles (h1, h2, h3, body, bodySmall, caption, button)
- **Spacing**: 8px grid system (xs: 4px to xxl: 48px)
- **Components**: Card, PrimaryButton, Chip, and screen-specific components

### 📱 Screens Implemented

#### Onboarding Flow (3 screens)
1. **OnboardingIntroScreen** - Welcome with feature highlights
2. **OnboardingMembersScreen** - Add family members
3. **OnboardingPermissionsScreen** - Request app permissions

#### Main App (5 tabs)
1. **Today Tab**
   - Dashboard with upcoming doses
   - Expiring medications alerts
   - Low stock warnings
   - Floating action button to add medications

2. **Medications Tab** (with nested navigation)
   - MedicationsListScreen - Browse all medications
   - MedicationDetailsScreen - View medication info and reminders
   - AddMedicationScreen - Add new medications

3. **Reminders Tab**
   - View all treatment schedules
   - Track which doses are taken
   - See next dose times

4. **Documents Tab**
   - List medical documents
   - Organized by member and date

5. **Profile Tab**
   - User information
   - Family members list
   - Settings (notifications, location, health data)

### 🎯 Key Features

- **Bottom Tab Navigation** with 5 tabs and custom icons
- **Stack Navigation** for medications (list → details → add)
- **Conditional Rendering** based on onboarding status
- **Mock Data** for 4 family members, 3 medications, 2 reminders, 2 documents
- **Type-Safe State Management** using React Context API
- **Responsive Layouts** with SafeAreaView
- **Color-Coded Status Indicators** for expiration and stock levels
- **Search Functionality** in medications list
- **Card-Based UI** with consistent styling

### 📂 File Structure

```
sanatate-app/
├── src/
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Card.tsx
│   │   │   ├── PrimaryButton.tsx
│   │   │   └── Chip.tsx
│   │   ├── Today/
│   │   │   └── NextDoseCard.tsx
│   │   └── Medications/
│   │       └── MedicationListItem.tsx
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   └── BottomTabsNavigator.tsx
│   ├── screens/
│   │   ├── Today/TodayScreen.tsx
│   │   ├── Medications/
│   │   │   ├── MedicationsListScreen.tsx
│   │   │   ├── MedicationDetailsScreen.tsx
│   │   │   └── AddMedicationScreen.tsx
│   │   ├── Reminders/RemindersScreen.tsx
│   │   ├── Documents/DocumentsScreen.tsx
│   │   ├── Profile/ProfileScreen.tsx
│   │   └── Onboarding/
│   │       ├── OnboardingIntroScreen.tsx
│   │       ├── OnboardingMembersScreen.tsx
│   │       └── OnboardingPermissionsScreen.tsx
│   ├── state/
│   │   └── AppContext.tsx
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   └── types/
│       ├── member.ts
│       ├── medication.ts
│       └── reminder.ts
├── App.tsx
├── package.json
├── tsconfig.json
├── README.md
└── UI_DOCUMENTATION.md
```

### 🚀 Getting Started

```bash
# Navigate to the app directory
cd sanatate-app

# Install dependencies (if not already installed)
npm install

# Start the development server
npm start

# Run on specific platform
npm run android   # For Android
npm run ios       # For iOS (macOS only)
npm run web       # For web browser
```

### 📦 Dependencies

**Core:**
- expo ~54.0.25
- react 19.1.0
- react-native 0.81.5
- typescript ~5.9.2

**Navigation:**
- @react-navigation/native ^7.1.24
- @react-navigation/bottom-tabs ^7.8.11
- @react-navigation/native-stack ^7.8.5
- react-native-screens ^4.18.0
- react-native-safe-area-context ^5.6.2

**UI:**
- @expo/vector-icons ^15.0.3
- expo-status-bar ~3.0.8

**Web Support:**
- react-dom ^19.1.0
- react-native-web ^0.21.2

### ✅ Quality Checks

- ✅ **TypeScript compilation** passes with no errors
- ✅ **All types properly defined** (no `any` types)
- ✅ **Consistent code style** across all files
- ✅ **Proper component organization** by feature
- ✅ **Reusable components** following DRY principle
- ✅ **Mock data** ready for testing

### 🎯 Next Steps (Future Enhancements)

The app is now ready for:

1. **Backend Integration** - Connect to a real API
2. **Notifications** - Implement push notifications for reminders
3. **Camera/Gallery** - Add photo upload for documents
4. **Data Persistence** - Add AsyncStorage or SQLite
5. **Authentication** - Add user login/signup
6. **Cloud Sync** - Sync data across devices
7. **Advanced Features**:
   - Barcode scanning for medications
   - OCR for prescription reading
   - Health app integration
   - Export to PDF
   - Multi-language support

### 📖 Documentation

- **README.md** - Setup and usage instructions
- **UI_DOCUMENTATION.md** - Detailed UI flow and mock data

### 🔧 Technical Highlights

- **Functional Components** with React Hooks throughout
- **Type-safe** with comprehensive TypeScript interfaces
- **Context API** for state management (easily upgradable to Redux/Zustand)
- **SafeAreaView** properly used for all device types
- **Custom theme system** preventing hardcoded values
- **Scalable architecture** ready for growth
- **No external UI libraries** - full control over design
- **Clean separation** of concerns (components/screens/navigation/state)

## Running Tests

TypeScript validation:
```bash
cd sanatate-app
npx tsc --noEmit
```

## Original Repository

Note: This repository originally contained a Spring Boot Java demo project in the `demo/` directory. The new React Native app is in the `sanatate-app/` directory and is completely separate.

---

**Built with ❤️ using React Native, Expo, and TypeScript**
