import { useState, useContext, FormEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import logo from "../../../public/sua_pizza.png";
import styles from "../../../styles/home.module.scss";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.error("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo" width={300} height={65} />

        <div className={styles.login}>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              Cadastrar
            </Button>
          </form>

          <Link href="/">
            <a className={styles.text}>Já possui uma conta? Entre!</a>
          </Link>
        </div>
      </div>
    </>
  );
}
