import React from "react";
import type { Character } from "../types";
import { CATEGORIES } from "../MandarinData";

interface CharacterLibraryProps {
  onSelectCharacter: (character: Character) => void;
}

const CharacterLibrary: React.FC<CharacterLibraryProps> = ({ onSelectCharacter }) => {
  // Map for nicer section labels
  const sectionLabels: Record<string, string> = {
    numbers: "Numbers (0-10)",
    largeNumbers: "Large Numbers",
    basic: "Basic Characters",
    learning: "Learning & Education",
    family: "Family",
    verbs: "Common Verbs",
    time: "Time",
  };

  return (
    <div className="space-y-12">
      {Object.entries(CATEGORIES).map(([categoryKey, chars]) => (
        <div key={categoryKey}>
          {/* Section Header */}
          <h2 className="text-2xl font-bold mb-4 capitalize bg-gray-900 sticky top-0 z-10 p-2 border-b border-gray-700">
            {sectionLabels[categoryKey] || categoryKey}
          </h2>

          {/* Characters Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
            {chars.map((char: Character) => (
              <div
                key={char.id}
                onClick={() => onSelectCharacter(char)}
                className="flex flex-col items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <span className="text-4xl">{char.character}</span>
                <span className="text-sm mt-1 text-gray-300">{char.pinyin}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterLibrary;
