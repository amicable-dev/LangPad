// components/DrawingPad.tsx - Interactive Drawing Canvas with Hanzi Writer
import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Save, Shuffle, Volume2, Info, Target } from 'lucide-react';
import type { DrawingPadProps } from '../types';
import HanziWriter from 'hanzi-writer';

const DrawingPad: React.FC<DrawingPadProps> = ({
  selectedCharacter,
  onSaveCharacter,
  onSelectNewCharacter
}) => {
  const displayRef = useRef<HTMLDivElement>(null);
  const practiceRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const quizRef = useRef<HanziWriter | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [practiceScore, setPracticeScore] = useState<number | null>(null);

  // Initialize Hanzi Writer when character changes
  useEffect(() => {
    if (!selectedCharacter) return;

    const char = selectedCharacter.character;

    if (displayRef.current) {
      writerRef.current = HanziWriter.create(displayRef.current, char, {
        width: 300,
        height: 300,
        padding: 20,
        strokeAnimationSpeed: animationSpeed,
        delayBetweenStrokes: 300,
        strokeColor: '#2563eb',
        outlineColor: '#e5e7eb',
        showOutline: true,
      });
    }

    if (practiceRef.current) {
      quizRef.current = HanziWriter.create(practiceRef.current, char, {
        width: 300,
        height: 300,
        padding: 20,
        strokeColor: '#059669',
        outlineColor: '#e5e7eb',
        showOutline: true,
        showCharacter: false,
        showHintAfterMisses: 2,
      });
    }
  }, [selectedCharacter, animationSpeed]);

  // Animate stroke order
  const startAnimation = () => {
    if (!writerRef.current || isAnimating) return;

    setIsAnimating(true);
    writerRef.current.animateCharacter({
      onComplete: () => setIsAnimating(false),
    });
  };

  // Start practice mode
  const startPractice = () => {
    if (!quizRef.current || isPracticing) return;

    setIsPracticing(true);
    setPracticeScore(null);

    quizRef.current.quiz({
      onComplete: (summary: any) => {
        setIsPracticing(false);
        const { totalMistakes, totalStrokes } = summary;
        const accuracy = Math.round(
          100 - (totalMistakes / totalStrokes) * 100
        );
        setPracticeScore(Math.max(0, accuracy));
      },
    });
  };

  // Reset practice canvas
  const resetPractice = () => {
    if (quizRef.current) {
      quizRef.current.cancelQuiz();
    }
    setIsPracticing(false);
    setPracticeScore(null);
  };

  // Save character drawing (placeholder - captures SVG instead of PNG here)
  const saveDrawing = () => {
    if (!selectedCharacter) return;
    const drawingData = `saved-${selectedCharacter.character}`;
    onSaveCharacter(selectedCharacter, drawingData);
    alert('Character saved successfully!');
  };

  // Play pronunciation
  const playPronunciation = () => {
    if (!selectedCharacter) return;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(selectedCharacter.character);
      utterance.lang = 'zh-CN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Practice Drawing</h1>
        <p className="text-gray-600">Learn proper stroke order and practice writing</p>
      </div>

      {/* Character Info */}
      {selectedCharacter && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-6">
            <div className="text-6xl font-bold text-gray-800">
              {selectedCharacter.character}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">Pinyin:</span>
                <span className="text-lg text-blue-600">{selectedCharacter.pinyin}</span>
                <button
                  onClick={playPronunciation}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Volume2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">Meaning:</span>
                <span className="text-gray-700">{selectedCharacter.meaning}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drawing Interface */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Stroke Order Display */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Stroke Order Guide</h3>
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isAnimating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{isAnimating ? 'Animating...' : 'Animate'}</span>
            </button>
          </div>
          <div ref={displayRef} className="w-80 h-80 mx-auto"></div>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">Animation Speed:</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
        </div>

        {/* Practice Canvas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Practice Drawing</h3>
            <div className="flex space-x-2">
              <button
                onClick={startPractice}
                disabled={isPracticing}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isPracticing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>{isPracticing ? 'Practicing...' : 'Start Practice'}</span>
              </button>
              <button
                onClick={resetPractice}
                className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
          <div ref={practiceRef} className="w-80 h-80 mx-auto"></div>
          {practiceScore !== null && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
              <p className="font-medium">Score: {practiceScore}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Save + Browse */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={saveDrawing}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Save className="w-5 h-5" />
          <span>Save Progress</span>
        </button>
        <button
          onClick={onSelectNewCharacter}
          className="flex items-center space-x-2 px-6 py-3 border rounded-lg hover:bg-gray-50"
        >
          <Shuffle className="w-5 h-5" />
          <span>Choose New Character</span>
        </button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Tips:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Watch the stroke order first</li>
              <li>• Follow stroke direction carefully</li>
              <li>• Repeat until it feels natural</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingPad;
