export default function CartePnj({ pnj }) {
  return (
    <article className={pnj.statut === "vivant" ? "carte" : "carte mort"}>
      <h3>{pnj.nom}</h3>
      <p>{pnj.classe || "Civil"}</p>
      <p>Niveau {pnj.niveau}</p>
      <p className="statut">{pnj.statut}</p>
    </article>
  );
}
