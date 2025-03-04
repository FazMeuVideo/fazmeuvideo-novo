// pages/politica.js
import Head from 'next/head';
import Link from 'next/link';

export default function Politica() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Política de Privacidade - FazMeuVídeo</title>
        <meta name="description" content="Política de Privacidade do FazMeuVídeo" />
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
        <h2 className="text-4xl font-bold text-green-600 mb-8">Política de Privacidade</h2>
        <p className="text-lg text-gray-700 mb-6">
          No FazMeuVídeo, sua privacidade é nossa prioridade. Coletamos apenas os dados necessários pra oferecer o serviço, como seu e-mail e texto inserido pra gerar vídeos. Não compartilhamos suas informações com terceiros, exceto pra processar pagamentos (via Mercado Pago) ou cumprir obrigações legais.
        </p>
        <p className="text-lg text-gray-700">
          Usamos cookies pra melhorar sua experiência e armazenamos seus vídeos temporariamente em servidores seguros (AWS S3 ou Firebase). Você pode entrar em contato conosco em qualquer momento pra excluir seus dados. Veja mais detalhes em nossa página de Termos!
        </p>
      </section>
    </div>
  );
}