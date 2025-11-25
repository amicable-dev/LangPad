// Base character type
export interface Character {
  id: string;
  character: string;
  pinyin: string;
  meaning: string;
  english: string;
  image?: string;
}

// Saved Character (with drawing included)
export interface SavedCharacter extends Character {
  drawing: string;
  savedAt: string;
  practiceCount: number;
}

// Navigation Screens
export type ViewType = "home" | "draw" | "library" | "saved";

// Drawing Pad Props
export interface DrawingPadProps {
  selectedCharacter: Character;
  onSaveCharacter: (c: Character, img: string) => void;
  onSelectNewCharacter: () => void;
}
