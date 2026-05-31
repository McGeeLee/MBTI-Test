# Web UI Parity And Action Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove dead or misleading web UI controls, expose the data/features that are already implemented in the web/mobile models, and eliminate dormant storage-only features that are not actually available to users.

**Architecture:** Keep the React app route-driven, but stop resolving result pages by MBTI type alone. Add a small result-selection helper and explicit route state or URL id so history items open the exact saved result. Use the Flutter app as the parity reference for missing web surfaces such as language selection and the challenging-relationship section, while pruning storage schema that has no product surface.

**Tech Stack:** React 18, TypeScript, React Router 7, Tailwind CSS, Framer Motion, Vitest

---

## Audit Summary

- Web history links open `/result/:type`, but [src/pages/Profile.tsx](D:\CODEEEEE\16per\src\pages\Profile.tsx:111) only passes the MBTI type, while [src/pages/Result.tsx](D:\CODEEEEE\16per\src\pages\Result.tsx:43) loads the first matching record by `resultType`. Repeated results of the same type will open the wrong history entry.
- The share CTA in [src/pages/Result.tsx](D:\CODEEEEE\16per\src\pages\Result.tsx:210) renders a button with no action.
- The privacy-policy footer link in [src/components/Layout.tsx](D:\CODEEEEE\16per\src\components\Layout.tsx:76) is a dead `href="#"`.
- The version-card CTA in [src/pages/Home.tsx](D:\CODEEEEE\16per\src\pages\Home.tsx:216) has no direct handler and only works indirectly through the parent card click target at [src/pages/Home.tsx](D:\CODEEEEE\16per\src\pages\Home.tsx:198).
- Web storage still contains `userPreferences.theme`, `shortcuts`, `animations`, `language`, and `favorites` in [src/lib/LocalStorageManager.ts](D:\CODEEEEE\16per\src\lib\LocalStorageManager.ts:16), but none of them are surfaced or consumed by the web UI.
- The web detail page shows compatible types, advice, growth path, tips, and famous people, but not `relationships.challenging` or `luckyColors.secondary`; see [src/pages/PersonalityDetail.tsx](D:\CODEEEEE\16per\src\pages\PersonalityDetail.tsx:154) versus the Flutter parity reference in [mobile_app/lib/src/screens/type_detail_screen.dart](D:\CODEEEEE\16per\mobile_app\lib\src\screens\type_detail_screen.dart:103).
- The engine calculates `dimensions` with `X` tie handling in [src/lib/TestEngine.ts](D:\CODEEEEE\16per\src\lib\TestEngine.ts:126) and tests it in [src/lib/TestEngine.test.ts](D:\CODEEEEE\16per\src\lib\TestEngine.test.ts:165), but the web result UI never exposes that summary.
- Flutter already ships a real language picker in [mobile_app/lib/src/screens/about_screen.dart](D:\CODEEEEE\16per\mobile_app\lib\src\screens\about_screen.dart:41), while the web app only stores a dormant `language` preference.

### Scope Assumptions

- Keep and surface `language`, because there is already a working mobile reference and localized data assets in `mobile_app/assets/data`.
- Do **not** silently invent UI for `theme`, `shortcuts`, `animations`, and `favorites` in this pass. Either implement them intentionally in a separate scoped feature or remove them from the web storage schema now so the codebase stops advertising ghost features.

### Task 1: Fix Wrong And Missing Actions

**Files:**
- Create: `src/lib/resultLookup.ts`
- Test: `src/lib/resultLookup.test.ts`
- Modify: `src/pages/Profile.tsx`
- Modify: `src/pages/Result.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/Layout.tsx`
- Optional create: `src/pages/Privacy.tsx`
- Optional modify: `src/App.tsx`

- [ ] **Step 1: Write failing selection tests for exact history lookup**

```ts
import { describe, expect, it } from 'vitest';
import { resolveResultFromHistory } from './resultLookup';

describe('resolveResultFromHistory', () => {
  it('prefers an explicit result id over resultType', () => {
    const history = [
      { id: 'old', resultType: 'INTJ', timestamp: 1 } as any,
      { id: 'new', resultType: 'INTJ', timestamp: 2 } as any,
    ];

    expect(resolveResultFromHistory(history, 'INTJ', 'old')?.id).toBe('old');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/lib/resultLookup.test.ts`
Expected: FAIL because `resolveResultFromHistory` does not exist yet.

- [ ] **Step 3: Add a pure result-selection helper**

```ts
export function resolveResultFromHistory(
  history: TestResult[],
  resultType: string,
  resultId?: string,
) {
  if (resultId) {
    const exact = history.find((item) => item.id === resultId);
    if (exact) return exact;
  }
  return history.find((item) => item.resultType === resultType.toUpperCase()) ?? null;
}
```

- [ ] **Step 4: Route history items with explicit identity**

```tsx
<Link
  to={`/result/${h.resultType}`}
  state={{ resultId: h.id }}
>
  View details
</Link>
```

```tsx
const location = useLocation();
const resultId = (location.state as { resultId?: string } | null)?.resultId;
const latest = resolveResultFromHistory(history, type, resultId);
```

- [ ] **Step 5: Wire dead CTAs directly**

```tsx
<button
  type="button"
  onClick={() => handleVersionClick(v.id)}
  className="clay-button clay-button-secondary mt-6 w-full justify-center"
>
  Start test
</button>
```

```tsx
<button
  type="button"
  onClick={handleShare}
  className="clay-button clay-button-ghost !w-full !justify-center !px-4 !py-3"
>
  <Share2 size={18} className="mr-1" /> Share
</button>
```

```tsx
<Link to="/privacy" className="hover:text-[var(--clay-text)] transition-colors">
  Privacy policy
</Link>
```

- [ ] **Step 6: Implement share fallback**

```ts
async function handleShare() {
  const url = window.location.href;
  const text = `${typeData.id} - ${typeData.name}`;

  if (navigator.share) {
    await navigator.share({ title: text, text: typeData.summary, url });
    return;
  }

  await navigator.clipboard.writeText(url);
  setShareState('copied');
}
```

- [ ] **Step 7: Run regression checks**

Run: `npm run test -- src/lib/resultLookup.test.ts`
Expected: PASS

### Task 2: Expose Implemented Result And Type Data

**Files:**
- Modify: `src/pages/Result.tsx`
- Modify: `src/pages/PersonalityDetail.tsx`
- Optional create: `src/components/DimensionSummary.tsx`

- [ ] **Step 1: Add a visible dimension summary to the result screen**

```tsx
const dimensionRows = [
  ['E / I', result?.dimensions.EI],
  ['S / N', result?.dimensions.SN],
  ['T / F', result?.dimensions.TF],
  ['J / P', result?.dimensions.JP],
];
```

```tsx
<div className="rounded-[2rem] border border-[var(--clay-border)] bg-white p-6 shadow-[var(--clay-shadow)]">
  <h3 className="font-black text-[var(--clay-text)]">Dimension verdict</h3>
  <div className="mt-4 grid gap-3 sm:grid-cols-2">
    {dimensionRows.map(([label, value]) => (
      <div key={label} className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-bg)] p-4">
        <div className="text-xs uppercase tracking-[0.18em] clay-muted">{label}</div>
        <div className="mt-2 text-2xl font-black text-[var(--clay-text)]">{value ?? '-'}</div>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Expose challenging matches in the type detail page**

```tsx
<div>
  <h4 className="font-bold text-gray-900 mb-3">Potential friction</h4>
  <div className="flex gap-3 flex-wrap">
    {typeData.relationships.challenging.map((t) => (
      <Link key={t} to={`/type/${t}`} className="bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full">
        {t}
      </Link>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Show secondary lucky colors instead of only the primary swatch**

```tsx
<div className="flex flex-wrap gap-3">
  {[typeData.luckyColors.primary, ...typeData.luckyColors.secondary].map((hex) => (
    <div key={hex} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/70 px-3 py-2">
      <span className="h-6 w-6 rounded-lg border border-black/10" style={{ backgroundColor: hex }} />
      <span className="text-xs font-mono text-gray-600">{hex}</span>
    </div>
  ))}
</div>
```

- [ ] **Step 4: Keep parity wording aligned with the mobile app**

Reference:
- [mobile_app/lib/src/screens/type_detail_screen.dart](D:\CODEEEEE\16per\mobile_app\lib\src\screens\type_detail_screen.dart:103)
- [mobile_app/lib/src/screens/type_detail_screen.dart](D:\CODEEEEE\16per\mobile_app\lib\src\screens\type_detail_screen.dart:151)

- [ ] **Step 5: Run smoke verification**

Run: `npm run build`
Expected: PASS and result/type pages render without type errors.

### Task 3: Replace Dormant Web Preferences With Real Behavior

**Files:**
- Create: `src/context/LocaleContext.tsx`
- Create: `src/i18n/strings.ts`
- Create: `src/data/locales/questions.vi.json`
- Create: `src/data/locales/questions.en.json`
- Create: `src/data/locales/questions.ko.json`
- Create: `src/data/locales/questions.ja.json`
- Create: `src/data/locales/questions.zh.json`
- Create: `src/data/locales/types.vi.json`
- Create: `src/data/locales/types.en.json`
- Create: `src/data/locales/types.ko.json`
- Create: `src/data/locales/types.ja.json`
- Create: `src/data/locales/types.zh.json`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Modify: `src/pages/About.tsx`
- Modify: `src/lib/TestEngine.ts`
- Modify: `src/lib/LocalStorageManager.ts`

- [ ] **Step 1: Decide the supported preference surface**

Keep:
- `language`

Remove from web storage now:
- `theme`
- `shortcuts`
- `animations`
- `favorites`

- [ ] **Step 2: Port locale assets from the Flutter app into the web app**

Source reference:
- `mobile_app/assets/data/questions_*.json`
- `mobile_app/assets/data/types_*.json`

Web loader shape:

```ts
export type SupportedLocale = 'vi' | 'en' | 'ko' | 'ja' | 'zh';

export function getLocalizedQuestions(locale: SupportedLocale): QuestionBank {
  return questionBanks[locale];
}
```

- [ ] **Step 3: Add a locale context and storage-backed selector**

```ts
const LocaleContext = createContext<{
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
} | null>(null);
```

```ts
static saveLanguage(language: 'vi' | 'en' | 'ko' | 'ja' | 'zh'): void {
  const data = this.load();
  this.save({ userPreferences: { ...data.userPreferences, language } });
}
```

- [ ] **Step 4: Replace the static About page with a real language/settings panel**

Parity reference:
- [mobile_app/lib/src/screens/about_screen.dart](D:\CODEEEEE\16per\mobile_app\lib\src\screens\about_screen.dart:41)

```tsx
{supportedLocales.map((locale) => (
  <button
    key={locale}
    type="button"
    onClick={() => setLocale(locale)}
    className={locale === currentLocale ? activeChip : idleChip}
  >
    {languageName(locale)}
  </button>
))}
```

- [ ] **Step 5: Update TestEngine and page data sources to consume the selected locale**

```ts
constructor(version: VersionId, locale: SupportedLocale) {
  this.questions = getLocalizedQuestions(locale)[version];
}
```

- [ ] **Step 6: Delete dead storage fields once language is real**

```ts
interface LocalStorageData {
  savedTests: Record<string, TestProgress>;
  testHistory: TestResult[];
  userPreferences: {
    language: SupportedLocale;
  };
}
```

- [ ] **Step 7: Run localization verification**

Run: `npm run check`
Expected: PASS with the new locale types and data loaders.

### Task 4: Regression Coverage And Manual QA

**Files:**
- Modify: `src/lib/TestEngine.test.ts`
- Optional create: `src/lib/localeData.test.ts`
- Optional create: `src/lib/share.test.ts`

- [ ] **Step 1: Add regression tests for dimension rendering input and locale data loading**

```ts
it('loads the requested locale question bank', () => {
  expect(getLocalizedQuestions('vi').standard.length).toBeGreaterThan(0);
  expect(getLocalizedQuestions('zh').standard.length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run the full automated suite**

Run: `npm run test`
Expected: PASS

- [ ] **Step 3: Run typecheck and production build**

Run: `npm run check`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Manual QA checklist**

Run through these flows:
- Start each test version from the home page using both the card body and the explicit CTA button.
- Resume a saved test, restart it, and complete it.
- Open two history items with the same `resultType` and confirm each opens the correct saved record.
- Use the result share button on a browser with `navigator.share` and one without it.
- Open a type detail page and confirm challenging matches and secondary colors render.
- Change web language in About, refresh, and confirm the selection persists and the content reloads.
- Open the privacy page from the footer.

### Task 5: Cleanup And Commit

**Files:**
- Modify only the files above

- [ ] **Step 1: Confirm there are no ghost feature references left**

Search for:

```powershell
Get-ChildItem src -Recurse -File -Include *.ts,*.tsx |
  Select-String -Pattern 'favorites|theme|shortcuts|animations'
```

Expected: only intentional references remain, or none if those fields were removed.

- [ ] **Step 2: Commit in focused slices**

Suggested commits:

```bash
git commit -m "fix: route result history by saved record"
git commit -m "fix: wire web action buttons and privacy route"
git commit -m "feat: add web locale settings and localized data"
git commit -m "feat: expose missing type and result metadata"
```

- [ ] **Step 3: Final verification**

Run: `npm run verify`
Expected: PASS

---

Plan complete and saved to `docs/superpowers/plans/2026-04-19-web-ui-parity-and-action-fixes.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
