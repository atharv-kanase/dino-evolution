export const UPGRADES = [
  {id:'double',name:'Pterodactyl Wings',icon:'↑↑',rarity:'RARE',description:'Jump twice. Hold Space while falling to glide.',benefit:'18s · double jump + glide'},
  {id:'armour',name:'Bone Armour',icon:'◈',rarity:'RARE',description:'Spiked plates and a tail club. Smash one obstacle; cannot save a fall.',benefit:'20s · one shield hit'},
  {id:'dash',name:'Cyber Legs',icon:'ϟ',rarity:'RARE',description:'Jump, then Shift / Right / X to phase through hazards for 0.3s. Six-second recharge.',benefit:'16s · mid-air dash'},
];
export function nextLevelXP(level) { return Math.min(65, 25 + (level - 1) * 10); }
export function upgradeChoices(owned, random = Math.random) {
  const pool = UPGRADES.filter(item => !owned.includes(item.id));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}
// A baseline jump lasts ~0.73 s. Spacing is deliberately longer than a full
// jump plus reaction time, and never depends on owning an upgrade.
export { hazardInterval as spawnInterval } from './difficulty.js';
export function freshRun() {
  return { distance: 0, dna: 0, xp: 0, level: 1, upgrades: [], history: [], passed: 0 };
}
