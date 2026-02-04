"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import { Lightbox } from "./lightbox";

interface SlideData {
  title: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + r.width / 2);
    yRef.current = event.clientY - (r.top + r.height / 2);
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const { src, title } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="relative flex flex-1 w-[70vmin] h-[39.375vmin] mx-[4vmin] cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute inset-0 rounded-[1%] overflow-hidden bg-[#1D1F2F]"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            src={src}
            alt={title}
            className="absolute inset-0 w-[120%] h-[120%] object-cover transition-opacity duration-500"
            style={{ opacity: current === index ? 1 : 0.5 }}
            loading="eager"
          />

          {current === index && (
            <div className="absolute inset-0 bg-black/15" />
          )}

          <div className="absolute bottom-6 left-6 z-10">
            <h2
              className={`text-white font-semibold tracking-wide transition-opacity duration-500 ${
                current === index ? "opacity-100" : "opacity-0"
              }`}
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
            >
              {title}
            </h2>
          </div>
        </div>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center justify-center mx-2 rounded-full bg-neutral-200 hover:-translate-y-0.5 transition ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-700" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [selectedSlide, setSelectedSlide] = useState<SlideData | null>(null);
  const id = useId();

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handleSlideClick = (index: number) => {
    setCurrent(index);
    setSelectedSlide(slides[index]);
  };

  return (
    <>
      <div
        className="relative w-[70vmin] h-[39.375vmin] mx-auto"
        aria-labelledby={`carousel-${id}`}
      >
        <ul
          className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
        </ul>

        <div className="absolute top-[calc(100%+1rem)] flex justify-center w-full">
          <CarouselControl
            type="previous"
            title="Previous slide"
            handleClick={handlePreviousClick}
          />
          <CarouselControl
            type="next"
            title="Next slide"
            handleClick={handleNextClick}
          />
        </div>
      </div>

      {selectedSlide && (
        <Lightbox
          src={selectedSlide.src}
          title={selectedSlide.title}
          onClose={() => setSelectedSlide(null)}
        />
      )}
    </>
  );
}
