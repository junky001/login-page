const stage = document.getElementById('stage');
const form = document.getElementById('form');
const user = document.getElementById('user');
const pass = document.getElementById('pass');
const toggle = document.getElementById('toggle');
const error = document.getElementById('error');
const go = document.getElementById('go');
const pupils = [...document.querySelectorAll('.pupil')];

// 1. Pupils follow the cursor (or the typing position in the username field)
function lookAt(x, y) {
  pupils.forEach(p => {
    const r = p.parentElement.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const angle = Math.atan2(y - cy, x - cx);
    const dist = Math.min(7, Math.hypot(x - cx, y - cy) / 25);
    p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
  });
}
document.addEventListener('mousemove', e => lookAt(e.clientX, e.clientY));
user.addEventListener('input', () => {
  const r = user.getBoundingClientRect();
  lookAt(r.left + Math.min(user.value.length * 9, r.width), r.top + r.height / 2);
});

// 2. Characters cover their eyes while you type the password
pass.addEventListener('focus', () => stage.classList.add('shy'));
pass.addEventListener('blur', () => stage.classList.remove('shy'));

// 3. "Show" makes one of them peek
toggle.addEventListener('click', () => {
  const show = pass.type === 'password';
  pass.type = show ? 'text' : 'password';
  toggle.textContent = show ? 'Hide' : 'Show';
  toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  stage.classList.toggle('peek', show);
  pass.focus();
});

// 4. Submit: shake on error, hop on success (demo only: no real server)
form.addEventListener('submit', e => {
  e.preventDefault();
  error.textContent = '';
  if (!user.value.trim() || !pass.value) {
    error.textContent = 'Enter your email or username and your password.';
    form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
    return;
  }
  go.textContent = 'Logging in...';
  setTimeout(() => {
    go.textContent = 'Welcome back!';
    go.classList.add('ok');
    stage.classList.remove('shy');
    stage.classList.add('hop');
    setTimeout(() => stage.classList.remove('hop'), 900);
  }, 700);
});