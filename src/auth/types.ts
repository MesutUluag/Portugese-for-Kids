import { Mode } from '../data/index';
import { StoryContext } from '../utils/ai';

export interface UserStats {
  totalTimeSeconds: number;
  currentStreakDays: number;
  longestStreakDays: number;
  lastActiveDate: string | null;
  totalStoriesPracticed: number;
  totalScore: number;
  speechListenCount: number;
  timeByModeSeconds: Record<string, number>;
  gamesCompletedByMode: Record<string, number>;
  scoreByMode: Record<string, number>;
  storiesByContext: Record<string, number>;
  dailyTimeSeconds: Record<string, number>;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  tier: string;
  stats: UserStats;
  createdAt: number;
  updatedAt: number;
}

export interface StatsSyncRequest {
  activeSecondsDelta: number;
  timeByModeDelta: Partial<Record<string, number>>;
  gamesCompletedDelta: Partial<Record<string, number>>;
  storiesByContextDelta: Partial<Record<string, number>>;
  scoreDelta: number;
  scoreByModeDelta?: Partial<Record<string, number>>;
  speechListenDelta: number;
  clientDate: string;
}

export interface TelemetryOutbox {
  ownerUid: string; // 'guest' or specific user uid
  activeSecondsDelta: number;
  timeByModeDelta: Partial<Record<Mode, number>>;
  gamesCompletedDelta: Partial<Record<Mode, number>>;
  storiesByContextDelta: Partial<Record<StoryContext, number>>;
  scoreDelta: number;
  scoreByModeDelta: Partial<Record<Mode, number>>;
  speechListenDelta: number;
}

export interface LeaderboardEntry {
  rank: number;
  displayName: string;
  avatarInitial: string;
  totalScore: number;
  scoreByMode: Record<string, number>;
  gamesCompleted: number;
  isCurrentUser: boolean;
}

export interface LeaderboardResponse {
  topUsers: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null;
  totalUsersCount: number;
  lastUpdated: number;
}
