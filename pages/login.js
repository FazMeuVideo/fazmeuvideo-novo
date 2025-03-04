import { useState } from 'react';
import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });
    if (result.error) {
      setError(result.error);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <Head>
        <title>Login - FazMeuVídeo</title>
      </Head>
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Faça Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white text-gray-700 p-3 mb-6 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100 transition duration-300"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Icon"
            className="w-5 h-5 mr-2"
          />
          Login com Google
        </button>
        <p className="text-center text-gray-600 mb-4">Ou faça login com email</p>
        <form onSubmit={handleEmailLogin}>
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
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Não tem conta? <Link href="/cadastro" className="text-blue-500 hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}