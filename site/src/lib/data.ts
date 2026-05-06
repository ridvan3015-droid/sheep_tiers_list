export type Region = "EU" | "NA" | "AS" | "SA" | "OC";
export type Category = "general" | "crystal" | "sword" | "uhc" | "pot" | "nethpot" | "smp" | "axe" | "diasmp" | "mace";

export interface TierBadge {
  category: string;
  icon: string;
  tier: string;
  color: string;
}

export interface Player {
  id: number;
  username: string;
  avatarUrl: string;
  region: Region;
  points: number;
  tiers: TierBadge[];
}

export interface TierPlayer {
  username: string;
  avatarUrl: string;
  region: Region;
}

export interface TierColumn {
  tier: number;
  label: string;
  headerColor: string;
  bgColor: string;
  textColor: string;
  players: TierPlayer[];
}

export interface CategoryTab {
  id: Category;
  label: string;
  icon: string;
}

export const CATEGORIES: CategoryTab[] = [
  { id: "general", label: "GÉNÉRAL", icon: "🏆" },
  { id: "crystal", label: "CRYSTAL", icon: "💎" },
  { id: "sword", label: "SWORD", icon: "⚔️" },
  { id: "uhc", label: "UHC", icon: "❤️" },
  { id: "pot", label: "POT", icon: "🧪" },
  { id: "nethpot", label: "NETHPOT", icon: "🟣" },
  { id: "smp", label: "SMP", icon: "🌍" },
  { id: "axe", label: "AXE", icon: "🪓" },
  { id: "diasmp", label: "DIASMP", icon: "💠" },
  { id: "mace", label: "MACE", icon: "🔨" },
];

function p(username: string, region: Region = "EU"): TierPlayer {
  return { username, region, avatarUrl: `https://mc-heads.net/avatar/${username}/32` };
}

const TIER_STYLES: { headerColor: string; bgColor: string; textColor: string }[] = [
  { headerColor: "#f59e0b", bgColor: "#1c1400", textColor: "#fbbf24" },
  { headerColor: "#22c55e", bgColor: "#071a0e", textColor: "#4ade80" },
  { headerColor: "#f97316", bgColor: "#0a1a1a", textColor: "#fb923c" },
  { headerColor: "#3b82f6", bgColor: "#070f1f", textColor: "#93c5fd" },
  { headerColor: "#94a3b8", bgColor: "#0d1117", textColor: "#cbd5e1" },
];

function makeTierColumns(tiers: TierPlayer[][]): TierColumn[] {
  return tiers.map((players, i) => ({
    tier: i + 1,
    label: `TIER ${i + 1}`,
    ...TIER_STYLES[i],
    players,
  }));
}

export const CATEGORY_COLUMNS: Record<Exclude<Category, "general">, TierColumn[]> = {
  crystal: makeTierColumns([
    [p("eSheepPvP"), p("Notchfr"), p("xXShadowXx", "NA")],
    [p("DragonSlayerFR"), p("FetfalightLover"), p("AquaticMC"), p("kahu22sping", "NA"), p("Brillants")],
    [p("GalaxiePvP"), p("idkej", "NA"), p("VoidWalker99", "AS"), p("StylouxX"), p("RayZox_0"), p("davinxnn"), p("QuickCosta", "NA"), p("Vaiynos"), p("JeSuiSushi"), p("APX1CE")],
    [p("WarriorLegendMC"), p("Mizoxu"), p("Dragontmbh_"), p("robusteenfrance"), p("broamons"), p("Lyvone"), p("Gabriizz"), p("GrootGoat"), p("JupiterPrime"), p("Rouxaie"), p("Smmoothie")],
    [p("Op_ktoto"), p("Esteub_LT5"), p("Aemeath77"), p("chopper0488"), p("S1nkq"), p("Swamrixx"), p("Lagmood_"), p("Haikyuu_"), p("Seb28072012"), p("Freesty_"), p("Scorpion_mc"), p("StarCrusherEU"), p("CristalKingFR"), p("OrcaMC", "OC"), p("GlacierPvPFR")],
  ]),

  sword: makeTierColumns([
    [p("BladeRunnerEU"), p("xXShadowXx", "NA"), p("PhoenixBladeNA", "NA")],
    [p("Notchfr"), p("EclipseFR"), p("DiamondAureFR"), p("InfernoEU"), p("NightFuryMC", "NA")],
    [p("VoidWalker99", "AS"), p("AquaticMC"), p("ThorForceNA", "NA"), p("ZapperMC", "SA"), p("eSheepPvP"), p("Brillants"), p("StylouxX"), p("RayZox_0")],
    [p("GalaxiePvP"), p("CristalKingFR"), p("DragonSlayerFR"), p("PixelStormEU"), p("OrcaMC", "OC"), p("Vaiynos"), p("davinxnn"), p("QuickCosta", "NA"), p("idkej", "NA")],
    [p("Lyvone"), p("broamons"), p("Mizoxu"), p("Dragontmbh_"), p("Gabriizz"), p("GrootGoat"), p("JupiterPrime"), p("Rouxaie"), p("StarCrusherEU"), p("chopper0488"), p("S1nkq"), p("Swamrixx"), p("Lagmood_")],
  ]),

  uhc: makeTierColumns([
    [p("Notchfr"), p("EclipseFR"), p("InfernoEU")],
    [p("xXShadowXx", "NA"), p("PhoenixBladeNA", "NA"), p("DiamondAureFR"), p("NightFuryMC", "NA")],
    [p("eSheepPvP"), p("GalaxiePvP"), p("VoidWalker99", "AS"), p("AquaticMC"), p("ThorForceNA", "NA"), p("BladeRunnerEU"), p("ZapperMC", "SA")],
    [p("DragonSlayerFR"), p("PixelStormEU"), p("OrcaMC", "OC"), p("CristalKingFR"), p("StarCrusherEU"), p("Brillants"), p("StylouxX"), p("idkej", "NA"), p("Vaiynos")],
    [p("Mizoxu"), p("Dragontmbh_"), p("Lyvone"), p("broamons"), p("Gabriizz"), p("GrootGoat"), p("JupiterPrime"), p("Rouxaie"), p("chopper0488"), p("S1nkq"), p("Swamrixx"), p("Lagmood_"), p("Smmoothie")],
  ]),

  pot: makeTierColumns([
    [p("AquaticMC"), p("eSheepPvP"), p("PixelStormEU")],
    [p("Notchfr"), p("PhoenixBladeNA", "NA"), p("ThorForceNA", "NA"), p("GalaxiePvP"), p("InfernoEU")],
    [p("DragonSlayerFR"), p("NightFuryMC", "NA"), p("VoidWalker99", "AS"), p("CristalKingFR"), p("EclipseFR"), p("BladeRunnerEU"), p("StylouxX"), p("RayZox_0")],
    [p("xXShadowXx", "NA"), p("DiamondAureFR"), p("OrcaMC", "OC"), p("ZapperMC", "SA"), p("StarCrusherEU"), p("davinxnn"), p("QuickCosta", "NA"), p("Vaiynos"), p("idkej", "NA")],
    [p("Lyvone"), p("Mizoxu"), p("broamons"), p("Dragontmbh_"), p("Gabriizz"), p("GrootGoat"), p("JupiterPrime"), p("Rouxaie"), p("chopper0488"), p("S1nkq"), p("Swamrixx"), p("Lagmood_")],
  ]),

  nethpot: makeTierColumns([
    [p("AquaticMC"), p("GalaxiePvP"), p("ZapperMC", "SA")],
    [p("PixelStormEU"), p("OrcaMC", "OC"), p("NightFuryMC", "NA"), p("InfernoEU"), p("ThorForceNA", "NA")],
    [p("eSheepPvP"), p("Notchfr"), p("DragonSlayerFR"), p("CristalKingFR"), p("VoidWalker99", "AS"), p("StylouxX"), p("RayZox_0"), p("davinxnn")],
    [p("BladeRunnerEU"), p("EclipseFR"), p("xXShadowXx", "NA"), p("DiamondAureFR"), p("PhoenixBladeNA", "NA"), p("QuickCosta", "NA"), p("Vaiynos"), p("idkej", "NA"), p("JeSuiSushi")],
    [p("Mizoxu"), p("Lyvone"), p("broamons"), p("Dragontmbh_"), p("Gabriizz"), p("GrootGoat"), p("JupiterPrime"), p("Rouxaie"), p("chopper0488"), p("S1nkq"), p("Swamrixx"), p("Lagmood_"), p("Haikyuu_")],
  ]),

  smp: makeTierColumns([
    [p("GalaxiePvP"), p("PixelStormEU"), p("InfernoEU")],
    [p("OrcaMC", "OC"), p("ZapperMC", "SA"), p("DiamondAureFR"), p("EclipseFR")],
    [p("eSheepPvP"), p("Notchfr"), p("AquaticMC"), p("ThorForceNA", "NA"), p("NightFuryMC", "NA"), p("StylouxX"), p("davinxnn")],
    [p("DragonSlayerFR"), p("VoidWalker99", "AS"), p("CristalKingFR"), p("StarCrusherEU"), p("BladeRunnerEU"), p("Vaiynos"), p("QuickCosta", "NA"), p("idkej", "NA")],
    [p("Mizoxu"), p("Lyvone"), p("broamons"), p("Dragontmbh_"), p("Gabriizz"), p("GrootGoat"), p("JupiterPrime"), p("Rouxaie"), p("chopper0488"), p("S1nkq"), p("Swamrixx")],
  ]),

  axe: makeTierColumns([
    [p("DragonSlayerFR"), p("CristalKingFR"), p("GlacierPvPFR")],
    [p("ThorForceNA", "NA"), p("BladeRunnerEU"), p("eSheepPvP"), p("VoidWalker99", "AS"), p("StarCrusherEU")],
    [p("Notchfr"), p("AquaticMC"), p("EclipseFR"), p("GalaxiePvP"), p("NightFuryMC", "NA"), p("StylouxX"), p("RayZox_0"), p("davinxnn")],
    [p("PixelStormEU"), p("InfernoEU"), p("xXShadowXx", "NA"), p("ZapperMC", "SA"), p("OrcaMC", "OC"), p("Vaiynos"), p("QuickCosta", "NA"), p("idkej", "NA"), p("JeSuiSushi")],
    [p("Mizoxu"), p("Lyvone"), p("broamons"), p("Dragontmbh_"), p("Gabriizz"), p("GrootGoat"), p("JupiterPrime"), p("Rouxaie"), p("chopper0488"), p("S1nkq"), p("Swamrixx"), p("Lagmood_")],
  ]),

  diasmp: makeTierColumns([
    [p("DiamondAureFR"), p("InfernoEU"), p("GalaxiePvP")],
    [p("eSheepPvP"), p("Notchfr"), p("PixelStormEU"), p("OrcaMC", "OC")],
    [p("VoidWalker99", "AS"), p("DragonSlayerFR"), p("CristalKingFR"), p("BladeRunnerEU"), p("AquaticMC"), p("StylouxX"), p("davinxnn")],
    [p("ThorForceNA", "NA"), p("EclipseFR"), p("StarCrusherEU"), p("ZapperMC", "SA"), p("NightFuryMC", "NA"), p("Vaiynos"), p("QuickCosta", "NA"), p("idkej", "NA")],
    [p("Mizoxu"), p("Lyvone"), p("broamons"), p("Dragontmbh_"), p("Gabriizz"), p("GrootGoat"), p("JupiterPrime"), p("Rouxaie"), p("chopper0488"), p("S1nkq"), p("Swamrixx")],
  ]),

  mace: makeTierColumns([
    [p("ThorForceNA", "NA"), p("VoidWalker99", "AS"), p("GlacierPvPFR")],
    [p("CristalKingFR"), p("eSheepPvP"), p("DragonSlayerFR"), p("BladeRunnerEU"), p("ThorForceNA", "NA")],
    [p("Notchfr"), p("AquaticMC"), p("GalaxiePvP"), p("PixelStormEU"), p("EclipseFR"), p("StylouxX"), p("RayZox_0"), p("davinxnn")],
    [p("InfernoEU"), p("ZapperMC", "SA"), p("OrcaMC", "OC"), p("StarCrusherEU"), p("DiamondAureFR"), p("Vaiynos"), p("QuickCosta", "NA"), p("idkej", "NA"), p("JeSuiSushi")],
    [p("Mizoxu"), p("Lyvone"), p("broamons"), p("Dragontmbh_"), p("Gabriizz"), p("GrootGoat"), p("JupiterPrime"), p("Rouxaie"), p("chopper0488"), p("S1nkq"), p("Swamrixx"), p("Lagmood_")],
  ]),
};

const TIER_COLORS: Record<string, string> = {
  HT1: "#7c3aed", HT2: "#7c3aed", HT3: "#7c3aed",
  LT1: "#2563eb", LT2: "#2563eb", LT3: "#2563eb",
  RHT1: "#059669", RHT2: "#059669",
  RLT1: "#d97706", RLT2: "#d97706",
};

function makeTier(category: string, icon: string, tier: string): TierBadge {
  return { category, icon, tier, color: TIER_COLORS[tier] ?? "#6b7280" };
}

export const PLAYERS_GENERAL: Player[] = [
  { id: 1, username: "eSheepPvP", avatarUrl: "https://mc-heads.net/avatar/eSheepPvP/40", region: "EU", points: 412, tiers: [makeTier("crystal","💎","HT1"), makeTier("sword","⚔️","LT1"), makeTier("uhc","❤️","RHT1"), makeTier("pot","🧪","HT2"), makeTier("axe","🪓","RHT2")] },
  { id: 2, username: "Notchfr", avatarUrl: "https://mc-heads.net/avatar/Notch/40", region: "EU", points: 389, tiers: [makeTier("crystal","💎","LT1"), makeTier("sword","⚔️","HT2"), makeTier("pot","🧪","LT2"), makeTier("uhc","❤️","RLT1")] },
  { id: 3, username: "DragonSlayerFR", avatarUrl: "https://mc-heads.net/avatar/DragonSlayer/40", region: "EU", points: 345, tiers: [makeTier("crystal","💎","HT2"), makeTier("axe","🪓","LT1"), makeTier("mace","🔨","RHT1")] },
  { id: 4, username: "xXShadowXx", avatarUrl: "https://mc-heads.net/avatar/Shadow/40", region: "NA", points: 321, tiers: [makeTier("sword","⚔️","HT1"), makeTier("uhc","❤️","LT1"), makeTier("nethpot","🟣","RHT2")] },
  { id: 5, username: "AquaticMC", avatarUrl: "https://mc-heads.net/avatar/Aquatic/40", region: "EU", points: 298, tiers: [makeTier("pot","🧪","HT1"), makeTier("nethpot","🟣","HT2"), makeTier("crystal","💎","LT2")] },
  { id: 6, username: "VoidWalker99", avatarUrl: "https://mc-heads.net/avatar/VoidWalker/40", region: "AS", points: 276, tiers: [makeTier("crystal","💎","LT2"), makeTier("sword","⚔️","LT2"), makeTier("mace","🔨","LT1")] },
  { id: 7, username: "BladeRunnerEU", avatarUrl: "https://mc-heads.net/avatar/BladeRunner/40", region: "EU", points: 259, tiers: [makeTier("sword","⚔️","HT3"), makeTier("uhc","❤️","LT2"), makeTier("axe","🪓","RLT1")] },
  { id: 8, username: "GalaxiePvP", avatarUrl: "https://mc-heads.net/avatar/Galaxie/40", region: "EU", points: 241, tiers: [makeTier("crystal","💎","HT3"), makeTier("nethpot","🟣","LT1"), makeTier("smp","🌍","RHT1")] },
  { id: 9, username: "NightFuryMC", avatarUrl: "https://mc-heads.net/avatar/NightFury/40", region: "NA", points: 228, tiers: [makeTier("sword","⚔️","LT3"), makeTier("uhc","❤️","HT3"), makeTier("pot","🧪","LT3")] },
  { id: 10, username: "CristalKingFR", avatarUrl: "https://mc-heads.net/avatar/CristalKing/40", region: "EU", points: 214, tiers: [makeTier("crystal","💎","LT3"), makeTier("axe","🪓","LT2"), makeTier("mace","🔨","RLT1")] },
  { id: 11, username: "PixelStormEU", avatarUrl: "https://mc-heads.net/avatar/PixelStorm/40", region: "EU", points: 201, tiers: [makeTier("pot","🧪","HT3"), makeTier("nethpot","🟣","LT2"), makeTier("smp","🌍","LT1")] },
  { id: 12, username: "ThorForceNA", avatarUrl: "https://mc-heads.net/avatar/ThorForce/40", region: "NA", points: 198, tiers: [makeTier("mace","🔨","HT2"), makeTier("axe","🪓","HT3"), makeTier("crystal","💎","RLT1")] },
  { id: 13, username: "EclipseFR", avatarUrl: "https://mc-heads.net/avatar/Eclipse/40", region: "EU", points: 187, tiers: [makeTier("uhc","❤️","HT2"), makeTier("sword","⚔️","HT3"), makeTier("pot","🧪","RLT2")] },
  { id: 14, username: "ZapperMC", avatarUrl: "https://mc-heads.net/avatar/Zapper/40", region: "SA", points: 175, tiers: [makeTier("nethpot","🟣","HT3"), makeTier("crystal","💎","RLT2"), makeTier("smp","🌍","LT2")] },
  { id: 15, username: "DiamondAureFR", avatarUrl: "https://mc-heads.net/avatar/DiamondAure/40", region: "EU", points: 163, tiers: [makeTier("sword","⚔️","RHT1"), makeTier("uhc","❤️","RHT2"), makeTier("diasmp","💠","LT1")] },
  { id: 16, username: "StarCrusherEU", avatarUrl: "https://mc-heads.net/avatar/StarCrusher/40", region: "EU", points: 154, tiers: [makeTier("crystal","💎","RHT1"), makeTier("mace","🔨","LT2"), makeTier("axe","🪓","RLT2")] },
  { id: 17, username: "PhoenixBladeNA", avatarUrl: "https://mc-heads.net/avatar/PhoenixBlade/40", region: "NA", points: 148, tiers: [makeTier("sword","⚔️","RHT2"), makeTier("pot","🧪","RHT1"), makeTier("uhc","❤️","RLT1")] },
  { id: 18, username: "OrcaMC", avatarUrl: "https://mc-heads.net/avatar/Orca/40", region: "OC", points: 139, tiers: [makeTier("nethpot","🟣","RHT1"), makeTier("crystal","💎","LT3"), makeTier("smp","🌍","RLT1")] },
  { id: 19, username: "GlacierPvPFR", avatarUrl: "https://mc-heads.net/avatar/GlacierPvP/40", region: "EU", points: 132, tiers: [makeTier("axe","🪓","RHT1"), makeTier("mace","🔨","HT3"), makeTier("crystal","💎","RLT2")] },
  { id: 20, username: "InfernoEU", avatarUrl: "https://mc-heads.net/avatar/Inferno/40", region: "EU", points: 124, tiers: [makeTier("sword","⚔️","RHT1"), makeTier("uhc","❤️","RHT1"), makeTier("diasmp","💠","RHT1")] },
];
