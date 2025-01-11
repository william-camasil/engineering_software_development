import Image from "next/image";
import logo from "../assets/images/logo/logo.png";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Para pegar o pathname atual
import styles from "./header.module.css";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // Obtém a URL atual

  const handleLogout = () => {
    router.push("/"); // Navega para a página de login
  };

  const handleGoToLogin = () => {
    router.push("/"); // Navega para a página de login
  };

  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoTextContainer}>
        <Image src={logo} alt="Logo do Meu Site" width={124} height={124} />
        <p className={styles.logoText}>TaskFlow</p>
      </div>

      {/* Exibe o botão de Logout apenas no Dashboard */}
      {pathname === "/dashboard" && (
        <button className={styles.logoutButton} onClick={handleLogout}>
          Sair
        </button>
      )}

      {/* Exibe o botão de Login apenas no Register */}
      {pathname === "/register" && (
        <button className={styles.loginButton} onClick={handleGoToLogin}>
          Ir para Login
        </button>
      )}
    </div>
  );
};

export default Header;
