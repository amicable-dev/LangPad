// data/characters.ts - Simplified Character Data using Hanzi Writer
// This approach uses Hanzi Writer's built-in character database instead of maintaining our own.
// Much cleaner and more maintainable!

import type { Character } from '../types';

// Just define which characters to include - Hanzi Writer handles the rest!
export const characterSets = {
  hsk1: ['我', '你', '他', '的', '是', '不', '了', '在', '人', '有', '我', '中', '到', '上', '来', '很', '也', '为', '就', '这', '对', '你', '说', '个', '什', '么', '都', '和', '要', '下', '看', '天', '时', '过', '出', '小', '么', '起', '你', '都', '把', '好', '还', '多', '没', '为', '又', '可', '家', '学', '只', '以', '主', '会', '样', '年', '想', '生', '同', '老', '中'],
  
  numbers: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '零', '百', '千', '万'],
  
  family: ['人', '家', '爸', '妈', '儿', '女', '子', '母', '父', '哥', '姐', '弟', '妹'],
  
  colors: ['红', '黄', '蓝', '绿', '白', '黑', '紫', '粉', '灰', '棕'],
  
  animals: ['猫', '狗', '鸟', '鱼', '马', '牛', '羊', '猪', '鸡', '鸭', '虎', '兔', '龙', '蛇'],
  
  nature: ['山', '水', '火', '土', '木', '金', '石', '日', '月', '星', '天', '地', '风', '雨'],
  
  basic: ['大', '小', '多', '少', '高', '低', '长', '短', '新', '旧', '好', '坏', '美', '丑']
};

// Category metadata
export const categories = [
  { id: 'hsk1', name: 'HSK Level 1', nameZh: 'HSK一级', icon: '🎯', color: 'blue' },
  { id: 'numbers', name: 'Numbers', nameZh: '数字', icon: '🔢', color: 'green' },
  { id: 'family', name: 'Family', nameZh: '家庭', icon: '👨‍👩‍👧‍👦', color: 'red' },
  { id: 'colors', name: 'Colors', nameZh: '颜色', icon: '🎨', color: 'purple' },
  { id: 'animals', name: 'Animals', nameZh: '动物', icon: '🐾', color: 'orange' },
  { id: 'nature', name: 'Nature', nameZh: '自然', icon: '🌱', color: 'emerald' },
  { id: 'basic', name: 'Basic Words', nameZh: '基础词', icon: '📝', color: 'gray' }
];

// Simple utility to get characters by category
export const getCharactersByCategory = (categoryId: string): string[] => {
  return characterSets[categoryId as keyof typeof characterSets] || [];
};

// Get all characters as a flat array
export const getAllCharacters = (): string[] => {
  return Object.values(characterSets).flat();
};

// Get random character
export const getRandomCharacter = (): string => {
  const allChars = getAllCharacters();
  return allChars[Math.floor(Math.random() * allChars.length)];
};

// Basic character info (Hanzi Writer will provide stroke data automatically)
export const createBasicCharacter = (char: string, category: string, index: number): Character => {
  return {
    id: `${category}_${char}_${index}`,
    character: char,
    pinyin: '', // Will be populated by external service or manually
    meaning: '', // Will be populated by external service or manually  
    english: '',
    strokes: 0, // Hanzi Writer will provide this
    difficulty: 'beginner',
    category,
    frequency: index + 1
  };
};

// Export simplified character list for easy integration
export const sampleCharacters = getAllCharacters().map((char, index) => 
  createBasicCharacter(char, 'mixed', index)
);