// Web Audio API Procedural Natural Soundscape Engine
// Generates infinite, seamless, soothing nature sounds without external audio file dependencies.

export interface SoundscapeTrack {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  frequencies: string;
  description: string;
}

export const SOUNDSCAPE_TRACKS: SoundscapeTrack[] = [
  {
    id: "ocean",
    name: "Abyssal Ocean Swell",
    category: "Nature / Coastal",
    subtitle: "Organic Waves & Deep Oceanic Resonance",
    frequencies: "432 Hz / Sub-bass 38 Hz",
    description: "Deep, rhythmic ocean wave swells rolling onto a secluded shore with gentle foam wash and oceanic sub-bass.",
  },
  {
    id: "rain",
    name: "Forest Rain & Canopy",
    category: "Nature / Rainfall",
    subtitle: "Micro-droplets on Autumn Leaves",
    frequencies: "Atmospheric Dual-band",
    description: "Gentle rainfall pattering through a temperate rain forest canopy with calming, steady air moisture.",
  },
  {
    id: "wind",
    name: "Mountain Wind & Pine",
    category: "Nature / High-Altitude",
    subtitle: "Subtle Atmospheric Airflow Drift",
    frequencies: "Resonant Air 528 Hz",
    description: "Warm, gentle alpine wind currents swaying slowly through high-altitude pine branches.",
  },
  {
    id: "tape",
    name: "Warm Analog Tape Drift",
    category: "Acoustics / Ambient",
    subtitle: "Harmonic Drone & Subtle Flutter",
    frequencies: "Golden Ratio Harmonics",
    description: "Lush, soothing analog modular chord drone processed with vintage tape warmth, tape head saturation, and soft flutter.",
  },
];

class NaturalAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private activeNodes: { disconnect: () => void }[] = [];
  private currentTrackId: string = "ocean";
  private isRunning: boolean = false;
  private currentVolume: number = 0.65;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.82;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Generate pink noise buffer for realistic natural soundscapes
  private createPinkNoiseBuffer(durationSeconds = 6): AudioBuffer {
    if (!this.ctx) throw new Error("No context");
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * durationSeconds;
    const buffer = this.ctx.createBuffer(2, bufferSize, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  // 1. Ocean Swell & Coastal Surf
  private startOceanSwell() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const noiseBuffer = this.createPinkNoiseBuffer(8);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter 1: Wave crest and swell filter
    const waveFilter = ctx.createBiquadFilter();
    waveFilter.type = "lowpass";
    waveFilter.frequency.setValueAtTime(260, now);
    waveFilter.Q.setValueAtTime(2.2, now);

    // LFO to modulate wave swell frequency (rhythmic tidal wave breathing at 0.09Hz)
    const swellLfo = ctx.createOscillator();
    swellLfo.type = "sine";
    swellLfo.frequency.setValueAtTime(0.085, now);

    const swellLfoGain = ctx.createGain();
    swellLfoGain.gain.setValueAtTime(320, now); // sweeps from ~150Hz to ~650Hz

    swellLfo.connect(swellLfoGain);
    swellLfoGain.connect(waveFilter.frequency);

    // Sub-bass ocean rumble
    const subOsc = ctx.createOscillator();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(42, now);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.18, now);
    subOsc.connect(subGain);

    // Stereo Drift
    const waveGain = ctx.createGain();
    waveGain.gain.setValueAtTime(0.72, now);

    noiseSource.connect(waveFilter);
    waveFilter.connect(waveGain);
    waveGain.connect(this.masterGain);
    subGain.connect(this.masterGain);

    noiseSource.start();
    swellLfo.start();
    subOsc.start();

    this.activeNodes.push({
      disconnect: () => {
        try {
          noiseSource.stop();
          swellLfo.stop();
          subOsc.stop();
          noiseSource.disconnect();
          waveFilter.disconnect();
          swellLfo.disconnect();
          subOsc.disconnect();
        } catch {
          // ignore already stopped
        }
      },
    });
  }

  // 2. Forest Rain & Gentle Canopy
  private startForestRain() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const noiseBuffer = this.createPinkNoiseBuffer(6);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Raindrop canopy resonance
    const rainFilter1 = ctx.createBiquadFilter();
    rainFilter1.type = "bandpass";
    rainFilter1.frequency.setValueAtTime(2800, now);
    rainFilter1.Q.setValueAtTime(1.5, now);

    const rainFilter2 = ctx.createBiquadFilter();
    rainFilter2.type = "lowpass";
    rainFilter2.frequency.setValueAtTime(1200, now);

    const rainGain1 = ctx.createGain();
    rainGain1.gain.setValueAtTime(0.55, now);

    const rainGain2 = ctx.createGain();
    rainGain2.gain.setValueAtTime(0.4, now);

    noiseSource.connect(rainFilter1);
    rainFilter1.connect(rainGain1);
    rainGain1.connect(this.masterGain);

    noiseSource.connect(rainFilter2);
    rainFilter2.connect(rainGain2);
    rainGain2.connect(this.masterGain);

    noiseSource.start();

    this.activeNodes.push({
      disconnect: () => {
        try {
          noiseSource.stop();
          noiseSource.disconnect();
          rainFilter1.disconnect();
          rainFilter2.disconnect();
        } catch {
          // ignore
        }
      },
    });
  }

  // 3. Mountain Wind & Pine Whispers
  private startMountainWind() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const noiseBuffer = this.createPinkNoiseBuffer(6);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(420, now);
    windFilter.Q.setValueAtTime(3.2, now);

    // Slow wind gust modulator
    const gustLfo = ctx.createOscillator();
    gustLfo.type = "sine";
    gustLfo.frequency.setValueAtTime(0.045, now);

    const gustGain = ctx.createGain();
    gustGain.gain.setValueAtTime(280, now);

    gustLfo.connect(gustGain);
    gustGain.connect(windFilter.frequency);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.85, now);

    noiseSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);

    noiseSource.start();
    gustLfo.start();

    this.activeNodes.push({
      disconnect: () => {
        try {
          noiseSource.stop();
          gustLfo.stop();
          noiseSource.disconnect();
          windFilter.disconnect();
          gustLfo.disconnect();
        } catch {
          // ignore
        }
      },
    });
  }

  // 4. Warm Analog Tape Drift (Harmonic Chord Drone)
  private startTapeDrone() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Harmonic frequencies: A2 (110Hz), E3 (164.81Hz), A3 (220Hz), C#4 (277.18Hz), E4 (329.63Hz)
    const freqs = [110.0, 164.81, 220.0, 277.18, 329.63];
    const oscs: OscillatorNode[] = [];

    const tapeFilter = ctx.createBiquadFilter();
    tapeFilter.type = "lowpass";
    tapeFilter.frequency.setValueAtTime(680, now);
    tapeFilter.Q.setValueAtTime(1.2, now);

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.24, now);

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "triangle" : "sine";
      // Slight detune for analog warmth
      const detune = (i - 2) * 3.5;
      osc.frequency.setValueAtTime(f, now);
      osc.detune.setValueAtTime(detune, now);

      osc.connect(tapeFilter);
      osc.start();
      oscs.push(osc);
    });

    tapeFilter.connect(droneGain);
    droneGain.connect(this.masterGain);

    this.activeNodes.push({
      disconnect: () => {
        try {
          oscs.forEach((osc) => {
            osc.stop();
            osc.disconnect();
          });
          tapeFilter.disconnect();
          droneGain.disconnect();
        } catch {
          // ignore
        }
      },
    });
  }

  private stopCurrentNodes() {
    this.activeNodes.forEach((node) => {
      try {
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
  }

  public play(trackId?: string) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (trackId && trackId !== this.currentTrackId) {
      this.currentTrackId = trackId;
      this.stopCurrentNodes();
    } else if (this.isRunning && !trackId) {
      return;
    }

    if (this.activeNodes.length === 0) {
      switch (this.currentTrackId) {
        case "rain":
          this.startForestRain();
          break;
        case "wind":
          this.startMountainWind();
          break;
        case "tape":
          this.startTapeDrone();
          break;
        case "ocean":
        default:
          this.startOceanSwell();
          break;
      }
    }

    // Smooth fade in
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(0.001, this.masterGain.gain.value), now);
    this.masterGain.gain.linearRampToValueAtTime(this.currentVolume, now + 1.2);

    this.isRunning = true;
  }

  public pause() {
    if (!this.ctx || !this.masterGain || !this.isRunning) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      if (!this.isRunning) {
        this.stopCurrentNodes();
      }
    }, 850);

    this.isRunning = false;
  }

  public togglePlay(): boolean {
    if (this.isRunning) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && this.isRunning) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.currentVolume, now + 0.1);
    }
  }

  public setTrack(trackId: string) {
    const wasPlaying = this.isRunning;
    this.currentTrackId = trackId;
    this.stopCurrentNodes();
    if (wasPlaying) {
      this.play(trackId);
    }
  }

  public getVisualizerData(): number[] {
    if (!this.analyser || !this.isRunning) {
      return [12, 18, 26, 16, 10]; // resting levels
    }
    const buffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(buffer);

    // Pick 5 representative frequency bins
    const bins = [2, 5, 9, 14, 20];
    return bins.map((idx) => {
      const val = buffer[idx] || 0;
      return Math.max(8, Math.round((val / 255) * 100));
    });
  }

  public getStatus() {
    return {
      isPlaying: this.isRunning,
      currentTrackId: this.currentTrackId,
      volume: this.currentVolume,
    };
  }

  public cleanup() {
    this.pause();
    this.stopCurrentNodes();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export const naturalAudioEngine = new NaturalAudioEngine();
