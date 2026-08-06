// Web Audio API synth for peaceful ambient soundscapes, chimes, and voice guidance

export type SoundscapeType = 'silent' | 'waves' | 'rain' | 'solfeggio' | 'bowl';

class AudioSynth {
  private ctx: AudioContext | null = null;
  private currentSoundscape: SoundscapeType = 'silent';
  private soundscapeGain: GainNode | null = null;
  private soundscapeNodes: (AudioNode | number)[] = [];
  private mainVolume: number = 0.5;
  private speechSynth: SpeechSynthesis | null = null;
  private speechVoice: SpeechSynthesisVoice | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechSynth = window.speechSynthesis;
      const setVoice = () => {
        const voices = this.speechSynth?.getVoices() || [];
        // Prefer natural English voices
        this.speechVoice =
          voices.find(
            (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Google'))
          ) ||
          voices.find((v) => v.lang.startsWith('en')) ||
          null;
      };
      setVoice();
      if (this.speechSynth.onvoiceschanged !== undefined) {
        this.speechSynth.onvoiceschanged = setVoice;
      }
    }
  }

  // Play a gentle Tibetan bowl / chime tone
  playChime(freq = 432, duration = 2.5) {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft decay
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2 * this.mainVolume, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio errors if blocked by browser policy
    }
  }

  // Double chime for step completion
  playCompletion() {
    this.playChime(528, 2.0); // 528 Hz transformation frequency
    setTimeout(() => {
      this.playChime(660, 2.5);
    }, 300);
  }

  // Soft click for button interactions
  playSoftClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05 * this.mainVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // ignore
    }
  }

  // Set Master Volume (0.0 to 1.0)
  setVolume(vol: number) {
    this.mainVolume = Math.max(0, Math.min(1, vol));
    if (this.soundscapeGain && this.ctx) {
      this.soundscapeGain.gain.setValueAtTime(this.mainVolume * 0.35, this.ctx.currentTime);
    }
  }

  // Stop active soundscape generator nodes
  stopSoundscape() {
    this.soundscapeNodes.forEach((node) => {
      if (typeof node === 'object' && 'stop' in node && typeof (node as any).stop === 'function') {
        try {
          (node as any).stop();
        } catch {
          // ignore
        }
      }
      if (typeof node === 'object' && 'disconnect' in node && typeof (node as any).disconnect === 'function') {
        try {
          (node as any).disconnect();
        } catch {
          // ignore
        }
      }
    });
    this.soundscapeNodes = [];
    if (this.soundscapeGain) {
      try {
        this.soundscapeGain.disconnect();
      } catch {
        // ignore
      }
      this.soundscapeGain = null;
    }
    this.currentSoundscape = 'silent';
  }

  // Start Ambient Soundscape Generator
  startSoundscape(type: SoundscapeType, volume: number = 0.5) {
    this.init();
    this.stopSoundscape();
    this.mainVolume = volume;

    if (type === 'silent' || !this.ctx) return;
    this.currentSoundscape = type;

    try {
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.3, this.ctx.currentTime);
      masterGain.connect(this.ctx.destination);
      this.soundscapeGain = masterGain;

      if (type === 'waves') {
        // Procedural Ocean Waves (Filtered pink noise with LFO swell)
        const bufferSize = 2 * this.ctx.sampleRate;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11;
          b6 = white * 0.115926;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, this.ctx.currentTime);

        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // 10s wave cycle

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        whiteNoise.connect(filter);
        filter.connect(masterGain);

        whiteNoise.start();
        lfo.start();
        this.soundscapeNodes.push(whiteNoise, lfo, filter, lfoGain);
      } else if (type === 'rain') {
        // Soft Rain Soundscape
        const bufferSize = 2 * this.ctx.sampleRate;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.2;
        }

        const rainSource = this.ctx.createBufferSource();
        rainSource.buffer = noiseBuffer;
        rainSource.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
        filter.Q.setValueAtTime(0.5, this.ctx.currentTime);

        rainSource.connect(filter);
        filter.connect(masterGain);

        rainSource.start();
        this.soundscapeNodes.push(rainSource, filter);
      } else if (type === 'solfeggio') {
        // 432 Hz Binaural Solfeggio Drone (432 Hz & 436 Hz)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const subOsc = this.ctx.createOscillator();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(432, this.ctx.currentTime);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(436, this.ctx.currentTime);

        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(216, this.ctx.currentTime);

        const subGain = this.ctx.createGain();
        subGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

        subOsc.connect(subGain);
        osc1.connect(masterGain);
        osc2.connect(masterGain);
        subGain.connect(masterGain);

        osc1.start();
        osc2.start();
        subOsc.start();
        this.soundscapeNodes.push(osc1, osc2, subOsc, subGain);
      } else if (type === 'bowl') {
        // Tibetan Bowl Drone (Resonating Harmonics at 432 Hz, 864 Hz, 1296 Hz with slow tremolo)
        const freqs = [432, 864, 1296];
        freqs.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.2 / (idx + 1), this.ctx.currentTime);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start();
          this.soundscapeNodes.push(osc, gain);
        });
      }
    } catch (err) {
      console.warn('Failed to start ambient soundscape:', err);
    }
  }

  // Speak Verbal Cue / Breath Guidance using Web Speech Synthesis
  speakText(text: string) {
    try {
      this.init();
      if (!this.speechSynth || !text.trim()) return;
      this.speechSynth.cancel(); // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Calm, relaxed speech rate
      utterance.pitch = 1.0;
      utterance.volume = this.mainVolume;

      if (this.speechVoice) {
        utterance.voice = this.speechVoice;
      }

      this.speechSynth.speak(utterance);
    } catch {
      // ignore speech errors
    }
  }

  // Stop current spoken audio
  stopSpeech() {
    try {
      if (this.speechSynth) {
        this.speechSynth.cancel();
      }
    } catch {
      // ignore
    }
  }
}

export const sound = new AudioSynth();
