import type { Character } from "./types";

// Numbers 0-10
export const NUMBERS: Character[] = [
  { id: "num-0", character: "零", pinyin: "líng", meaning: "zero", english: "zero" },
  { id: "num-1", character: "一", pinyin: "yī", meaning: "one", english: "one" },
  { id: "num-2", character: "二", pinyin: "èr", meaning: "two", english: "two" },
  { id: "num-3", character: "三", pinyin: "sān", meaning: "three", english: "three" },
  { id: "num-4", character: "四", pinyin: "sì", meaning: "four", english: "four" },
  { id: "num-5", character: "五", pinyin: "wǔ", meaning: "five", english: "five" },
  { id: "num-6", character: "六", pinyin: "liù", meaning: "six", english: "six" },
  { id: "num-7", character: "七", pinyin: "qī", meaning: "seven", english: "seven" },
  { id: "num-8", character: "八", pinyin: "bā", meaning: "eight", english: "eight" },
  { id: "num-9", character: "九", pinyin: "jiǔ", meaning: "nine", english: "nine" },
  { id: "num-10", character: "十", pinyin: "shí", meaning: "ten", english: "ten" },
];

// Larger numbers
export const LARGE_NUMBERS: Character[] = [
  { id: "num-100", character: "百", pinyin: "bǎi", meaning: "hundred", english: "hundred" },
  { id: "num-1000", character: "千", pinyin: "qiān", meaning: "thousand", english: "thousand" },
  { id: "num-10000", character: "万", pinyin: "wàn", meaning: "ten thousand", english: "ten thousand" },
];

// Common basic characters (beginner level)
export const BASIC_CHARACTERS: Character[] = [
  { id: "basic-1", character: "你", pinyin: "nǐ", meaning: "you", english: "you" },
  { id: "basic-2", character: "好", pinyin: "hǎo", meaning: "good", english: "good" },
  { id: "basic-3", character: "我", pinyin: "wǒ", meaning: "I/me", english: "I, me" },
  { id: "basic-4", character: "他", pinyin: "tā", meaning: "he/him", english: "he, him" },
  { id: "basic-5", character: "她", pinyin: "tā", meaning: "she/her", english: "she, her" },
  { id: "basic-6", character: "是", pinyin: "shì", meaning: "to be", english: "is, am, are" },
  { id: "basic-7", character: "不", pinyin: "bù", meaning: "not", english: "not, no" },
  { id: "basic-8", character: "的", pinyin: "de", meaning: "possessive particle", english: "'s (possessive)" },
  { id: "basic-9", character: "了", pinyin: "le", meaning: "completed action", english: "(past tense marker)" },
  { id: "basic-10", character: "在", pinyin: "zài", meaning: "at/in/on", english: "at, in, on" },
];

// Learning & Education
export const LEARNING_CHARACTERS: Character[] = [
  { id: "learn-1", character: "学", pinyin: "xué", meaning: "study/learn", english: "study, learn" },
  { id: "learn-2", character: "生", pinyin: "shēng", meaning: "student/life", english: "student, life" },
  { id: "learn-3", character: "书", pinyin: "shū", meaning: "book", english: "book" },
  { id: "learn-4", character: "字", pinyin: "zì", meaning: "character/word", english: "character, word" },
  { id: "learn-5", character: "文", pinyin: "wén", meaning: "writing/language", english: "writing, language" },
  { id: "learn-6", character: "读", pinyin: "dú", meaning: "read", english: "read" },
  { id: "learn-7", character: "写", pinyin: "xiě", meaning: "write", english: "write" },
  { id: "learn-8", character: "说", pinyin: "shuō", meaning: "speak/say", english: "speak, say" },
];

// Family
export const FAMILY_CHARACTERS: Character[] = [
  { id: "fam-1", character: "爸", pinyin: "bà", meaning: "dad", english: "dad, father" },
  { id: "fam-2", character: "妈", pinyin: "mā", meaning: "mom", english: "mom, mother" },
  { id: "fam-3", character: "哥", pinyin: "gē", meaning: "older brother", english: "older brother" },
  { id: "fam-4", character: "姐", pinyin: "jiě", meaning: "older sister", english: "older sister" },
  { id: "fam-5", character: "弟", pinyin: "dì", meaning: "younger brother", english: "younger brother" },
  { id: "fam-6", character: "妹", pinyin: "mèi", meaning: "younger sister", english: "younger sister" },
  { id: "fam-7", character: "家", pinyin: "jiā", meaning: "home/family", english: "home, family" },
];

// Common verbs
export const COMMON_VERBS: Character[] = [
  { id: "verb-1", character: "吃", pinyin: "chī", meaning: "eat", english: "eat" },
  { id: "verb-2", character: "喝", pinyin: "hē", meaning: "drink", english: "drink" },
  { id: "verb-3", character: "看", pinyin: "kàn", meaning: "look/watch", english: "look, watch, see" },
  { id: "verb-4", character: "听", pinyin: "tīng", meaning: "listen", english: "listen" },
  { id: "verb-5", character: "来", pinyin: "lái", meaning: "come", english: "come" },
  { id: "verb-6", character: "去", pinyin: "qù", meaning: "go", english: "go" },
  { id: "verb-7", character: "做", pinyin: "zuò", meaning: "do/make", english: "do, make" },
  { id: "verb-8", character: "有", pinyin: "yǒu", meaning: "have", english: "have" },
  { id: "verb-9", character: "想", pinyin: "xiǎng", meaning: "think/want", english: "think, want" },
  { id: "verb-10", character: "爱", pinyin: "ài", meaning: "love", english: "love" },
];

// Time
export const TIME_CHARACTERS: Character[] = [
  { id: "time-1", character: "天", pinyin: "tiān", meaning: "day/sky", english: "day, sky" },
  { id: "time-2", character: "年", pinyin: "nián", meaning: "year", english: "year" },
  { id: "time-3", character: "月", pinyin: "yuè", meaning: "month/moon", english: "month, moon" },
  { id: "time-4", character: "日", pinyin: "rì", meaning: "day/sun", english: "day, sun" },
  { id: "time-5", character: "时", pinyin: "shí", meaning: "time/hour", english: "time, hour" },
  { id: "time-6", character: "分", pinyin: "fēn", meaning: "minute/divide", english: "minute, divide" },
  { id: "time-7", character: "今", pinyin: "jīn", meaning: "today/now", english: "today, now" },
  { id: "time-8", character: "昨", pinyin: "zuó", meaning: "yesterday", english: "yesterday" },
  { id: "time-9", character: "明", pinyin: "míng", meaning: "tomorrow/bright", english: "tomorrow, bright" },
];

// All characters combined
export const ALL_CHARACTERS: Character[] = [
  ...NUMBERS,
  ...LARGE_NUMBERS,
  ...BASIC_CHARACTERS,
  ...LEARNING_CHARACTERS,
  ...FAMILY_CHARACTERS,
  ...COMMON_VERBS,
  ...TIME_CHARACTERS,
];

// Category map for filtering
export const CATEGORIES = {
  numbers: NUMBERS,
  largeNumbers: LARGE_NUMBERS,
  basic: BASIC_CHARACTERS,
  learning: LEARNING_CHARACTERS,
  family: FAMILY_CHARACTERS,
  verbs: COMMON_VERBS,
  time: TIME_CHARACTERS,
} as const;

export type CategoryKey = keyof typeof CATEGORIES;