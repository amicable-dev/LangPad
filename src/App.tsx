import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import CharacterLibrary from "./components/CharacterLibrary";
import DrawingPad from "./components/DrawingPad";
import SavedCharacters from "./components/SavedCharacters";
import { ALL_CHARACTERS } from "./MandarinData";
import type { Character, SavedCharacter, ViewType } from "./types";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [] = useState<Character[]>(ALL_CHARACTERS);
  const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const saveCharacter = (character: Character, drawing: string) => {
    const saved: SavedCharacter = {
      ...character,
      drawing,
      savedAt: new Date().toISOString(),
      practiceCount: 1,
    };
    setSavedCharacters(prev => [...prev, saved]);
    setCurrentView("saved");
  };

  const selectCharacterForPractice = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentView("draw");
  };

  return (
  <div className="flex flex-col min-h-screen bg-gray-900 text-white">
  
    {/* Header Label */}
    <header className="p-4 bg-gray-800 text-xl font-semibold text-center">
      {currentView === "library" && "Character Library"}
      {currentView === "draw" && selectedCharacter && `Practice: ${selectedCharacter.character}`}
      {currentView === "saved" && "Saved Characters"}
      {currentView === "home" && "Welcome"}
    </header>

    {/* Main screen content */}
    <main className="flex-1 p-4 pb-24"> 
      {currentView === "home" && (
        <Home onStart={() => setCurrentView("library")} />
      )}
      {currentView === "library" && (
  <CharacterLibrary
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

    {/* Fixed Bottom Navigation */}
    <Navigation
      currentView={currentView}
      onViewChange={setCurrentView}
    />
  </div>
);

};

export default App;