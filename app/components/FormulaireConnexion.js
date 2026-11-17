"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { seConnecter } from "../../lib/api";

export default function FormulaireConnexion() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  // Déjà connecté (le token est encore dans le navigateur) : direction le tableau de bord
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.replace("/tableau-de-bord");
    }
  }, [router]);

  async function gererEnvoi(e) {
    e.preventDefault();
    setErreur("");

    if (email.trim() === "" || password === "") {
      setErreur("Email et mot de passe obligatoires.");
      return;
    }

    setEnvoiEnCours(true);

    try {
      const token = await seConnecter(email.trim(), password);

      // Le localStorage garde le token même après un rafraîchissement de la page
      localStorage.setItem("token", token);
      router.push("/tableau-de-bord");
    } catch (err) {
      setErreur(err.message);
      setEnvoiEnCours(false);
    }
  }

  return (
    <form className="formulaire connexion" onSubmit={gererEnvoi}>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>
        Mot de passe
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <button type="submit" disabled={envoiEnCours}>
        {envoiEnCours ? "Vérification..." : "Se connecter"}
      </button>

      {erreur && <p className="erreur">{erreur}</p>}
    </form>
  );
}
