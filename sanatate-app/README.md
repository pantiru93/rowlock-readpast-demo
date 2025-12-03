# Sănătate - Family Health Management App

A React Native mobile application built with Expo to help families manage medications, reminders, expirations, and medical documents.

## Features

- **Today Dashboard**: View upcoming medication doses, expiring medications, and low stock alerts
- **Medications Management**: Track all medications with stock levels, expiry dates, and assigned family members
- **Smart Reminders**: Schedule and track medication doses throughout the day
- **Medical Documents**: Store and organize medical records, test results, and reports
- **Family Profiles**: Manage medications for multiple family members
- **Onboarding Flow**: Guided setup for new users

## Tech Stack

- **Framework**: Expo (managed workflow)
- **Language**: TypeScript
- **Navigation**: React Navigation v6 (Bottom Tabs + Native Stack)
- **UI**: React Native with custom theme system
- **State Management**: React Context API

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Common/       # Generic components (Card, Button, Chip)
│   ├── Today/        # Today screen specific components
│   └── Medications/  # Medication specific components
├── navigation/       # Navigation configuration
│   ├── RootNavigator.tsx
│   └── BottomTabsNavigator.tsx
├── screens/          # Screen components
│   ├── Today/
│   ├── Medications/
│   ├── Reminders/
│   ├── Documents/
│   ├── Profile/
│   └── Onboarding/
├── state/            # State management (Context API)
├── theme/            # Design system (colors, spacing, typography)
└── types/            # TypeScript type definitions
```

## Design System

### Colors

- **Primary**: `#1F7A8C` - Main accent color
- **Secondary**: `#66BB6A` - Success/positive actions
- **Warning**: `#FF9800` - Soon to expire items
- **Error**: `#F44336` - Critical/expired items
- **Background**: `#F5F7FA`
- **Card Background**: `#FFFFFF`

### Typography

- Consistent text styles defined in `src/theme/typography.ts`
- Includes h1, h2, h3, body, bodySmall, caption, and button styles

### Spacing

- Based on 8px grid system
- Values: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), xxl (48px)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

```bash
cd sanatate-app
npm install
```

### Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on web
npm run web
```

### Using Expo Go

1. Install Expo Go on your mobile device
2. Run `npm start`
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## Mock Data

The app currently uses mock data defined in `src/state/AppContext.tsx`:

- 4 family members (Me, Filip, Vlad, Partner)
- 3 medications with various properties
- 2 active reminders
- 2 medical documents

## Navigation Structure

### Main App (Bottom Tabs)

1. **Today** - Dashboard with upcoming doses and alerts
2. **Medications** - List and manage medications (with nested stack for details/add)
3. **Reminders** - View and manage treatment schedules
4. **Documents** - Medical files and records
5. **Profile** - User settings and family members

### Onboarding Flow (Stack)

1. Introduction screen
2. Add family members
3. Request permissions

## Future Enhancements

- Backend integration
- Real notification system
- Location-based pharmacy reminders
- Health data integration
- Document upload and OCR
- Advanced medication tracking
- Export/import data
- Multi-language support

## Development Notes

- All components use TypeScript for type safety
- SafeAreaView is used for proper spacing on all devices
- Icons from @expo/vector-icons (Ionicons)
- No external UI library - custom components following design system
- State management ready to scale (easy to switch to Redux/Zustand if needed)

## License

This project is private and for demonstration purposes.
