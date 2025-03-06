import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from 'next-auth/react';

export default function Dashboard({ session }) {
  const [text, setText] = useState('');
  const [addSubtitles, setAddSubtitles] = useState(false);
  const [voice, setVoice] = useState('21m00Tcm4TlvDq8ikWAM'); // Rachel como padrão
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [videoHistory, setVideoHistory] = useState([]);

  const voiceOptions = [
    { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel' },
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
    { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam' },
    { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Josh' }
  ];

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <p className="text-2xl text-gray-700">Por favor, faça <Link href="/login" className="text-blue-500 underline">login</Link> ou <Link href="/cadastro" className="text-blue-500 underline">cadastre-se</Link> para usar o gerador.</p>
      </div>
    );
  }

  const handlePreview = async () => {
    setLoadingPreview(true);
    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice, preview: true }),
      });
      const data = await response.json();
      if (response.ok) {
        setAudioUrl(data.audioUrl);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert('Ops, algo deu errado na prévia: ' + error.message);
    }
    setLoadingPreview(false);
  };

  const handleGenerate = async () => {
    setLoadingVideo(true);
    setProgress(0);
    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice, addSubtitles }),
      });
      const data = await response.json();
      if (response.ok) {
        setVideoUrl(data.videoUrl);
        setVideoHistory(prev => [...prev, { url: data.videoUrl, date: new Date().toLocaleString() }]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert('Ops, algo deu errado: ' + error.message);
    }
    setLoadingVideo(false);
    setText('');
    setAudioUrl('');
  };

  useEffect(() => {
    if (loadingVideo) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [loadingVideo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Head>
        <title>Dashboard - FazMeuVídeo</title>
      </Head>

      <header className="fixed top-0 w-full bg-gradient-to-r from-green-600 to-green-800 p-6 flex justify-between items-center shadow-xl z-10">
        <div className="flex items-center">
          <Image src="/images/geral/logo.png" alt="FazMeuVídeo Logo" width={80} height={80} className="object-contain" />
          <h1 className="text-white text-3xl font-extrabold ml-4 tracking-tight">FazMeuVídeo</h1>
        </div>
        <nav className="space-x-8">
          <Link href="/" className="text-white text-lg font-semibold hover:text-orange-300 transition duration-300">Início</Link>
          <a href="#planos" className="text-white text-lg font-semibold hover:text-orange-300 transition duration-300">Planos</a>
          <a href="#faq" className="text-white text-lg font-semibold hover:text-orange-300 transition duration-300">FAQ</a>
          <Link href="/cadastro" className="text-white text-lg font-semibold hover:text-orange-300 transition duration-300">Cadastrar</Link>
          <Link href="/login" className="text-white text-lg font-semibold hover:text-orange-300 transition duration-300">Login</Link>
        </nav>
      </header>

      <main className="pt-32 pb-20">
        <section className="p-8 max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-blue-600 mb-10 animate-fade-in">Gere seu Vídeo Aqui!</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite o roteiro do seu vídeo..."
            className="w-full p-6 border rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500 bg-white text-lg"
            rows="6"
          />
          <div className="mt-4 space-y-2">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={addSubtitles}
                onChange={(e) => setAddSubtitles(e.target.checked)}
                className="mr-2 accent-orange-500"
              />
              Adicionar legendas
            </label>
            <label className="flex items-center text-gray-700">
              <span className="mr-2">Escolha a voz:</span>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="p-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {voiceOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-8 space-x-4">
            <button
              onClick={handlePreview}
              disabled={loadingPreview || loadingVideo || !text}
              className={`bg-gray-600 text-white px-4 py-2 rounded-full text-md font-semibold shadow-md ${loadingPreview || loadingVideo ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 hover:scale-105 active:scale-95 transition duration-300'}`}
            >
              {loadingPreview ? 'Carregando...' : 'Ouvir Voz (5s)'}
            </button>
            <button
              onClick={handleGenerate}
              disabled={loadingPreview || loadingVideo || !text}
              className={`bg-orange-500 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg ${loadingPreview || loadingVideo ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600 hover:scale-105 active:scale-95 animate-pulse transition duration-300'}`}
            >
              {loadingVideo ? 'Gerando...' : 'Gerar Vídeo'}
            </button>
          </div>
          {loadingPreview && (
            <div className="mt-6 text-gray-600 text-lg">
              Aguarde, seu áudio está sendo criado...
            </div>
          )}
          {loadingVideo && (
            <div className="mt-6 text-gray-600 text-lg">
              Aguarde, seu vídeo está sendo criado...
              <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-6 mt-4">
                <div
                  className="bg-orange-500 h-6 rounded-full transition-all duration-200 ease-linear flex items-center justify-start"
                  style={{ width: `${progress}%` }}
                >
                  <span className="text-white text-sm font-semibold pl-2">{progress}%</span>
                </div>
              </div>
            </div>
          )}
          {audioUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">Prévia da voz escolhida:</h3>
              <audio controls src={audioUrl} className="mt-2 w-full" />
            </div>
          )}
          {videoUrl && (
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-green-600">Seu vídeo está pronto!</h3>
              <div className="mt-6 bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-xl shadow-md">
                <p className="text-gray-700 text-lg">Clique para baixar: <a href={videoUrl} className="text-blue-500 underline hover:text-blue-700 transition duration-300">{videoUrl}</a></p>
              </div>
            </div>
          )}
          {videoHistory.length > 0 && (
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-blue-600">Histórico de Vídeos</h3>
              <ul className="mt-4 space-y-2">
                {videoHistory.map((video, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p className="text-gray-700">Gerado em: {video.date}</p>
                    <a href={video.url} className="text-blue-500 underline hover:text-blue-700">Baixar vídeo</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="py-16 px-8 bg-white">
          <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-12 animate-fade-in">Dicas pra Arrasar nos Vídeos!</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-500 transform -skew-y-3 border-2 border-blue-400">
              <Image 
                src="/images/dicas/Corte o Bla-bla-bla!.jpg" 
                alt="Corte o Blá-blá-blá!" 
                width={200} 
                height={300} 
                className="rounded-lg mb-4 object-cover mx-auto block"
              />
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent tracking-tight shadow-lg animate-pulse">Corte o Blá-blá-blá!</h3>
              <p className="text-gray-100 mt-2">Vídeos curtos e diretos são o segredo pro sucesso nas redes!</p>
              <div className="absolute top-0 right-0 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
            </div>
            <div className="relative p-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-500 transform skew-y-3 border-2 border-green-400">
              <Image 
                src="/images/dicas/Prenda na Primeira Chance!.jpg" 
                alt="Prenda na Primeira Chance!" 
                width={200} 
                height={300} 
                className="rounded-lg mb-4 object-cover mx-auto block"
              />
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent tracking-tight shadow-lg animate-pulse">Prenda na Primeira Chance!</h3>
              <p className="text-gray-100 mt-2">Capriche no início pra fisgar o público em segundos!</p>
              <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div className="relative p-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-500 transform -skew-y-3 border-2 border-orange-400">
              <Image 
                src="/images/dicas/Toque o Coracao!.jpg" 
                alt="Toque o Coração!" 
                width={200} 
                height={300} 
                className="rounded-lg mb-4 object-cover mx-auto block"
              />
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent tracking-tight shadow-lg animate-pulse">Toque o Coração!</h3>
              <p className="text-gray-100 mt-2">Emoção é o que faz seu vídeo ficar na memória!</p>
              <div className="absolute top-0 right-0 w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </section>

        <section id="planos" className="py-16 px-8 bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">Escolha Seu Plano e Crie Sem Limites!</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-8 bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 border-t-4 border-green-500">
              <h4 className="text-2xl font-semibold text-blue-500">Grátis</h4>
              <p className="mt-4 text-gray-600 text-lg">1 vídeo por dia</p>
              <p className="text-gray-600 text-lg">Com marca d’água</p>
              <p className="text-gray-600 text-lg">Teste sem custo!</p>
              <button className="mt-6 w-full bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 px-6 py-3 rounded-full text-lg font-semibold hover:from-gray-400 hover:to-gray-500 hover:scale-105 active:scale-95 transition duration-300">Experimente</button>
            </div>
            <div className="p-8 bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 border-t-4 border-orange-500">
              <h4 className="text-2xl font-semibold text-blue-500">Inicial - R$14,90/mês</h4>
              <p className="mt-4 text-gray-600 text-lg">5 vídeos por dia</p>
              <p className="text-gray-600 text-lg">Sem marca d’água</p>
              <p className="text-gray-600 text-lg">Resolução HD</p>
              <button className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-orange-700 hover:scale-105 active:scale-95 transition duration-300">Assine</button>
            </div>
            <div className="p-8 bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 border-t-4 border-blue-500 relative">
              <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">Mais Popular</span>
              <h4 className="text-2xl font-semibold text-blue-500">Pro - R$29,90/mês</h4>
              <p className="mt-4 text-gray-600 text-lg">15 vídeos por dia</p>
              <p className="text-gray-600 text-lg">Full HD</p>
              <p className="text-gray-600 text-lg">Templates exclusivos</p>
              <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-700 hover:scale-105 active:scale-95 transition duration-300">Assine</button>
            </div>
            <div className="p-8 bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 border-t-4 border-green-700">
              <h4 className="text-2xl font-semibold text-blue-500">Empresarial - R$79,90/mês</h4>
              <p className="mt-4 text-gray-600 text-lg">Vídeos ilimitados</p>
              <p className="text-gray-600 text-lg">Full HD e 4K</p>
              <p className="text-gray-600 text-lg">Suporte prioritário</p>
              <button className="mt-6 w-full bg-gradient-to-r from-green-700 to-green-800 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-green-800 hover:to-green-900 hover:scale-105 active:scale-95 transition duration-300">Assine</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session }
  };
}