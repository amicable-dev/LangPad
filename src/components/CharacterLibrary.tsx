import React, { useState, useMemo } from 'react';
import type { Character, CharacterLibraryProps, SearchFilters } from '../types';
import { Search, Filter } from 'lucide-react';

const CharacterLibrary: React.FC<CharacterLibraryProps> = ({ characters, onSelectCharacter }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'frequency',
    sortOrder: 'asc',
  });

  // Apply filtering + sorting
  const filteredCharacters = useMemo(() => {
    let results = [...characters];

    // Text search: matches character, pinyin, or meaning
    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(
        (c) =>
          c.character.includes(q) ||
          c.pinyin.toLowerCase().includes(q) ||
          c.meaning.toLowerCase().includes(q)
      );
    }

    // Difficulty filter
    if (filters.difficulty) {
      results = results.filter((c) => c.difficulty === filters.difficulty);
    }

    // Category filter
    if (filters.category) {
      results = results.filter((c) => c.category === filters.category);
    }

    // Stroke count range filter
    if (filters.strokeRange) {
      results = results.filter(
        (c) =>
          c.strokes >= filters.strokeRange!.min &&
          c.strokes <= filters.strokeRange!.max
      );
    }

    // Sorting
    results.sort((a, b) => {
      let valA: any, valB: any;
      switch (filters.sortBy) {
        case 'frequency':
          valA = a.frequency ?? Infinity;
          valB = b.frequency ?? Infinity;
          break;
        case 'strokes':
          valA = a.strokes;
          valB = b.strokes;
          break;
        case 'alphabetical':
          valA = a.character;
          valB = b.character;
          break;
        case 'difficulty':
          const diffOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          valA = diffOrder[a.difficulty];
          valB = diffOrder[b.difficulty];
          break;
        default:
          valA = 0;
          valB = 0;
      }
      return filters.sortOrder === 'asc'
        ? valA > valB
          ? 1
          : -1
        : valA < valB
        ? 1
        : -1;
    });

    return results;
  }, [characters, filters]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Character Library</h1>
        <p className="text-gray-600">Browse, search, and select characters to practice</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/2 bg-white shadow rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search characters, pinyin, or meaning..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            className="flex-1 outline-none text-gray-700"
          />
        </div>

        {/* Sorting */}
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
            className="border rounded-lg px-3 py-2"
          >
            <option value="frequency">Sort by Frequency</option>
            <option value="strokes">Sort by Strokes</option>
            <option value="alphabetical">Sort Alphabetically</option>
            <option value="difficulty">Sort by Difficulty</option>
          </select>
          <select
            value={filters.sortOrder}
            onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value as any })}
            className="border rounded-lg px-3 py-2"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCharacters.map((char: Character) => (
          <button
            key={char.id}
            onClick={() => onSelectCharacter(char)}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:bg-blue-50 transition"
          >
            <span className="text-4xl font-bold text-gray-800">{char.character}</span>
            <span className="text-sm text-gray-500">{char.pinyin}</span>
            <span className="text-xs text-gray-400">{char.meaning}</span>
          </button>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="text-center text-gray-500">No characters found.</div>
      )}
    </div>
  );
};

export default CharacterLibrary;
