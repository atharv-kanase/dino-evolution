# DINO: EVOLUTION — Team guide

Read this together, then play and change one small thing yourselves. Understanding a feature is more useful than memorising a technical answer.

## 1. What is our game?

A single-player 2D endless runner. The dinosaur runs automatically. Jump over ground hazards, slide under flying hazards, collect DNA and survive longer as the pace increases. Six worlds introduce different scenery and hazards.

**Bounce Back means failure changes your next attempt:** after a crash, Respawn opens three adaptation cards. Choose one and immediately restart with that temporary ability. A marker also remembers your last failure: near it, a Comeback Charge lets you launch through hazards with C. Pass your old limit to earn 5 DNA.

Current adaptations:

| Adaptation | What it does | Limit |
| --- | --- | --- |
| Pterodactyl Wings | Second jump in mid-air; hold Space while falling to glide | 18 seconds |
| Bone Armour | Absorbs one obstacle hit and breaks that obstacle into particles | One hit or 20 seconds; cannot rescue a fall |
| Cyber Legs | While airborne, Shift / Right Arrow / X activates a 0.3-second phase through obstacles | 16 seconds; six-second recharge |

Only one adaptation is active. Timers count active play time, not paused time. You can also respawn without a power. Levelling up grows the dinosaur without opening cards during a run. Skins are cosmetic: buying one does not make collisions easier.

DNA is the currency for skins; XP increases your level during a run. Your first completed run awards a one-time 300 DNA testing bounty. This is not 300 DNA after every death.

World route: Ancient Desert at 0m, Lost Jungle at 500m, Volcanic Wasteland at 1,000m, Frozen Tundra at 1,500m, Cyber City at 2,500m and Prehistoric Ruins at 4,000m. Each new run starts in the desert.

## 2. Open the ZIP and run locally

1. Install a current supported Node.js LTS release from the official Node.js website. Node includes npm, which installs the game's dependencies.
2. Right-click the ZIP and choose **Extract All**. Open the extracted `dino-evolution` folder. Do not run it inside the ZIP.
3. On Windows, double-click **START-GAME.cmd**. The first launch installs dependencies and needs internet. Then the browser opens the game.
4. Keep the terminal window open. Closing it stops the local server. Stop it deliberately with Ctrl+C.
5. Next time, open the same folder and double-click the same file again.

Manual method: open a terminal in the folder containing `package.json`, then run:

```sh
npm ci
npm run dev
```

Open the **Local** address printed by Vite. Use the printed port; it may change if another server is already using it. `localhost` means this computer, so sending somebody your localhost address will not share the game with them. Send the ZIP instead.

Troubleshooting:

- **node/npm not recognised:** install Node.js, close the terminal, and reopen it.
- **package.json not found:** move into the extracted game folder first.
- **Connection refused:** the server must still be running. Use the address it prints.
- **Blank page after double-clicking index.html:** use the server; opening source files directly is unsupported.
- **Old version:** stop the old server, extract the new ZIP into a separate folder, start that version and refresh the browser.

## 3. What saves, and where?

DNA wallet, owned/equipped skins, best distance, bounty status and an interrupted run save in the browser. The game uses localStorage with a backup, plus IndexedDB as another browser storage backup. Continue resumes an interrupted run safely; it does not recreate every old obstacle exactly.

There is no account or cloud database. Use the same browser profile and same URL to keep the same save. Different devices, private browsing, clearing site data, or changing the hostname/port can give you a different save. The hosted game and localhost have separate saves. ZIP updates do not contain somebody else's browser progress.

## 4. Technology in plain language

| Technology | Job |
| --- | --- |
| JavaScript | Rules: jumping, spawning, scoring, mutations, saving |
| Phaser 3 | Game engine: drawing, animation, input, scenes and particles |
| Arcade Physics | Gravity, rectangular collision bodies and overlaps |
| HTML + CSS | Page, menus, store, buttons and responsive layout |
| Vite | Runs the development server and packages a release |
| Node.js + npm | Development tools and dependency installation; not a paid game server |

The player sees a dinosaur sprite; physics uses a simpler rectangle around it. Sliding changes that rectangle. Ground hazards touch the floor so crouching does not avoid everything. Pickups are checked against hazard boxes and gaps before placement, and unsafe ones are removed as hazards appear. This is a spacing check, not an AI path planner.

The game updates repeatedly, using elapsed seconds to move objects consistently. Distance gradually increases scrolling speed and hazard density, with limits so the basic jump remains usable. Worlds are selected by distance thresholds. Background scenery is decorative; actual hazards have physics bodies.

The game runs locally in a browser. It does not call an AI service while you play. AI assisted development is separate from AI inside the game.

## 5. Where to look in the code

| File/folder | Responsibility |
| --- | --- |
| `src/scenes/GameScene.js` | Main game loop, collisions, run state, abilities, restart |
| `src/entities/Dino.js` | Jump, slide, sprite animation, growth and collision size |
| `src/systems/progression.js` | Adaptation cards and XP thresholds |
| `src/systems/powers.js` | Temporary ability durations |
| `src/systems/difficulty.js` | Speed and hazard spacing |
| `src/systems/WorldSystem.js` | Six worlds, gaps and world hazards |
| `src/systems/pickupPlacement.js` | DNA clearance from obstacles |
| `src/systems/save.js` | Browser persistence and old-save migration |
| `src/systems/bounty.js` | One-time first-run reward |
| `src/config.js` | Shared constants, skin names, prices and store order |
| `src/ui.js` | Menu, cards, results, help and skin store |
| `src/skinArt.js`, `src/art.js`, `src/effects.js` | Code-drawn art, animations and effects |
| `public/maps/ASSETS.md` | Background provenance; check rights before public release |
| `tests/*.test.js` | Automated checks of important rules |

Try one genuine change: find a skin price in `src/config.js`, change it, save, and inspect the store. Explain what changed and why. Keep the skin IDs stable: existing saves refer to them. Then restore the intended price before the demo.

## 6. Prepare as a four-person team

Divide learning, not just speaking. One person studies controls/collisions; one studies visuals/menus; one tests balance, saving and edge cases; one coordinates the demo and documentation. Everyone should be able to explain the game loop and demonstrate one real contribution. Record actual changes and tests in your own notes.

Before the event, ask the organisers what AI use, outside help and work prepared before the jam are allowed. Do not assume a prepared prototype is eligible. Describe assistance accurately if asked or required. A name-free ZIP is for sharing convenience, not proof that no outside help was involved.

## 7. A short pitch to adapt honestly

“DINO: EVOLUTION is a browser runner about bouncing back from failure. A crash gives us a choice of one temporary adaptation for the next attempt: wings, armour or cyber legs. A Comeback Charge helps us overcome our previous failure point. We collect DNA for cosmetic skins while the route becomes faster and changes worlds. We used JavaScript and Phaser, with AI and outside development help for the prototype. Our team's contributions were [replace with work you actually did]. We will demonstrate a crash, an adaptation and the next attempt.”

Do not claim the team wrote everything independently or add contributions you did not make. It is fine to say you are learning and show what you now understand.

## 8. Likely evaluator questions

**How does it match Bounce Back?** A crash leads to a new adaptation and a charge near the old failure point. The player returns with a different strategy, rather than only resetting a score.

**What is innovative compared with the offline dinosaur game?** The crash-to-adaptation loop, temporary abilities, previous-failure marker and comeback action, plus multiple themed worlds and cosmetic progression. Endless running itself is an established genre.

**Why 2D and Phaser?** A small browser build is easy to share and learn. Phaser provides input, sprites and physics so effort can go into the gameplay loop.

**How do you prevent unfair obstacles and coins?** Grounded hitboxes, bounded speed/spacing, gap sizing, and pickup clearance checks. Playtesting is still necessary; these checks do not prove every random sequence is perfect.

**What happens after a crash?** The run ends, its DNA is kept, and Respawn opens the adaptation choice. Picking a card starts a fresh run with one timed power. The next run also gets a comeback opportunity near the recorded crash point.

**Can I keep buying a skin or claiming the bounty?** Purchases deduct currency once and unlock ownership. The bounty has a saved claimed flag, so completing another run does not grant it again in that browser save.

**Where is the database?** Browser storage only. There is no shared account database or cross-device sync.

**Did you use AI?** “Yes. AI and outside development help were used for the prototype. We reviewed and tested [specific parts you actually reviewed/tested], and changed [actual changes].” Explain the division honestly and follow the event's disclosure rules.

**Can you explain this function?** Open the relevant file and explain inputs, condition and result. If you do not know, say so: “I have not understood that part fully yet. Here is the part I can explain.” Do not memorise a false technical answer.

**Is everything original/licensed?** Some sprites and effects are drawn in code; backgrounds have provenance notes. Do not claim unrestricted rights to reference images or familiar character designs. Check permission and replace unsuitable assets before wider publication.

**What is next?** Better balance and accessibility, additional original art, and possibly laser/camouflage abilities or multiplayer. These are future ideas, not current features.

## 9. Demo and release checklist

Play once, crash, show the 300 DNA bounty if this is a fresh browser save, and buy/equip a skin. Play again, crash, press Respawn and choose Wings. Demonstrate a second jump and holding Space while falling. On another attempt show Armour breaking one obstacle, or jump then Shift to demonstrate Cyber Legs. Point out the previous-failure marker and C charge. Refresh once to show that progress persists.

Avoid a long speech while running: pause with Escape when explaining. Use a separate browser profile for a fresh demonstration rather than clearing somebody's real progress.

Before sending a release:

```sh
npm test
npm run build
npm run preview
```

For an HTML5 upload, ZIP the **contents of `dist`**, with `index.html` at the ZIP root. The source ZIP is for development; the built ZIP is for playing on a web host. Check the host's current upload instructions and the jam's submission rules before publishing.
