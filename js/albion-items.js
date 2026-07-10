// Albion Online item database — backed by ao-bin-dumps formatted/items.json
// Render API: https://render.albiononline.com/v1/item/{id}@{enc}.png?quality={q}

let _fullDb = null;       // null = not loaded, [] = loaded
let _dbLoading = false;
const _dbCallbacks = [];

async function _loadDb() {
  if (_fullDb !== null) return _fullDb;
  if (_dbLoading) {
    return new Promise(res => _dbCallbacks.push(res));
  }
  _dbLoading = true;
  try {
    const r = await fetch('/js/albion-items-full.json?v=' + Date.now());
    const raw = await r.json(); // [[id, name], ...]
    _fullDb = raw.map(([id, name]) => {
      const tierMatch = id.match(/^T(\d+)_/);
      const tier = tierMatch ? parseInt(tierMatch[1]) : 0;
      return { id, name, tier };
    });
  } catch (e) {
    console.warn('Failed to load item db, falling back to built-in list', e);
    _fullDb = _FALLBACK_ITEMS;
  }
  _dbLoading = false;
  _dbCallbacks.forEach(cb => cb(_fullDb));
  _dbCallbacks.length = 0;
  return _fullDb;
}

// ── Search function (async) ──
window.searchAlbionItemsAsync = async function(query, limit = 15) {
  if (!query || query.length < 2) return [];
  const db = await _loadDb();
  return _runSearch(db, query, limit);
};

// Sync search — works after first async call has resolved
window.searchAlbionItems = function(query, limit = 15) {
  if (!query || query.length < 2) return [];
  if (_fullDb) return _runSearch(_fullDb, query, limit);
  // Trigger background load for next time
  _loadDb();
  return _runSearch(_FALLBACK_ITEMS, query, limit);
};

function _runSearch(db, query, limit) {
  const q = query.trim().toLowerCase();
  const results = [];
  for (const item of db) {
    const idL = item.id.toLowerCase();
    const nameL = item.name.toLowerCase();
    if (nameL.includes(q) || idL.includes(q)) {
      results.push(item);
      if (results.length >= limit * 4) break; // cap scan for perf
    }
  }
  // Rank: exact id prefix > name starts with > rest
  results.sort((a, b) => {
    const aIdPfx = a.id.toLowerCase().startsWith(q) ? 0 : 1;
    const bIdPfx = b.id.toLowerCase().startsWith(q) ? 0 : 1;
    if (aIdPfx !== bIdPfx) return aIdPfx - bIdPfx;
    const aNamePfx = a.name.toLowerCase().startsWith(q) ? 0 : 1;
    const bNamePfx = b.name.toLowerCase().startsWith(q) ? 0 : 1;
    return aNamePfx - bNamePfx;
  });
  return results.slice(0, limit);
}

// Preload when script loads so search is instant
_loadDb();

// ── Render URL helper ──
window.albionItemImg = function(id, enc = 0, quality = 1) {
  if (!id) return 'https://render.albiononline.com/v1/item/T4_BAG.png';
  return `https://render.albiononline.com/v1/item/${id}${enc > 0 ? '@' + enc : ''}.png?quality=${quality}`;
};

// ── Fallback list (used before JSON loads) ──
const _FALLBACK_ITEMS = (function() {
  const items = [];
  const add = (id, name) => items.push({ id, name, tier: parseInt(id.match(/^T(\d+)/)?.[1] || 0) });
  const tiers = (base, name, ts) => ts.forEach(t => add(`T${t}_${base}`, `T${t} ${name}`));

  const W = [
    ['MAIN_SWORD','Sword'],['2H_CLAYMORE','Claymore'],['2H_DUALSWORD','Dual Blades'],
    ['MAIN_AXE','Axe'],['2H_AXE','Great Axe'],['2H_HALBERD','Halberd'],['2H_SCYTHE','Scythe'],
    ['MAIN_MACE','Mace'],['2H_MACE','Heavy Mace'],['2H_HAMMER','Great Hammer'],['2H_POLEHAMMER','Polehammer'],
    ['MAIN_DAGGER','Dagger'],['2H_DAGGERPAIR','Dual Daggers'],['2H_CLAWS','Claws'],['2H_KNUCKLES','Knuckles'],
    ['MAIN_QUARTERSTAFF','Quarterstaff'],['2H_QUARTERSTAFF','Iron-Clad Staff'],
    ['MAIN_SPEAR','Spear'],['2H_SPEAR','Pike'],['2H_GLAIVE','Glaive'],
    ['MAIN_BOW','Bow'],['2H_BOW','Warbow'],['2H_CROSSBOW','Heavy Crossbow'],['MAIN_CROSSBOW','Crossbow'],['2H_LONGBOW','Longbow'],
    ['MAIN_FIRESTAFF','Fire Staff'],['2H_FIRESTAFF','Great Fire Staff'],
    ['MAIN_FROSTSTAFF','Frost Staff'],['2H_FROSTSTAFF','Great Frost Staff'],
    ['MAIN_ARCANESTAFF','Arcane Staff'],['2H_ARCANESTAFF','Great Arcane Staff'],
    ['MAIN_HOLYSTAFF','Holy Staff'],['2H_HOLYSTAFF','Great Holy Staff'],['2H_DIVINESTAFF','Divine Staff'],
    ['MAIN_NATURESTAFF','Nature Staff'],['2H_NATURESTAFF','Great Nature Staff'],
    ['MAIN_CURSEDSTAFF','Cursed Staff'],['2H_CURSEDSTAFF','Great Cursed Staff'],
    ['MAIN_RAPIER','Rapier'],['2H_FLAIL','Flail'],
    ['OFF_BOOK','Tome of Spells'],['OFF_SHIELD','Shield'],['TORCH','Torch'],
    // Unique/faction
    ['MAIN_DAGGER_HELL','Bloodletter'],['2H_DAGGERPAIR_HELL','Deathgivers'],['2H_KNUCKLES_HELL','Facebreaker'],
    ['2H_CURSEDSTAFF_HELL','Shadowcaller'],['2H_HOLYSTAFF_HELL','Fallen Staff'],
    ['OFF_BOOK_KEEPER','Mistcaller'],['OFF_BOOK_UNDEAD','Muisak'],['OFF_BOOK_HELL','Eye of Secrets'],
    ['OFF_SPIKEDSHIELD_MORGANA','Spiked Shield'],['2H_ARCANESTAFF_UNDEAD','Occult Staff'],
    ['2H_NATURESTAFF_KEEPER','Druidic Staff'],['2H_WILDSTAFF_UNDEAD','Wild Staff'],
    ['2H_FIRESTAFF_HELL','Wildfire Staff'],['2H_FROSTSTAFF_UNDEAD','Permafrost Prism'],
    ['2H_BOW_HELL','Whispering Bow'],['2H_BOW_UNDEAD','Wailing Bow'],
    ['2H_AXE_HELL','Infernal Scythe'],['2H_HAMMER_UNDEAD','Tombhammer'],
  ];
  W.forEach(([b,n]) => tiers(b, n, [4,5,6,7,8]));

  const A = [
    ['HEAD_PLATE_SET1','Plate Helmet'],['HEAD_PLATE_SET2','Soldier Helmet'],['HEAD_PLATE_SET3','Knight Helmet'],
    ['HEAD_LEATHER_SET1','Leather Cap'],['HEAD_LEATHER_SET2','Ranger Cap'],['HEAD_LEATHER_SET3','Assassin Hood'],
    ['HEAD_CLOTH_SET1','Scholar Cowl'],['HEAD_CLOTH_SET2',"Adept's Cowl"],['HEAD_CLOTH_SET3',"Mage's Cowl"],
    ['ARMOR_PLATE_SET1','Plate Armor'],['ARMOR_PLATE_SET2','Soldier Armor'],['ARMOR_PLATE_SET3','Knight Armor'],
    ['ARMOR_LEATHER_SET1','Leather Jacket'],['ARMOR_LEATHER_SET2','Ranger Jacket'],['ARMOR_LEATHER_SET3','Assassin Jacket'],
    ['ARMOR_CLOTH_SET1','Scholar Robe'],['ARMOR_CLOTH_SET2',"Adept's Robe"],['ARMOR_CLOTH_SET3',"Mage's Robe"],
    ['SHOES_PLATE_SET1','Plate Boots'],['SHOES_LEATHER_SET1','Leather Shoes'],['SHOES_CLOTH_SET1','Scholar Sandals'],
  ];
  A.forEach(([b,n]) => tiers(b, n, [4,5,6,7,8]));

  [['BAG','Bag'],['BAG_GATHERER','Gathering Bag']].forEach(([b,n]) => tiers(b,n,[4,5,6,7,8]));
  [['ORE','Ore'],['WOOD','Wood'],['HIDE','Hide'],['FIBER','Fiber'],['ROCK','Stone'],
   ['METALBAR','Metal Bar'],['PLANKS','Plank'],['LEATHER','Leather'],['CLOTH','Cloth']].forEach(([b,n]) => tiers(b,n,[2,3,4,5,6,7,8]));

  return items;
})();
