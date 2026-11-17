import FormulaireConnexion from "./components/FormulaireConnexion";


export default function PageConnexion() {
  return (
    <main>
      <h1>Tableau de bord du MJ</h1>
      <p className="sous-titre">Connexion réservée au Maître du Jeu</p>
      <FormulaireConnexion />
    </main>
  );
}
