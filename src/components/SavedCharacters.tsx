import React from 'react';
import type { SavedCharactersProps, SavedCharacter } from '../types';
import { Trash2 } from 'lucide-react';

const SavedCharacters: React.FC<SavedCharactersProps> = ({ savedCharacters, onSelectCharacter }) => {
  // Temporary state for deleting a character locally
  const [characters, setCharacters] = React.useState<SavedCharacter[]>(savedCharacters);

  const handleDelete = (id: string) => {
    const updated = characters.filter((c) => c.id !== id);
    setCharacters(updated);
    // You can also propagate this to parent if needed
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Saved Characters</h1>
        <p className="text-gray-600">Your practiced characters</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {characters.map((char) => (
          <div
            key={char.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:bg-blue-50 relative"
          >
            <button
              onClick={() => handleDelete(char.id)}
              className="absolute top-2 right-2 p-1 hover:bg-red-100 rounded-full"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
            <button onClick={() => onSelectCharacter(char)}>
              <span className="text-4xl font-bold text-gray-800">{char.character}</span>
              <span className="text-sm text-gray-500">{char.pinyin}</span>
              <span className="text-xs text-gray-400">{char.meaning}</span>
            </button>
          </div>
        ))}
        {characters.length === 0 && (
          <div className="text-center text-gray-500 col-span-full">No saved characters.</div>
        )}
      </div>
    </div>
  );
};

export default SavedCharacters;
