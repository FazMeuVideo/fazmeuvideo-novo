// pages/sobre.js
import Head from 'next/head';
import Link from 'next/link';

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Sobre - FazMeuVídeo</title>
        <meta name="description" content="Conheça mais sobre o FazMeuVídeo!" />
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
        <h2 className="text-4xl font-bold text-green-600 mb-8">Sobre o FazMeuVídeo</h2>
        <p className="text-lg text-gray-700 mb-6">
          O FazMeuVídeo é uma plataforma brasileira que usa inteligência artificial pra tornar a criação de vídeos simples, rápida e acessível. Nosso objetivo é ajudar criadores de conteúdo, empreendedores e empresas a produzir vídeos incríveis pra TikTok, Reels e Shorts sem complicação e por um preço que cabe no bolso!
        </p>
        <p className="text-lg text-gray-700">
          Fundado em 2025, acreditamos que todo mundo merece contar suas histórias com vídeos de qualidade, sem precisar de equipamentos caros ou conhecimentos técnicos. Experimente e veja como é fácil!
        </p>
      </section>
    </div>
  );
}