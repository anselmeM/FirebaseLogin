## 2026-02-19 - Fake Interactive Elements
**Learning:** Found `<span class="show-hide">Show</span>` elements that looked interactive but had no event listeners or accessibility attributes.
**Action:** Always verify "interactive" elements in existing code are actually functional and accessible (using `<button>`, `aria-label`, and event handlers) before assuming they work.
