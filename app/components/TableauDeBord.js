"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { creerPnj, recupererPnjs } from "../../lib/api";
import CartePnj from "./CartePnj";
import FormulaireAjout from "./FormulaireAjout";

export default function TableauDeBord() {
  const router = useRouter();
  const [pnjs, setPnjs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  // Se lance une seule fois, au moment où l'écran s'affiche
  useEffect(() => {
    // Pas de token = pas connecté : retour à la connexion, sans rien charger ni afficher
    if (!localStorage.getItem("token")) {
      router.replace("/");
      return;
    }

    async function chargerPnjs() {
      try {
        const donnees = await recupererPnjs();
        setPnjs(donnees);
      } catch (err) {
        setErreur(err.message);
      } finally {
        setChargement(false);
      }
    }

    chargerPnjs();
  }, [router]);

  function seDeconnecter() {
    localStorage.removeItem("token");
    router.push("/");
  }

  async function ajouterPnj(nouveauPnj) {
    // On relit le token juste avant l'envoi : il a pu être supprimé entre-temps
    const token = localStorage.getItem("token");

    try {
      const reponse = await creerPnj(nouveauPnj, token);
      setPnjs([...pnjs, reponse.pnj]);
      return reponse.message;
    } catch (err) {
      // 401 ou 403 : l'API a refusé le token, la session n'est plus valable
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem("token");
        alert("Ta session n'est plus valide. Reconnecte-toi pour créer un PNJ.");
        router.push("/");
      }
      throw err;
    }
  }

  if (chargement) {
    return <p className="chargement">Chargement des PNJ...</p>;
  }

  if (erreur) {
    return <p className="erreur">{erreur}</p>;
  }

  return (
    <section>
      <div className="barre-session">
        <span>Connecté en tant que Maître du Jeu</span>
        <button type="button" onClick={seDeconnecter}>
          Se déconnecter
        </button>
      </div>

      <h1>Tableau de bord du MJ</h1>

      <h2>Créer un PNJ</h2>
      <FormulaireAjout onAjout={ajouterPnj} />

      <h2>Mes PNJ ({pnjs.length})</h2>
      <div className="grille">
        {pnjs.map((pnj) => (
          <CartePnj key={pnj.id} pnj={pnj} />
        ))}
      </div>
    </section>
  );
}
