# Animated Login & Sign-up Pages

A pair of responsive login and sign-up pages with a friendly twist: three little characters whose eyes follow your cursor, cover their eyes while you type a password, and hop when you succeed.

![Preview of the login page](preview.gif)

**Live demo:** https://junky001.github.io/login-page/

> **Note:** This is a front-end demo. There is no backend yet, so no accounts are saved and any valid input counts as a successful login.

## Features

- Characters whose eyes track the cursor, and the typing position in text fields
- Eyes close when a password field is focused, and one character peeks when you click **Show**
- Success animation, plus a shake animation when validation fails
- Floating labels that move up as you type
- Password strength meter on the sign-up page
- Validation for name, email, password length, and matching passwords
- Responsive layout that stacks on phones
- Dark mode (follows the system setting)
- Keyboard-friendly focus styles, and animations turn off for people who prefer reduced motion

## Built with

- HTML5
- CSS3 (Grid, Flexbox, custom properties, keyframe animations)
- Vanilla JavaScript (no frameworks or libraries)
- Google Fonts (Bricolage Grotesque)

## Project structure

```
login-page/
├── index.html
├── login.css
├── login.js
├── signup.html
├── signup.css
├── signup.js
├── preview.gif
└── README.md
```

`signup.html` reuses `login.css` for the shared look, and `signup.css` adds only what is specific to the sign-up page.

## Run it locally

1. Clone the repository:
   ```bash
   git clone https://github.com/junky001/login-page.git
   ```
2. Open the folder and double-click `index.html` to open it in your browser.

No installation or build step is needed.

## What I learned

- Building animated UI with CSS transitions and `@keyframes`
- Tracking the cursor with `getBoundingClientRect()` and `Math.atan2()`
- Switching UI states by adding and removing classes with JavaScript
- Reusing one stylesheet across several pages

## Roadmap

- [ ] Forgot password page
- [ ] Connect to a real backend with `fetch()`
- [ ] Server-side validation

## Author

**Jounkey Olang**

- GitHub: [@junky001](https://github.com/junky001)
- LinkedIn:- LinkedIn: [Jounkey Olang](https://www.linkedin.com/in/jounkey-olang-0917ab447)
