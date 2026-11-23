import { useEffect, useState } from 'react';

function Footer() {
  const [storageItems, setStorageItems] = useState([]);

  useEffect(() => {
    const systemInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform || navigator.userAgentData?.platform || 'Невідомо',
      language: navigator.language,
      languages: navigator.languages?.join(', ') || navigator.language,
      cookieEnabled: String(navigator.cookieEnabled),
      onLine: String(navigator.onLine),
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    Object.entries(systemInfo).forEach(([key, value]) => {
      localStorage.setItem(`system.${key}`, String(value));
    });

    const items = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key) {
        items.push({ key, value: localStorage.getItem(key) ?? '' });
      }
    }
    items.sort((a, b) => a.key.localeCompare(b.key, 'uk'));
    setStorageItems(items);
  }, []);

  return (
    <footer className="site-footer">
      <div>
        <span className="footer-label">ЗВ&apos;ЯЗОК</span>
        <a className="footer-email" href="mailto:example@gmail.com">example@gmail.com</a>
      </div>

      <div className="footer-storage" aria-live="polite">
        <span className="footer-label">ІНФОРМАЦІЯ З LOCALSTORAGE</span>
        {storageItems.length === 0 ? (
          <p className="storage-empty">У localStorage поки немає даних.</p>
        ) : (
          <ul className="storage-list">
            {storageItems.map((item) => (
              <li key={item.key}>
                <span className="storage-key">{item.key}</span>
                <span className="storage-value">{item.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="footer-bottom">
        <span>© 2026 Мартинович Віталій</span>
        <span>Львів, Україна</span>
      </div>
    </footer>
  );
}

export default Footer;