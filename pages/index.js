import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden">
      <Head>
        <title>FazMeuVídeo - Gere Vídeos com IA</title>
        <meta name="description" content="Crie vídeos incríveis com IA a partir de texto!" />
      </Head>

      <header className="fixed top-0 w-full bg-green-600 p-6 flex flex-wrap justify-between items-center shadow-xl z-10">
        <div className="flex items-center">
          <Image src="/images/geral/logo.png" alt="FazMeuVídeo Logo" width={80} height={80} className="object-contain" />
          <h1 className="text-white text-3xl font-extrabold ml-4">FazMeuVídeo</h1>
        </div>
        <nav className="flex flex-wrap items-center space-x-4 md:space-x-8 mt-4 md:mt-0">
          <Link href="/" className="text-white text-lg font-semibold hover:text-orange-400 transition duration-300">Início</Link>
          <a href="#planos" className="text-white text-lg font-semibold hover:text-orange-400 transition duration-300">Planos</a>
          <a href="#faq" className="text-white text-lg font-semibold hover:text-orange-400 transition duration-300">FAQ</a>
          <Link href="/cadastro" className="text-white text-lg font-semibold hover:text-orange-400 transition duration-300">Cadastrar</Link>
          <Link href="/login" className="text-white text-lg font-semibold hover:text-orange-400 transition duration-300">Login</Link>
          <Link href="/dashboard" className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 hover:scale-105 active:scale-95 transition duration-300 shadow-md whitespace-nowrap">Comece Grátis</Link>
        </nav>
      </header>

      <section className="pt-32 pb-20 bg-cover bg-center text-center text-white relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1628258334105-4a0da3f16311')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/30 via-green-700/30 to-orange-700/30 z-0"></div>
        <div className="relative z-10 bg-opacity-70 py-20">
          <h2 className="text-6xl md:text-7xl font-extrabold animate-fade-in">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">Crie vídeos incríveis</span>
            <span className="text-white drop-shadow-2xl"> com IA em minutos!</span>
          </h2>
          <p className="text-2xl md:text-3xl mt-6 max-w-4xl mx-auto text-black drop-shadow-md">Transforme seu texto em vídeos para TikTok, Reels e Shorts com o jeito mais barato e fácil do Brasil!</p>
          <Link href="/dashboard" className="mt-10 inline-block bg-orange-500 text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-orange-600 animate-pulse shadow-xl">Gerar Vídeo Agora</Link>
        </div>
        <div className="absolute top-10 left-10 w-16 h-16 bg-orange-400 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
      </section>

      <section className="py-20 bg-white text-center">
        <h3 className="text-4xl font-bold text-green-600 mb-12">Como Funciona</h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          <div className="p-8 bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-200">
            <Image src="/images/estilizacao/digite-seu-texto.png" alt="Digite seu texto" width={300} height={200} className="rounded-lg mb-4" />
            <p className="text-lg font-bold text-gray-800">1. Digite seu texto</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-green-200 to-green-400 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-200">
            <Image src="/images/estilizacao/ia-gera-video.png" alt="IA gera o vídeo" width={300} height={200} className="rounded-lg mb-4" />
            <p className="text-lg font-bold text-gray-800">2. A IA gera o vídeo</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-orange-200 to-orange-400 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-200">
            <Image src="/images/estilizacao/baixe-compartilhe.png" alt="Baixe e compartilhe" width={300} height={200} className="rounded-lg mb-4" />
            <p className="text-lg font-bold text-gray-800">3. Baixe e compartilhe</p>
          </div>
        </div>
      </section>

      <section id="planos" className="py-20 text-center bg-gradient-to-r from-blue-100 via-green-100 to-orange-100">
        <h3 className="text-4xl font-bold text-green-600 mb-12">Nossos Planos - O Mais Barato do Mercado!</h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">
          <div className="p-8 bg-gradient-to-br from-white to-blue-100 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition duration-300 border-t-4 border-blue-500 relative">
            <h4 className="text-2xl font-bold text-blue-600">Grátis</h4>
            <p className="mt-2 text-gray-700 text-lg font-semibold">R$ 0<span className="text-sm">/mês</span></p>
            <ul className="mt-4 text-gray-600 text-lg space-y-2">
              <li>✔ 1 vídeo por dia</li>
              <li>✔ Com marca d’água</li>
              <li>✔ Teste sem custo</li>
            </ul>
            <button className="mt-6 w-full bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 px-6 py-3 rounded-full text-lg font-semibold hover:from-gray-400 hover:to-gray-500 hover:scale-105 active:scale-95 transition duration-300">Experimente</button>
          </div>
          <div className="p-8 bg-gradient-to-br from-white to-orange-100 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition duration-300 border-t-4 border-orange-500">
            <h4 className="text-2xl font-bold text-orange-600">Inicial</h4>
            <p className="mt-2 text-gray-700 text-lg font-semibold">R$ 14,90<span className="text-sm">/mês</span></p>
            <ul className="mt-4 text-gray-600 text-lg space-y-2">
              <li>✔ 5 vídeos por dia</li>
              <li>✔ Sem marca d’água</li>
              <li>✔ Resolução HD</li>
            </ul>
            <button className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-orange-700 hover:scale-105 active:scale-95 transition duration-300">Assine</button>
          </div>
          <div className="p-8 bg-gradient-to-br from-white to-blue-200 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition duration-300 border-t-4 border-blue-600 relative">
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">Mais Popular</span>
            <h4 className="text-2xl font-bold text-blue-600">Pro</h4>
            <p className="mt-2 text-gray-700 text-lg font-semibold">R$ 29,90<span className="text-sm">/mês</span></p>
            <ul className="mt-4 text-gray-600 text-lg space-y-2">
              <li>✔ 15 vídeos por dia</li>
              <li>✔ Full HD</li>
              <li>✔ Templates exclusivos</li>
            </ul>
            <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-700 hover:scale-105 active:scale-95 transition duration-300">Assine</button>
          </div>
          <div className="p-8 bg-gradient-to-br from-white to-green-100 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition duration-300 border-t-4 border-green-700">
            <h4 className="text-2xl font-bold text-green-700">Empresarial</h4>
            <p className="mt-2 text-gray-700 text-lg font-semibold">R$ 79,90<span className="text-sm">/mês</span></p>
            <ul className="mt-4 text-gray-600 text-lg space-y-2">
              <li>✔ Vídeos ilimitados</li>
              <li>✔ Full HD e 4K</li>
              <li>✔ Suporte prioritário</li>
            </ul>
            <button className="mt-6 w-full bg-gradient-to-r from-green-700 to-green-800 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-green-800 hover:to-green-900 hover:scale-105 active:scale-95 transition duration-300">Assine</button>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white text-center">
        <h3 className="text-4xl font-bold text-green-600 mb-12">Perguntas Frequentes</h3>
        <div className="max-w-4xl mx-auto space-y-8 px-6">
          <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h4 className="text-xl font-semibold text-orange-500">Como o FazMeuVídeo funciona?</h4>
            <p className="mt-2 text-gray-700">Digite seu texto, clique em "Gerar Vídeo" e nossa IA cria um vídeo incrível em minutos, pronto pra TikTok, Reels ou Shorts!</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h4 className="text-xl font-semibold text-orange-500">Por que vocês são os mais baratos?</h4>
            <p className="mt-2 text-gray-700">Queremos que todos no Brasil possam criar vídeos incríveis sem gastar muito. Por R$14,90/mês, você já tem 5 vídeos diários sem marca d’água!</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h4 className="text-xl font-semibold text-orange-500">Posso usar os vídeos pra vender?</h4>
            <p className="mt-2 text-gray-700">Sim! Todos os vídeos dos planos pagos são seus pra usar como quiser, inclusive pra fins comerciais, sem preocupações com direitos autorais.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h4 className="text-xl font-semibold text-orange-500">Quanto tempo leva pra gerar um vídeo?</h4>
            <p className="mt-2 text-gray-700">Em poucos minutos seu vídeo está pronto! É rápido, fácil e barato, do jeito que o Brasil gosta.</p>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h4 className="text-xl font-semibold text-orange-400 mb-4">FazMeuVídeo</h4>
            <p className="text-gray-400">Crie vídeos incríveis com IA de forma rápida e acessível!</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-orange-400 mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li><Link href="/sobre" className="text-gray-400 hover:text-orange-400 transition">Sobre Nós</Link></li>
              <li><Link href="/politica" className="text-gray-400 hover:text-orange-400 transition">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="text-gray-400 hover:text-orange-400 transition">Termos de Uso</Link></li>
              <li><Link href="/contato" className="text-gray-400 hover:text-orange-400 transition">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-orange-400 mb-4">Redes Sociais</h4>
            <ul className="space-y-2">
              <li><a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-orange-400 transition">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-orange-400 transition">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-orange-400 transition">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>© 2025 FazMeuVídeo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}