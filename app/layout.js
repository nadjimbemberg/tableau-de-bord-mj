import "./globals.css";

export const metadata = {
  title: "Tableau de bord du MJ",
  description: "L'interface d'administration du Maître du Jeu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
