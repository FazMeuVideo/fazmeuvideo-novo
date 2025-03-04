// pages/contato.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Contato() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:Fazmeuvideo1@gmail.com?subject=Contato de ${name}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    setSent(true);
    setTimeout(() => setSent(false), 3000); // Reseta após 3 segundos
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Contato - FazMeuVídeo</title>
        <meta name="description" content="Entre em contato com o FazMeuVídeo!" />
      </Head>

      <header className="fixed top-0 w-full bg-green-600 p-6 flex justify-between items-center shadow-xl z-10">
        <div className="flex items-center">
          <img src="/logo.png" alt="FazMeuVídeo Logo" width={80} height={80} className="object-contain" />
          <h1 className="text-white text-3xl font-extrabold ml-4">FazMeuVídeo</h1>
        </div>
        <nav className="space-x-8">
          <Link href="/" className="text-white text-lg font-semibold hover:text-orange-400 transition duration-300">Início</Link>
          <a href="#planos" target="_blank" className="text-white text-lg font-semibold hover:text-orange-400 transition duration-300">Planos</a>
          <a href="#faq" target="_blank" className="text-white text-lg font-semibold hover:text-orange-400 transition duration-300">FAQ</a>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-8 animate-fade-in">Entre em Contato!</h2>
        <p className="text-lg text-gray-700 mb-10">Envie sua mensagem diretamente pra gente pelo e-mail Fazmeuvideo1@gmail.com!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full p-4 border rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500 bg-white text-lg"
              required
            />
          </div>
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Sua mensagem"
              className="w-full p-4 border rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500 bg-white text-lg"
              rows="6"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-lg animate-bounce"
          >
            Enviar Mensagem
          </button>
          {sent && (
            <p className="mt-4 text-green-600 text-lg animate-fade-in">Enviando sua mensagem...</p>
          )}
        </form>
      </section>
    </div>
  );
}