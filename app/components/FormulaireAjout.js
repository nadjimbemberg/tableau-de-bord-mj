"use client";

import { useState } from "react";

export default function FormulaireAjout({ onAjout }) {
  const [nom, setNom] = useState("");
  const [classe, setClasse] = useState("");
  const [niveau, setNiveau] = useState(1);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  async function gererEnvoi(e) {
    e.preventDefault();
    setErreur("");
    setSucces("");

    if (nom.trim() === "" || classe.trim() === "" || Number(niveau) < 1) {
      setErreur("Il faut un nom, une classe et un niveau d'au moins 1.");
      return;
    }

    try {
      const message = await onAjout({
        nom: nom.trim(),
        classe: classe.trim(),
        niveau: Number(niveau),
      });

      setSucces(message);
      setNom("");
      setClasse("");
      setNiveau(1);
    } catch (err) {
      setErreur(err.message);
    }
  }

  return (
    <form className="formulaire" onSubmit={gererEnvoi}>
      <label>
        Nom
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      </label>

      <label>
        Classe
        <input type="text" value={classe} onChange={(e) => setClasse(e.target.value)} />
      </label>

      <label>
        Niveau
        <input type="number" min="1" value={niveau} onChange={(e) => setNiveau(e.target.value)} />
      </label>

      <button type="submit">Créer le PNJ</button>

      {erreur && <p className="erreur">{erreur}</p>}
      {succes && <p className="succes">{succes}</p>}
    </form>
  );
}
