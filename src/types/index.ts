// types/index.ts - TypeScript Type Definitions
// This file contains all the TypeScript interfaces and types used throughout
// the LangPad application. It defines the structure of characters, stroke data,
// user interactions, and component props for type safety and better development experience.

// -----------------------------
// Basic Chinese character structure
// -----------------------------
export interface Character {
  id: string;                    // Unique identifier for the character
  character: string;             // The actual Chinese character (汉字)
  pinyin: string;                // Pronunciation in pinyin (e.g., "hàn zì")
  meaning: string;               // English meaning/translation
  english: string;               // Alternative/additional English translations
  strokes: number;               // Number of strokes to write the character
  difficulty: 'beginner' | 'intermediate' | 'advanced'; // Learning difficulty level
  category: string;              // Category/theme (e.g., "numbers", "family", "colors")
  examples?: Example[];          // Example words/phrases using this character
  strokeOrder?: StrokeData[];    // Stroke order animation data
  pronunciation?: string;        // Audio file path/URL for pronunciation
  radical?: string;              // Character radical (部首)
  components?: string[];         // Character components/parts
  frequency?: number;            // Usage frequency ranking (1 = most common)
}

// -----------------------------
// Example words/phrases using the character
// -----------------------------
export interface Example {
  word: string;                  // Chinese word/phrase
  pinyin: string;                // Pinyin pronunciation
  meaning: string;                // English meaning
  sentence?: string;             // Example sentence in Chinese
  sentencePinyin?: string;       // Example sentence pinyin
  sentenceMeaning?: string;      // Example sentence English
}

// -----------------------------
// Stroke order animation data
// -----------------------------
export interface StrokeData {
  id: number;                    // Stroke number (1, 2, 3, etc.)
  path: string;                  // SVG path data for the stroke
  startPoint: Point;             // Where the stroke starts
  endPoint: Point;               // Where the stroke ends
  controlPoints?: Point[];       // Bezier curve control points
  duration: number;              // Animation duration in milliseconds
  direction: 'horizontal' | 'vertical' | 'diagonal' | 'curve'; // Stroke direction
}

// 2D point
export interface Point {
  x: number;
  y: number;
}

// -----------------------------
// User's saved character with practice data
// -----------------------------
export interface SavedCharacter extends Character {
  drawing: string;               // Base64 encoded user drawing
  savedAt: string;               // ISO timestamp when saved
  practiceCount: number;         // How many times user practiced this character
  accuracy?: number;             // Drawing accuracy score (0-100)
  timeSpent?: number;            // Time spent practicing in seconds
  notes?: string;                // User's personal notes
  favorite?: boolean;            // Whether user marked as favorite
  lastPracticed?: string;        // ISO timestamp of last practice
}

// -----------------------------
// Drawing canvas state + methods
// -----------------------------
export interface DrawingState {
  isDrawing: boolean;
  currentPath: Point[];
  allPaths: Point[][];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
}

export interface DrawingMethods {
  startDrawing: (point: Point) => void;
  draw: (point: Point) => void;
  endDrawing: () => void;
  clearCanvas: () => void;
  saveDrawing: () => string;     // Returns base64 encoded image
  loadDrawing: (data: string) => void;
  undoLastStroke: () => void;
  redoStroke: () => void;
}

// -----------------------------
// Character search and filter
// -----------------------------
export interface SearchFilters {
  query: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  strokeRange?: {
    min: number;
    max: number;
  };
  sortBy: 'frequency' | 'strokes' | 'alphabetical' | 'difficulty';
  sortOrder: 'asc' | 'desc';
}

// -----------------------------
// Component props
// -----------------------------
export interface DrawingPadProps {
  selectedCharacter: Character | null;
  onSaveCharacter: (character: Character, drawing: string) => void;
  onSelectNewCharacter: () => void;
}

export interface CharacterLibraryProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
  loading?: boolean;
}

export interface SavedCharactersProps {
  savedCharacters: SavedCharacter[];
  onSelectCharacter: (character: Character) => void;
}

export interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export interface StrokeOrderGuideProps {
  character: Character;
  isPlaying: boolean;
  playbackSpeed: number;
  onComplete: () => void;
}

export interface CharacterInfoProps {
  character: Character;
  showExamples?: boolean;
  showStrokeOrder?: boolean;
  compact?: boolean;
}

// -----------------------------
// App view types
// -----------------------------
export type ViewType = 'home' | 'draw' | 'library' | 'saved' | 'settings';

// -----------------------------
// Audio state + user settings
// -----------------------------
export interface AudioState {
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'zh-CN' | 'zh-TW';
  strokeOrderSpeed: number;
  showPinyin: boolean;
  showStrokeNumbers: boolean;
  brushSize: number;
  brushColor: string;
  autoPlay: boolean;
  practiceModeReminders: boolean;
  strokeOrderGuide: boolean;
}

// -----------------------------
// API response types
// -----------------------------
export interface CharacterSearchResponse {
  characters: Character[];
  total: number;
  page: number;
  pageSize: number;
}

// -----------------------------
// Practice session + summary
// -----------------------------
export interface PracticeSummary {
  totalMistakes?: number;
  mistakes?: number;
  strokeCount?: number;
  totalStrokes?: number;
  strokes?: any[];
  duration?: number;
  [k: string]: any;
}

export interface PracticeSession {
  id: string;
  characterId: string;
  startTime: string;
  endTime: string;
  accuracy: number;
  strokeCount: number;
  mistakes: number;
  strokes?: Point[][];       // Optional raw stroke data
  totalMistakes?: number;    // Alias for compatibility
}

// -----------------------------
// Errors, events, metrics
// -----------------------------
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export interface DrawingEvent {
  type: 'start' | 'move' | 'end';
  point: Point;
  pressure?: number;
  timestamp: number;
}

export interface DifficultyMetrics {
  strokeComplexity: number;
  radicalCommonality: number;
  usageFrequency: number;
  visualComplexity: number;
}

export interface AnimationState {
  currentStroke: number;
  progress: number;  // 0–1
  isPlaying: boolean;
  speed: number;
  direction: 'forward' | 'backward';
}

export interface PerformanceMetrics {
  renderTime: number;
  frameRate: number;
  memoryUsage: number;
  strokeLatency: number;
}

// -----------------------------
// Utility types
// -----------------------------
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};
