import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { googleClientId } from './firebase';
import { X, LogIn, UserPlus, KeyRound, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import './AuthModal.scss';

interface Props {
  language: 'en' | 'tr';
}

type Tab = 'signin' | 'signup' | 'forgot' | 'confirmReset';

export default function AuthModal({ language }: Props): React.ReactElement | null {
  const {
    isAuthModalOpen,
    closeAuthModal,
    isFirebaseConfigured,
    authReason,
    resetOobCode,
    clearResetOobCode,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    verifyResetCode,
    confirmNewPassword,
  } = useAuth();

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [tab, setTab] = useState<Tab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const gisContainerRef = useRef<HTMLDivElement | null>(null);
  const [isGisRendered, setIsGisRendered] = useState(false);

  useEffect(() => {
    if (!isAuthModalOpen || tab === 'forgot' || tab === 'confirmReset') {
      setIsGisRendered(false);
      return;
    }
    if (!isFirebaseConfigured || !googleClientId) {
      setIsGisRendered(false);
      return;
    }

    let isMounted = true;
    const renderGisBtn = () => {
      if (!isMounted || !gisContainerRef.current || !window.google?.accounts?.id) {
        return false;
      }
      try {
        gisContainerRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(gisContainerRef.current, {
          type: 'standard',
          shape: 'pill',
          theme: 'outline',
          text: 'continue_with',
          size: 'large',
          logo_alignment: 'left',
          width: Math.min(360, gisContainerRef.current.parentElement?.clientWidth || 340),
          locale: language === 'tr' ? 'tr' : 'en',
        });
        setIsGisRendered(true);
        return true;
      } catch (err) {
        console.warn('[auth] Failed to render GIS button:', err);
        return false;
      }
    };

    if (!renderGisBtn()) {
      const timer = setInterval(() => {
        if (renderGisBtn()) clearInterval(timer);
      }, 200);
      const timeout = setTimeout(() => clearInterval(timer), 3000);
      return () => {
        isMounted = false;
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthModalOpen, tab, language, isFirebaseConfigured]);

  useEffect(() => {
    if (resetOobCode) {
      setTab('confirmReset');
      setPassword('');
      setError(null);
      setSuccess(null);
      void verifyResetCode(resetOobCode)
        .then((verifiedEmail) => {
          if (verifiedEmail) setEmail(verifiedEmail);
        })
        .catch(() => {
          setError(
            language === 'tr'
              ? 'Şifre sıfırlama bağlantısının süresi dolmuş veya geçersiz. Lütfen yeni bir bağlantı isteyin.'
              : 'Password reset link is expired or invalid. Please request a new reset link.'
          );
        });
    }
  }, [resetOobCode, language]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isAuthModalOpen) {
      setError(null);
      setSuccess(null);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const mapFirebaseError = (err: unknown): string => {
    if (typeof err === 'object' && err !== null) {
      if ('code' in err) {
        const code = (err as { code: string }).code;
        if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
          return language === 'tr' ? 'E-posta veya şifre hatalı.' : 'Incorrect email or password.';
        }
        if (code === 'auth/email-already-in-use') {
          return language === 'tr' ? 'Bu e-posta zaten kayıtlı. Lütfen giriş yapın.' : 'Email is already in use. Please sign in.';
        }
        if (code === 'auth/weak-password') {
          return language === 'tr' ? 'Şifre en az 6 karakter olmalı.' : 'Password should be at least 6 characters.';
        }
        if (code === 'auth/invalid-email') {
          return language === 'tr' ? 'Geçerli bir e-posta adresi girin.' : 'Please enter a valid email address.';
        }
        if (code === 'auth/popup-closed-by-user') {
          return language === 'tr' ? 'Giriş penceresi kapatıldı.' : 'Sign-in window was closed.';
        }
        if (code === 'auth/expired-action-code' || code === 'auth/invalid-action-code') {
          return language === 'tr'
            ? 'Şifre sıfırlama bağlantısının süresi dolmuş veya geçersiz. Lütfen yeni bir bağlantı isteyin.'
            : 'Password reset link is expired or invalid. Please request a new reset link.';
        }
        if (code === 'auth/configuration-not-found' || code === 'auth/operation-not-allowed') {
          return language === 'tr'
            ? 'Firebase Authentication henüz etkinleştirilmedi. Lütfen Firebase Console -> Authentication -> Sign-in method menüsünden Google ve E-posta girişini etkinleştirin.'
            : 'Firebase Authentication is not enabled yet. Please open Firebase Console → Authentication → Sign-in method and enable Google & Email/Password.';
        }
        if (code === 'auth/invalid-api-key' || code === 'auth/api-key-not-valid') {
          return language === 'tr'
            ? 'Firebase API anahtarı geçersiz veya eksik. Lütfen .env.local dosyasını kontrol edin.'
            : 'Firebase API key is invalid or unconfigured. Please check .env.local.';
        }
      }
      const msg = ('message' in err && typeof (err as { message: unknown }).message === 'string')
        ? (err as { message: string }).message
        : JSON.stringify(err);
      if (msg.includes('CONFIGURATION_NOT_FOUND') || msg.includes('configuration-not-found')) {
        return language === 'tr'
          ? 'Firebase Authentication henüz etkinleştirilmedi. Lütfen Firebase Console -> Authentication -> Sign-in method menüsünden Google ve E-posta girişini etkinleştirin.'
          : 'Firebase Authentication is not enabled yet. Please open Firebase Console → Authentication → Sign-in method and enable Google & Email/Password.';
      }
      if (msg.includes('API_KEY_INVALID') || msg.includes('API key not valid')) {
        return language === 'tr'
          ? 'Firebase API anahtarı geçersiz veya eksik. Lütfen .env.local dosyasını kontrol edin.'
          : 'Firebase API key is invalid or unconfigured. Please check .env.local.';
      }
    }
    return language === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.';
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(mapFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (tab !== 'confirmReset' && !email.trim()) {
      setError(language === 'tr' ? 'Lütfen e-posta adresinizi girin.' : 'Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      if (tab === 'signin') {
        await signInWithEmail(email, password);
      } else if (tab === 'signup') {
        await signUpWithEmail(email, password, displayName);
      } else if (tab === 'forgot') {
        await resetPassword(email);
        setSuccess(
          language === 'tr'
            ? 'Şifre sıfırlama bağlantısı e-postanıza gönderildi!'
            : 'Password reset link sent to your email!'
        );
      } else if (tab === 'confirmReset' && resetOobCode) {
        await confirmNewPassword(resetOobCode, password);
        clearResetOobCode();
        if (email.trim()) {
          await signInWithEmail(email.trim(), password);
        } else {
          setTab('signin');
          setSuccess(
            language === 'tr'
              ? 'Şifreniz başarıyla güncellendi! Şimdi giriş yapabilirsiniz.'
              : 'Password updated! You can now sign in.'
          );
        }
      }
    } catch (err) {
      setError(mapFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="auth-dialog"
      aria-labelledby="auth-dialog-title"
      {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      onClose={closeAuthModal}
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
      <div className="auth-card">
        <button
          className="btn-auth-close"
          type="button"
          onClick={closeAuthModal}
          aria-label={language === 'tr' ? 'Kapat' : 'Close'}
        >
          <X size={18} />
        </button>

        <div className="auth-header">
          <div className="auth-icon-badge">✨</div>
          <h2 id="auth-dialog-title">
            {tab === 'signin' && (language === 'tr' ? 'Giriş Yap' : 'Sign In')}
            {tab === 'signup' && (language === 'tr' ? 'Hesap Oluştur' : 'Create Account')}
            {tab === 'forgot' && (language === 'tr' ? 'Şifremi Unuttum' : 'Reset Password')}
            {tab === 'confirmReset' && (language === 'tr' ? 'Yeni Şifre Belirle' : 'Set New Password')}
          </h2>
          <p className="auth-subtitle">
            {tab === 'confirmReset'
              ? email
                ? language === 'tr'
                  ? `${email} için yeni şifrenizi girin`
                  : `Enter a new password for ${email}`
                : language === 'tr'
                ? 'Lütfen hesabınız için yeni bir şifre belirleyin'
                : 'Please choose a new password for your account'
              : authReason
              ? authReason
              : language === 'tr'
              ? 'Portekizce öğrenme macerana devam etmek için giriş yap!'
              : 'Sign in to continue your Portuguese learning adventure!'}
          </p>
          {!isFirebaseConfigured && (
            <div className="auth-dev-badge">
              <span>
                {language === 'tr'
                  ? '🛠️ Geliştirici Modu: Firebase yapılandırılmadı, simüle oturum açılır.'
                  : '🛠️ Dev Mode: Firebase unconfigured, simulated login active.'}
              </span>
            </div>
          )}
        </div>

        {tab !== 'forgot' && tab !== 'confirmReset' && (
          <>
            <div className="gis-button-wrapper">
              <div
                ref={gisContainerRef}
                className="gis-button-container"
                style={{ display: isGisRendered ? 'flex' : 'none' }}
              />
              {!isGisRendered && (
                <button
                  className="btn-google-auth"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  type="button"
                >
                  <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{language === 'tr' ? 'Google ile Devam Et' : 'Continue with Google'}</span>
                </button>
              )}
            </div>

            <div className="auth-divider">
              <span>{language === 'tr' ? 'veya e-posta ile' : 'or with email'}</span>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {tab === 'signup' && (
            <div className="form-group">
              <label htmlFor="auth-name">
                <User size={14} />
                <span>{language === 'tr' ? 'İsim / Takma Ad' : 'Name / Nickname'}</span>
              </label>
              <input
                id="auth-name"
                name="name"
                type="text"
                autoComplete="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={language === 'tr' ? 'Örn. Maya' : 'e.g. Maya'}
                maxLength={50}
              />
            </div>
          )}

          {tab !== 'confirmReset' && (
            <div className="form-group">
              <label htmlFor="auth-email">
                <Mail size={14} />
                <span>{language === 'tr' ? 'E-posta' : 'Email'}</span>
              </label>
              <input
                id="auth-email"
                name="email"
                type="email"
                required
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoComplete="username"
              />
            </div>
          )}

          {tab !== 'forgot' && (
            <div className="form-group">
              <label htmlFor="auth-password">
                <Lock size={14} />
                <span>
                  {tab === 'confirmReset'
                    ? language === 'tr'
                      ? 'Yeni Şifre'
                      : 'New Password'
                    : language === 'tr'
                    ? 'Şifre'
                    : 'Password'}
                </span>
              </label>
              <input
                id="auth-password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                autoComplete={tab === 'signup' || tab === 'confirmReset' ? 'new-password' : 'current-password'}
              />
            </div>
          )}

          {error && (
            <div className="auth-alert error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="auth-alert success">
              <CheckCircle2 size={16} />
              <span>{success}</span>
            </div>
          )}

          <button className="btn-auth-submit" type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner-inline" />
            ) : tab === 'signin' ? (
              <>
                <LogIn size={16} />
                <span>{language === 'tr' ? 'Giriş Yap' : 'Sign In'}</span>
              </>
            ) : tab === 'signup' ? (
              <>
                <UserPlus size={16} />
                <span>{language === 'tr' ? 'Hesap Oluştur' : 'Sign Up'}</span>
              </>
            ) : tab === 'confirmReset' ? (
              <>
                <KeyRound size={16} />
                <span>{language === 'tr' ? 'Yeni Şifreyi Kaydet' : 'Save New Password'}</span>
              </>
            ) : (
              <>
                <KeyRound size={16} />
                <span>{language === 'tr' ? 'Sıfırlama Linki Gönder' : 'Send Reset Link'}</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-nav">
          {tab === 'signin' && (
            <>
              <button className="auth-link-btn" onClick={() => { setTab('forgot'); setError(null); }}>
                {language === 'tr' ? 'Şifremi unuttum' : 'Forgot password?'}
              </button>
              <span className="dot">•</span>
              <button className="auth-link-btn primary" onClick={() => { setTab('signup'); setError(null); }}>
                {language === 'tr' ? 'Yeni hesap aç' : 'Create new account'}
              </button>
            </>
          )}

          {tab === 'signup' && (
            <p className="auth-switch-text">
              {language === 'tr' ? 'Zaten hesabın var mı?' : 'Already have an account?'}{' '}
              <button className="auth-link-btn primary" onClick={() => { setTab('signin'); setError(null); }}>
                {language === 'tr' ? 'Giriş Yap' : 'Sign In'}
              </button>
            </p>
          )}

          {(tab === 'forgot' || tab === 'confirmReset') && (
            <button
              className="auth-link-btn primary"
              onClick={() => {
                clearResetOobCode();
                setTab('signin');
                setError(null);
              }}
            >
              ← {language === 'tr' ? 'Giriş ekranına dön' : 'Back to Sign In'}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
