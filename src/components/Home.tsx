
import img1 from "../images/chinese1.png";
import img2 from "../images/chinese2.png";
import img3 from "../images/chinese3.png";
import img4 from "../images/chinese4.png";


export default function Home({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-4xl mx-auto text-center px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-red-600 mb-2">
        Welcome to LangPad!
      </h1>
      <p className="text-white mb-10">
        Learn Chinese characters through fun stroke animations and practice for the very first time!
      </p>
      {/* Button */}
      <div className="py-5">
        <button
  onClick={onStart}
  className="
    relative px-8 py-3 rounded-xl font-semibold text-white shadow-xl 
    bg-gradient-to-r from-red-500 to-red-600 
    backdrop-blur-md bg-opacity-80
    transition-all duration-300 
    hover:scale-105 hover:shadow-red-500/50 hover:shadow-lg
    border border-red-300/30
  "
>
  <span className="relative z-10">Start Learning</span>

  {/* Glow effect */}
  <span className="
      absolute inset-0 rounded-xl 
      bg-red-500 opacity-20 blur-lg 
      transition-opacity duration-300 
      group-hover:opacity-60
  "></span>
</button>
      </div>
      {/* Grid of images */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {[img1, img2, img3, img4].map((src, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-lg aspect-square"
          >
            <img
              src={src}
              alt="Chinese culture"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
