import React, { useEffect, useState } from 'react';
import { ExternalLink, Copy, Check, Compass, Share2 } from 'lucide-react';

interface InAppBrowserGuardProps {
  children: React.ReactNode;
}

export default function InAppBrowserGuard({ children }: InAppBrowserGuardProps) {
  const [isInApp, setIsInApp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
    
    // iOS detection (iPhone, iPad, iPod)
    const iosDetected = /iPad|iPhone|iPod/.test(ua) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(iosDetected);

    // In-app browser detection: WhatsApp, Instagram, Facebook, Line, TikTok, Twitter, LinkedIn vb.
    const isWhatsApp = /WhatsApp/i.test(ua);
    const isOtherInApp = /FBAN|FBAV|Instagram|Line|Twitter|ByteDance|Snapchat|LinkedIn/i.test(ua);
    
    // iOS UIWebView / WKWebView detection within apps
    const isIOSWebView = iosDetected && (
      /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua) ||
      !/(Version\/[\d._]+.*Safari)/i.test(ua)
    );

    const detected = isWhatsApp || isOtherInApp || (iosDetected && isIOSWebView && (isWhatsApp || isOtherInApp));

    if (detected) {
      setIsInApp(true);
    }
  }, []);

  if (!isInApp) {
    return <>{children}</>;
  }

  const handleOpenInChromeIOS = () => {
    const cleanUrl = window.location.href.replace(/^https?:\/\//, '');
    const isHttps = window.location.protocol === 'https:';
    // iOS Custom URL schemes for Google Chrome
    const chromeScheme = isHttps ? `googlechromes://${cleanUrl}` : `googlechrome://${cleanUrl}`;
    window.location.href = chromeScheme;

    // Fallback: If Chrome is not installed, open download page after timeout
    setTimeout(() => {
      // If user is still on page after 1.5s, Chrome might not be installed
    }, 1500);
  };

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(window.location.href);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Copy failed', err);
      }
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 text-white flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl my-auto">
        <div className="text-6xl mb-3 animate-bounce">🎈</div>
        <h1 className="text-2xl font-bold mb-2 tracking-tight">Tarayıcıda Açın</h1>
        <p className="text-purple-200 text-sm mb-6 leading-relaxed">
          WhatsApp içindeki tarayıcı ses ve oyun özelliklerini kısıtlamaktadır. Kesintisiz deneyim için lütfen Chrome veya Safari ile açın.
        </p>

        <div className="space-y-3 mb-6">
          {isIOS ? (
            <>
              <button
                onClick={handleOpenInChromeIOS}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Compass size={20} />
                Google Chrome ile Aç
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                const currentUrl = window.location.href.replace(/^https?:\/\//, '');
                window.location.href = `intent://${currentUrl}#Intent;scheme=https;package=com.android.chrome;end`;
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Compass size={20} />
              Google Chrome'da Aç
            </button>
          )}

          <button
            onClick={handleCopy}
            className="w-full bg-white/15 hover:bg-white/25 active:scale-[0.98] text-white font-semibold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 border border-white/20 transition"
          >
            {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
            {copied ? '✓ Bağlantı Kopyalandı!' : '📋 Bağlantıyı Kopyala'}
          </button>
        </div>

        {/* iPhone / Android'e özel yönlendirme kutusu */}
        <div className="bg-black/40 rounded-2xl p-4 text-xs text-purple-200 text-left border border-white/10 space-y-2">
          {isIOS ? (
            <>
              <p className="font-semibold text-white flex items-center gap-1.5">
                <Share2 size={15} className="text-blue-400" /> iPhone için En Kolay Yol:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-300">
                <li>Sağ alt veya üstteki <strong className="text-white">Paylaş / Menü</strong> simgesine dokunun.</li>
                <li><strong className="text-white">"Safari'de Aç"</strong> veya <strong className="text-white">"Varsayılan Tarayıcıda Aç"</strong> seçeneğini seçin.</li>
              </ol>
            </>
          ) : (
            <>
              <p className="font-semibold text-white flex items-center gap-1.5">
                <ExternalLink size={15} className="text-blue-400" /> Kolay Yöntem:
              </p>
              <p className="text-slate-300">
                Sağ üstteki <strong>⋮ (üç nokta)</strong> simgesine tıklayıp <strong>"Chrome'da Aç"</strong> seçeneğini seçebilirsiniz.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
