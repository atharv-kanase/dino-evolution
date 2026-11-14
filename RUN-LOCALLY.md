# How to run DINO: EVOLUTION on your computer

## First-time setup on Windows

1. Download the game ZIP and right-click it → **Extract All**. Do not launch files from inside the ZIP.
2. Open the extracted `dino-evolution` folder. You should see `package.json`, `START-GAME.cmd`, `src` and `public`.
3. Install **Node.js LTS** from https://nodejs.org using its installer. npm is included. After installing, close and reopen any terminal windows.
4. Double-click **START-GAME.cmd** in the game folder.
5. Wait for the first dependency download to finish. This step needs internet.
6. The browser should open automatically. If it does not, open the **Local** URL printed in the terminal.
7. Keep the terminal open while playing. Closing it stops the game server.

## If double-clicking does not work

Open the game folder in File Explorer. Click its address bar, type `cmd`, and press Enter. This opens a terminal in the correct folder.

Run each command separately:

```sh
node --version
npm --version
npm ci
npm run dev
```

The first two commands should print version numbers. Wait for `npm ci` to finish before starting the last command. It installs the libraries listed in the project; it does not install another copy of the game.

Vite then prints an address similar to:

```text
Local: http://127.0.0.1:5173/
```

Open the actual address printed on your computer. The port number can differ. Do not double-click `index.html` to play.

## Every later launch

Double-click `START-GAME.cmd` again. Or open a terminal in the game folder and run `npm run dev`. Dependencies usually need installing only on the first launch or after an update changes them.

Stop the server with **Ctrl+C** in its terminal. Start it again whenever you want to play.

## Common problems

| Problem | What to do |
| --- | --- |
| node or npm is not recognised | Install Node.js, then reopen the terminal |
| package.json not found | Open the terminal inside the extracted game folder |
| npm.ps1 cannot run because scripts are disabled | Use Command Prompt (`cmd`) as described above |
| npm ci fails | Check internet access and copy the actual error when asking for help |
| Browser says connection refused | Start the server and use its printed Local address |
| Page shows an old version | Stop the old server, launch the new folder, then press Ctrl+Shift+R |
| Another port is printed | Use that port; an existing process may occupy the original one |

## Saving and sharing

Progress is stored in the browser, not inside the ZIP. Keep the same browser profile and address to use the same save. Hosted and localhost saves are separate. Clearing browser data can remove progress.

`localhost` means your own computer. Sending that address to a teammate will not let them access your server. Send them the ZIP and these instructions, or share the hosted game link separately.

To update, extract the new ZIP into a new folder, stop the old server and run the new one. Do not copy someone else's `node_modules` folder.

## Build a release later

From the game folder:

```sh
npm test
npm run build
npm run preview
```

The build is generated in `dist`. For a browser-game upload, package the contents of `dist`, with `index.html` at the ZIP root. The source ZIP you received is for developing and running locally.
