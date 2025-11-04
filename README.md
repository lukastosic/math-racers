# Math Racers (Math Race for Kids)

A small, friendly web app that helps children practise basic arithmetic with a playful racing theme. It's targeted at teachers, parents and kids aged ~5–10 who want short, focused practice sessions.

Live demo

- A live hosted version is available at: https://lukastosic.github.io/math-racers/

Why this project

- Simple, approachable UI for kids
- Multiple difficulty categories (sum/min/advanced)
- Localized into several languages
- Small, dependency-light codebase using React + Vite + TypeScript

Quick overview — where things live

- Source code: `src/`
	- `src/locales/*.json` — translation JSON files (one file per locale)
	- `src/locales/constants/*.ts` — advanced question sets for each locale (TypeScript modules exporting `ADVANCED_QUESTIONS`)
	- `src/hooks/useTranslations.ts` — the translations loader used by the app
	- `src/hooks/useQuestionGenerator.ts` — question generation logic (uses advanced questions for the ADVANCED category)
	- `src/contexts/LanguageContext.tsx` — current locale and provider
	- `src/screens/` — main UI screens (Home, Setup, Game, Completion)

Add a new language

1. Create a translation file in `src/locales/` named with the locale code, e.g. `fr.json`.
	 - The file should use the same keys as the existing `en.json`. You can copy `en.json` and translate the strings.

2. Add an advanced-questions module in `src/locales/constants/` named `advanced-<locale>.ts`, e.g. `advanced-fr.ts`.
	 - Export a constant named `ADVANCED_QUESTIONS` which matches the project's `AdvancedQuestion` type. Example:

```ts
// src/locales/constants/advanced-fr.ts
import { AdvancedQuestion } from '../../types';

export const ADVANCED_QUESTIONS: AdvancedQuestion[] = [
	{
		question: 'Quel nombre complète la suite: 2, 4, 6, ? ',
		answers: [
			{ answer: 8, correct: true },
			{ answer: 7, correct: false },
			{ answer: 6, correct: false },
			{ answer: 10, correct: false },
		],
	},
	// ...more questions
];
```

3. Wire up the locale (if necessary): the `LanguageContext` accepts explicit locale codes; make sure your new locale code is included where used (if you have enum lists). Generally the loader will pick up any `src/locales/<locale>.json` and `src/locales/constants/advanced-<locale>.ts` dynamically.

Where to adjust advanced questions

- Advanced question data lives in `src/locales/constants/` as `advanced-*.ts` files. Edit those files to add, remove, or translate advanced questions for each language.

Run locally

- Install dependencies:

```bash
npm install
```

- Development server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
```

- Preview the production build locally:

```bash
npm run preview
```

Build & deploy notes

- There's a `BUILD.md` file in the repo that explains how to build and deploy to GitHub Pages (the live demo was deployed using that flow). If you plan to host under a subpath (like `https://<user>.github.io/<repo>/`) make sure `vite`'s `base` option is configured appropriately in `vite.config.ts`.

Extras and troubleshooting

- Translations: the app uses dynamic imports for JSON locales from `src/locales/`. If you add new files, re-run the build so Vite can include them.

- If the preview server can't find translations, double-check you didn't accidentally duplicate locale files in `public/locales` — the project expects `src/locales` to be the source of truth.

- TypeScript: the project enables `resolveJsonModule` so JSON files can be imported. If you see type errors, run `npx tsc --noEmit` to inspect them.

Enjoy!
