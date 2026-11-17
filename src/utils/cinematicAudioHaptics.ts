// =========================================================
// CINEMATIC AUDIO & HAPTICS ENGINE (SOUND MUTED / DISABLED)
// All audible Web Audio API synthesis has been completely removed.
// =========================================================

class CinematicAudioHapticsEngine {
  private isMuted: boolean = true;

  constructor() {
    // Sound permanently disabled across the site
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("rawrish_sound_muted", "true");
      } catch {
        // Ignore local storage errors
      }
    }
  }

  public toggleMute(): boolean {
    return true;
  }

  public getIsMuted(): boolean {
    return true;
  }

  // Optional subtle tactile vibration on supported mobile devices
  public triggerHaptic(_type: "light" | "medium" | "heavy" | "shutter" | "tick" = "light") {
    // No vibration/audio
  }

  // Sound methods disabled — 100% silent across the website
  public playCameraShutter() {}
  public playTactileClick() {}
  public playSlateTick() {}
  public playCinematicWhoosh() {}
  public playScrollTick(_speedMultiplier: number = 1) {}
  public playFilmReelTick() {}
  public playConfirmChime() {}
}

export const cinematicAudioHaptics = new CinematicAudioHapticsEngine();
