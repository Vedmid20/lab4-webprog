const navigation = [
  { href: '#about', label: 'Про мене' },
  { href: '#experience', label: 'Досвід' },
  { href: '#education', label: 'Освіта' },
  { href: '#skills', label: 'Навички' },
  { href: '#reviews', label: 'Відгуки' },
  { href: '/part1.html', label: 'Частина 1 (JS)' },
];

function Header({ theme = 'light', onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="hero">
      <div className="hero-topline">
        <a className="wordmark" href="#top" aria-label="На початок сторінки">VM<span>.</span></a>
        <div className="hero-actions">
          <span className="hero-index">РЕЗЮМЕ / 2026 · DEPLOYED ON VERCEL</span>
          <button type="button" className="theme-toggle" onClick={onToggleTheme}>
            {isDark ? 'Денний режим' : 'Нічний режим'}
          </button>
        </div>
      </div>
      <div className="hero-main" id="top">
        <div>
          <p className="eyebrow"><span className="status-dot" /> Відкритий до нових можливостей</p>
          <h1>Мартинович<br /><span>Віталій</span></h1>
        </div>
        <div className="hero-aside">
          <span className="hero-number">01</span>
          <p>Junior cybersecurity<br />спеціаліст</p>
        </div>
      </div>
      <nav className="site-nav" aria-label="Навігація по резюме">
        {navigation.map((item, index) => (
          <a href={item.href} key={item.href}>
            <span>0{index + 1}</span>{item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;