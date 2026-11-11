import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { Mode } from '../data/index';
import { getAuthToken } from './firebase';
import { LeaderboardEntry, LeaderboardResponse } from './types';
import { X, Trophy, Sparkles, RefreshCw, Gamepad2, Award } from 'lucide-react';
import './LeaderboardModal.scss';

interface Props {
  language: 'en' | 'tr';
}

const API_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8081/api'
  : 'https://portugese-for-kids-backend-784137631227.us-central1.run.app/api';

interface GameMeta {
  mode: Mode;
  nameEn: string;
  nameTr: string;
  emoji: string;
  level: 1 | 2 | 3;
  levelLabelEn: string;
  levelLabelTr: string;
  ptsDescEn: string;
  ptsDescTr: string;
}

const ALL_GAMES: GameMeta[] = [
  {
    mode: 'game1',
    nameEn: 'Picture Match',
    nameTr: 'Resim Oyunu',
    emoji: '🖼️',
    level: 1,
    levelLabelEn: 'Level 1 • Easy',
    levelLabelTr: 'Seviye 1 • Kolay',
    ptsDescEn: '4-6 pts',
    ptsDescTr: '4-6 puan',
  },
  {
    mode: 'game2',
    nameEn: 'Listen & Find',
    nameTr: 'Dinle & Bul',
    emoji: '🎧',
    level: 1,
    levelLabelEn: 'Level 1 • Easy',
    levelLabelTr: 'Seviye 1 • Kolay',
    ptsDescEn: '5-7 pts',
    ptsDescTr: '5-7 puan',
  },
  {
    mode: 'game4',
    nameEn: 'Fill in the Blank',
    nameTr: 'Boşluk Doldur',
    emoji: '✍️',
    level: 1,
    levelLabelEn: 'Level 1 • Easy',
    levelLabelTr: 'Seviye 1 • Kolay',
    ptsDescEn: '5-7 pts',
    ptsDescTr: '5-7 puan',
  },
  {
    mode: 'game7',
    nameEn: 'Market Game',
    nameTr: 'Market Oyunu',
    emoji: '🛒',
    level: 1,
    levelLabelEn: 'Level 1 • Easy',
    levelLabelTr: 'Seviye 1 • Kolay',
    ptsDescEn: '5-7 pts',
    ptsDescTr: '5-7 puan',
  },
  {
    mode: 'game3',
    nameEn: 'Memory Match',
    nameTr: 'Hafıza Oyunu',
    emoji: '🃏',
    level: 2,
    levelLabelEn: 'Level 2 • Medium',
    levelLabelTr: 'Seviye 2 • Orta',
    ptsDescEn: '20-25 pts',
    ptsDescTr: '20-25 puan',
  },
  {
    mode: 'game5',
    nameEn: 'Word Scramble',
    nameTr: 'Kelime Karıştır',
    emoji: '🔤',
    level: 2,
    levelLabelEn: 'Level 2 • Medium',
    levelLabelTr: 'Seviye 2 • Orta',
    ptsDescEn: '13-17 pts',
    ptsDescTr: '13-17 puan',
  },
  {
    mode: 'game6',
    nameEn: 'Word Puzzle',
    nameTr: 'Kelime Yapbozu',
    emoji: '🧩',
    level: 3,
    levelLabelEn: 'Level 3 • Master',
    levelLabelTr: 'Seviye 3 • Usta',
    ptsDescEn: '30 pts',
    ptsDescTr: '30 puan',
  },
  {
    mode: 'game8',
    nameEn: 'Crossword Puzzle',
    nameTr: 'Çengel Bulmaca',
    emoji: '✏️',
    level: 3,
    levelLabelEn: 'Level 3 • Master',
    levelLabelTr: 'Seviye 3 • Usta',
    ptsDescEn: '10 pts/word + 25 board',
    ptsDescTr: '10 puan/kelime + 25 bitirme',
  },
];

const AVATAR_BG_COLORS = [
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#ec4899',
  '#8b5cf6',
  '#14b8a6',
  '#f97316',
  '#06b6d4',
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_BG_COLORS[Math.abs(hash) % AVATAR_BG_COLORS.length];
}

export default function LeaderboardModal({ language }: Props): React.ReactElement | null {
  const { user, profile, isLeaderboardModalOpen, closeLeaderboardModal } = useAuth();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [activeTab, setActiveTab] = useState<'leaderboard' | 'my-scores'>('leaderboard');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<LeaderboardResponse | null>(null);

  // Fallback data builder for offline/mock cases
  const buildLocalFallback = useCallback((): LeaderboardResponse => {
    const userScore = profile?.stats?.totalScore ?? 0;
    const userDisplayName = profile?.displayName || (language === 'tr' ? 'Ben' : 'Explorer');
    const userInitial = (userDisplayName[0] || 'E').toUpperCase();
    const userScoreByMode = profile?.stats?.scoreByMode ?? {};
    const userGamesCompleted = Object.values(profile?.stats?.gamesCompletedByMode ?? {}).reduce(
      (a, b) => a + b,
      0
    );

    const currentUserEntry: LeaderboardEntry = {
      rank: 1,
      displayName: userDisplayName,
      avatarInitial: userInitial,
      totalScore: userScore,
      scoreByMode: userScoreByMode,
      gamesCompleted: userGamesCompleted,
      isCurrentUser: true,
    };

    const mockPeers: LeaderboardEntry[] = [
      {
        rank: 0,
        displayName: 'Beatriz M.',
        avatarInitial: 'B',
        totalScore: 240,
        scoreByMode: { game8: 95, game3: 65, game1: 40, game6: 40 },
        gamesCompleted: 14,
        isCurrentUser: false,
      },
      {
        rank: 0,
        displayName: 'Lucas S.',
        avatarInitial: 'L',
        totalScore: 195,
        scoreByMode: { game8: 75, game5: 45, game2: 45, game7: 30 },
        gamesCompleted: 11,
        isCurrentUser: false,
      },
      {
        rank: 0,
        displayName: 'Tiago R.',
        avatarInitial: 'T',
        totalScore: 150,
        scoreByMode: { game3: 50, game4: 40, game1: 35, game6: 25 },
        gamesCompleted: 9,
        isCurrentUser: false,
      },
      {
        rank: 0,
        displayName: 'Sofia C.',
        avatarInitial: 'S',
        totalScore: 115,
        scoreByMode: { game1: 30, game2: 30, game7: 35, game4: 20 },
        gamesCompleted: 7,
        isCurrentUser: false,
      },
    ];

    const all = [...mockPeers, currentUserEntry].sort((a, b) => b.totalScore - a.totalScore);
    all.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });

    const resolvedCurrent = all.find((e) => e.isCurrentUser) ?? currentUserEntry;

    return {
      topUsers: all,
      currentUser: resolvedCurrent,
      totalUsersCount: all.length,
      lastUpdated: Date.now(),
    };
  }, [profile, language]);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      const token = await getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${API_BASE_URL}/user/leaderboard`, { headers });
      if (res.ok) {
        const json = (await res.json()) as LeaderboardResponse;
        setData(json);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn('[Leaderboard] Network request failed, using local fallback:', e);
    }
    setData(buildLocalFallback());
    setLoading(false);
  }, [buildLocalFallback]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isLeaderboardModalOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      void fetchLeaderboard();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isLeaderboardModalOpen, fetchLeaderboard]);

  if (!isLeaderboardModalOpen) return null;

  const currentEntry = data?.currentUser ?? {
    rank: 1,
    displayName: profile?.displayName || (language === 'tr' ? 'Ben' : 'Explorer'),
    avatarInitial: (profile?.displayName?.[0] || 'E').toUpperCase(),
    totalScore: profile?.stats?.totalScore ?? 0,
    scoreByMode: profile?.stats?.scoreByMode ?? {},
    gamesCompleted: Object.values(profile?.stats?.gamesCompletedByMode ?? {}).reduce(
      (a, b) => a + b,
      0
    ),
    isCurrentUser: true,
  };

  const currentScoreByMode = profile?.stats?.scoreByMode ?? currentEntry.scoreByMode ?? {};
  const currentTotalScore = profile?.stats?.totalScore ?? currentEntry.totalScore;

  // Level breakdowns
  const lvl1Score = (['game1', 'game2', 'game4', 'game7'] as Mode[]).reduce(
    (sum, m) => sum + (currentScoreByMode[m] ?? 0),
    0
  );
  const lvl2Score = (['game3', 'game5'] as Mode[]).reduce(
    (sum, m) => sum + (currentScoreByMode[m] ?? 0),
    0
  );
  const lvl3Score = (['game6', 'game8'] as Mode[]).reduce(
    (sum, m) => sum + (currentScoreByMode[m] ?? 0),
    0
  );

  return (
    <dialog
      ref={dialogRef}
      className="leaderboard-dialog"
      onClick={(e) => {
        if (e.target === dialogRef.current) closeLeaderboardModal();
      }}
    >
      <div className="leaderboard-card">
        <button
          className="btn-leaderboard-close"
          onClick={closeLeaderboardModal}
          aria-label={language === 'tr' ? 'Kapat' : 'Close'}
        >
          <X size={18} />
        </button>

        {/* ── Modal Header ── */}
        <div className="leaderboard-header">
          <div className="header-icon-wrap">
            <Trophy size={28} color="#d97706" />
          </div>
          <div className="header-text">
            <h2>{language === 'tr' ? 'Liderlik Tablosu' : 'Leaderboard'}</h2>
            <p className="subtitle">
              {language === 'tr'
                ? 'Tüm oyunların puanları ve en iyi kaşifler!'
                : 'All game scores & top language explorers!'}
            </p>
          </div>
          <button
            className="btn-refresh"
            onClick={() => void fetchLeaderboard()}
            disabled={loading}
            title={language === 'tr' ? 'Yenile' : 'Refresh'}
            aria-label={language === 'tr' ? 'Yenile' : 'Refresh'}
          >
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
          </button>
        </div>

        {/* ── Current User Standing Hero Card ── */}
        <div className="user-standing-hero">
          <div className="user-hero-main">
            <div
              className="user-avatar"
              style={{ background: getAvatarColor(currentEntry.displayName) }}
            >
              {currentEntry.avatarInitial}
            </div>
            <div className="user-info">
              <div className="user-name-row">
                <span className="user-name">{currentEntry.displayName}</span>
                {user && <span className="you-pill">{language === 'tr' ? 'Sen' : 'You'}</span>}
              </div>
              <div className="user-meta">
                <span className="meta-item">
                  <Gamepad2 size={13} />
                  {currentEntry.gamesCompleted}{' '}
                  {language === 'tr' ? 'Oyun Tamamlandı' : 'Games Completed'}
                </span>
              </div>
            </div>
          </div>

          <div className="user-hero-stats">
            <div className="stat-box stat-rank">
              <span className="stat-label">{language === 'tr' ? 'Sıra' : 'Rank'}</span>
              <span className="stat-val">#{currentEntry.rank}</span>
            </div>
            <div className="stat-box stat-score">
              <span className="stat-label">{language === 'tr' ? 'Toplam Puan' : 'Total Score'}</span>
              <span className="stat-val">
                <span className="star">⭐</span> {currentTotalScore}
              </span>
            </div>
          </div>

          {/* Level Points Badges */}
          <div className="user-level-badges">
            <div className="level-badge level-badge--1">
              <span className="badge-tag">{language === 'tr' ? 'Seviye 1' : 'Level 1'}</span>
              <span className="badge-pts">⭐ {lvl1Score}</span>
            </div>
            <div className="level-badge level-badge--2">
              <span className="badge-tag">{language === 'tr' ? 'Seviye 2' : 'Level 2'}</span>
              <span className="badge-pts">⭐ {lvl2Score}</span>
            </div>
            <div className="level-badge level-badge--3">
              <span className="badge-tag">{language === 'tr' ? 'Seviye 3' : 'Level 3'}</span>
              <span className="badge-pts">⭐ {lvl3Score}</span>
            </div>
          </div>
        </div>

        {/* ── Navigation Tabs ── */}
        <div className="leaderboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'leaderboard' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy size={15} />
            <span>{language === 'tr' ? 'Genel Sıralama' : 'Global Ranking'}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'my-scores' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('my-scores')}
          >
            <Award size={15} />
            <span>{language === 'tr' ? 'Oyun Puanlarım' : 'My Game Scores'}</span>
          </button>
        </div>

        {/* ── Tab Content: Global Ranking ── */}
        {activeTab === 'leaderboard' && (
          <div className="leaderboard-tab-content">
            {loading && !data && (
              <div className="loading-state">
                <RefreshCw size={24} className="spin" />
                <span>{language === 'tr' ? 'Sıralama yükleniyor...' : 'Loading rankings...'}</span>
              </div>
            )}

            <div className="ranking-list">
              {data?.topUsers.map((player) => {
                const isUser = player.isCurrentUser;
                const isPodium = player.rank <= 3;

                return (
                  <div
                    key={`${player.rank}-${player.displayName}`}
                    className={`ranking-row ${isUser ? 'ranking-row--user' : ''} ${
                      isPodium ? `ranking-row--podium-${player.rank}` : ''
                    }`}
                  >
                    {/* Rank Indicator */}
                    <div className="rank-col">
                      {player.rank === 1 ? (
                        <span className="medal gold" title="1st Place">
                          🥇
                        </span>
                      ) : player.rank === 2 ? (
                        <span className="medal silver" title="2nd Place">
                          🥈
                        </span>
                      ) : player.rank === 3 ? (
                        <span className="medal bronze" title="3rd Place">
                          🥉
                        </span>
                      ) : (
                        <span className="rank-num">#{player.rank}</span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div
                      className="player-avatar"
                      style={{ background: getAvatarColor(player.displayName) }}
                    >
                      {player.avatarInitial}
                    </div>

                    {/* Name & Games */}
                    <div className="player-details">
                      <div className="player-name-line">
                        <span className="player-name">{player.displayName}</span>
                        {isUser && (
                          <span className="user-tag">{language === 'tr' ? 'Sen' : 'You'}</span>
                        )}
                      </div>
                      <span className="player-games">
                        {player.gamesCompleted} {language === 'tr' ? 'oyun' : 'games'}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="player-score-col">
                      <span className="star-icon">⭐</span>
                      <span className="score-num">{player.totalScore}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {data && data.totalUsersCount > 0 && (
              <div className="ranking-footer-note">
                <Sparkles size={13} color="#f59e0b" />
                <span>
                  {language === 'tr'
                    ? `Toplam ${data.totalUsersCount} kaşif yarışıyor!`
                    : `${data.totalUsersCount} explorers playing worldwide!`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── Tab Content: My Game Scores ── */}
        {activeTab === 'my-scores' && (
          <div className="scores-tab-content">
            <div className="scores-summary-bar">
              <span className="summary-title">
                {language === 'tr' ? 'Oyun Bazlı Puan Dağılımı' : 'Score by Game Breakdown'}
              </span>
              <span className="summary-total">
                {language === 'tr' ? 'Toplam:' : 'Total:'} <strong>⭐ {currentTotalScore}</strong>
              </span>
            </div>

            <div className="games-score-grid">
              {ALL_GAMES.map((game) => {
                const score = currentScoreByMode[game.mode] ?? 0;
                const completed = profile?.stats?.gamesCompletedByMode?.[game.mode] ?? 0;

                return (
                  <div key={game.mode} className={`game-score-card level-${game.level}`}>
                    <div className="card-top">
                      <span className="game-emoji">{game.emoji}</span>
                      <span className={`level-pill level-${game.level}`}>
                        {language === 'tr' ? game.levelLabelTr : game.levelLabelEn}
                      </span>
                    </div>

                    <div className="game-title">
                      {language === 'tr' ? game.nameTr : game.nameEn}
                    </div>

                    <div className="game-pts-desc">
                      {language === 'tr' ? game.ptsDescTr : game.ptsDescEn}
                    </div>

                    <div className="card-bottom">
                      <div className="game-completed-rounds">
                        <Gamepad2 size={12} />
                        <span>
                          {completed} {language === 'tr' ? 'tur' : 'rounds'}
                        </span>
                      </div>

                      <div className="game-earned-score">
                        <span className="star">⭐</span>
                        <span className="score-val">{score}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
