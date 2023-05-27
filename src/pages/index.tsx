import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Head from "next/head";
import Image from "next/image";
import logo from "../../public/sua_pizza.png";
import styles from "../../styles/home.module.scss";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { toast } from "react-toastify";
import { canSSRGuest } from "../utils/canSSRGuest";
import Link from "next/link";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo" width={300} height={65} />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Entrar
            </Button>
          </form>

          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? Cadastre-se!</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
