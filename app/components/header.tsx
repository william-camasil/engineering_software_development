import Image from "next/image";
import logo from "../assets/images/logo/logo.png";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/");
  };

  const handleGoToLogin = () => {
    router.push("/");
  };

  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoTextContainer}>
        <Image src={logo} alt="Logo do Meu Site" width={124} height={124} />
        <p className={styles.logoText}>TaskFlow</p>
      </div>

      {pathname === "/dashboard" && (
        <button className={styles.logoutButton} onClick={handleLogout}>
          Sair
        </button>
      )}

      {pathname === "/register" && (
        <button className={styles.loginButton} onClick={handleGoToLogin}>
          Ir para Login
        </button>
      )}
    </div>
  );
};

export default Header;
