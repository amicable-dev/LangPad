// src/App.tsx
import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import CharacterLibrary from "./components/CharacterLibrary";
import DrawingPad from "./components/DrawingPad";
import SavedCharacters from "./components/SavedCharacters";
import type { Character, SavedCharacter, ViewType } from "./types/index";
import Home from "./components/Home";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch characters from Hanitizer API
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://api.hanitizer.com/characters?hsk=1");
        const data = await res.json();

        // Map API data to our `Character` type
        const mapped: Character[] = data.map((item: any) => ({
          id: item.id.toString(),
          character: item.character,
          pinyin: item.pinyin,
          meaning: item.definition,
          english: item.definition_en ?? item.definition,
          strokes: item.strokes ?? 0,
          difficulty: "beginner",
          category: item.hskLevel ? `hsk${item.hskLevel}` : "general",
          radical: item.radical ?? "",
          frequency: item.frequency ?? 9999,
        }));

        setCharacters(mapped);
      } catch (err) {
        console.error("Error fetching characters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // ✅ Save a practiced character
  const saveCharacter = (character: Character, drawing: string) => {
    const saved: SavedCharacter = {
      ...character,
      drawing,
      savedAt: new Date().toISOString(),
      practiceCount: 1,
    };
    setSavedCharacters((prev) => [...prev, saved]);
    setCurrentView("saved");
  };

  // ✅ Select a character and open DrawingPad
  const selectCharacterForPractice = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentView("draw");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navigation bar */}
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4">
        {currentView === "home" && <Home setCurrentView={setCurrentView} />}

        {currentView === "library" && (
          <CharacterLibrary
            characters={characters}
            loading={loading}
            onSelectCharacter={selectCharacterForPractice}
          />
        )}

        {currentView === "draw" && selectedCharacter && (
          <DrawingPad
            selectedCharacter={selectedCharacter}
            onSaveCharacter={saveCharacter}
            onSelectNewCharacter={() => setCurrentView("library")}
          />
        )}

        {currentView === "saved" && (
          <SavedCharacters
            savedCharacters={savedCharacters}
            onSelectCharacter={selectCharacterForPractice}
          />
        )}
      </main>
    </div>
  );
};

export default App;
