import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { CATEGORIES, CATEGORY_COLUMNS, PLAYERS_GENERAL, Player, Category, Region, TierColumn } from "@/lib/data";

const REGION_COLORS: Record<Region, string> = {
  EU: "#16a34a", NA: "#2563eb", AS: "#d97706", SA: "#dc2626", OC: "#7c3aed",
};

const TIER_COLORS: Record<string, string> = {
  HT1: "#7c3aed", HT2: "#7c3aed", HT3: "#7c3aed",
  LT1: "#2563eb", LT2: "#2563eb", LT3: "#2563eb",
  RHT1: "#059669", RHT2: "#059669",
  RLT1: "#d97706", RLT2: "#d97706",
};

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "#1a1a1a" }}>1</div>;
  if (rank === 2) return <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#9ca3af,#6b7280)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "#1a1a1a" }}>2</div>;
  if (rank === 3) return <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#b45309,#92400e)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "white" }}>3</div>;
  return <span style={{ width: 32, textAlign: "center", fontWeight: 600, fontSize: "0.9rem", color: "hsl(215,15%,55%)" }}>{rank}</span>;
}

function PlayerRow({ player, rank }: { player: Player; rank: number }) {
  const [imgError, setImgError] = useState(false);
  return (
    <tr
      style={{ borderBottom: "1px solid hsl(220,13%,16%)", transition: "background 0.1s" }}
      onMouseEnter={e => (e.currentTarget.style.background = "hsl(220,13%,14%)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      <td style={{ padding: "10px 16px", width: 48 }}><RankBadge rank={rank} /></td>
      <td style={{ padding: "10px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 6, overflow: "hidden", background: "hsl(220,13%,22%)", flexShrink: 0 }}>
            {!imgError
              ? <img src={player.avatarUrl} alt={player.username} width={36} height={36} style={{ display: "block" }} onError={() => setImgError(true)} />
              : <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "#a78bfa" }}>{player.username.slice(0, 2).toUpperCase()}</div>
            }
          </div>
          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{player.username}</span>
        </div>
      </td>
      <td style={{ padding: "10px 16px" }}>
        <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, background: REGION_COLORS[player.region], color: "white", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.05em" }}>{player.region}</span>
      </td>
      <td style={{ padding: "10px 16px" }}>
        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f59e0b" }}>{player.points} pts</span>
      </td>
      <td style={{ padding: "10px 16px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {player.tiers.map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 7px", borderRadius: 4, background: TIER_COLORS[t.tier] ?? "#6b7280", color: "white", fontSize: "0.68rem", fontWeight: 700 }}>
              <span>{t.icon}</span>{t.tier}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
}

function TierColumnCard({ col, search }: { col: TierColumn; search: string }) {
  const players = search
    ? col.players.filter(p => p.username.toLowerCase().includes(search.toLowerCase()))
    : col.players;

  return (
    <div style={{ flex: "1 1 180px", minWidth: 160, display: "flex", flexDirection: "column", background: col.bgColor, border: `1px solid ${col.headerColor}22`, borderRadius: 8, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px", borderBottom: `2px solid ${col.headerColor}`, background: `${col.headerColor}18` }}>
        <span style={{ fontWeight: 800, fontSize: "1rem", color: col.textColor, letterSpacing: "0.04em" }}>{col.label}</span>
        <span style={{ marginLeft: 8, fontSize: "0.7rem", color: `${col.textColor}88`, fontWeight: 500 }}>{players.length} joueur{players.length !== 1 ? "s" : ""}</span>
      </div>
      <div style={{ flex: 1, padding: "6px 0" }}>
        {players.map((player, i) => (
          <PlayerEntry key={i} username={player.username} avatarUrl={player.avatarUrl} region={player.region} />
        ))}
        {players.length === 0 && (
          <div style={{ padding: "16px 14px", fontSize: "0.75rem", color: "hsl(215,15%,35%)", textAlign: "center" }}>Aucun résultat</div>
        )}
      </div>
    </div>
  );
}

function PlayerEntry({ username, avatarUrl, region }: { username: string; avatarUrl: string; region: Region }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", transition: "background 0.1s", cursor: "default" }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ width: 26, height: 26, borderRadius: 4, overflow: "hidden", background: "hsl(220,13%,20%)", flexShrink: 0 }}>
        {!imgError
          ? <img src={avatarUrl} alt={username} width={26} height={26} style={{ display: "block" }} onError={() => setImgError(true)} />
          : <div style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: "#a78bfa" }}>{username.slice(0, 2).toUpperCase()}</div>
        }
      </div>
      <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "hsl(210,20%,88%)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{username}</span>
      <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: REGION_COLORS[region], color: "white", flexShrink: 0 }}>{region}</span>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("general");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGeneral = useMemo(() => {
    if (!searchQuery.trim()) return PLAYERS_GENERAL;
    return PLAYERS_GENERAL.filter(p => p.username.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const isGeneral = activeCategory === "general";
  const columns = isGeneral ? null : CATEGORY_COLUMNS[activeCategory as Exclude<Category, "general">];
  const activeCat = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <Layout>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>

        {/* Category Tabs */}
        <div style={{ background: "hsl(220,13%,12%)", border: "1px solid hsl(220,13%,18%)", borderRadius: 12, padding: "16px 20px", marginBottom: 28 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(""); }}
                data-testid={`tab-category-${cat.id}`}
                className="category-tab"
                style={activeCategory === cat.id ? { background: "#7c3aed", color: "white" } : {}}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title & Search */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f1f5f9", display: "flex", alignItems: "center", gap: 8 }}>
            <span>{activeCat?.icon}</span>
            {isGeneral ? `Classement Top ${filteredGeneral.length}` : `Classement ${activeCat?.label}`}
          </h1>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "hsl(215,15%,45%)" }} width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Rechercher un joueur..." className="search-input" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} data-testid="input-search-player" />
          </div>
        </div>

        {/* GÉNÉRAL — Table view */}
        {isGeneral && (
          <div style={{ background: "hsl(220,13%,12%)", border: "1px solid hsl(220,13%,18%)", borderRadius: 12, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(220,13%,20%)", background: "hsl(220,13%,14%)" }}>
                  {["#","JOUEUR","REGION","POINTS","TIERS"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700, color: "hsl(215,15%,50%)", letterSpacing: "0.08em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredGeneral.map((player, i) => <PlayerRow key={player.id} player={player} rank={i + 1} />)}
                {filteredGeneral.length === 0 && (
                  <tr><td colSpan={5} style={{ padding: "48px 20px", textAlign: "center", color: "hsl(215,15%,45%)", fontSize: "0.9rem" }}>Aucun joueur trouvé pour « {searchQuery} »</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Category — Column/Tier view */}
        {!isGeneral && columns && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", overflowX: "auto", paddingBottom: 8 }}>
            {columns.map(col => (
              <TierColumnCard key={col.tier} col={col} search={searchQuery} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
