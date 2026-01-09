export interface Family {
  id: string; // Document ID
  familyName: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  currentMonthIndex: number; // 0-11, matching the 12-month curriculum
  createdAt: string; // ISO Date
  settings: {
    themeColor: string;
    allowVoiceInput: boolean;
  };
}

export interface Member {
  id: string; // Document ID
  familyId: string;
  userId?: string; // Link to the auth user (optional for children who don't log in)
  name: string;
  role: 'parent' | 'child'; // Parent = Admin, Child = Restricted
  avatarUrl: string; // URL or local asset identifier (e.g., 'avatar_lion')
  color: string; // Hex code for visual ring/identity (e.g., Mom = Purple)
  age?: number;
  xp: number; // Gamification
  badges: string[]; // IDs of earned badges
}

export interface Memory {
  id: string; // Document ID
  familyId: string;
  creatorId: string; // Member ID who successfully logged this
  content: string; // Text description (or voice-to-text result)
  mediaUrl?: string; // Photo/Video URL
  taggedMemberIds: string[]; // The "Netflix" tagging model. Who is in this memory?

  questId?: string; // If this memory is a response to a specific curriculum task
  tags: string[]; // Generic tags (e.g., "Screen Time", "Nature")

  mood?: 'happy' | 'sad' | 'excited' | 'calm' | 'frustrated'; // Emotional context

  createdAt: string; // ISO Date
  occurredAt: string; // ISO Date (user might log past events)
}

export interface Quest {
  // LEGACY COMPATIBILITY
  id?: string;
  monthIndex?: number;
  weekIndex?: number;
  category?: 'social' | 'health' | 'finance' | 'tech' | 'creative';

  // NEW STRUCTURE
  displayId: number;
  title: string;
  description: string;
  xpReward: number;
  monthId: number; // 1-12
  weekId: number; // 1-4
}
