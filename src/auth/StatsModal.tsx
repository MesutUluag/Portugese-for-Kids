import React, { useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { X, Flame, Clock, BookOpen, Trophy, LogOut, Award, BarChart3, CalendarDays } from 'lucide-react';
import './StatsModal.scss';

interface Props {
  language: 'en' | 'tr';
}

const CONTEXT_META: Record<string, { label: string; labelTr: string; emoji: string }> = {
  school: { label: 'School', labelTr: 'Okul', emoji: '🏫' },
  restaurant: { label: 'Restaurant', labelTr: 'Restoran', emoji: '🍽️' },
  bank: { label: 'Bank', labelTr: 'Banka', emoji: '🏦' },
  hospital: { label: 'Hospital', labelTr: 'Hastane', emoji: '🏥' },
  cafe: { label: 'Café', labelTr: 'Kafe', emoji: '☕' },
  airport: { label: 'Airport', labelTr: 'Havalimanı', emoji: '✈️' },
  market: { label: 'Market', labelTr: 'Market', emoji: '🛒' },
  aima: { label: 'AIMA', labelTr: 'AIMA', emoji: '🏛️' },
  bus: { label: 'Bus', labelTr: 'Otobüs', emoji: '🚌' },
  pharmacy: { label: 'Pharmacy', labelTr: 'Eczane', emoji: '💊' },
  gas_station: { label: 'Gas Station', labelTr: 'Benzin İstasyonu', emoji: '⛽' },
  traffic: { label: 'Traffic & Cars', labelTr: 'Trafik ve Arabalar', emoji: '🚗' },
};

const MODE_META: Record<string, { label: string; labelTr: string; emoji: string }> = {
  cards: { label: 'Flashcards', labelTr: 'Kartlar', emoji: '📇' },
  story: { label: 'Story Mode', labelTr: 'Hikaye Modu', emoji: '📖' },
  game8: { label: 'Crossword', labelTr: 'Bulmaca', emoji: '🧩' },
  game1: { label: 'Picture Match', labelTr: 'Resim Oyunu', emoji: '🖼️' },
  game2: { label: 'Listen & Find', labelTr: 'Dinle & Bul', emoji: '🎧' },
  game3: { label: 'Memory Match', labelTr: 'Hafıza Oyunu', emoji: '🃏' },
  game4: { label: 'Fill Blank', labelTr: 'Boşluk Doldur', emoji: '✍️' },
  game5: { label: 'Scramble', labelTr: 'Kelime Karıştır', emoji: '🔤' },
  game6: { label: 'Puzzle', labelTr: 'Kelime Yapbozu', emoji: '🎯' },
  game7: { label: 'Market', labelTr: 'Market Oyunu', emoji: '🛒' },
};

function formatDuration(seconds: number, language: 'en' | 'tr'): string {
  if (seconds < 60) {
    return `${seconds} ${language === 'tr' ? 'sn' : 's'}`;
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hrs > 0) {
    return `${hrs}${language === 'tr' ? ' sa ' : 'h '}${mins}${language === 'tr' ? ' dk' : 'm'}`;
  }
  return `${mins} ${language === 'tr' ? 'dk' : 'm'}`;
}

function formatDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayString(): string {
  return formatDateKey(new Date());
}

const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const WEEKDAYS_TR = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'] as const;

function formatCompactDuration(seconds: number): string {
  if (seconds <= 0) return '—';
  if (seconds < 60) return `${seconds}s`;
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  if (hrs > 0) {
    return mins > 0 ? `${hrs}h${mins}m` : `${hrs}h`;
  }
  return `${ Math.max(1, Math.floor(seconds / 60)) }m`;
}

export default function StatsModal({ language }: Props): React.ReactElement | null {
  const { user, profile, isStatsModalOpen, closeStatsModal, signOutUser } = useAuth();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isStatsModalOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isStatsModalOpen]);

  if (!isStatsModalOpen) return null;

  const stats = profile?.stats;
  const todayKey = getTodayString();
  const todayTime = stats?.dailyTimeSeconds?.[todayKey] ?? 0;
  const totalTime = stats?.totalTimeSeconds ?? 0;
  const currentStreak = stats?.currentStreakDays ?? 0;
  const longestStreak = stats?.longestStreakDays ?? 0;
  const totalStories = stats?.totalStoriesPracticed ?? 0;
  const totalScore = stats?.totalScore ?? 0;

  // Build last 7 calendar days (oldest -> today)
  const last7Days = Array.from({ length: 7 }, (_, idx) => {
    const offset = 6 - idx;
    const d = new Date();
    d.setDate(d.getDate() - offset);
    const key = formatDateKey(d);
    const seconds = stats?.dailyTimeSeconds?.[key] ?? 0;
    const dayIndex = d.getDay();
    return {
      key,
      seconds,
      isToday: offset === 0,
      dayLabel: language === 'tr' ? WEEKDAYS_TR[dayIndex] : WEEKDAYS_EN[dayIndex],
    };
  });
  const maxDailySeconds = Math.max(...last7Days.map((d) => d.seconds), 60);

  // Compute top modes by time spent
  const modeStats = Object.keys(MODE_META).map((key) => {
    const time = stats?.timeByModeSeconds?.[key] ?? 0;
    const completed = stats?.gamesCompletedByMode?.[key] ?? 0;
    return {
      key,
      meta: MODE_META[key],
      time,
      completed,
    };
  }).filter((m) => m.time > 0 || m.completed > 0)
    .sort((a, b) => b.time - a.time);

  const maxModeTime = modeStats.length > 0 ? Math.max(...modeStats.map((m) => m.time), 1) : 1;

  // Active contexts
  const contextStats = Object.keys(CONTEXT_META).map((key) => {
    const count = stats?.storiesByContext?.[key] ?? 0;
    return {
      key,
      meta: CONTEXT_META[key],
      count,
    };
  }).filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <dialog
      ref={dialogRef}
      className="stats-dialog"
      aria-labelledby="stats-dialog-title"
      {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      onClose={closeStatsModal}
      onClick={(e) => {
        const dialog = dialogRef.current;
        if (!dialog || e.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          dialog.close();
        }
      }}
    >
      <div className="stats-card">
        <button
          className="btn-stats-close"
          type="button"
          onClick={closeStatsModal}
          aria-label={language === 'tr' ? 'Kapat' : 'Close'}
        >
          <X size={18} />
        </button>

        <div className="stats-header">
          <div className="avatar-badge">
            {profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : '👦'}
          </div>
          <div className="user-info">
            <h2 id="stats-dialog-title">{profile?.displayName || (language === 'tr' ? 'Minik Gezgin' : 'Kid Explorer')}</h2>
            <p className="user-email">{user?.email || ''}</p>
          </div>
        </div>

        <div className="stats-grid">
          {/* Streak Card */}
          <div className="metric-card streak-card">
            <div className="metric-icon-wrap streak-icon">
              <Flame size={24} />
            </div>
            <div className="metric-content">
              <span className="metric-title">{language === 'tr' ? 'Günlük Seri' : 'Day Streak'}</span>
              <div className="metric-value-row">
                <span className="metric-number">{currentStreak}</span>
                <span className="metric-unit">{language === 'tr' ? 'gün' : 'days'}</span>
              </div>
              <span className="metric-subtext">
                {language === 'tr' ? `En iyi: ${longestStreak} gün` : `Best: ${longestStreak} days`}
              </span>
            </div>
          </div>

          {/* Time Today Card */}
          <div className="metric-card">
            <div className="metric-icon-wrap time-icon">
              <Clock size={24} />
            </div>
            <div className="metric-content">
              <span className="metric-title">{language === 'tr' ? 'Bugün Çalışma' : 'Time Today'}</span>
              <div className="metric-value-row">
                <span className="metric-number">{formatDuration(todayTime, language)}</span>
              </div>
              <span className="metric-subtext">
                {language === 'tr' ? `Toplam: ${formatDuration(totalTime, language)}` : `Lifetime: ${formatDuration(totalTime, language)}`}
              </span>
            </div>
          </div>

          {/* Stories Practiced Card */}
          <div className="metric-card">
            <div className="metric-icon-wrap story-icon">
              <BookOpen size={24} />
            </div>
            <div className="metric-content">
              <span className="metric-title">{language === 'tr' ? 'Okunan Cümle' : 'Stories Read'}</span>
              <div className="metric-value-row">
                <span className="metric-number">{totalStories}</span>
                <span className="metric-unit">{language === 'tr' ? 'cümle' : 'sentences'}</span>
              </div>
              <span className="metric-subtext">
                {language === 'tr' ? `${contextStats.length} farklı senaryo` : `${contextStats.length} scenarios`}
              </span>
            </div>
          </div>

          {/* Score Card */}
          <div className="metric-card">
            <div className="metric-icon-wrap score-icon">
              <Trophy size={24} />
            </div>
            <div className="metric-content">
              <span className="metric-title">{language === 'tr' ? 'Toplam Puan' : 'Total Score'}</span>
              <div className="metric-value-row">
                <span className="metric-number">{totalScore}</span>
                <span className="metric-unit">pts</span>
              </div>
              <span className="metric-subtext">
                {language === 'tr' ? 'Oyun başarıları' : 'Game achievements'}
              </span>
            </div>
          </div>
        </div>

        {/* 7-Day Activity Bar Chart */}
        <div className="section-block">
          <div className="section-title">
            <CalendarDays size={16} />
            <span>{language === 'tr' ? 'Son 7 Gün Aktivite' : 'Last 7 Days Activity'}</span>
          </div>
          <div className="weekly-chart-card">
            <div className="weekly-chart-grid">
              {last7Days.map((day) => {
                const heightPct = day.seconds > 0
                  ? Math.max(12, Math.min(100, Math.round((day.seconds / maxDailySeconds) * 100)))
                  : 0;
                return (
                  <div
                    key={day.key}
                    className={`weekly-day-col${day.isToday ? ' is-today' : ''}${day.seconds > 0 ? ' has-activity' : ''}`}
                    title={`${day.key}: ${formatDuration(day.seconds, language)}`}
                  >
                    <span className="weekly-day-value">{formatCompactDuration(day.seconds)}</span>
                    <div className="weekly-bar-track">
                      <div
                        className="weekly-bar-fill"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="weekly-day-label">
                      {day.isToday ? (language === 'tr' ? 'Bugün' : 'Today') : day.dayLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Story Scenarios Breakdown */}
        {contextStats.length > 0 && (
          <div className="section-block">
            <div className="section-title">
              <Award size={16} />
              <span>{language === 'tr' ? 'Hikaye Senaryoları' : 'Story Scenarios'}</span>
            </div>
            <div className="context-badges-wrap">
              {contextStats.map((c) => (
                <div key={c.key} className="context-badge">
                  <span className="context-emoji">{c.meta.emoji}</span>
                  <span className="context-name">{language === 'tr' ? c.meta.labelTr : c.meta.label}</span>
                  <span className="context-count">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time by Game Modes */}
        {modeStats.length > 0 && (
          <div className="section-block">
            <div className="section-title">
              <BarChart3 size={16} />
              <span>{language === 'tr' ? 'Oyunlara Göre Süre' : 'Time by Activity'}</span>
            </div>
            <div className="mode-bars-list">
              {modeStats.map((m) => {
                const percent = Math.min(100, Math.round((m.time / maxModeTime) * 100));
                return (
                  <div key={m.key} className="mode-bar-row">
                    <div className="mode-bar-label">
                      <span>{m.meta.emoji}</span>
                      <span className="mode-name">{language === 'tr' ? m.meta.labelTr : m.meta.label}</span>
                    </div>
                    <div className="mode-bar-track">
                      <div className="mode-bar-fill" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="mode-bar-stats">
                      <span>{formatDuration(m.time, language)}</span>
                      {m.completed > 0 && (
                        <span className="rounds-count">({m.completed} {language === 'tr' ? 'tur' : 'rnds'})</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="stats-footer">
          <div className="tier-tag">
            <span className="tier-badge-label">{profile?.tier || 'FREE'}</span>
          </div>
          <button className="btn-sign-out" onClick={signOutUser}>
            <LogOut size={15} />
            <span>{language === 'tr' ? 'Çıkış Yap' : 'Sign Out'}</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
