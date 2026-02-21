## 2026-02-19 - Fake Interactive Elements
**Learning:** Found `<span class="show-hide">Show</span>` elements that looked interactive but had no event listeners or accessibility attributes.
**Action:** Always verify "interactive" elements in existing code are actually functional and accessible (using `<button>`, `aria-label`, and event handlers) before assuming they work.

## 2026-02-19 - Password Visibility Icons
**Learning:** Users intuitively expect icons (eye/eye-off) for password toggles, but these must be accompanied by dynamic `aria-label` updates for screen readers. Merely changing the icon is not enough for accessibility.
**Action:** When replacing text controls with icons, always ensure the underlying state (e.g., `aria-label`, `type`) is synchronized with the visual icon change.
