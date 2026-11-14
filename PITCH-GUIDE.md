# DINO: EVOLUTION — pitch and evaluator guide

## A 45–60 second pitch

“DINO: EVOLUTION is a single-player 2D browser game inspired by the classic dinosaur runner. Our theme is Bounce Back: after a crash, the next attempt remembers your previous failure point and gives you a Comeback Charge to help overcome it.

“During a run, we collect DNA and earn XP. When Evolution Ready appears, we can choose one temporary power, such as Double Jump, Armour or Electric Dash. Powers expire, so timing matters. DNA also buys cosmetic skins, and the route becomes faster and changes between six worlds.

“The game uses JavaScript and Phaser 3, with browser storage for progress. AI and outside development help supported the prototype. Our team's contributions were [insert the design, code changes, testing or artwork you actually completed]. We will show the power selection, comeback mechanic and saved progress.”

Practise naturally. Do not read every word or invent team contributions. Adjust assistance disclosures to the event's requirements and answer questions honestly.

## A two-minute demonstration

1. **Main menu:** explain Start, Continue and Skin Store. Mention that skins change appearance, not abilities.
2. **Basic run:** jump over a ground hazard and slide under a flying one. Explain DNA as currency and XP as run progression.
3. **Evolution:** when the banner appears, press E. Explain the three offered cards, choose one, then point out its timer.
4. **Bounce Back:** after a crash, respawn. Point out the previous-failure marker. When the Comeback button becomes ready near it, press C. Passing the old limit gives 5 DNA.
5. **Persistence:** show the wallet or owned skin, refresh, and show that it remains saved in the same browser.

Pause with Escape while talking. Timing depends on the run: if the demo is short, explain a feature without claiming to have demonstrated it. On a fresh save, the first completed run also awards a one-time 300 DNA testing bounty.

## What each of four teammates should explain

| Teammate | Learn and demonstrate |
| --- | --- |
| Gameplay | Jump, slide, collision boxes and temporary powers |
| Visuals/interface | Menus, skin previews, buttons and world appearance |
| Testing/progression | DNA versus XP, difficulty, saving and bounty checks |
| Presentation | Theme, demo flow, stack and the team's actual contributions |

These are suggested learning roles, not claims about work already completed. Each person should read one related file and make or test one change they can explain.

## Likely questions and plain answers

**What does Bounce Back mean here?**
A crash is remembered. On the next run, a charge becomes usable near the previous failure point, helping the player beat it. Respawning alone is not our only connection to the theme.

**What is your tech stack?**
JavaScript is the programming language. Phaser 3 is the game engine. Arcade Physics handles gravity and collisions. HTML/CSS build the menus. Vite runs the development server and builds the release. Node.js/npm provide development tooling. Progress uses browser storage.

**Did you use Godot or Unity?**
No. This version is a Phaser browser game.

**How does the running work?**
The dinosaur stays near the left side. Hazards and scenery move left. Jump applies upward velocity; gravity pulls the dinosaur back down. The update loop repeats these calculations over time.

**How do collisions work?**
The sprite has a rectangular physics body. Ground collisions support it; hazard overlaps trigger damage rules. Sliding changes the body shape. DNA overlaps trigger collection.

**How does difficulty increase?**
Distance smoothly increases scrolling speed and reduces hazard spawn intervals within limits. Distance thresholds also change worlds and hazard types.

**Why do DNA coins not sit inside obstacles?**
Placement checks keep clearance from obstacle rectangles and gaps. Unsafe pickups are removed when hazards appear. This still needs playtesting; it does not guarantee every random sequence is perfect.

**Where is the database?**
There is no online account database. localStorage and an IndexedDB backup keep progress on this browser/site. Another device or URL has a separate save.

**Why is the bounty not repeatable?**
A saved `firstRunBountyClaimed` flag prevents the normal 300 DNA reward being awarded again on the same save.

**Is there AI inside the game?**
No live AI service runs during play. AI assisted development of the prototype; gameplay uses ordinary programmed rules and randomness.

**Did you write all the code yourselves?**
Answer accurately: “We used AI and outside development help. We personally worked on [actual work], tested [actual checks], and can explain [parts understood].” Do not claim independent authorship of work done for you.

**Can you explain this function?**
Explain what it receives, what condition it checks and what it changes. If you do not know, say: “I have not fully understood that part yet; here is the part I can explain.”

**Are all assets original?**
Code-drawn sprites/effects and reference background images are used. Background provenance is in `public/maps/ASSETS.md`. Do not claim unrestricted rights to all images or familiar character designs.

**What would you improve next?**
Balance, accessibility, original assets and more polished abilities. Multiplayer or new powers are future ideas, not features to claim as built.

## Before presenting

- Check the organisers' rules for AI, outside assistance and work prepared before the jam.
- Play the current version and read `TEAM-GUIDE.md`; do not describe removed features such as post-crash card drafts or gliding.
- Write down the team's actual contributions and bugs found/fixed.
- Test the local launch before arriving. Keep the terminal running during the demo.
- Rehearse once with somebody asking questions rather than only reading the speech.
