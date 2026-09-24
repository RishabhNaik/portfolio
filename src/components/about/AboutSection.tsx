"use client";

import React from "react";
import Image from "next/image";
import { Download, Sparkles, Film, Camera } from "lucide-react";
import { openContactModal } from "@/components/contact/contactModalState";
import { cinematicAudioHaptics } from "@/utils/cinematicAudioHaptics";
import styles from "./AboutSection.module.css";

export const AboutSection: React.FC = () => {
  const handleDownloadClick = () => {
    cinematicAudioHaptics.playTactileClick();
  };

  const handleContactClick = () => {
    cinematicAudioHaptics.playSlateTick();
    openContactModal();
  };

  return (
    <section id="about" className={styles.aboutSection} aria-label="About Rishabh Naik">
      <div className={styles.container}>
        {/* 2-Column Balanced Layout: Left (Heading & 2 Paragraphs) | Right (Images + Resume Button Below) */}
        <div className={styles.aboutGrid}>
          {/* Left Column: Heading & 2 Bio Paragraphs */}
          <div className={styles.textColumn}>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowBadge}>About Me</span>
              <span className={styles.eyebrowSub}>Emerging Creative</span>
            </div>

            <h2 className={styles.sectionHeading}>
              Curious, hands-on, and ready to make work with good people.
            </h2>

            <div className={styles.paragraphsStack}>
              <p className={styles.storyParagraph}>
                I am a video editor and content creator based in Bangalore, India,
                specializing in short films, high-retention Instagram reels, and brand edits.
                My craft is rooted in pacing and rhythm: taking raw footage and finding the
                hidden story within it. I love stepping away from generic templates to focus
                on what really grabs attention — dynamic cuts, intentional sound design,
                and content that feels fresh and native to its platform.
              </p>

              <p className={styles.storyParagraph}>
                Over the past year, I’ve been diving deep into the technical and creative
                aspects of post-production. Whether I'm cutting an energetic 9:16 vertical reel
                for social media or shaping the narrative flow of a micro-documentary,
                my focus remains singular: crafting engaging, high-quality videos that
                connect with audiences and stop the scroll.
              </p>

              <div className={styles.focusPillsRow} aria-label="Core disciplines & toolkit">
                <span className={styles.focusPill}>Premiere Pro &amp; DaVinci</span>
                <span className={styles.focusPill}>Short-Form Reels</span>
                <span className={styles.focusPill}>Dynamic Editing</span>
                <span className={styles.focusPill}>Bangalore &amp; Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right Column: Photo Collage with Download Resume Button Directly Below */}
          <div className={styles.visualColumn} aria-label="Editor behind the scenes archive">
            <div className={styles.collageGrid}>
              {/* Primary Main Photo: Operating Arri 35mm Camera */}
              <div className={styles.mainPhotoCard}>
                <div className={styles.imageInner}>
                  <Image
                    src="/assets/about/director-camera.jpg"
                    alt="Rishabh Naik editing video"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority
                    className={styles.collageImg}
                  />
                  <div className={styles.photoOverlay} />
                  <div className={styles.photoMetaBadge}>
                    <Camera size={12} />
                    <span>Behind the Scenes // Short Film</span>
                  </div>
                </div>
              </div>

              {/* Sub Photo 1: Wireless Director Monitor */}
              <div className={styles.subPhotoCardLeft}>
                <div className={styles.imageInner}>
                  <Image
                    src="/assets/about/director-monitor.jpg"
                    alt="Rishabh Naik reviewing edit on monitor"
                    fill
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className={styles.collageImg}
                  />
                  <div className={styles.photoOverlay} />
                  <div className={styles.photoMetaBadge}>
                    <Film size={11} />
                    <span>Reviewing the Edit</span>
                  </div>
                </div>
              </div>

              {/* Sub Photo 2: Optical Director's Viewfinder on Location */}
              <div className={styles.subPhotoCardRight}>
                <div className={styles.imageInner}>
                  <Image
                    src="/assets/about/director-viewfinder.jpg"
                    alt="Rishabh Naik working on a video shoot"
                    fill
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className={styles.collageImg}
                  />
                  <div className={styles.photoOverlay} />
                  <div className={styles.photoMetaBadge}>
                    <Camera size={11} />
                    <span>Location Scouting // Reels</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Download Button Directly Below the Images */}
            <div className={styles.resumeActionWrapper}>
              <a
                href="/assets/Rishabh_Naik_Resume.pdf"
                download="Rishabh_Naik_Resume.pdf"
                className={styles.downloadResumeBtn}
                onClick={handleDownloadClick}
                aria-label="Download Rishabh Naik Resume PDF"
              >
                <Download size={16} className={styles.btnIcon} />
                <span>Download Resume</span>
              </a>

              <button
                type="button"
                onClick={handleContactClick}
                className={styles.inquireBtn}
                aria-label="Inquire or Book Collaboration"
              >
                <Sparkles size={14} className={styles.btnIcon} />
                <span>Inquire Collaboration</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
