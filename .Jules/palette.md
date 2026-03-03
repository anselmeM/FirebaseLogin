## 2026-02-19 - Fake Interactive Elements
**Learning:** Found `<span class="show-hide">Show</span>` elements that looked interactive but had no event listeners or accessibility attributes.
**Action:** Always verify "interactive" elements in existing code are actually functional and accessible (using `<button>`, `aria-label`, and event handlers) before assuming they work.

## 2026-02-19 - Password Visibility Icons
**Learning:** Users intuitively expect icons (eye/eye-off) for password toggles, but these must be accompanied by dynamic `aria-label` updates for screen readers. Merely changing the icon is not enough for accessibility.
**Action:** When replacing text controls with icons, always ensure the underlying state (e.g., `aria-label`, `type`) is synchronized with the visual icon change.

## 2026-03-03 - Added autocomplete attributes for better accessibility and password manager support
**Learning:** Browser autofill and password manager integrations rely heavily on the `autocomplete` attributes. Missing them on authentication forms causes frustration for users who rely on password managers.
**Action:** Always verify that email inputs have `autocomplete="username"` (or `"email"` in generic forms), login passwords have `"current-password"`, and signup passwords have `"new-password"`.
