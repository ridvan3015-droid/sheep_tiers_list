import { Layout } from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <div style={{ maxWidth: 760, margin: "48px auto", padding: "0 20px" }}>
        <div style={{ background: "hsl(220,13%,13%)", border: "1px solid hsl(220,13%,20%)", borderRadius: 12, padding: "40px 48px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 20, color: "#a78bfa" }}>
            À Propos de E Sheep Tier MC
          </h1>
          <p style={{ color: "hsl(215,15%,65%)", lineHeight: 1.8, marginBottom: 16 }}>
            E Sheep Tier MC est un classement communautaire non officiel dédié aux meilleurs joueurs Minecraft PvP francophones.
          </p>
          <p style={{ color: "hsl(215,15%,65%)", lineHeight: 1.8, marginBottom: 16 }}>
            Retrouve les meilleurs joueurs classés par catégorie : Crystal PvP, Sword, UHC, Pot PvP, NethPot, SMP, Axe, DiaSMP et Mace. Chaque joueur se voit attribuer un ou plusieurs tiers selon ses performances.
          </p>
          <p style={{ color: "hsl(215,15%,65%)", lineHeight: 1.8 }}>
            Le système de tiers suit les conventions habituelles : HT (High Tier), LT (Low Tier) et leurs variantes Ranked (RHT, RLT).
          </p>
        </div>
      </div>
    </Layout>
  );
}
