import React from "react";
import type { SavedCharacter, Character } from "../types";

interface Props {
  savedCharacters: SavedCharacter[];
  onSelectCharacter: (character: Character) => void;
}

const SavedCharacters: React.FC<Props> = ({ savedCharacters, onSelectCharacter }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-3 text-white">Saved Characters</h2>

      {savedCharacters.length === 0 ? (
        <p className="text-gray-300">No saved drawings yet.</p>
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {savedCharacters.map(char => (
            <li
              key={char.id}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => onSelectCharacter(char)}
            >
              <div className="text-3xl text-white">{char.character}</div>
              <img
                src={char.drawing}
                alt="drawing"
                className="mt-2 border border-gray-600 w-full h-auto rounded"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCharacters;
