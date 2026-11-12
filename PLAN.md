# NeuroMind Check-in de Bienestar: build plan

**Stack:** the existing Expo project in `neuromind-checkin` (Expo SDK 58, Expo Router, TypeScript, React Native 0.88). `@expo/ui`, Reanimated and Gesture Handler are already installed. All UI copy is in Spanish.

---

## 1. Brand system (from the Manual de Marca)

| Token | Value | Use |
|---|---|---|
| `yellow` | `#F5C842` | Main color, primary buttons, wheel ring, accents |
| `yellowMid` | `#FAD857` | Pressed/hover state |
| `yellowLight` | `#FFF3C0` | Cards, secondary backgrounds, slider track fill |
| `black` | `#1A1A18` | Text, dark backgrounds |
| `grayDark` | `#3A3A36` | Secondary text |
| `gray3` | `#B0AD9A` | Metadata, disabled |
| `gray2` | `#EDEBD9` | Borders, unfilled slider track |
| `gray1` | `#F7F6F0` | Page background |
| `white` | `#FFFFFF` | |
| radius | 16 / 8 | Cards / small elements |

**Typography:** DM Serif Display for titles (H1 64, H2 40, H3 24; scale down about 30% on mobile). DM Sans for body (15), card subtitles (18), secondary text (12), and labels (11, weight 700, uppercase). Load both with `@expo-google-fonts/dm-serif-display` and `@expo-google-fonts/dm-sans` through `expo-font`.

**Approved contrast pairs:** black on yellow, yellow on black, white on black, black on gray. Don't use white on yellow.

**Voice:** warm, direct, evidence-based. No diagnoses and no alarmist language. This matters for all on-screen copy.

**Logo rules:** the logo always sits on a white, black or light-gray background. The isotipo is at least 24 px and the full logo at least 120 px wide. Don't recolor it or add effects.

Deliverable (done in step 0): `src/constants/theme.ts` holds the tokens; shared components `AppText` (all text, by variant), `Button` (primary / dark / secondary / ghost), `Card` and `Screen`.

---

## 2. Screen map

Screen boundaries confirmed by the product owner.

| # | Screen | Content (from the PDF) |
|---|---|---|
| 1 | **Bienvenida** | Logo, "NeuroMind te ayuda a conocerte para sentirte mejor", the "Aquí podrás explorar tu Mapa de Bienestar NeuroMind…" paragraph, and the quote "Tu bienestar comienza cuando te das un espacio para escucharte". Button: **Continuar** |
| 2 | **Beneficios** | "¿Qué beneficios tiene explorar tu Mapa de Bienestar?", "Conocer tu mapa de bienestar te permitirá:" and the 6 bullets (Reconocer, Tomar conciencia, Identificar, Reflexionar, Orientar, Hacer seguimiento), with the lead verb in bold as in the PDF. Button: **Continuar** |
| 3 | **¿Cómo usar NeuroMind?** | "Detente · Conecta · Descubre", the "El objetivo no es obtener un resultado bueno o malo…" copy, and the 6-step cycle graphic (Exploración → Identificación de necesidades → Acciones de autocuidado → Seguimiento → Reevaluación → Evolución y efectividad). Button: **Continuar** |
| 4 | **Mapa de Bienestar (hub)** | Heading "Ahora inicia tu recorrido por NeuroMind". Below it, the circular wheel with the NeuroMind face in the center and the 6 numbered dimensions around it, then the dimension list. Tapping a dimension starts its flow. Completed dimensions show ✓. |
| 4.x | **Dimension flows** | One flow per dimension (section 3) |

Screens 1–3 are onboarding. They appear on first launch and when starting a new monthly check-in, with a "Saltar" link after the first time. Returning users open straight to screen 4. The PDF's page-1 text ("Check-in de Bienestar NeuroMind" and "Esta plataforma es una herramienta de monitoreo…") isn't assigned to any screen, so it can be used as the app store description or an "Acerca de" sheet.

### The hub wheel (screen 4)
- Build it as a `react-native-svg` circle (yellow ring) with 6 absolutely positioned, tappable nodes at 60° steps, starting at 12 o'clock: **1 Bienestar personal, 2 Equilibrio emocional, 3 Relación con el estrés, 4 Conexión y apoyo, 5 Recuperación y descanso, 6 Propósito y motivación**. The face sits in the center.
- Under the wheel, show a list of 6 dimension cards with the same number and name, a status (Pendiente / En progreso 3/6 / Completado), and an arrow. The wheel is the visual; the list gives larger tap targets and better accessibility.
- Completed nodes fill solid yellow. Pending nodes are outlined.

---

## 3. Dimension flow (repeats for each of the 6)

```
[Intro card] → [Question 1/6] → … → [Question 6/6] → [Tus respuestas] → [Plan / recommendation] → back to Hub
```

1. **Intro card.** Show the big circular illustration from the PDF: number, title, the dimension's face illustration, and description text. Example for D1: "Esta dimensión invita a detenerte y reconocer cómo te has sentido estas últimas dos semanas…" Below it, show the subtitle question ("¿Cómo me he sentido estas últimas dos semanas?") and the instruction. Button: **Comenzar**.
2. **Question screen: one question at a time.**
   - Header with the dimension number and name, plus a progress bar ("Pregunta 2 de 6").
   - The question in DM Serif Display.
   - A **0–10 slider** with integer steps and the 0…10 tick labels under it. D1, D2 and D4 use the 😟/😄 end faces. D3 uses the **Nunca / Siempre** end labels, as in the PDF.
   - A large live readout of the selected value. The NeuroMind face can change expression with the value, matching the PDF instruction "avanza con la cara de neuromind".
   - **Enviar** button. It is disabled until the slider has been touched, so nobody submits the default value by accident. Pressing it **saves the answer immediately** and moves to the next question. "Atrás" lets the person revise an answer.
3. **Tus respuestas.** A read-only recap of the answers the person just submitted for this dimension (each question with its 0–10 value). No scores or averages are shown.
4. **Plan screen.** Show the intervention tied to the dimension, then return to the hub.

### Content per dimension (from the PDF)

| Dim | Questions | Scale labels | Plan screen in v1 |
|---|---|---|---|
| 1 Bienestar personal | 6 ✅ | 😟 / 😄 | "Plan de recuperación de energía": PDF text as-is, marked placeholder |
| 2 Equilibrio emocional | 6 ✅ | 😟 / 😄 | Placeholder ("Plan de equilibrio emocional · Contenido en preparación") |
| 3 Relación con el estrés | 6 ✅ | Nunca / Siempre | "Plan para gestionar el estrés": title from the PDF, body placeholder |
| 4 Conexión y apoyo | 6 ✅ | 😟 / 😄 | "Plan de reconexión social": PDF text as-is (3 options + "Opción NeuroMind: psicólogos"), marked placeholder |
| 5 Recuperación y descanso | – | – | Intro card + **"Próximamente"**. The "Pausas NeuroMind / ¡Dame un respiro!" text is kept in the data file for later. |
| 6 Propósito y motivación | – | – | Intro card + **"Próximamente"** |

All plan bodies are placeholders that get replaced in the data file once final content arrives. The plan schema uses simple blocks (`heading`, `paragraph`, `bullets`, `quote`, `cta`, `references`), so new content can be added without touching the screens. D5 and D6 show their intro card and a "Próximamente" state on the wheel. They don't count toward check-in completion until they have questions.

The content will live in **one typed data file** (`src/content/dimensions.ts`), not in the screens. Adding D5 and D6 questions later, or editing wording, then becomes a data change and needs no code changes:

```ts
type Question = { id: string; text: string };   // id is stable, e.g. "d3_q5", never reused
type Dimension = {
  id: 1|2|3|4|5|6; slug: string; title: string; subtitle: string;
  intro: string; instruction?: string;
  scaleLabels: { min: string; max: string } | 'faces';
  illustration: Illustration;
  questions: Question[];
  plan?: PlanContent;
};
```

### Scoring
- Answers are stored and shown exactly as given (0–10). Nothing is reverse-scored, D3 included.
- Nothing is scored on screen. The person sees their own submitted answers. `scoring.ts` can compute averages from raw answers for future reporting, but they are never stored as the source of truth or shown in v1.

---

## 4. Saving answers

**Now:** data is stored only on the phone, with `expo-sqlite`.
**Later:** users log in and their data syncs to a server. Check-ins repeat about once a month, and **old check-ins are never overwritten**.

The v1 schema is built for both from day one, so adding the server later needs no data migration.

### Monthly check-ins
- A **check-in** is one month's set of answers. Each one is a separate row with its own ID, and every answer belongs to exactly one check-in.
- **Within an open check-in**, going "Atrás" and changing an answer updates that answer.
- **Once a check-in is completed, it is locked (read-only).** Nothing writes to it again.
- **Starting a new one:** an unfinished check-in carries over and stays open until it's completed. Once the last check-in is **completed** and it started ≥ `CHECKIN_INTERVAL_DAYS` ago (a constant, default 30), the hub shows "Es momento de tu check-in mensual" and creates a **new** check-in. Older ones stay untouched.
- The hub always shows the **current** check-in's progress. Past check-ins feed a future "Mi historial" screen (past answers by month), which fits the Seguimiento → Reevaluación → Evolución cycle.

### Schema (SQLite now, the same shape on the server later)

```sql
users(        -- local-only "device user" for now; becomes the real account at login
  id TEXT PK,                -- UUID generated on the device
  server_user_id TEXT NULL,  -- filled when the person logs in
  created_at)

checkins(
  id TEXT PK,                -- UUID created on the device, so the server accepts it as-is
  user_id TEXT FK,
  period TEXT,               -- e.g. '2026-11', for display and grouping
  status TEXT CHECK(status IN ('in_progress','completed','abandoned')),
  started_at, completed_at NULL,
  content_version TEXT,      -- which version of the questions was asked
  updated_at, synced_at NULL)

answers(
  id TEXT PK, checkin_id FK, dimension_id INT, question_id TEXT,
  value INT CHECK(value BETWEEN 0 AND 10),
  answered_at, updated_at, synced_at NULL,
  UNIQUE(checkin_id, question_id))   -- one answer per question *per check-in*

dimension_progress(checkin_id, dimension_id, completed_at NULL,
  PRIMARY KEY(checkin_id, dimension_id))
```

Why it's built this way:
- **IDs are UUIDs created on the device**, not auto-increment numbers, so records can be uploaded later without ID collisions.
- **`synced_at`** marks what still needs uploading (`synced_at IS NULL OR updated_at > synced_at`).
- **`content_version`** plus stable question IDs keep old months comparable, even after question wording changes or D5/D6 questions are added.
- When someone logs in for the first time, their local device-user is linked to the server account and existing check-ins upload. Nothing is lost.

### Code layout
- The screens only call `src/data/repository.ts`: `getOrCreateCurrentCheckin()`, `saveAnswer()`, `getProgress()`, `completeDimension()`, `completeCheckin()`, `listCheckins()`.
- Behind it there's a `LocalStore` (SQLite) now. Later a `SyncService` is added that pushes unsynced rows to the API and pulls on login. Screens don't change.
- The backend choice (Supabase, Firebase or a custom API) can wait. The schema maps cleanly onto Postgres (Supabase) if that's the direction.

### Privacy
This is mental-health data. In v1 it stays on the device. Before server sync ships, it needs: Spanish consent text at login, encryption in transit, row-level access so each user sees only their own data, and a review of the applicable data-protection law with whoever runs the municipal program.

---

## 5. Project structure (Expo Router)

```
src/
  app/
    _layout.tsx                 # fonts, theme, Stack
    index.tsx                   # redirect: onboarding on first launch, otherwise the hub
    bienvenida.tsx              # Pantalla 1
    beneficios.tsx              # Pantalla 2
    como-usar.tsx               # Pantalla 3
    mapa.tsx                    # Pantalla 4 hub (wheel)
    dimension/[id]/
      index.tsx                 # intro card
      pregunta/[q].tsx          # one question
      respuestas.tsx            # "Tus respuestas" recap
      plan.tsx                  # plan / recommendation
  components/
    app-text.tsx  button.tsx  card.tsx  screen.tsx      # step 0
    wellbeing-wheel.tsx  score-slider.tsx  dimension-card.tsx  progress-header.tsx
  content/dimensions.ts         # all Spanish copy + questions
  data/db.ts  repository.ts  scoring.ts
  constants/theme.ts  illustrations.ts
assets/illustrations/           # logo, center face, 6 dimension faces, cycle graphic
                                # v1: cropped from the PDF; swapped for hi-res files later (same filenames)
```

**Libraries to add with `npx expo install`:** `expo-sqlite`, `react-native-svg`, `@expo-google-fonts/dm-sans`, `@expo-google-fonts/dm-serif-display`, `expo-haptics` (a light tick on each slider step). For the slider, use the `Slider` from the already installed `@expo/ui`, which renders as native SwiftUI or Compose, styled with brand colors. If it can't be styled enough, fall back to a custom Reanimated and Gesture Handler slider.

---

## 6. Build phases

| Phase | Work | Done when |
|---|---|---|
| **0. Setup** | Remove the template demo files (`scripts/setup-step0.sh`), add libraries, theme tokens, fonts, base components. Crop the logo, faces and cycle graphic from the PDF into `assets/illustrations/` | App boots with brand fonts, colors and the logo |
| **1. Onboarding** | Screens 1–3 with the confirmed copy; "Saltar" on later visits | Can navigate 1 → 2 → 3 → 4 |
| **2. Hub** | Screen 4: "Ahora inicia tu recorrido", `WellbeingWheel` + dimension list, ✓ / Próximamente states | Wheel renders on small and large phones; tapping opens a dimension |
| **3. Question engine** | Intro → one question at a time with a 0–10 slider → Enviar → next; Atrás; progress bar | D1 fully playable |
| **4. Persistence** | SQLite schema, repository, save on Enviar, resume mid-dimension, monthly check-in creation, completed check-ins locked | Kill the app mid-question and it resumes there; set the clock forward 30 days and a new check-in starts while the old one is still intact |
| **5. Content** | D1–D4 questions, "Tus respuestas" recap screens, plan screens (PDF text or placeholders), D5/D6 "Próximamente" | All available content playable |
| **6. Polish** | Haptics, transitions, accessibility (slider `accessibilityValue`, Spanish labels, 44 px tap targets, dynamic type) | Tested on iOS and Android |
| **7. Ship** | EAS build → TestFlight / internal Play track | Testers can install |
| **Later** | Login + `SyncService` + backend, "Mi historial" screen of past answers, monthly reminders (`expo-notifications`), hi-res asset swap, final plan content, D5/D6 questions | – |

---

## 7. Decisions

**Nov 10:**
- Screen split as in section 2.
- D5/D6 show "Próximamente".
- Plan screens use PDF text where it exists and placeholders elsewhere.
- No reverse scoring.
- Local storage now, login + server later. Monthly check-ins never overwrite old ones.
- PDF images for now; hi-res versions will replace them under the same file names.
- **No scores or averages shown to the user.** The dimension "summary" screen becomes **"Tus respuestas"**: a read-only list of the answers just submitted (question + value). Averages may still be computed internally for future reporting, but they are not displayed.
- **Dimensions can be done in any order** from the wheel.
- Pantalla 1 drops the PDF line "Descarga NeuroMind y comienza hoy…" (it reads oddly inside the app).
- **An unfinished check-in carries over.** It stays open until completed. The 30-day clock only creates a new check-in after the previous one is completed. The `abandoned` status is not used in v1.

**Step 0 status:** brand tokens (`src/constants/theme.ts`), fonts, base components (`AppText`, `Button`, `Card`, `Screen`), illustrations cropped from the PDF (`assets/illustrations/`), and app.json splash/light mode. `scripts/setup-step0.sh` removes the template demo files and installs the libraries.

**Step 1 status:** Pantallas 1–3 (`bienvenida`, `beneficios`, `como-usar`) with the PDF copy in `src/content/onboarding.ts`. `index` sends first-time users to Pantalla 1 and returning users to the Mapa. "Saltar" appears only after the introduction has been seen once; the flag is stored with `expo-sqlite/kv-store`. `mapa.tsx` is a placeholder (the wheel image plus a "¿Cómo funciona NeuroMind?" link back to the intro) until step 2.

**Step 2 status:** Mapa hub with the interactive `WellbeingWheel` (react-native-svg ring, center face, 6 tappable dimensions with status badges) and the `DimensionRow` list. Dimension content + all 24 PDF questions live in `src/content/dimensions.ts`. `dimension/[id]` shows the intro card; "Comenzar" is disabled until step 3; D5/D6 show "Próximamente". Status comes from `useDimensionProgress()`, which returns "Pendiente" for everything until step 4 connects it to saved answers. Type check and an iOS export bundle both pass.

**Step 3 status:** Question flow working end to end, with answers kept in memory (`src/data/answers-store.ts`) until step 4 adds device storage behind the same functions.
- `dimension/[id]` intro button reads "Comenzar", "Continuar" (resumes at the first unanswered question) or "Ver mis respuestas".
- `dimension/[id]/pregunta/[q]` shows one question at a time: progress bar, `ScoreSlider` (NeuroMind face as the thumb, 0–10 under each stop, snap + haptic tick per number, tap-to-jump, screen-reader adjustable), and "Enviar", disabled until answered. "Atrás" returns to the previous question with its answer filled in.
- `dimension/[id]/respuestas` is the "Tus respuestas" recap. "Atrás" lets the person change an answer; "Finalizar" marks the dimension completed (read-only) and returns to the Mapa.
- The Mapa badges and pills update live (Pendiente → En progreso n/6 → Completado).
- Slider built custom (Gesture Handler v3 `usePanGesture` + Reanimated 4) because `@expo/ui` Slider has no color or thumb customization.

**Step 4 status:** Answers are saved on the device with expo-sqlite.
- `src/data/db.ts` holds the schema and versioned migrations (PRAGMA user_version). IDs are UUIDs generated by SQLite, so no extra package is needed.
- `src/data/checkins.ts` holds the monthly rules:
  - Each check-in is its own row and is never overwritten.
  - An unfinished check-in carries over.
  - A new check-in starts once the previous one is completed and ≥30 days have passed since it started. This is checked at launch and whenever the app returns to the foreground.
  - Finished dimensions and completed check-ins are read-only.
- `answers-store.ts` keeps the same API, so no screen changed.
- The Mapa shows "Check-in de <mes> <año>", plus a "¡Completaste tu check-in!" card with the next available date. That card's copy is placeholder.
- Testing tools at the bottom of the Mapa, visible in development builds only (`SHOW_DEV_TOOLS` in `src/components/dev-tools.tsx`):
  - "Borrar respuestas" (with confirmation)
  - "Simular mes siguiente" (moves check-ins 31 days back)
  - "Reiniciar introducción"
- The SQL was verified against SQLite 3.53: UUID v4, upsert, 0–10 constraint, first completion kept, cascade delete.

**Step 5 status:** Plan screens (`dimension/[id]/plan`), with content in `src/content/plans.ts` as simple blocks (heading, paragraph, quote, bullets, callout, numbered option + "Opción NeuroMind", references). All are marked "Contenido en preparación".
- D1 shows the PDF plan card, plus the "Pausas NeuroMind / ¡Dame un respiro!" text and its references.
- D2 is a placeholder.
- D3 shows the PDF card, then a placeholder.
- D4 shows the full "Plan de reconexión social" with 3 options.

Flow: "Finalizar" on "Tus respuestas" now marks the dimension complete and opens its plan. "Volver al mapa" returns to the hub. A completed dimension's "Tus respuestas" offers "Ver mi plan".

**Step 6 status (polish):**
- **Press feedback.** `usePressScale` shrinks a tapped element to 97% (wheel nodes 94%, list rows 98%) on press-in, using a 120ms Reanimated CSS transition on the UI thread. It's off when Reduce Motion is on. Applied to `Button`, `DimensionRow` and the wheel nodes.
- **Haptics.** The slider already ticks at each number. A success haptic now fires on "Finalizar"; nothing else vibrates.
- **Large text.** Text that sits in fixed geometry has a size cap: wheel labels ×1.15 with shrink-to-fit, number badges ×1.2, slider ticks ×1.2, button labels ×1.4. The question text is allowed up to ×1.6 (the question screen doesn't scroll, so dragging never fights a scroll). The answer readout is smaller on short phones.
- **Screen readers.** A disabled "Enviar" explains why.
- iOS and Android bundles both build.
- **Not done:** the app icon is still Expo's. It waits for the hi-res NeuroMind artwork, because the PDF face is too small to scale up to 1024 px cleanly.
