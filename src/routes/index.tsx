import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, PartyPopper, RotateCcw } from "lucide-react";

import cakeImage from "@/assets/birthday-cake.svg";
import danceImage from "@/assets/birthday-dance.svg";
import giftImage from "@/assets/birthday-gift.svg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Little Birthday Surprise" },
      {
        name: "description",
        content: "A heartfelt interactive birthday surprise made for someone special.",
      },
      { property: "og:title", content: "A Little Birthday Surprise" },
      {
        property: "og:description",
        content: "Three sweet memories and a birthday letter, made with love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const memories = [
  {
    image: cakeImage,
    alt: "A pink pixel birthday cake with glowing candles",
    file: "memory_01.gif",
    caption: "You make every moment brighter",
  },
  {
    image: danceImage,
    alt: "Hello Kitty dancing with colorful music notes",
    file: "memory_02.gif",
    caption: "You bring joy wherever you go",
  },
  {
    image: giftImage,
    alt: "A sweet cat holding a pink birthday present",
    file: "memory_03.gif",
    caption: "You deserve all the happiness",
  },
];

function WindowFrame({
  title,
  children,
  footer,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  footer?: string;
  className?: string;
}) {
  return (
    <section className={`retro-window ${className}`}>
      <div className="window-bar">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>{title}</span>
      </div>
      <div className="window-body">{children}</div>
      {footer && <div className="window-footer">♥ {footer} <span>●</span></div>}
    </section>
  );
}

function Index() {
  const [step, setStep] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const currentMemory = step >= 1 && step <= 3 ? memories[step - 1] : undefined;

  const restart = () => {
    setStep(0);
    setNoCount(0);
  };

  return (
    <main className="birthday-shell">
      <div className="sparkles" aria-hidden="true">
        <span>✦</span><span>♡</span><span>✧</span><span>♥</span><span>✦</span><span>♡</span>
      </div>

      {step === 0 && (
        <div className="scene scene-intro" key="intro">
          <p className="eyebrow">✦ A LITTLE QUESTION ✦</p>
          <WindowFrame title="SURPRISE.EXE" footer="JUST A LITTLE SECRET INSIDE">
            <div className="intro-content">
              <div className="mini-heart" aria-hidden="true">♡</div>
              <p className="script intro-question">
                I made something special for you... wanna see it?
              </p>
              {noCount > 0 && (
                <p className="tease" role="status">
                  {noCount === 1 ? "Are you sure? It was made just for you!" : "Pretty please? ♡"}
                </p>
              )}
              <div className="intro-actions">
                <Button className="birthday-button" onClick={() => setStep(1)}>
                  <Heart fill="currentColor" /> Yes!
                </Button>
                <Button
                  variant="outline"
                  className={`no-button no-${Math.min(noCount, 2)}`}
                  onClick={() => setNoCount((count) => Math.min(count + 1, 2))}
                >
                  {noCount === 0 ? "No" : noCount === 1 ? "Maybe..." : "Okay, yes!"}
                </Button>
              </div>
            </div>
          </WindowFrame>
        </div>
      )}

      {currentMemory && (
        <div className="scene scene-memory" key={`memory-${step}`}>
          <p className="eyebrow">✦ OUR MEMORIES ✦</p>
          <h1>Memory {step} of 3</h1>
          <div className="progress-dots" aria-label={`Memory ${step} of 3`}>
            {memories.map((_, index) => <span key={index} className={index < step ? "active" : ""} />)}
          </div>
          <WindowFrame title={currentMemory.file} footer={step === 3 ? "SWEETEST SURPRISE" : "PRECIOUS MOMENT"}>
            <figure className="memory-figure">
              <div className="memory-image-wrap">
                <img src={currentMemory.image} alt={currentMemory.alt} />
              </div>
              <figcaption>“{currentMemory.caption}”</figcaption>
            </figure>
          </WindowFrame>
          <Button className="birthday-button next-button" onClick={() => setStep(step + 1)}>
            {step === 3 ? "Read letter" : "Next memory"} <ArrowRight />
          </Button>
          <p className="tiny-label">{step === 3 ? "ONE MORE THING" : "THE FUN CONTINUES"}</p>
        </div>
      )}

      {step === 4 && (
        <div className="scene scene-letter" key="letter">
          <p className="eyebrow">✦ HAPPY BIRTHDAY ✦</p>
          <WindowFrame title="BDAY_LETTER.TXT" footer="SENT W/ LOVE" className="letter-window">
            <div className="letter-heading">
              <div className="letter-stamp"><img src={giftImage} alt="" /></div>
              <span>SPECIAL DELIVERY</span>
              <h1 className="script">Dear Birthday Star,</h1>
            </div>
            <div className="letter-paper">
              <p>Happy Birthday to someone who makes everything feel warmer and brighter.</p>
              <p>I hope this year brings you peace, confidence, and moments that remind you how loved you are.</p>
              <p>You deserve beautiful memories and the kind of happiness that stays.</p>
            </div>
            <div className="letter-signoff">
              <Heart className="floating-heart" fill="currentColor" aria-hidden="true" />
              <p className="script">With all my love,</p>
              <strong>— Someone who cares</strong>
            </div>
          </WindowFrame>
          <Button variant="outline" className="restart-button" onClick={restart}>
            <RotateCcw /> Replay surprise
          </Button>
        </div>
      )}

      <div className="corner-note" aria-hidden="true"><PartyPopper /> made with care</div>
    </main>
  );
}
