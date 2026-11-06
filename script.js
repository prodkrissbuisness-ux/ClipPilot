// Waitlist signups go to the clippilot-waitlist Cloudflare Worker (D1).
const ENDPOINT = 'https://clippilot-waitlist.commonpilot.workers.dev/signup';

const form = document.getElementById('waitlist');
const status = document.getElementById('status');
const button = form.querySelector('button');

function show(text, kind) {
  status.textContent = text;
  status.className = 'status ' + (kind || '');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = form.email.value.trim();

  if (!form.email.checkValidity() || !email) {
    show('Please enter a valid email.', 'err');
    form.email.focus();
    return;
  }

  const params = new URLSearchParams(location.search);
  const source = params.get('utm_source') || params.get('ref') || document.referrer || '';

  button.disabled = true;
  show('Adding you...');

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, website: form.website.value, source }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data.error || 'failed');

    form.reset();
    show("You're on the list. We'll email you when it's ready.", 'ok');
    if (typeof gtag === 'function') gtag('event', 'sign_up', { method: 'waitlist' });
  } catch (err) {
    show(err.message === 'invalid_email'
      ? 'Please enter a valid email.'
      : 'Something went wrong. Please try again.', 'err');
  } finally {
    button.disabled = false;
  }
});
