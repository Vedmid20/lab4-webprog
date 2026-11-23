import { useEffect, useState } from 'react';

const VARIANT = 14;

function Reviews() {
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadComments() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Помилка запиту: ${response.status}`);
        }

        const data = await response.json();
        setComments(Array.isArray(data) ? data : []);
        setStatus('success');
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }
        setStatus('error');
        setErrorMessage(error.message || 'Не вдалося завантажити коментарі.');
      }
    }

    loadComments();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section className="section-block reviews-section" id="reviews">
      <div className="section-heading">
        <span className="section-number">05</span>
        <h2>Відгуки попередніх роботодавців</h2>
      </div>

      {status === 'loading' && <p className="reviews-status">Завантаження коментарів...</p>}
      {status === 'error' && (
        <p className="reviews-status reviews-error">Не вдалося отримати коментарі: {errorMessage}</p>
      )}
      {status === 'success' && comments.length === 0 && (
        <p className="reviews-status">Коментарі відсутні.</p>
      )}

      {status === 'success' && comments.length > 0 && (
        <div className="reviews-list">
          {comments.map((comment) => (
            <article className="review-card" key={comment.id}>
              <div className="review-card-header">
                <h3>{comment.name}</h3>
                <a href={`mailto:${comment.email}`}>{comment.email}</a>
              </div>
              <p>{comment.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Reviews;