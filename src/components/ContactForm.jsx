import { useEffect, useState } from 'react';

const FORM_ENDPOINT = 'https://formspree.io/f/xjywaann';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" role="presentation">
      <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
        <div className="modal-header">
          <h2 id="feedback-title">Форма зворотного зв&apos;язку</h2>
          <button type="button" className="modal-close" onClick={() => setIsOpen(false)} aria-label="Закрити форму">
            ×
          </button>
        </div>

        <form className="feedback-form" action={FORM_ENDPOINT} method="POST">
          <label>
            Ім&apos;я
            <input type="text" name="name" required />
          </label>

          <label>
            Email
            <input type="email" name="email" required />
          </label>

          <label>
            Номер телефону
            <input type="tel" name="phone" required />
          </label>

          <label>
            Повідомлення
            <textarea name="message" rows="5" required />
          </label>

          <button type="submit" className="submit-button">Надіслати</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;