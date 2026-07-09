// Albion Online item database — generic + unique/faction items.
// Render API: https://render.albiononline.com/v1/item/{id}@{enc}.png?quality={q}

// ── Generic weapons (tiered T4-T8) ──
const _WEAPONS = [
  // Swords
  ['MAIN_SWORD',            'Sword'],
  ['2H_CLAYMORE',           'Claymore'],
  ['2H_DUALSWORD',          'Dual Blades'],
  ['2H_DUALSWORD_UNDEAD',   'Cursed Blade'],
  // Axes
  ['MAIN_AXE',              'Axe'],
  ['2H_AXE',                'Great Axe'],
  ['2H_HALBERD',            'Halberd'],
  ['2H_HALBERD_UNDEAD',     'Scything Blade'],
  ['2H_SCYTHE',             'Scythe'],
  // Maces
  ['MAIN_MACE',             'Mace'],
  ['2H_MACE',               'Heavy Mace'],
  ['2H_HAMMER',             'Great Hammer'],
  ['MAIN_HAMMER',           'Battle Hammer'],
  ['2H_POLEHAMMER',         'Polehammer'],
  ['2H_RAM',                'Siegebow'],
  // Daggers
  ['MAIN_DAGGER',           'Dagger'],
  ['2H_DAGGERPAIR',         'Dual Daggers'],
  ['2H_CLAWS',              'Claws'],
  ['2H_KNUCKLES',           'Knuckles'],
  // Quarterstaves
  ['MAIN_QUARTERSTAFF',     'Quarterstaff'],
  ['2H_QUARTERSTAFF',       'Iron-Clad Staff'],
  ['2H_QUARTERSTAFF_HELL',  'Blazing Staff'],
  // Spears
  ['MAIN_SPEAR',            'Spear'],
  ['2H_SPEAR',              'Pike'],
  ['2H_GLAIVE',             'Glaive'],
  ['2H_LANCE',              'Spirithunter'],
  // Bows
  ['MAIN_BOW',              'Bow'],
  ['2H_BOW',                'Warbow'],
  ['2H_CROSSBOW',           'Heavy Crossbow'],
  ['MAIN_CROSSBOW',         'Crossbow'],
  ['2H_LONGBOW',            'Longbow'],
  // Fire staves
  ['MAIN_FIRESTAFF',        'Fire Staff'],
  ['2H_FIRESTAFF',          'Great Fire Staff'],
  ['2H_INFERNOSTAFF',       'Infernal Staff'],
  // Frost staves
  ['MAIN_FROSTSTAFF',       'Frost Staff'],
  ['2H_FROSTSTAFF',         'Great Frost Staff'],
  ['2H_ICEGAUNTLETS',       'Glacial Staff'],
  // Arcane staves
  ['MAIN_ARCANESTAFF',      'Arcane Staff'],
  ['2H_ARCANESTAFF',        'Great Arcane Staff'],
  ['2H_ENIGMATICSTAFF',     'Enigmatic Staff'],
  // Holy staves
  ['MAIN_HOLYSTAFF',        'Holy Staff'],
  ['2H_HOLYSTAFF',          'Great Holy Staff'],
  ['2H_DIVINESTAFF',        'Divine Staff'],
  // Nature staves
  ['MAIN_NATURESTAFF',      'Nature Staff'],
  ['2H_NATURESTAFF',        'Great Nature Staff'],
  ['2H_WILDSTAFF',          'Wild Staff'],
  // Cursed staves
  ['MAIN_CURSEDSTAFF',      'Cursed Staff'],
  ['2H_CURSEDSTAFF',        'Great Cursed Staff'],
  ['2H_DEMONICSTAFF',       'Demonic Staff'],
  // Shapeshifter
  ['2H_SHAPESHIFTER_SET1',  'Druidic Staff'],
  ['2H_SHAPESHIFTER_SET2',  'Shapeshifter Staff'],
  // Offhand
  ['TORCH',                 'Torch'],
  ['OFF_BOOK',              'Tome of Spells'],
  ['OFF_SHIELD',            'Shield'],
  ['OFF_JESTERCANE',        'Jester Wand'],
  // Rapier
  ['MAIN_RAPIER',           'Rapier'],
  // Flail
  ['2H_FLAIL',              'Flail'],
];

// ── Unique / Faction items ──
// Pattern: { id (full, no T prefix), name, tier[] or null=4-8 }
const _UNIQUES = [
  // ── Swords ──
  { id:'2H_CLAYMORE_AVALON',        name:'Carving Sword',         tiers:[4,6,8] },
  { id:'MAIN_SWORD_MORGANA',        name:'Black Monk Staff',      tiers:[4,6,8] },

  // ── Axes ──
  { id:'2H_AXE_HELL',               name:'Infernal Scythe',       tiers:[4,6,8] },
  { id:'2H_AXE_AVALON',             name:'Avalonian Halberd',     tiers:[4,6,8] },
  { id:'2H_HALBERD_KEEPER',         name:'Soulscythe',            tiers:[4,6,8] },

  // ── Maces ──
  { id:'2H_MACE_HELL',              name:'Grovekeeper',           tiers:[4,6,8] },
  { id:'2H_MACE_KEEPER',            name:'Great Nature Staff',    tiers:[4,6,8] },
  { id:'2H_HAMMER_UNDEAD',          name:'Tombhammer',            tiers:[4,6,8] },
  { id:'MAIN_HAMMER_UNDEAD',        name:'Ursine Maulers',        tiers:[4,6,8] },
  { id:'2H_POLEHAMMER_AVALON',      name:'Hammer of Avalon',      tiers:[4,6,8] },

  // ── Daggers ──
  { id:'MAIN_DAGGER_HELL',          name:'Bloodletter',           tiers:[4,6,8] },
  { id:'2H_DAGGERPAIR_HELL',        name:'Deathgivers',           tiers:[4,6,8] },
  { id:'2H_CLAWS_KEEPER',           name:'Bear Paws',             tiers:[4,6,8] },
  { id:'2H_KNUCKLES_HELL',          name:'Facebreaker',           tiers:[4,6,8] },
  { id:'2H_KNUCKLES_MORGANA',       name:'Rift Gauntlet',         tiers:[4,6,8] },
  { id:'2H_KNUCKLES_KEEPER',        name:'Druid Gauntlet',        tiers:[4,6,8] },

  // ── Quarterstaves ──
  { id:'2H_QUARTERSTAFF_UNDEAD',    name:'Bone Scythe',           tiers:[4,6,8] },
  { id:'MAIN_QUARTERSTAFF_KEEPER',  name:'Iron-Clad Staff',       tiers:[4,6,8] },

  // ── Spears ──
  { id:'2H_GLAIVE_KEEPER',          name:'Heron Spear',           tiers:[4,6,8] },
  { id:'2H_LANCE_UNDEAD',           name:'Spirithunter',          tiers:[4,6,8] },
  { id:'MAIN_SPEAR_HELL',           name:'Brimstone Staff',       tiers:[4,6,8] },

  // ── Bows ──
  { id:'2H_BOW_HELL',               name:'Whispering Bow',        tiers:[4,6,8] },
  { id:'2H_BOW_UNDEAD',             name:'Wailing Bow',           tiers:[4,6,8] },
  { id:'2H_CROSSBOW_MORGANA',       name:'Siegebow',              tiers:[4,6,8] },
  { id:'MAIN_CROSSBOW_UNDEAD',      name:'Weeping Repeater',      tiers:[4,6,8] },
  { id:'2H_LONGBOW_KEEPER',         name:'Longbow',               tiers:[4,6,8] },

  // ── Fire staves ──
  { id:'2H_FIRESTAFF_HELL',         name:'Wildfire Staff',        tiers:[4,6,8] },
  { id:'2H_FIRESTAFF_KEEPER',       name:'Infernal Staff',        tiers:[4,6,8] },
  { id:'MAIN_FIRESTAFF_MORGANA',    name:'Brimstone Staff',       tiers:[4,6,8] },

  // ── Frost staves ──
  { id:'2H_FROSTSTAFF_UNDEAD',      name:'Permafrost Prism',      tiers:[4,6,8] },
  { id:'2H_ICEGAUNTLETS_HELL',      name:'Glacial Staff',         tiers:[4,6,8] },
  { id:'MAIN_FROSTSTAFF_KEEPER',    name:'Icicle Staff',          tiers:[4,6,8] },

  // ── Arcane staves ──
  { id:'2H_ARCANESTAFF_UNDEAD',     name:'Occult Staff',          tiers:[4,6,8] },
  { id:'MAIN_ARCANESTAFF_KEEPER',   name:'Mage\'s Wand',          tiers:[4,6,8] },
  { id:'2H_ENIGMATICSTAFF_HELL',    name:'Soulscribe',            tiers:[4,6,8] },

  // ── Holy staves ──
  { id:'2H_HOLYSTAFF_HELL',         name:'Fallen Staff',          tiers:[4,6,8] },
  { id:'2H_HOLYSTAFF_MORGANA',      name:'Redemption Staff',      tiers:[4,6,8] },
  { id:'MAIN_HOLYSTAFF_KEEPER',     name:'Lifetouch Staff',       tiers:[4,6,8] },
  { id:'2H_DIVINESTAFF_UNDEAD',     name:'Divine Staff',          tiers:[4,6,8] },

  // ── Nature staves ──
  { id:'2H_NATURESTAFF_KEEPER',     name:'Druidic Staff',         tiers:[4,6,8] },
  { id:'2H_WILDSTAFF_UNDEAD',       name:'Wild Staff',            tiers:[4,6,8] },
  { id:'MAIN_NATURESTAFF_HELL',     name:'Blight Staff',          tiers:[4,6,8] },

  // ── Cursed staves ──
  { id:'2H_CURSEDSTAFF_HELL',       name:'Shadowcaller',          tiers:[4,6,8] },
  { id:'2H_CURSEDSTAFF_UNDEAD',     name:'Curse Staff',           tiers:[4,6,8] },
  { id:'2H_DEMONICSTAFF_HELL',      name:'Demonic Staff',         tiers:[4,6,8] },
  { id:'MAIN_CURSEDSTAFF_MORGANA',  name:'Desolate Staff',        tiers:[4,6,8] },

  // ── Offhand ──
  { id:'OFF_SPIKEDSHIELD_MORGANA',  name:'Spiked Shield',         tiers:[4,6,8] },
  { id:'OFF_SHIELD_UNDEAD',         name:'Cryptcandle',           tiers:[4,6,8] },
  { id:'OFF_TORCH_HELL',            name:'Taproot',               tiers:[4,6,8] },
  { id:'OFF_BOOK_UNDEAD',           name:'Muisak',                tiers:[4,6,8] },
  { id:'OFF_BOOK_KEEPER',           name:'Mistcaller',            tiers:[4,6,8] },
  { id:'OFF_BOOK_HELL',             name:'Eye of Secrets',        tiers:[4,6,8] },
  { id:'OFF_JESTERCANE_HELL',       name:'Jester\'s Staff',       tiers:[4,6,8] },
  { id:'OFF_HORN_HELL',             name:'Lymhurst Cape Offhand', tiers:[4,6,8] },

  // ── Shapeshifter ──
  { id:'2H_SHAPESHIFTER_SET1',      name:'Druidic Staff',         tiers:[4,6,8] },

  // ── Rapier ──
  { id:'MAIN_RAPIER_AVALON',        name:'Carving Sword',         tiers:[4,6,8] },

  // ── Totem (special staff type) ──
  { id:'2H_TOTEM_HELL',             name:'Mistcaller',            tiers:[4,6,8] },
  { id:'2H_TOTEM_KEEPER',           name:'Muisak',                tiers:[4,6,8] },
  { id:'2H_TOTEM_UNDEAD',           name:'Cryptcandle',           tiers:[4,6,8] },
];

const _ARMOR = [
  ['HEAD_PLATE_SET1',   'Plate Helmet',    'Plate'],
  ['HEAD_PLATE_SET2',   'Soldier Helmet',  'Plate'],
  ['HEAD_PLATE_SET3',   'Knight Helmet',   'Plate'],
  ['HEAD_LEATHER_SET1', 'Leather Cap',     'Leather'],
  ['HEAD_LEATHER_SET2', 'Ranger Cap',      'Leather'],
  ['HEAD_LEATHER_SET3', 'Assassin Hood',   'Leather'],
  ['HEAD_CLOTH_SET1',   'Scholar Cowl',    'Cloth'],
  ['HEAD_CLOTH_SET2',   'Adept\'s Cowl',   'Cloth'],
  ['HEAD_CLOTH_SET3',   'Mage\'s Cowl',    'Cloth'],
  ['ARMOR_PLATE_SET1',  'Plate Armor',     'Plate'],
  ['ARMOR_PLATE_SET2',  'Soldier Armor',   'Plate'],
  ['ARMOR_PLATE_SET3',  'Knight Armor',    'Plate'],
  ['ARMOR_LEATHER_SET1','Leather Jacket',  'Leather'],
  ['ARMOR_LEATHER_SET2','Ranger Jacket',   'Leather'],
  ['ARMOR_LEATHER_SET3','Assassin Jacket', 'Leather'],
  ['ARMOR_CLOTH_SET1',  'Scholar Robe',    'Cloth'],
  ['ARMOR_CLOTH_SET2',  'Adept\'s Robe',   'Cloth'],
  ['ARMOR_CLOTH_SET3',  'Mage\'s Robe',    'Cloth'],
  ['SHOES_PLATE_SET1',  'Plate Boots',     'Plate'],
  ['SHOES_PLATE_SET2',  'Soldier Boots',   'Plate'],
  ['SHOES_PLATE_SET3',  'Knight Boots',    'Plate'],
  ['SHOES_LEATHER_SET1','Leather Shoes',   'Leather'],
  ['SHOES_LEATHER_SET2','Ranger Shoes',    'Leather'],
  ['SHOES_LEATHER_SET3','Assassin Shoes',  'Leather'],
  ['SHOES_CLOTH_SET1',  'Scholar Sandals', 'Cloth'],
  ['SHOES_CLOTH_SET2',  'Adept\'s Sandals','Cloth'],
  ['SHOES_CLOTH_SET3',  'Mage\'s Sandals', 'Cloth'],
];

const _CAPES = [
  ['CAPE',            'Cape'],
  ['CAPE_BALANCED',   'Balanced Cape'],
  ['CAPE_OFFENSIVE',  'Offensive Cape'],
  ['CAPE_DEFENSIVE',  'Defensive Cape'],
  ['CAPEITEM_FW_FORTSTERLING', 'Fort Sterling Cape'],
  ['CAPEITEM_FW_LYMHURST',     'Lymhurst Cape'],
  ['CAPEITEM_FW_BRIDGEWATCH',  'Bridgewatch Cape'],
  ['CAPEITEM_FW_MARTLOCK',     'Martlock Cape'],
  ['CAPEITEM_FW_THETFORD',     'Thetford Cape'],
];

const _BAGS = [
  ['BAG',          'Bag'],
  ['BAG_GATHERER', 'Gathering Bag'],
];

const _FOOD = [
  ['FOOD_BREAD',               'Bread'],
  ['FOOD_FISH_ROASTED',        'Roasted Fish'],
  ['FOOD_SALAD',               'Salad'],
  ['FOOD_PORK_OMELETTE',       'Pork Omelette'],
  ['FOOD_PORK_PIE',            'Pork Pie'],
  ['FOOD_SEAWEED_SALAD',       'Seaweed Salad'],
  ['FOOD_GOOSE_PIE',           'Goose Pie'],
  ['FOOD_ROAST',               'Beef Roast'],
  ['FOOD_HIDE_PIE',            'Venison Pie'],
  ['FOOD_MANDARIN_FISH',       'Mandarin Fish'],
  ['FOOD_POTATO_SOUP',         'Potato Soup'],
  ['FOOD_CHICKEN_PIE',         'Chicken Pie'],
  ['FOOD_TURNIP_SOUP',         'Turnip Soup'],
  ['FOOD_WILD_HONEY_PIE',      'Wild Honey Pie'],
  ['FOOD_STEAK_AND_KIDNEY_PIE','Steak Pie'],
  ['FOOD_ROAST_RABBIT',        'Roast Rabbit'],
  ['FOOD_AVALON_MEALS',        'Crest of Valor'],
];

const _POTIONS = [
  ['POTION_HEAL',       'Healing Potion'],
  ['POTION_ENERGY',     'Energy Potion'],
  ['POTION_STONESKIN',  'Stone Skin Potion'],
  ['POTION_RESISTANCE', 'Resistance Potion'],
  ['POTION_REVIVE',     'Revive Potion'],
  ['POTION_BERSERK',    'Berserk Potion'],
  ['POTION_CLEANSE',    'Cleanse Potion'],
];

const _RESOURCES = [
  ['ORE',        'Ore'],
  ['WOOD',       'Wood'],
  ['HIDE',       'Hide'],
  ['FIBER',      'Fiber'],
  ['ROCK',       'Stone'],
  ['METALBAR',   'Metal Bar'],
  ['PLANKS',     'Plank'],
  ['LEATHER',    'Leather'],
  ['CLOTH',      'Cloth'],
  ['STONEBLOCK', 'Stone Block'],
];

const _MOUNTS = [
  ['MOUNT_HORSE',             'Horse'],
  ['MOUNT_ARMORED_HORSE',     'Armored Horse'],
  ['MOUNT_DIREWOLF',          'Direwolf'],
  ['MOUNT_DIREBOAR',          'Direboar'],
  ['MOUNT_DIREBEAR',          'Direbear'],
  ['MOUNT_GIANT_HORSE',       'Giant Horse'],
  ['MOUNT_OX',                'Ox'],
  ['MOUNT_TRANSPORT_MAMMOTH', 'Transport Mammoth'],
  ['MOUNT_SWIFTCLAW',         'Swiftclaw'],
  ['MOUNT_WOLF',              'Wolf'],
  ['MOUNT_PANTHER',           'Panther'],
  ['MOUNT_COUGAR_COLT',       'Cougar'],
  ['MOUNT_MOOSE',             'Moose'],
  ['MOUNT_TERRORBIRD',        'Terrorbird'],
  ['MOUNT_BONEDRAKEMOUNT',    'Spectral Direwolf'],
];

// ── Build the item list ──
const ALBION_COMMON_ITEMS = [];

// Generic weapons T4-T8
for (let t = 4; t <= 8; t++) {
  for (const [suffix, name] of _WEAPONS) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${suffix}`, name:`T${t} ${name}`, category:'Weapon', tier:t });
  }
}

// Unique/faction weapons
for (const u of _UNIQUES) {
  const tiers = u.tiers || [4,6,8];
  for (const t of tiers) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${u.id}`, name:`T${t} ${u.name}`, category:'Weapon', tier:t, unique:true });
  }
}

// Armor T4-T8
for (let t = 4; t <= 8; t++) {
  for (const [suffix, name] of _ARMOR) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${suffix}`, name:`T${t} ${name}`, category:'Armor', tier:t });
  }
}

// Capes T4-T8
for (let t = 4; t <= 8; t++) {
  for (const [suffix, name] of _CAPES) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${suffix}`, name:`T${t} ${name}`, category:'Other', tier:t });
  }
}

// Bags T4-T8
for (let t = 4; t <= 8; t++) {
  for (const [suffix, name] of _BAGS) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${suffix}`, name:`T${t} ${name}`, category:'Other', tier:t });
  }
}

// Food T3-T8
for (const [suffix, name] of _FOOD) {
  for (let t = 3; t <= 8; t++) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${suffix}`, name:`T${t} ${name}`, category:'Food', tier:t });
  }
}

// Potions T3-T8
for (let t = 3; t <= 8; t++) {
  for (const [suffix, name] of _POTIONS) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${suffix}`, name:`T${t} ${name}`, category:'Food', tier:t });
  }
}

// Resources T2-T8
for (let t = 2; t <= 8; t++) {
  for (const [suffix, name] of _RESOURCES) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${suffix}`, name:`T${t} ${name}`, category:'Resource', tier:t });
  }
}

// Mounts
const mountTiers = {
  'MOUNT_HORSE': [3,4,5], 'MOUNT_ARMORED_HORSE': [5,6,7], 'MOUNT_GIANT_HORSE': [6,7,8],
  'MOUNT_OX': [3,4,5,6,7,8], 'MOUNT_TRANSPORT_MAMMOTH': [7,8],
  'MOUNT_DIREWOLF': [6,7,8], 'MOUNT_DIREBOAR': [5,6], 'MOUNT_DIREBEAR': [6,7,8],
  'MOUNT_SWIFTCLAW': [4,5,6], 'MOUNT_WOLF': [5,6,7], 'MOUNT_PANTHER': [6,7,8],
  'MOUNT_COUGAR_COLT': [5,6,7], 'MOUNT_MOOSE': [6,7], 'MOUNT_TERRORBIRD': [5,6,7],
  'MOUNT_BONEDRAKEMOUNT': [5,6,7,8],
};
for (const [suffix, name] of _MOUNTS) {
  const tiers = mountTiers[suffix] || [4,5,6,7,8];
  for (const t of tiers) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${suffix}`, name:`T${t} ${name}`, category:'Mount', tier:t });
  }
}

// ── Search function ──
window.searchAlbionItems = function(query, limit = 15) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const results = ALBION_COMMON_ITEMS.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.id.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
  // Prioritise: exact ID prefix match > unique items > generic
  results.sort((a, b) => {
    const aExact = a.id.toLowerCase().startsWith(q) ? 0 : 1;
    const bExact = b.id.toLowerCase().startsWith(q) ? 0 : 1;
    return aExact - bExact;
  });
  return results.slice(0, limit);
};

// ── Render URL helper ──
window.albionItemImg = function(id, enc = 0, quality = 1) {
  if (!id) return 'https://render.albiononline.com/v1/item/T4_BAG.png';
  return `https://render.albiononline.com/v1/item/${id}${enc > 0 ? '@' + enc : ''}.png?quality=${quality}`;
};
