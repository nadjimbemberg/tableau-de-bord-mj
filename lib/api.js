
const API_URL = "http://localhost:3000";


async function appelerApi(chemin, options) {
  let reponse;

  try {
    reponse = await fetch(API_URL + chemin, options);
  } catch {
    throw new Error("Impossible de joindre l'API. Vérifie qu'elle est bien lancée (npm run dev).");
  }

  // Si le serveur ne renvoie pas de JSON, on prend un objet vide
  const donnees = await reponse.json().catch(() => ({}));

  if (!reponse.ok) {
    const erreur = new Error(donnees.message || donnees.erreur || "Erreur " + reponse.status);
    erreur.status = reponse.status;
    throw erreur;
  }

  return donnees;
}

export async function seConnecter(email, password) {
  const donnees = await appelerApi("/api/connexion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return donnees.token;
}

export function recupererPnjs() {
  return appelerApi("/api/pnj");
}

// Route protégée : on prouve son identité avec le token dans l'en-tête Authorization
export function creerPnj(pnj, token) {
  return appelerApi("/api/pnj", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(pnj),
  });
}
