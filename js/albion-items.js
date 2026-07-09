// Albion Online common tradeable items — generated from known ID patterns.
// Render API: https://render.albiononline.com/v1/item/{id}@{enc}.png?quality={q}

const _WEAPONS = [
  ['MAIN_SWORD',          'Sword',              'Sword'],
  ['2H_CLAYMORE',         'Claymore',           'Sword'],
  ['2H_DUALSWORD',        'Dual Blades',        'Sword'],
  ['MAIN_AXE',            'Axe',                'Axe'],
  ['2H_AXE',              'Great Axe',          'Axe'],
  ['2H_HALBERD',          'Halberd',            'Axe'],
  ['MAIN_MACE',           'Mace',               'Mace'],
  ['2H_MACE',             'Heavy Mace',         'Mace'],
  ['2H_HAMMER',           'Great Hammer',       'Mace'],
  ['MAIN_HAMMER',         'Battle Hammer',      'Mace'],
  ['MAIN_DAGGER',         'Dagger',             'Dagger'],
  ['2H_DAGGERPAIR',       'Dual Daggers',       'Dagger'],
  ['2H_CLAWS',            'Claws',              'Dagger'],
  ['MAIN_QUARTERSTAFF',   'Quarterstaff',       'Staff'],
  ['2H_QUARTERSTAFF',     'Iron-Clad Staff',    'Staff'],
  ['MAIN_BOW',            'Bow',                'Bow'],
  ['2H_BOW',              'Warbow',             'Bow'],
  ['2H_CROSSBOW',         'Heavy Crossbow',     'Bow'],
  ['MAIN_CROSSBOW',       'Crossbow',           'Bow'],
  ['MAIN_SPEAR',          'Spear',              'Spear'],
  ['2H_SPEAR',            'Pike',               'Spear'],
  ['2H_GLAIVE',           'Glaive',             'Spear'],
  ['MAIN_FIRESTAFF',      'Fire Staff',         'Magic'],
  ['2H_FIRESTAFF',        'Great Fire Staff',   'Magic'],
  ['MAIN_FROSTSTAFF',     'Frost Staff',        'Magic'],
  ['2H_FROSTSTAFF',       'Great Frost Staff',  'Magic'],
  ['MAIN_ARCANESTAFF',    'Arcane Staff',       'Magic'],
  ['2H_ARCANESTAFF',      'Great Arcane Staff', 'Magic'],
  ['MAIN_HOLYSTAFF',      'Holy Staff',         'Magic'],
  ['2H_HOLYSTAFF',        'Great Holy Staff',   'Magic'],
  ['MAIN_NATURESTAFF',    'Nature Staff',       'Magic'],
  ['2H_NATURESTAFF',      'Great Nature Staff', 'Magic'],
  ['MAIN_CURSEDSTAFF',    'Cursed Staff',       'Magic'],
  ['2H_CURSEDSTAFF',      'Great Cursed Staff', 'Magic'],
  ['TORCH',               'Torch',              'Offhand'],
  ['OFF_BOOK',            'Tome of Spells',     'Offhand'],
  ['OFF_SHIELD',          'Shield',             'Offhand'],
  ['2H_POLEHAMMER',       'Polehammer',         'Mace'],
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
  ['CAPE',               'Cape'],
  ['CAPE_BALANCED',      'Balanced Cape'],
  ['CAPE_OFFENSIVE',     'Offensive Cape'],
  ['CAPE_DEFENSIVE',     'Defensive Cape'],
];

const _BAGS = [
  ['BAG',                'Bag'],
  ['BAG_GATHERER',       'Gathering Bag'],
];

const _FOOD = [
  ['FOOD_BREAD',                    'Bread',               'T1'],
  ['FOOD_FISH_ROASTED',             'Roasted Fish',        'T2'],
  ['FOOD_SALAD',                    'Salad',               'T2'],
  ['FOOD_PORK_OMELETTE',            'Pork Omelette',       'T3'],
  ['FOOD_PORK_PIE',                 'Pork Pie',            'T3'],
  ['FOOD_SEAWEED_SALAD',            'Seaweed Salad',       'T4'],
  ['FOOD_GOOSE_PIE',                'Goose Pie',           'T4'],
  ['FOOD_ROAST',                    'Beef Roast',          'T4'],
  ['FOOD_HIDE_PIE',                 'Venison Pie',         'T5'],
  ['FOOD_MANDARIN_FISH',            'Mandarin Fish',       'T5'],
  ['FOOD_POTATO_SOUP',              'Potato Soup',         'T5'],
  ['FOOD_CHICKEN_PIE',              'Chicken Pie',         'T6'],
  ['FOOD_TURNIP_SOUP',              'Turnip Soup',         'T6'],
  ['FOOD_WILD_HONEY_PIE',           'Wild Honey Pie',      'T7'],
  ['FOOD_STEAK_AND_KIDNEY_PIE',     'Steak Pie',           'T7'],
  ['FOOD_ROAST_RABBIT',             'Roast Rabbit',        'T7'],
  ['FOOD_AVALON_MEALS',             'Crest of Valor',      'T8'],
];

const _POTIONS = [
  ['POTION_HEAL',           'Healing Potion'],
  ['POTION_ENERGY',         'Energy Potion'],
  ['POTION_STONESKIN',      'Stone Skin Potion'],
  ['POTION_RESISTANCE',     'Resistance Potion'],
  ['POTION_REVIVE',         'Revive Potion'],
  ['POTION_BERSERK',        'Berserk Potion'],
  ['POTION_CLEANSE',        'Cleanse Potion'],
];

const _RESOURCES = [
  ['ORE',             'Ore',           'Resource'],
  ['WOOD',            'Wood',          'Resource'],
  ['HIDE',            'Hide',          'Resource'],
  ['FIBER',           'Fiber',         'Resource'],
  ['ROCK',            'Stone',         'Resource'],
  ['METALBAR',        'Metal Bar',     'Resource'],
  ['PLANKS',          'Plank',         'Resource'],
  ['LEATHER',         'Leather',       'Resource'],
  ['CLOTH',           'Cloth',         'Resource'],
  ['STONEBLOCK',      'Stone Block',   'Resource'],
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
];

// ── Build the item list ──
const ALBION_COMMON_ITEMS = [];

// Weapons T4-T8
for (let t = 4; t <= 8; t++) {
  for (const [suffix, name] of _WEAPONS) {
    ALBION_COMMON_ITEMS.push({ id:`T${t}_${suffix}`, name:`T${t} ${name}`, category:'Weapon', tier:t });
  }
}

// Armor T4-T8
for (let t = 4; t <= 8; t++) {
  for (const [suffix, name, sub] of _ARMOR) {
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

// Food (fixed tiers based on game data)
for (const [suffix, name, tierHint] of _FOOD) {
  // Include T3-T8 food items
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

// Mounts (various tiers)
const mountTiers = {
  'MOUNT_HORSE': [3,4,5], 'MOUNT_ARMORED_HORSE': [5,6,7], 'MOUNT_GIANT_HORSE': [6,7,8],
  'MOUNT_OX': [3,4,5,6,7,8], 'MOUNT_TRANSPORT_MAMMOTH': [7,8],
  'MOUNT_DIREWOLF': [6,7,8], 'MOUNT_DIREBOAR': [5,6], 'MOUNT_DIREBEAR': [6,7,8],
  'MOUNT_SWIFTCLAW': [4,5,6], 'MOUNT_WOLF': [5,6,7], 'MOUNT_PANTHER': [6,7,8],
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
  return results.slice(0, limit);
};

// ── Render URL helper ──
window.albionItemImg = function(id, enc = 0, quality = 1) {
  if (!id) return 'https://render.albiononline.com/v1/item/T4_BAG.png';
  return `https://render.albiononline.com/v1/item/${id}${enc > 0 ? '@' + enc : ''}.png?quality=${quality}`;
};
