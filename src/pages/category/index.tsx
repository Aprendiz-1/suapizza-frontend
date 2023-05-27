import { FormEvent, useState } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if(name === '') {
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name,
        });

        toast.success('Categoria cadastrada com sucesso!');
        setName('');
    };

    return (
        <>
            <Head>
                <title>Nova categoria - Sujeito Pizzaria</title>
            </Head>

            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Cadastrar categoria</h1>

                    <form onSubmit={handleRegister} className={styles.form}>
                        <input
                            type='text'
                            placeholder='Digite o nome da categoria'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />

                        <button type='submit' className={styles.buttonAdd}>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {},
    }
});