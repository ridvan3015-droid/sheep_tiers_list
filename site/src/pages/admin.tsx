import { useState } from "react";
import { PLAYERS_GENERAL, Player, Region, TierBadge, CATEGORIES } from "@/lib/data";

const ADMIN_USER = "admin";
const ADMIN_PASS = "sheeptiers";

const REGION_OPTIONS: Region[] = ["EU", "NA", "AS", "SA", "OC"];

const TIER_OPTIONS = ["HT1","HT2","HT3","LT1","LT2","LT3","RHT1","RHT2","RLT1","RLT2"];
const TIER_COLORS: Record<string, string> = {
  HT1: "#7c3aed", HT2: "#7c3aed", HT3: "#7c3aed",
  LT1: "#2563eb", LT2: "#2563eb", LT3: "#2563eb",
  RHT1: "#059669", RHT2: "#059669",
  RLT1: "#d97706", RLT2: "#d97706",
};
const CAT_ICONS: Record<string, string> = {
  crystal:"💎", sword:"⚔️", uhc:"❤️", pot:"🧪", nethpot:"🟣", smp:"🌍", axe:"🪓", diasmp:"💠", mace:"🔨"
};

const REGION_COLORS: Record<Region, string> = {
  EU: "#16a34a", NA: "#2563eb", AS: "#d97706", SA: "#dc2626", OC: "#7c3aed",
};

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      onLogin();
    } else {
      setError("Identifiants incorrects.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "hsl(220,13%,9%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "hsl(220,13%,13%)", border: "1px solid hsl(220,13%,20%)", borderRadius: 12, padding: "40px 48px", width: 380 }}>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <span style={{
            fontSize: "1.4rem", fontWeight: 900,
            background: "linear-gradient(90deg,#6b7280 0%,#d1d5db 40%,#ffffff 70%,#e5e7eb 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
          }}>sheep tier mc</span>
          <p style={{ color: "hsl(215,15%,50%)", fontSize: "0.8rem", marginTop: 6 }}>Panneau d'administration</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "hsl(215,15%,55%)", marginBottom: 6, letterSpacing: "0.05em" }}>IDENTIFIANT</label>
            <input
              type="text"
              value={user}
              onChange={e => setUser(e.target.value)}
              placeholder="admin"
              data-testid="input-admin-user"
              style={{ width: "100%", background: "hsl(220,13%,16%)", border: "1px solid hsl(220,13%,22%)", borderRadius: 8, padding: "9px 12px", color: "hsl(210,20%,92%)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "hsl(215,15%,55%)", marginBottom: 6, letterSpacing: "0.05em" }}>MOT DE PASSE</label>
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="••••••••"
              data-testid="input-admin-pass"
              style={{ width: "100%", background: "hsl(220,13%,16%)", border: "1px solid hsl(220,13%,22%)", borderRadius: 8, padding: "9px 12px", color: "hsl(210,20%,92%)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          {error && <p style={{ color: "#f87171", fontSize: "0.78rem", textAlign: "center" }}>{error}</p>}
          <button
            type="submit"
            data-testid="button-admin-login"
            style={{ marginTop: 4, padding: "10px", borderRadius: 8, background: "#7c3aed", color: "white", fontWeight: 700, fontSize: "0.875rem", border: "none", cursor: "pointer" }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

interface EditablePlayer extends Player {
  newTierCat: string;
  newTierVal: string;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [players, setPlayers] = useState<Player[]>(() => [...PLAYERS_GENERAL]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Player>>({});
  const [addMode, setAddMode] = useState(false);
  const [newPlayer, setNewPlayer] = useState<Omit<Player, "id">>({ username: "", avatarUrl: "", region: "EU", points: 0, tiers: [] });
  const [newTierCat, setNewTierCat] = useState("crystal");
  const [newTierVal, setNewTierVal] = useState("HT1");
  const [editNewTierCat, setEditNewTierCat] = useState("crystal");
  const [editNewTierVal, setEditNewTierVal] = useState("HT1");

  const startEdit = (p: Player) => {
    setEditId(p.id);
    setEditData({ ...p, tiers: [...p.tiers] });
    setEditNewTierCat("crystal");
    setEditNewTierVal("HT1");
  };

  const saveEdit = () => {
    setPlayers(prev => prev.map(p => p.id === editId ? { ...p, ...editData } as Player : p));
    setEditId(null);
  };

  const deletePlayer = (id: number) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  const addTierToEdit = () => {
    const icon = CAT_ICONS[editNewTierCat] ?? "🎮";
    const badge: TierBadge = { category: editNewTierCat, icon, tier: editNewTierVal, color: TIER_COLORS[editNewTierVal] ?? "#6b7280" };
    setEditData(prev => ({ ...prev, tiers: [...(prev.tiers ?? []), badge] }));
  };

  const removeTierFromEdit = (i: number) => {
    setEditData(prev => ({ ...prev, tiers: (prev.tiers ?? []).filter((_, idx) => idx !== i) }));
  };

  const addTierToNew = () => {
    const icon = CAT_ICONS[newTierCat] ?? "🎮";
    const badge: TierBadge = { category: newTierCat, icon, tier: newTierVal, color: TIER_COLORS[newTierVal] ?? "#6b7280" };
    setNewPlayer(prev => ({ ...prev, tiers: [...prev.tiers, badge] }));
  };

  const removeTierFromNew = (i: number) => {
    setNewPlayer(prev => ({ ...prev, tiers: prev.tiers.filter((_, idx) => idx !== i) }));
  };

  const submitAdd = () => {
    if (!newPlayer.username.trim()) return;
    const id = Math.max(0, ...players.map(p => p.id)) + 1;
    const avatar = `https://mc-heads.net/avatar/${newPlayer.username}/40`;
    setPlayers(prev => [...prev, { ...newPlayer, id, avatarUrl: avatar }]);
    setNewPlayer({ username: "", avatarUrl: "", region: "EU", points: 0, tiers: [] });
    setAddMode(false);
  };

  const inputStyle: React.CSSProperties = { background: "hsl(220,13%,16%)", border: "1px solid hsl(220,13%,22%)", borderRadius: 6, padding: "5px 9px", color: "hsl(210,20%,92%)", fontSize: "0.82rem", outline: "none" };
  const selectStyle: React.CSSProperties = { ...inputStyle };

  return (
    <div style={{ minHeight: "100vh", background: "hsl(220,13%,9%)", fontFamily: "'Inter',system-ui,sans-serif", color: "hsl(210,20%,92%)" }}>
      {/* Admin Header */}
      <header style={{ background: "hsl(220,13%,11%)", borderBottom: "1px solid hsl(220,13%,18%)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{
            fontSize: "1.3rem", fontWeight: 900,
            background: "linear-gradient(90deg,#6b7280 0%,#d1d5db 40%,#ffffff 70%,#e5e7eb 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
          }}>sheep tier mc</span>
          <span style={{ background: "#7c3aed", color: "white", fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.08em" }}>ADMIN</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href="/" style={{ color: "hsl(215,15%,55%)", fontSize: "0.8rem", textDecoration: "none" }}>← Retour au site</a>
          <button onClick={onLogout} data-testid="button-logout" style={{ padding: "6px 14px", borderRadius: 6, background: "hsl(220,13%,20%)", color: "hsl(215,15%,65%)", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>
            Déconnexion
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 800 }}>Gestion des joueurs <span style={{ color: "hsl(215,15%,50%)", fontWeight: 400, fontSize: "0.9rem" }}>({players.length} joueurs)</span></h1>
          <button onClick={() => setAddMode(true)} data-testid="button-add-player" style={{ padding: "8px 16px", borderRadius: 8, background: "#7c3aed", color: "white", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}>
            + Ajouter un joueur
          </button>
        </div>

        {/* Add player form */}
        {addMode && (
          <div style={{ background: "hsl(220,13%,13%)", border: "1px solid hsl(258,90%,55%)", borderRadius: 10, padding: 20, marginBottom: 20 }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 14, color: "#a78bfa" }}>Nouveau joueur</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", color: "hsl(215,15%,50%)", marginBottom: 3 }}>Pseudo</label>
                <input data-testid="input-new-username" style={inputStyle} value={newPlayer.username} onChange={e => setNewPlayer(p => ({ ...p, username: e.target.value }))} placeholder="Username" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", color: "hsl(215,15%,50%)", marginBottom: 3 }}>Points</label>
                <input data-testid="input-new-points" style={{ ...inputStyle, width: 80 }} type="number" value={newPlayer.points} onChange={e => setNewPlayer(p => ({ ...p, points: +e.target.value }))} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", color: "hsl(215,15%,50%)", marginBottom: 3 }}>Région</label>
                <select data-testid="select-new-region" style={selectStyle} value={newPlayer.region} onChange={e => setNewPlayer(p => ({ ...p, region: e.target.value as Region }))}>
                  {REGION_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 10 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", color: "hsl(215,15%,50%)", marginBottom: 3 }}>Catégorie</label>
                <select style={selectStyle} value={newTierCat} onChange={e => setNewTierCat(e.target.value)}>
                  {CATEGORIES.filter(c => c.id !== "general").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", color: "hsl(215,15%,50%)", marginBottom: 3 }}>Tier</label>
                <select style={selectStyle} value={newTierVal} onChange={e => setNewTierVal(e.target.value)}>
                  {TIER_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <button onClick={addTierToNew} style={{ padding: "5px 12px", borderRadius: 6, background: "hsl(220,13%,22%)", color: "white", border: "none", cursor: "pointer", fontSize: "0.78rem" }}>+ Tier</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
              {newPlayer.tiers.map((t, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, background: t.color, color: "white", fontSize: "0.68rem", fontWeight: 700 }}>
                  {t.icon} {t.tier}
                  <button onClick={() => removeTierFromNew(i)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: 0, lineHeight: 1, marginLeft: 2, opacity: 0.7 }}>×</button>
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={submitAdd} data-testid="button-confirm-add" style={{ padding: "7px 16px", borderRadius: 7, background: "#7c3aed", color: "white", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}>Confirmer</button>
              <button onClick={() => setAddMode(false)} style={{ padding: "7px 14px", borderRadius: 7, background: "hsl(220,13%,20%)", color: "hsl(215,15%,65%)", border: "none", cursor: "pointer", fontSize: "0.82rem" }}>Annuler</button>
            </div>
          </div>
        )}

        {/* Players table */}
        <div style={{ background: "hsl(220,13%,12%)", border: "1px solid hsl(220,13%,18%)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "hsl(220,13%,15%)", borderBottom: "1px solid hsl(220,13%,20%)" }}>
                {["#","JOUEUR","RÉGION","POINTS","TIERS","ACTIONS"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, color: "hsl(215,15%,50%)", letterSpacing: "0.08em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id} data-testid={`admin-row-${player.id}`} style={{ borderBottom: "1px solid hsl(220,13%,15%)" }}>
                  <td style={{ padding: "8px 14px", color: "hsl(215,15%,50%)", fontSize: "0.85rem" }}>{index + 1}</td>
                  <td style={{ padding: "8px 14px" }}>
                    {editId === player.id ? (
                      <input style={{ ...inputStyle, width: 140 }} value={(editData.username ?? player.username)} onChange={e => setEditData(p => ({ ...p, username: e.target.value }))} data-testid={`input-edit-username-${player.id}`} />
                    ) : (
                      <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{player.username}</span>
                    )}
                  </td>
                  <td style={{ padding: "8px 14px" }}>
                    {editId === player.id ? (
                      <select style={selectStyle} value={(editData.region ?? player.region)} onChange={e => setEditData(p => ({ ...p, region: e.target.value as Region }))} data-testid={`select-edit-region-${player.id}`}>
                        {REGION_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    ) : (
                      <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 4, background: REGION_COLORS[player.region], color: "white", fontSize: "0.65rem", fontWeight: 700 }}>{player.region}</span>
                    )}
                  </td>
                  <td style={{ padding: "8px 14px" }}>
                    {editId === player.id ? (
                      <input style={{ ...inputStyle, width: 70 }} type="number" value={(editData.points ?? player.points)} onChange={e => setEditData(p => ({ ...p, points: +e.target.value }))} data-testid={`input-edit-points-${player.id}`} />
                    ) : (
                      <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem" }}>{player.points} pts</span>
                    )}
                  </td>
                  <td style={{ padding: "8px 14px" }}>
                    {editId === player.id ? (
                      <div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 6 }}>
                          {(editData.tiers ?? []).map((t, i) => (
                            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 4, background: t.color, color: "white", fontSize: "0.65rem", fontWeight: 700 }}>
                              {t.icon} {t.tier}
                              <button onClick={() => removeTierFromEdit(i)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: 0, lineHeight: 1, opacity: 0.8 }}>×</button>
                            </span>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                          <select style={{ ...selectStyle, fontSize: "0.7rem" }} value={editNewTierCat} onChange={e => setEditNewTierCat(e.target.value)}>
                            {CATEGORIES.filter(c => c.id !== "general").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                          </select>
                          <select style={{ ...selectStyle, fontSize: "0.7rem" }} value={editNewTierVal} onChange={e => setEditNewTierVal(e.target.value)}>
                            {TIER_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <button onClick={addTierToEdit} style={{ padding: "3px 8px", borderRadius: 4, background: "hsl(220,13%,22%)", color: "white", border: "none", cursor: "pointer", fontSize: "0.7rem" }}>+</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                        {player.tiers.map((t, i) => (
                          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 2, padding: "2px 6px", borderRadius: 4, background: t.color, color: "white", fontSize: "0.65rem", fontWeight: 700 }}>
                            {t.icon} {t.tier}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "8px 14px" }}>
                    {editId === player.id ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={saveEdit} data-testid={`button-save-${player.id}`} style={{ padding: "4px 10px", borderRadius: 5, background: "#059669", color: "white", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600 }}>Sauvegarder</button>
                        <button onClick={() => setEditId(null)} style={{ padding: "4px 8px", borderRadius: 5, background: "hsl(220,13%,20%)", color: "hsl(215,15%,65%)", border: "none", cursor: "pointer", fontSize: "0.75rem" }}>Annuler</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => startEdit(player)} data-testid={`button-edit-${player.id}`} style={{ padding: "4px 10px", borderRadius: 5, background: "#2563eb", color: "white", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600 }}>Modifier</button>
                        <button onClick={() => deletePlayer(player.id)} data-testid={`button-delete-${player.id}`} style={{ padding: "4px 10px", borderRadius: 5, background: "#dc2626", color: "white", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600 }}>Supprimer</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return <Dashboard onLogout={() => setLoggedIn(false)} />;
}
