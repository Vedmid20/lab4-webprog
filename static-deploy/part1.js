(function () {
  const VARIANT = 14;
  const FORM_ENDPOINT = 'https://formspree.io/f/xjywaann';

  const themeToggle = document.getElementById('theme-toggle');
  const commentsStatus = document.getElementById('comments-status');
  const commentsList = document.getElementById('comments-list');
  const localStorageList = document.getElementById('localstorage-list');
  const feedbackModal = document.getElementById('feedback-modal');
  const modalClose = document.getElementById('modal-close');

  function getThemeByTime() {
    const hours = new Date().getHours();
    return hours >= 7 && hours < 21 ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? 'Денний режим' : 'Нічний режим';
    }
  }

  function initTheme() {
    applyTheme(getThemeByTime());

    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }
  }

  function saveBrowserInfo() {
    const systemInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform || 'Невідомо',
      language: navigator.language,
      languages: Array.isArray(navigator.languages) ? navigator.languages.join(', ') : navigator.language,
      cookieEnabled: String(navigator.cookieEnabled),
      onLine: String(navigator.onLine),
      screen: window.screen.width + 'x' + window.screen.height,
      viewport: window.innerWidth + 'x' + window.innerHeight,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    Object.keys(systemInfo).forEach(function (key) {
      localStorage.setItem('system.' + key, String(systemInfo[key]));
    });
  }

  function renderLocalStorage() {
    if (!localStorageList) return;

    localStorageList.innerHTML = '';
    const keys = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key) keys.push(key);
    }
    keys.sort(function (a, b) {
      return a.localeCompare(b, 'uk');
    });

    keys.forEach(function (key) {
      const item = document.createElement('li');

      const keySpan = document.createElement('span');
      keySpan.className = 'storage-key';
      keySpan.textContent = key;

      const valueSpan = document.createElement('span');
      valueSpan.className = 'storage-value';
      valueSpan.textContent = localStorage.getItem(key) || '';

      item.appendChild(keySpan);
      item.appendChild(valueSpan);
      localStorageList.appendChild(item);
    });
  }

  async function loadComments() {
    if (!commentsStatus || !commentsList) return;

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/' + VARIANT + '/comments'
      );

      if (!response.ok) {
        throw new Error('Помилка запиту: ' + response.status);
      }

      const comments = await response.json();
      commentsStatus.textContent = '';

      if (!Array.isArray(comments) || comments.length === 0) {
        commentsStatus.textContent = 'Коментарі відсутні.';
        return;
      }

      comments.forEach(function (comment) {
        const card = document.createElement('article');
        card.className = 'review-card';

        const header = document.createElement('div');
        header.className = 'review-card-header';

        const title = document.createElement('h3');
        title.textContent = comment.name;

        const email = document.createElement('a');
        email.href = 'mailto:' + comment.email;
        email.textContent = comment.email;

        header.appendChild(title);
        header.appendChild(email);

        const body = document.createElement('p');
        body.textContent = comment.body;

        card.appendChild(header);
        card.appendChild(body);
        commentsList.appendChild(card);
      });
    } catch (error) {
      commentsStatus.textContent = 'Не вдалося отримати коментарі: ' + (error && error.message ? error.message : 'невідома помилка');
      commentsStatus.classList.add('reviews-error');
    }
  }

  function initModal() {
    if (!feedbackModal) return;

    const form = feedbackModal.querySelector('form');
    if (form) {
      form.setAttribute('action', FORM_ENDPOINT);
      form.setAttribute('method', 'POST');
    }

    window.setTimeout(function () {
      feedbackModal.classList.remove('hidden');
    }, 60000);

    if (modalClose) {
      modalClose.addEventListener('click', function () {
        feedbackModal.classList.add('hidden');
      });
    }

    feedbackModal.addEventListener('click', function (event) {
      if (event.target === feedbackModal) {
        feedbackModal.classList.add('hidden');
      }
    });
  }

  saveBrowserInfo();
  renderLocalStorage();
  initTheme();
  loadComments();
  initModal();
})();