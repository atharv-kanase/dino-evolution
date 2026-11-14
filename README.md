# DINO: EVOLUTION

A single-player browser runner about adapting and bouncing back. Built with
JavaScript, Phaser 3 and Vite, with six worlds and a cosmetic skin store.

**Project owner and maintainer: Atharv Kanase (@atharv-kanase).**

[Play the hosted game](https://dino-evolution-bounce-back.kanaseatharv18.chatgpt.site)

## Play on your computer

1. Install Node.js if it is not already installed.
2. Extract the whole ZIP to a folder.
3. On Windows, double-click START-GAME.cmd.
4. Keep its terminal open while playing. The browser opens automatically.

Or run these commands from the extracted folder:

```
npm ci
npm run dev
```

Open the localhost address printed in the terminal. The first dependency install
needs internet access. Afterwards, the game uses only bundled local assets.

## Team learning and pitching

Read TEAM-GUIDE.md for the game concept, technology, code walkthrough, an honest
pitch, evaluator questions, assistance disclosure and a four-person learning plan.

## Controls

Space/Up: jump. Down: slide. Escape: pause. After a crash, press Respawn
and choose Wings, Bone Armour or Cyber Legs for the next attempt.
Wings: double jump and hold Space to glide. Cyber Legs: jump then Shift/Right/X.
C activates a Comeback Charge near your previous crash point.

Your first completed run awards a one-time 300 DNA bounty, saved in this browser.
Open the Store from the reward to buy a skin. Existing testers receive it after
their next completed run if they have not claimed it yet.

The store has a Preview, Select/Buy & Select, Done flow. Progress saves in the
same browser and local URL. Continue resumes an interrupted run. Switching
browsers, devices or hostnames starts a separate save.

## Build / test

```
npm test
npm run build
npm run preview
```

The contents of dist form an HTML5 release. Serve over HTTP; directly opening
index.html with file:// is not supported. For itch.io, ZIP the contents of dist
with index.html at the root.

## Source and assets

Game logic is in src/scenes, systems in src/systems, and character art in
src/skinArt.js. Original sprites/effects are drawn in code; audio is synthesized.
Background reference provenance is recorded in public/maps/ASSETS.md. External
background images retain their original rights; no blanket asset license is
claimed. Development used AI assistance. No personal accounts are required.
