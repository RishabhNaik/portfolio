// =========================================================
// CINEMATIC AUDIO & HAPTICS ENGINE
// Synthesizes tactile mechanical film clicks, 35mm shutter clicks,
// analog reel sprockets, and sub-whooshes via Web Audio API.
// Triggers device vibration haptics on supporting hardware.
// =========================================================

class CinematicAudioHapticsEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      // Check stored preference
      const storedMute = localStorage.getItem("rawrish_sound_muted");
      this.isMuted = storedMute === "true";

      // Auto-unlock AudioContext on first user interaction anywhere
      const unlockAudio = () => {
        this.initContext();
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };
      window.addEventListener("pointerdown", unlockAudio, { passive: true });
      window.addEventListener("keydown", unlockAudio, { passive: true });
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    this.isUnlocked = true;
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("rawrish_sound_muted", String(this.isMuted));
    }
    if (!this.isMuted) {
      this.playTactileClick();
      this.triggerHaptic("light");
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Physical Haptic Vibration
  public triggerHaptic(type: "light" | "medium" | "heavy" | "shutter" | "tick" = "light") {
    if (typeof window === "undefined" || !("vibrate" in navigator)) return;

    try {
      switch (type) {
        case "tick":
          navigator.vibrate?.(6);
          break;
        case "light":
          navigator.vibrate?.(12);
          break;
        case "medium":
          navigator.vibrate?.(22);
          break;
        case "heavy":
          navigator.vibrate?.(35);
          break;
        case "shutter":
          navigator.vibrate?.([10, 30, 15]);
          break;
      }
    } catch {
      // Vibration not permitted or supported
    }
  }

  // 1. Mechanical 35mm Film Camera Shutter Click (Two-stage curtain snap)
  public playCameraShutter() {
    this.triggerHaptic("shutter");
    if (this.isMuted) return;

    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Stage 1: Front curtain click
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(420, now);
    osc1.frequency.exponentialRampToValueAtTime(70, now + 0.035);

    gain1.gain.setValueAtTime(0.28, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.04);

    // Stage 2: Rear curtain return snap (35ms delay)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(260, now + 0.04);
    osc2.frequency.exponentialRampToValueAtTime(45, now + 0.08);

    gain2.gain.setValueAtTime(0.24, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.09);
  }

  // 2. Tactile Mechanical Dial Click (Crisp film button press)
  public playTactileClick() {
    this.triggerHaptic("light");
    if (this.isMuted) return;

    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(780, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.018);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.022);
  }

  // 3. Subtle Film Slate Tick (For subtle navigation & hovers)
  public playSlateTick() {
    this.triggerHaptic("tick");
    if (this.isMuted) return;

    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.012);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.014);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.015);
  }

  // 4. Cinematic Sub Rumble / Whoosh (Modal open, slide flip)
  public playCinematicWhoosh() {
    this.triggerHaptic("medium");
    if (this.isMuted) return;

    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.28);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(160, now);
    filter.frequency.exponentialRampToValueAtTime(60, now + 0.28);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  // 5. Analog Film Reel Sprocket (For horizontal scroll reel scrubbing)
  public playFilmReelTick() {
    this.triggerHaptic("tick");
    if (this.isMuted) return;

    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.014);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.016);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.018);
  }

  // 6. Soft Positive Confirmation (For copied info, form submission)
  public playConfirmChime() {
    this.triggerHaptic("medium");
    if (this.isMuted) return;

    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    [587.33, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = i * 0.05;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.14, now + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.24);
    });
  }
}

export const cinematicAudioHaptics = new CinematicAudioHapticsEngine();
