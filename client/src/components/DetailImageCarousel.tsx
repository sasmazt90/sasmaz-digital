import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DetailImageCarouselProps = { images: string[]; title: string };

export default function DetailImageCarousel({
  images,
  title,
}: DetailImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const uniqueImages = useMemo(
    () => Array.from(new Set(images.filter(Boolean))),
    [images]
  );
  const imageSignature = uniqueImages.join("\u0000");
  const hasMultipleImages = uniqueImages.length > 1;

  useEffect(() => setActiveIndex(0), [imageSignature]);

  useEffect(() => {
    if (!hasMultipleImages) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft")
        setActiveIndex(current =>
          current === 0 ? uniqueImages.length - 1 : current - 1
        );
      if (event.key === "ArrowRight")
        setActiveIndex(current => (current + 1) % uniqueImages.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasMultipleImages, uniqueImages.length]);

  if (!uniqueImages.length) return null;
  const showPrevious = () =>
    setActiveIndex(current =>
      current === 0 ? uniqueImages.length - 1 : current - 1
    );
  const showNext = () =>
    setActiveIndex(current => (current + 1) % uniqueImages.length);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative flex min-h-[18rem] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#06151b] sm:min-h-[28rem]">
        <img
          src={uniqueImages[activeIndex]}
          alt={`${title} — ${activeIndex + 1} / ${uniqueImages.length}`}
          className="max-h-[34rem] w-full object-contain object-center"
        />
        {hasMultipleImages ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white shadow-lg backdrop-blur transition hover:bg-black/85 sm:left-5"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white shadow-lg backdrop-blur transition hover:bg-black/85 sm:right-5"
            >
              <ChevronRight size={24} />
            </button>
          </>
        ) : null}
      </div>
      {hasMultipleImages ? (
        <div
          className="mt-4 flex justify-center gap-3 overflow-x-auto pb-2"
          aria-label="Image thumbnails"
        >
          {uniqueImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-16 w-24 flex-none overflow-hidden rounded-xl border-2 bg-[#06151b] transition sm:h-20 sm:w-28 ${activeIndex === index ? "border-[#8cc8ff] opacity-100" : "border-white/10 opacity-55 hover:border-white/30 hover:opacity-90"}`}
            >
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
