# Sănătate App - UI Documentation

## App Flow

### 1. Onboarding Flow (First Launch)

#### Screen 1: OnboardingIntroScreen
- Welcome message with app name "Sănătate"
- Subtitle: "Your family health companion"
- Three feature cards:
  - 💊 Manage Medications - "Keep track of all medications and their stock levels"
  - ⏰ Smart Reminders - "Never miss a dose with timely notifications for the whole family"
  - 📄 Medical Documents - "Store all medical records and test results in one secure place"
- Button: "Continue" → navigates to OnboardingMembersScreen

#### Screen 2: OnboardingMembersScreen
- Title: "Add Family Members"
- Subtitle: "Who will you be managing medications for?"
- List of added members (starts with "Me")
- Input field to add new members
- Button: "Add" (to add member to list)
- Button: "Continue" → navigates to OnboardingPermissionsScreen

#### Screen 3: OnboardingPermissionsScreen
- Title: "Enable Permissions"
- Subtitle: "Help us provide you with the best experience"
- Two permission cards:
  - 🔔 Notifications
    - "Receive timely reminders for medications and important alerts"
    - Button: "Enable Notifications"
  - 📍 Location (Optional)
    - "Get reminders when you're near a pharmacy for expiring medications"
    - Button: "Enable Location"
- Button: "Finish" → sets isOnboarded to true, navigates to main app

### 2. Main App (Bottom Tabs)

#### Tab 1: Today
**Icon**: Calendar/Today icon
**Features**:
- Header: "Today"
- Section: "Next Doses"
  - Cards showing upcoming medication doses
  - Each card displays: medication name, dose, time, member name
  - Time shown in a colored chip
- Section: "Expiring Soon" (conditional - only shows if there are expiring medications)
  - Cards for medications expiring within 30 days
  - Yellow warning chip
- Section: "Low Stock" (conditional - only shows if stock is low)
  - Cards for medications below 20% remaining
  - Red error chip
- Floating Action Button (FAB):
  - Blue circular button with "+" icon
  - Fixed to bottom-right
  - Navigates to Add Medication screen

#### Tab 2: Medications
**Icon**: Medical cross icon
**Features**:
- Header: "Medications" with "+" button
- Search bar with search icon
- FlatList of medications:
  - Each item shows:
    - Medication name (large text)
    - Form (syrup/tablet/etc.)
    - Member assigned
    - Stock level
    - Expiry status chip (color-coded)
  - Tap to view details
- Empty state: "No medications found"

##### Medications Stack Navigator:

**MedicationsListScreen** (default)
- As described above

**MedicationDetailsScreen** (pushed when tapping an item)
- Header with back button
- Medication name as title
- Form chip
- Details card:
  - Form
  - Assigned members
  - Stock (remaining/total)
  - Expiry date
  - Opened date (for syrups)
- Active Reminders card (if any):
  - Shows all reminders for this medication
  - Displays member, dose, frequency, times

**AddMedicationScreen** (pushed from + button)
- Header with back button
- Title: "Add Medication"
- Form fields:
  - Medication Name (required)
  - Form (required)
  - Total Units (optional)
- Note about required fields
- Button: "Save Medication" (disabled if required fields empty)

#### Tab 3: Reminders
**Icon**: Bell/notification icon
**Features**:
- Header: "Reminders"
- FlatList of reminders:
  - Each card shows:
    - Member name and medication name
    - Status chip ("All taken" green or "Next: time" blue)
    - Dose text
    - Frequency (e.g., "3x per day")
    - Time chips for each scheduled time
      - White background if not taken
      - Green background if taken
    - Duration (start date - end date)
- Empty state: "No active reminders"

#### Tab 4: Documents
**Icon**: Document icon
**Features**:
- Header: "Documents" with "+" button
- FlatList of documents:
  - Each card shows:
    - Document icon (📄)
    - Title
    - Member name • Date
    - Document type
- Empty state:
  - Folder icon (large, gray)
  - "No documents yet"
  - "Add medical documents, test results, and reports"

#### Tab 5: Profile
**Icon**: Person icon
**Features**:
- Header: "Profile"
- User info card:
  - Large circular avatar with initial
  - User name
  - "Primary Account" label
- Section: "Family Members"
  - Cards for each member
  - Shows name and role chip (colored by role)
- Section: "Settings"
  - Notifications toggle
    - Label and description
    - Switch control
  - Location Permissions
    - Status: "Not granted"
  - Health Data Integration
    - "Connect smartwatch or health apps"
- Section: "About"
  - App version: "Sănătate v1.0.0"
  - Tagline

## Design System Applied

### Colors
- **Primary Blue** (#1F7A8C): Buttons, active tabs, primary chips
- **Green** (#66BB6A): Success states, "taken" indicators
- **Orange** (#FF9800): Warning states, expiring soon
- **Red** (#F44336): Error states, expired, low stock
- **Background** (#F5F7FA): Screen backgrounds
- **White** (#FFFFFF): Cards, buttons text
- **Gray text** (#666666): Secondary information

### Components
- **Card**: White rounded container with shadow
- **PrimaryButton**: Blue rounded button with white text
- **Chip**: Small rounded label with colored background
- **Inputs**: White background with gray border

### Layout
- Consistent spacing (16px, 24px padding)
- Rounded corners (12-16px)
- SafeAreaView for notch/status bar handling
- Card-based layouts throughout

## Mock Data

### Members (4 total)
1. Me (self)
2. Filip (child)
3. Vlad (child)
4. Partner (partner)

### Medications (3 total)
1. **Paracetamol**
   - Form: syrup
   - For: Filip
   - Stock: 75/100 ml
   - Expires: 2025-12-31
   - Opened: 2024-11-01 (180 days validity)

2. **Ibuprofen**
   - Form: tablet
   - For: Me, Partner
   - Stock: 15/20 tablets
   - Expires: 2025-06-30

3. **Vitamin D3**
   - Form: spray
   - For: Vlad
   - Stock: 5/50 doses (LOW STOCK)
   - Expires: 2025-03-15 (EXPIRING SOON)

### Reminders (2 total)
1. Filip - Paracetamol
   - Dose: 2.5 ml
   - Times: 08:00, 14:00, 20:00
   - Status: 2 of 3 taken today

2. Vlad - Vitamin D3
   - Dose: 1 spray
   - Times: 09:00
   - Status: Not taken today

### Documents (2 total)
1. Blood tests - Filip - 2025-03-10 (Lab results)
2. Hospital discharge - Vlad - 2024-11-02 (Medical report)

## Navigation Behavior

- Bottom tabs are always visible in main app
- Stack navigation pushes screens from right (iOS) or bottom (Android)
- Back button returns to previous screen
- Onboarding flow is modal - no back navigation until complete
- FAB on Today screen is sticky and follows scroll
