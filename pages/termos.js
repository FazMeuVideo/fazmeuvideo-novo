// pages/termos.js
import Head from 'next/head';
import Link from 'next/link';

export default function Termos() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Termos de Uso - FazMeuVídeo</title>
        <meta name="description" content="Termos de Uso do FazMeuVídeo" />
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

      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-600 mb-8">Termos de Uso</h2>
        <p className="text-lg text-gray-700 mb-6">
          Ao usar o FazMeuVídeo, você concorda que os vídeos gerados são sua responsabilidade. Oferecemos planos grátis e pagos (R$14,90, R$29,90, R$79,90/mês) com limites claros: 1 vídeo/dia no grátis, até ilimitado no Empresarial. Você mantém os direitos dos vídeos pagos, mas não pode revender nosso serviço.
        </p>
        <p className="text-lg text-gray-700">
          Reservamo-nos o direito de suspender contas por uso indevido (ex.: spam, conteúdo ilegal). Pagamentos são via Mercado Pago, e cancelamentos podem ser feitos a qualquer momento. Qualquer dúvida, entre em contato pelo suporte!
        </p>
      </section>
    </div>
  );
}