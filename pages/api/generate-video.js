const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

const unsplashKeys = [
  'EKBsegKoSBQZFj-7zjv5Qdlx-5qDoovZQ-Ryq7pP9Jg',
  '8o7rgWt3Uy75gzD_aj9q4CVXd_imbf56nnSJ9rN06bw',
  '39N0QTEBHVu80u0Cixl6PkGf7VEIMBc3AiIONuCib3Q'
];
const pexelsKeys = [
  'gzFDOdXsaZ3QR8BUKTFRxfp72t2e7r4Z1tmJHHdELmFtX0D4yydVY7Pl',
  'OP7c84Sh7JYrdB5ZM4nUYajsqL52kGLuvErHcow5CaMw3ip6EZ1OxsQ1',
  'ZDRYq0Gn0q13U6Qs2AlDngVAQ5Ef5vNPAmKk4QuPeVaiY31vualqoGV1'
];
const pixabayKeys = [
  '48910988-f8d3e3ad030aa2a696d485e03',
  '48949001-8fce1aad7760889ecce754941',
  '48949079-6c8cb8c7b07a1a55535180366'
];

let unsplashIndex = 0;
let pexelsIndex = 0;
let pixabayIndex = 0;

async function fetchImage(query) {
  try {
    const pexelsResponse = await axios.get('https://api.pexels.com/v1/search', {
      headers: { Authorization: pexelsKeys[pexelsIndex] },
      params: { query, per_page: 1 },
    });
    pexelsIndex = (pexelsIndex + 1) % pexelsKeys.length;
    if (pexelsResponse.data.photos[0]) return pexelsResponse.data.photos[0].src.large;

    const unsplashResponse = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query, per_page: 1, client_id: unsplashKeys[unsplashIndex] },
    });
    unsplashIndex = (unsplashIndex + 1) % unsplashKeys.length;
    if (unsplashResponse.data.results[0]) return unsplashResponse.data.results[0].urls.regular;

    const pixabayResponse = await axios.get('https://pixabay.com/api/', {
      params: { key: pixabayKeys[pixabayIndex], q: query, per_page: 3 },
    });
    pixabayIndex = (pixabayIndex + 1) % pixabayKeys.length;
    if (pixabayResponse.data.hits[0]) return pixabayResponse.data.hits[0].largeImageURL;

    return 'https://via.placeholder.com/1280x720';
  } catch (error) {
    console.error('Erro ao buscar imagem:', error.message);
    return 'https://via.placeholder.com/1280x720';
  }
}

async function generateNarration(text, outputPath, voiceId) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  console.log('Chamando ElevenLabs API com voz:', voiceId);

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: text,
        model_id: 'eleven_multilingual_v2', // Modelo multilíngue pra pt-BR
        voice_settings: { stability: 0.5, similarity_boost: 0.5 },
        language: 'pt-BR' // Forçar português brasileiro
      },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    fs.writeFileSync(outputPath, Buffer.from(response.data));
    console.log(`Áudio gerado: ${outputPath}, tamanho: ${fs.statSync(outputPath).size} bytes`);
  } catch (error) {
    console.error('Erro ao chamar ElevenLabs API:', error.message);
    throw error;
  }
}

export default async function handler(req, res) {
  console.log('Requisição recebida:', req.method, req.body);
  if (req.method === 'POST') {
    const { text, addSubtitles, voice, preview } = req.body;

    if (preview) {
      const tempAudioPath = path.join(process.cwd(), 'public', `preview-${Date.now()}.mp3`);
      try {
        await generateNarration(text, tempAudioPath, voice);
        console.log('Prévia gerada com sucesso:', tempAudioPath);
        res.status(200).json({ 
          message: 'Prévia de voz gerada!', 
          audioUrl: `/api/download-video?filename=${path.basename(tempAudioPath)}`
        });
      } catch (error) {
        console.error('Erro ao gerar prévia:', error);
        res.status(500).json({ message: 'Erro ao gerar prévia: ' + error.message });
      }
      return;
    }

    const sentences = text.split('.').filter(s => s.trim());
    const tempFiles = [];
    const tempClips = [];

    try {
      for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i].trim();
        const tempImagePath = path.join(process.cwd(), 'public', `temp-${Date.now()}-${i}.jpg`);
        const tempAudioPath = path.join(process.cwd(), 'public', `audio-${Date.now()}-${i}.mp3`);
        const tempClipPath = path.join(process.cwd(), 'public', `clip-${Date.now()}-${i}.mp4`);

        console.log(`Gerando cena ${i+1}: ${sentence}`);

        // Usar o texto completo como query pra buscar imagens mais precisas
        const imageUrl = await fetchImage(sentence.split(',')[0].trim());
        console.log(`Imagem buscada: ${imageUrl}`);
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(tempImagePath, Buffer.from(imageResponse.data));
        console.log(`Imagem salva: ${tempImagePath}, tamanho: ${fs.statSync(tempImagePath).size} bytes`);

        await generateNarration(sentence, tempAudioPath, voice);
        console.log(`Áudio gerado: ${tempAudioPath}`);

        if (!fs.existsSync(tempImagePath)) throw new Error(`Imagem não encontrada: ${tempImagePath}`);
        if (!fs.existsSync(tempAudioPath)) throw new Error(`Áudio não encontrado: ${tempAudioPath}`);

        await new Promise((resolve, reject) => {
          const command = ffmpeg()
            .input(tempImagePath)
            .loop(null) // Loop até o áudio acabar
            .input(tempAudioPath)
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions([
              '-pix_fmt yuv420p',
              '-shortest', // Duração baseada no áudio
              '-r 25' // 25 fps pra garantir vídeo suave
            ])
            .outputOptions(addSubtitles ? [
              '-vf',
              `drawtext=text='${sentence.replace(/'/g, "\\'")}':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:x=(w-tw)/2:y=h-th-10`
            ] : []);

          command
            .save(tempClipPath)
            .on('end', () => {
              console.log(`Clip gerado: ${tempClipPath}, tamanho: ${fs.statSync(tempClipPath).size} bytes`);
              resolve();
            })
            .on('error', (err) => {
              console.error(`Erro ao gerar clip ${i+1}:`, err.message);
              reject(err);
            });
        });

        tempFiles.push(tempImagePath);
        tempFiles.push(tempAudioPath);
        tempClips.push(tempClipPath);
      }

      const outputFileName = `video-${Date.now()}.mp4`;
      const outputPath = path.join(process.cwd(), 'public', outputFileName);
      const videoUrl = `/api/download-video?filename=${outputFileName}`;
      const concatListPath = path.join(process.cwd(), 'public', `concat-${Date.now()}.txt`);

      const concatList = tempClips.map(clip => `file '${clip.replace(/\\/g, '/')}'`).join('\n');
      console.log(`Lista de concatenação: ${concatList}`);
      fs.writeFileSync(concatListPath, concatList);

      await new Promise((resolve, reject) => {
        ffmpeg()
          .input(concatListPath)
          .inputOptions(['-f concat', '-safe 0'])
          .videoCodec('libx264')
          .audioCodec('aac')
          .outputOptions('-pix_fmt yuv420p')
          .save(outputPath)
          .on('end', () => {
            console.log('Vídeo gerado com sucesso:', outputPath);
            tempFiles.forEach(file => fs.unlinkSync(file));
            tempClips.forEach(file => fs.unlinkSync(file));
            fs.unlinkSync(concatListPath);
            resolve();
          })
          .on('error', (err) => {
            console.error('Erro ao concatenar clipes:', err.message);
            reject(err);
          });
      });

      res.status(200).json({ 
        message: 'Vídeo gerado com sucesso!', 
        videoUrl: videoUrl
      });
    } catch (error) {
      console.error('Erro ao gerar vídeo:', error);
      res.status(500).json({ message: 'Erro ao gerar vídeo: ' + error.message });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}