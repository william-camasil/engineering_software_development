import "./globals.css";

export const metadata = {
  title: "TaskFlow",
  description: "Aplicação para gerenciar login, registro e dashboard.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
