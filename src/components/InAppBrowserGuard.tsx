import React, { useEffect, useState } from 'react';
import { ExternalLink, Copy, Check, Compass, Share2 } from 'lucide-react';

interface InAppBrowserGuardProps {
  children: React.ReactNode;
}

export default function InAppBrowserGuard({ children }: InAppBrowserGuardProps) {
  const [isInApp, setIsInApp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [cleanUrl, setCleanUrl] = useState('');
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentFullUrl = window.location.href;
    const currentCleanUrl = currentFullUrl.replace(/^https?:\/\//, '');
    setFullUrl(currentFullUrl);
    setCleanUrl(currentCleanUrl);

    const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';

    // iOS Detection
    const iosDetected =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(iosDetected);

    // In-App browser signature checks (WhatsApp, Instagram, FB, Telegram, TikTok, WeChat, etc.)
    const inAppSignatures = /WhatsApp|FBAN|FBAV|Instagram|Line|Twitter|ByteDance|Snapchat|LinkedIn|MicroMessenger|musical_ly/i;
    const hasInAppSignature = inAppSignatures.test(ua);

    // Check if it's an iOS WebKit webview inside third-party apps
    // Genuine Safari on iOS has window.safari or standalone properties, while in-app webviews lack them
    const isIOSInAppWebView =
      iosDetected &&
      !/(CriOS|FxiOS|EdgiOS)/i.test(ua) && // Not Chrome/Firefox/Edge on iOS
      (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua) || hasInAppSignature);

    if (hasInAppSignature || isIOSInAppWebView) {
      setIsInApp(true);
    }
  }, []);

  if (!isInApp) {
    return <>{children}</>;
  }

  const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const iosChromeUrl = isHttps ? `googlechromes://${cleanUrl}` : `googlechrome://${cleanUrl}`;
  const androidIntentUrl = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
    fullUrl
  )};end`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = fullUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 text-white flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl my-auto">
        <div className="text-6xl mb-3 animate-bounce">🎈</div>
        <h1 className="text-2xl font-bold mb-2 tracking-tight">Tarayıcıda Açın</h1>
        <p className="text-purple-200 text-sm mb-6 leading-relaxed">
          WhatsApp uygulama içi tarayıcısı ses ve oyun özelliklerini kısıtlamaktadır. Kesintisiz deneyim için lütfen Chrome veya Safari ile açın.
        </p>

        <div className="space-y-3 mb-6">
          {/* iOS: Direct anchor link for googlechromes:// scheme (most reliable in modern WebKit) */}
          {isIOS ? (
            <a
              href={iosChromeUrl}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition text-center no-underline"
            >
              <Compass size={20} />
              Google Chrome ile Aç
            </a>
          ) : (
            /* Android: Direct intent link with fallback */
            <a
              href={androidIntentUrl}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition text-center no-underline"
            >
              <Compass size={20} />
              Google Chrome'da Aç
            </a>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="w-full bg-white/15 hover:bg-white/25 active:scale-[0.98] text-white font-semibold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 border border-white/20 transition cursor-pointer"
          >
            {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
            {copied ? '✓ Bağlantı Kopyalandı!' : '📋 Bağlantıyı Kopyala'}
          </button>
        </div>

        {/* Platform-specific helper card */}
        <div className="bg-black/40 rounded-2xl p-4 text-xs text-purple-200 text-left border border-white/10 space-y-2">
          {isIOS ? (
            <>
              <p className="font-semibold text-white flex items-center gap-1.5">
                <Share2 size={15} className="text-blue-400" /> iPhone İçin En Kolay Yol:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-300">
                <li>Sağ alt veya üstteki <strong className="text-white">Paylaş / Menü (⋯)</strong> simgesine dokunun.</li>
                <li><strong className="text-white">"Safari'de Aç"</strong> veya <strong className="text-white">"Varsayılan Tarayıcıda Aç"</strong> seçeneğini seçin.</li>
              </ol>
            </>
          ) : (
            <>
              <p className="font-semibold text-white flex items-center gap-1.5">
                <ExternalLink size={15} className="text-blue-400" /> Android İçin Kolay Yöntem:
              </p>
              <p className="text-slate-300">
                Sağ üstteki <strong>⋮ (üç nokta)</strong> simgesine tıklayıp <strong>"Chrome'da Aç"</strong> veya <strong>"Tarayıcıda Aç"</strong> seçeneğini seçebilirsiniz.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
