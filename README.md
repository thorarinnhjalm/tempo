# FamilyLifeOS (Leikur að Læra)

> **"The Operating System for Your Family"**

A next-generation family companion app designed to strengthen bonds, gamify education, and preserve precious moments. Built with a focus on "11/10" user experience, utilizing ambient "living" interfaces and tactile interactions.

![FamilyLifeOS](https://img.shields.io/badge/Status-Beta-indigo?style=for-the-badge) ![Tech](https://img.shields.io/badge/Tech-React_Typescript_Vite-blue?style=for-the-badge) ![Design](https://img.shields.io/badge/Design-Nordic_Storybook-pink?style=for-the-badge)

## ✨ The User Experience

We believe family software shouldn't feel like a spreadsheet. It should feel like a storybook.

- **🎨 Nordic Storybook Design**: A warm, approachable aesthetic featuring rounded typography, soft shadows, and a calm, curated palette.
- **✨ Living Ambient Backgrounds**: The UI breathes. A dynamic particle system floats in the background, shifting colors contextually based on the current "Month Theme" (e.g., Indigo for Self, Emerald for Nature).
- **🕹️ 3D Tactile Interactions**: Cards aren't flat images; they are physical objects in digital space. Using physics-based 3D tilt effects, elements respond to your touch and movement.
- **⚡ Premium Feedback Loops**: Every interaction is rewarded. From "Juicy" confetti explosions when saving memories to physics-based spring animations for Toast notifications.

## 🚀 Key Features

### 1. The Curriculum (Home)
The heart of the OS. A 12-month gamified curriculum designed to teach life skills not covered in school.
- **Weekly Quests**: Actionable challenges (e.g., "Planted a Tree").
- **Visual Themes**: The entire app adapts its color scheme to the current month's topic.
- **XP & Gamification**: Simple, rewarding progression system for children.

### 2. The Vault (Memory Builder)
A shared timeline of family moments, built for children to use.
- **Child-Centric Input**: Voice-to-Text integration and large visual "Tagging" selectors.
- **Smart Filtering**: Memories appear on the timelines of regular family members tagged in them.
- **Emotional Tracking**: Simple emoji-based mood logging.

### 3. Family Tools
Practical utilities to run a household.
- **The Weekly Meeting**: A guided, interactive wizard for the Sunday family meeting.
  - *Step 1: Check-in* (Feelings)
  - *Step 2: Schedule* (Who is driving whom?)
  - *Step 3: Menu* (What are we eating?)
  - *Step 4: Allowance* (XP to ISK conversion)

### 4. Profiles & Roles
- **Switch & Play**: Netflix-style profile switcher.
- **Role Awareness**: Distinct views/permissions for "Parent" (Admin) and "Child" (Explorer).

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with custom design system config)
- **Animation**: Framer Motion (Spring physics, AnimatePresence)
- **State/Backend**: Firebase (Architecture ready - currently running in "Demo Mode" with local mock data)
- **Icons**: Lucide React

## 📂 Project Structure

```
src/
├── App.tsx                 # Main Application Orchestrator
├── components/
│   ├── AmbientBackground.tsx # "Living" Particle System
│   ├── TiltCard.tsx        # 3D Mousejs/Physics Container
│   ├── WeeklyMeeting.tsx   # Interactive Meeting Wizard
│   ├── CreateMemory.tsx    # Memory Capture Modal
│   ├── Vault.tsx           # Timeline Component
│   └── Toast.tsx           # Premium Notification System
├── data/
│   └── curriculum.ts       # 52-Week Content & Theme Engine
├── types/
│   └── firestore.ts        # Type Definitions
└── index.css               # Tailwind & Typography Setup
```

## 🏃‍♂️ How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🔜 Roadmap

- **Firebase "Go Live"**: Connect authentication and real-time Firestore sync.
- **Media Upload**: Integration with Firebase Storage for real photo/video support.
- **PWA Capabilities**: Offline support and home screen installation.
- **Push Notifications**: "Quest Available" nudges on weekends.
