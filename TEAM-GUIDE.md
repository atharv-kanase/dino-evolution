# DINO: EVOLUTION — Team guide

No programming experience is needed to start. Read sections 1–4, launch the game, then follow the code walkthrough below. Use the pitch and questions for demo preparation. Read this together, then change one small thing yourselves: understanding a feature is more useful than memorising an answer.

## 1. What is our game?

A single-player 2D endless runner. The dinosaur runs automatically. Jump over ground hazards, slide under flying hazards, collect DNA and survive longer as the pace increases. Six worlds introduce different scenery and hazards.

**Bounce Back means failure helps your next attempt:** a marker remembers your last crash. Near it, a Comeback Charge lets you launch through hazards with C. Pass your old limit to earn 5 DNA. A new run starts without the old temporary powers.

During a run, levelling up makes an evolution available. Press E or tap the large Evolution Ready banner when convenient. Choose one short card; only one power can be active. Powers expire after 16–22 seconds of active play. Available powers are Electric Dash (X, six-second recharge), Phoenix Heart (one revival), Armoured Skin (one shield hit), Double Jump, Magnetic DNA and Spring Legs. Armour cannot rescue a fall. Double Jump does not include a glide, and dash uses X rather than Shift/Right Arrow.

Skins are cosmetic and do not change collision difficulty. A skin changes appearance; an evolution is a temporary gameplay power.

| Input | Action |
| --- | --- |
| Space / Up Arrow | Jump; hold for height, release for a short hop |
| Down Arrow | Slide beneath suitable flying hazards |
| E / Evolution Ready button | Open power cards when ready |
| 1 / 2 / 3 | Choose a displayed card |
| X / Dash button | Use Electric Dash when active and recharged |
| C / Comeback button | Activate a charge near the previous crash point |
| Escape | Pause or resume |

| Power | Duration | Effect |
| --- | --- | --- |
| Electric Dash | 16 seconds | X grants a 0.65-second protected burst; six-second recharge |
| Phoenix Heart | 22 seconds | One revival instead of a fatal hit; consumed on use |
| Armoured Skin | 20 seconds | Absorbs one obstacle hit; cannot rescue a fall |
| Double Jump | 18 seconds | One extra jump in midair |
| Magnetic DNA | 16 seconds | Attracts DNA within 180 game pixels |
| Spring Legs | 18 seconds | Jump strength increases by 15% |

The card choice briefly pauses play when you open it. The game waits for you to press E instead of automatically opening cards during a run.

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

**Technical explanation in one sentence:** a JavaScript browser game using Phaser 3, Arcade Physics, HTML/CSS menus, Vite for development/building, and browser storage for progress.

This project is not built in Godot, Unity or Python. There is no multiplayer server, login system or payment service.

| Technology | Job |
| --- | --- |
| JavaScript | Rules: jumping, spawning, scoring, mutations, saving |
| Phaser 3 | Game engine: drawing, animation, input, scenes and particles |
| Arcade Physics | Gravity, rectangular collision bodies and overlaps |
| HTML + CSS | Page, menus, store, buttons and responsive layout |
| Vite | Runs the development server and packages a release |
| Node.js + npm | Development tools and dependency installation; not a paid game server |

### Basic vocabulary

- **Source code:** readable instructions inside the project.
- **Engine:** reusable game tools; Phaser handles rendering, input and physics.
- **Sprite:** a picture used as a character or object.
- **Animation:** switching pictures quickly to create movement.
- **Scene:** a container for game objects and their rules.
- **Hitbox:** a simple shape used to detect contact.
- **Collision:** contact that can block movement, such as landing on ground.
- **Overlap:** contact that triggers a rule, such as collecting DNA or taking damage.
- **Game loop:** repeated updates that read input, move objects and apply rules.
- **State:** the current mode: menu, running, paused, choosing a power, dying or game over.
- **Dependency:** a library/tool listed in `package.json`.
- **Build:** the packaged release generated inside `dist`.
- **Frontend:** code and interface running in the player's browser.
- **Backend:** code on a remote server; this game needs no custom backend.

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

### Follow a session through the code

1. `index.html` supplies the page and loads `src/main.js`.
2. `main.js` restores the browser save, creates Phaser, sets gravity and starts `GameScene`.
3. `GameScene.create()` creates the player, world, object groups, inputs and menus.
4. Start calls `startRun()`, resetting the temporary run and starting physics.
5. `update()` repeats while playing. The dinosaur stays near the left side; hazards move left to create the feeling of running forwards.
6. Space asks `Dino.jump()` to apply upward velocity. Gravity pulls the dinosaur down. Negative vertical velocity means up; positive means down.
7. Touching DNA calls `collect()`: remove the pickup, add DNA and XP, then save progress.
8. Crossing an XP threshold raises the level and makes an evolution available. E opens cards; `chooseUpgrade()` activates a timed power and grows the dinosaur.
9. An obstacle overlap calls `hit()`. A protective power may absorb/reverse the outcome; otherwise the run ends. `endRun()` records the result and checks the one-time bounty.
10. Respawn resets temporary run powers. Wallet, owned skins and records remain saved.

### Understand one simple rule

The bounty code effectively does this:

```js
if (save.firstRunBountyClaimed) return 0;
save.firstRunBountyClaimed = true;
save.wallet += 300;
```

Read it as: “If already claimed, give nothing. Otherwise remember that it is claimed and add 300 to the wallet.” Saving the flag prevents the normal reward repeating after reopening. Local saves are not an anti-cheat system.

### Understand difficulty

`speedAtDistance()` smoothly increases speed from 300 toward 650 game pixels per second. It approaches the limit gradually rather than jumping at map boundaries. `hazardInterval()` reduces time between hazards as speed rises, with some randomness. A cosmetic skin does not improve jumping.

### Try a real change

Find a skin price in `src/config.js`, change it, save, and inspect the store. Predict what will happen first. Explain what changed and why. Keep the skin IDs stable: existing saves refer to them. Then restore the intended price before the demo.

## 6. Prepare as a four-person team

Divide learning, not just speaking. One person studies controls/collisions; one studies visuals/menus; one tests balance, saving and edge cases; one coordinates the demo and documentation. Everyone should be able to explain the game loop and demonstrate one real contribution. Record actual changes and tests in your own notes.

Before the event, ask the organisers what AI use, outside help and work prepared before the jam are allowed. Do not assume a prepared prototype is eligible. Describe assistance accurately if asked or required. A name-free ZIP is for sharing convenience, not proof that no outside help was involved.

## 7. A short pitch to adapt honestly

“DINO: EVOLUTION is a browser runner about bouncing back from failure. We collect DNA, choose temporary powers when Evolution Ready appears, and try to survive longer. A Comeback Charge helps us overcome our previous failure point. DNA also buys cosmetic skins while the route becomes faster and changes worlds. We used JavaScript and Phaser, with AI and outside development help for the prototype. Our team's contributions were [replace with work you actually did]. We will demonstrate a power and the comeback action.”

Do not claim the team wrote everything independently or add contributions you did not make. It is fine to say you are learning and show what you now understand.

## 8. Likely evaluator questions

**How does it match Bounce Back?** A crash earns a charge near the old failure point on the next attempt. The player returns with a different strategy, rather than only resetting a score.

**What is innovative compared with the offline dinosaur game?** Temporary abilities, a previous-failure marker and comeback action, plus multiple themed worlds and cosmetic progression. Endless running itself is an established genre.

**Why 2D and Phaser?** A small browser build is easy to share and learn. Phaser provides input, sprites and physics so effort can go into the gameplay loop.

**How do you prevent unfair obstacles and coins?** Grounded hitboxes, bounded speed/spacing, gap sizing, and pickup clearance checks. Playtesting is still necessary; these checks do not prove every random sequence is perfect.

**What happens after a crash?** The run ends and its DNA is kept. Respawn starts a fresh attempt without the previous powers. A comeback opportunity appears near the recorded crash point. Powers are chosen during a run with E when Evolution Ready appears.

**Can I keep buying a skin or claiming the bounty?** Purchases deduct currency once and unlock ownership. The bounty has a saved claimed flag, so completing another run does not grant it again in that browser save.

**Where is the database?** Browser storage only. There is no shared account database or cross-device sync.

**Did you use AI?** “Yes. AI and outside development help were used for the prototype. We reviewed and tested [specific parts you actually reviewed/tested], and changed [actual changes].” Explain the division honestly and follow the event's disclosure rules.

**Can you explain this function?** Open the relevant file and explain inputs, condition and result. If you do not know, say so: “I have not understood that part fully yet. Here is the part I can explain.” Do not memorise a false technical answer.

**Is everything original/licensed?** Some sprites and effects are drawn in code; backgrounds have provenance notes. Do not claim unrestricted rights to reference images or familiar character designs. Check permission and replace unsuitable assets before wider publication.

**What is next?** Better balance and accessibility, additional original art, and possibly laser/camouflage abilities or multiplayer. These are future ideas, not current features.

## 9. Demo and release checklist

Play once, crash, show the 300 DNA bounty if this is a fresh browser save, and buy/equip a skin. Respawn, collect DNA and survive until Evolution Ready appears. Press E and explain the three offered cards; choose one and demonstrate it. Point out the timer, previous-failure marker and C charge. Refresh once to show that progress persists.

Avoid a long speech while running: pause with Escape when explaining. Use a separate browser profile for a fresh demonstration rather than clearing somebody's real progress.

Before sending a release:

```sh
npm test
npm run build
npm run preview
```

For an HTML5 upload, ZIP the **contents of `dist`**, with `index.html` at the ZIP root. The source ZIP is for development; the built ZIP is for playing on a web host. Check the host's current upload instructions and the jam's submission rules before publishing.

## 10. Understand the files and updates

- `package.json` lists tools and commands. `package-lock.json` records exact dependency versions; `npm ci` uses it for a reproducible install.
- `node_modules` is generated by npm. It is large and can be recreated, so it is not included in the source ZIP.
- `public` holds static assets. `src` holds editable game code.
- `dist` is generated output: edit `src` and rebuild instead of editing `dist`.
- `.gitignore` tells Git which generated/local files to leave out of version history.
- Git tracks code versions; GitHub stores a repository online. Neither automatically shares a player's saved DNA.

To receive an update, extract the new ZIP into a new folder, stop the old server and start the new one. Use the same browser and local address to access the existing browser save. Check the printed port. A hosted link can receive updates without new ZIPs; a localhost copy changes when its files are updated.

No paid API key is needed to run this project. Hosting limits and optional paid development tools are separate from the game code.

## 11. One-hour learning session for four people

1. **10 minutes:** all four play. Explain DNA versus XP, a skin versus a power, and the C comeback mechanic to each other.
2. **15 minutes:** each person studies one small part: movement, menus/store, save/bounty, or difficulty/worlds.
3. **15 minutes:** make one reversible change together. Predict, run, observe, then restore the intended setting.
4. **10 minutes:** test jumping, sliding, a purchase, refresh persistence and the one-time reward. Record actual results.
5. **10 minutes:** rehearse the pitch and ask each other questions. Explain what you understand; identify what you still need to learn.

## 12. Quick revision card

- **Game:** single-player 2D runner with temporary mutations and cosmetic skins.
- **Theme:** a crash records a target; the next attempt earns a comeback opportunity near it.
- **Language:** JavaScript. **Engine:** Phaser 3. **Physics:** Arcade Physics.
- **Interface:** HTML/CSS. **Development/build:** Vite, Node.js and npm.
- **Save:** localStorage plus IndexedDB backup in the same browser/site.
- **Launch:** extract ZIP, install Node.js, double-click `START-GAME.cmd`.
- **Manual launch:** `npm ci`, then `npm run dev`; keep the terminal open.
- **Power choice:** E when ready during a run. Respawn restarts without a card draft.
- **AI:** assisted development; no live AI model runs during gameplay.
- **Contribution:** describe design, changes, testing and learning you actually did.
