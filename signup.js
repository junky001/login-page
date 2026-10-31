const stage = document.getElementById("stage");
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const confirmPass = document.getElementById("confirm");
const toggle = document.getElementById("toggle");
const error = document.getElementById("error");
const go = document.getElementById("go");
const bar = document.getElementById("bar");
const hint = document.getElementById("hint");
const pupils = [...document.querySelectorAll(".pupil")];

// 1. Pupils follow the cursor (or the typing position in the text fields)
function lookAt(x, y) {
  pupils.forEach((p) => {
    const r = p.parentElement.getBoundingClientRect();
    const cx = r.left + r.width / 2,
      cy = r.top + r.height / 2;
    const angle = Math.atan2(y - cy, x - cx);
    const dist = Math.min(7, Math.hypot(x - cx, y - cy) / 25);
    p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
  });
}
document.addEventListener("mousemove", (e) => lookAt(e.clientX, e.clientY));
[nameInput, email].forEach((input) => {
  input.addEventListener("input", () => {
    const r = input.getBoundingClientRect();
    lookAt(
      r.left + Math.min(input.value.length * 9, r.width),
      r.top + r.height / 2,
    );
  });
});

// 2. Characters cover their eyes while either password field is focused
[pass, confirmPass].forEach((input) => {
  input.addEventListener("focus", () => stage.classList.add("shy"));
  input.addEventListener("blur", () => stage.classList.remove("shy"));
});

// 3. "Show" reveals both password fields and one character peeks
toggle.addEventListener("click", () => {
  const show = pass.type === "password";
  pass.type = confirmPass.type = show ? "text" : "password";
  toggle.textContent = show ? "Hide" : "Show";
  toggle.setAttribute("aria-label", show ? "Hide passwords" : "Show passwords");
  stage.classList.toggle("peek", show);
  pass.focus();
});

// 4. Password strength meter
function strength(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return value ? Math.max(score, 1) : 0;
}
const labels = [
  "Use at least 8 characters.",
  "Weak: add more characters.",
  "Okay: add numbers or capitals.",
  "Good: almost there.",
  "Strong password.",
];
pass.addEventListener("input", () => {
  const level = strength(pass.value);
  bar.dataset.level = level;
  hint.textContent = labels[level];
});

// 5. Validation and submit (demo only: no real server yet)
function fail(message, field) {
  error.textContent = message;
  field.focus();
  form.classList.remove("shake");
  void form.offsetWidth;
  form.classList.add("shake");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  error.textContent = "";

  if (!nameInput.value.trim()) return fail("Enter your full name.", nameInput);
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim()))
    return fail("Enter a valid email address.", email);
  if (pass.value.length < 8)
    return fail("Your password needs at least 8 characters.", pass);
  if (pass.value !== confirmPass.value)
    return fail("The passwords do not match.", confirmPass);

  go.textContent = "Creating account...";
  setTimeout(() => {
    go.textContent = "Account created!";
    go.classList.add("ok");
    stage.classList.remove("shy");
    stage.classList.add("hop");
    // After the celebration, send the user to the login page
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1400);
  }, 700);
});
