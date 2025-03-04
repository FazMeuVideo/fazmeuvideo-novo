import { useState } from 'react';
import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailCadastro = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const loginResponse = await signIn('credentials', {
          redirect: false,
          email,
          password
        });
        if (loginResponse.ok) {
          router.push('/dashboard');
        } else {
          setError('Erro ao fazer login após cadastro');
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  const handleGoogleCadastro = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <Head>
        <title>Cadastro - FazMeuVídeo</title>
      </Head>
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Cadastre-se</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleGoogleCadastro}
          className="w-full flex items-center justify-center bg-white text-gray-700 p-3 mb-6 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100 transition duration-300"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Icon"
            className="w-5 h-5 mr-2"
          />
          Cadastrar com Google
        </button>
        <p className="text-center text-gray-600 mb-4">Ou cadastre-se com email</p>
        <form onSubmit={handleEmailCadastro}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Cadastrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Já tem conta? <Link href="/login" className="text-blue-500 hover:underline">Faça login</Link>
        </p>
      </div>
    </div>
  );
}