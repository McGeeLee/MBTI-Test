import React from 'react';
import { motion, type Variants } from 'framer-motion';

export interface CharacterAvatarProps {
  type: string;
  size?: number | string;
  className?: string;
  animate?: boolean;
}

// 基础颜色定义 - 对应四大类型
const COLORS = {
  analyst: { // 紫色系 - INTJ, INTP, ENTJ, ENTP
    primary: '#8b5cf6', // violet-500
    secondary: '#7c3aed', // violet-600
    light: '#ddd6fe', // violet-200
    skin: '#fde68a', // amber-100 (skin tone)
    hair: '#4c1d95', // violet-900
    accent: '#c4b5fd', // violet-300
    clothing: '#5b21b6', // violet-800
  },
  diplomat: { // 绿色系 - INFJ, INFP, ENFJ, ENFP
    primary: '#10b981', // emerald-500
    secondary: '#059669', // emerald-600
    light: '#a7f3d0', // emerald-200
    skin: '#fecaca', // red-100 (rosy skin tone)
    hair: '#064e3b', // emerald-900
    accent: '#6ee7b7', // emerald-300
    clothing: '#047857', // emerald-700
  },
  sentinel: { // 蓝色系 - ISTJ, ISFJ, ESTJ, ESFJ
    primary: '#3b82f6', // blue-500
    secondary: '#2563eb', // blue-600
    light: '#bfdbfe', // blue-200
    skin: '#ffedd5', // orange-100
    hair: '#1e3a8a', // blue-900
    accent: '#93c5fd', // blue-300
    clothing: '#1d4ed8', // blue-700
  },
  explorer: { // 黄色系 - ISTP, ISFP, ESTP, ESFP
    primary: '#f59e0b', // amber-500
    secondary: '#d97706', // amber-600
    light: '#fde68a', // amber-200
    skin: '#fed7aa', // orange-200 (tan)
    hair: '#78350f', // amber-900
    accent: '#fcd34d', // amber-300
    clothing: '#b45309', // amber-700
  }
};

const getCategory = (type: string) => {
  const t = type.toUpperCase();
  if (['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(t)) return 'analyst';
  if (['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(t)) return 'diplomat';
  if (['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].includes(t)) return 'sentinel';
  return 'explorer';
};

const getBlinkDelay = (type: string) => {
  const seed = [...type.toUpperCase()].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return 2 + (seed % 40) / 10;
};

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ type, size = 120, className = '', animate = true }) => {
  const category = getCategory(type);
  const c = COLORS[category as keyof typeof COLORS];
  const t = type.toUpperCase();

  // 身体动画
  const bodyVariants: Variants = {
    hover: {
      y: -3,
      rotate: [0, -1, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: [0.42, 0, 0.58, 1]
      }
    }
  };
  
  // 眼睛动画 (眨眼)
  const eyeVariants = {
    initial: { scaleY: 1 },
    blink: { 
      scaleY: [1, 0.1, 1],
      transition: { 
        duration: 0.25, 
        repeat: Infinity, 
        repeatDelay: getBlinkDelay(t)
      }
    }
  };

  // 渲染具体角色的特征
  const renderCharacterDetails = () => {
    switch(t) {
      // --- Analysts (Purple) ---
      case 'INTJ': // Architect: Strict, blueprint, glasses, mustache?
        return (
          <>
            {/* Clothing: Suit */}
            <path d="M25 80 L 25 100 L 75 100 L 75 80 C 75 65 25 65 25 80" fill={c.clothing} />
            <path d="M40 80 L 50 90 L 60 80 L 50 100 Z" fill="white" opacity="0.2" /> {/* Tie area */}
            <path d="M48 80 L 50 100 L 52 80 Z" fill={c.primary} /> {/* Tie */}
            
            {/* Head */}
            <circle cx="50" cy="45" r="19" fill={c.skin} />
            
            {/* Hair: Neat side part */}
            <path d="M30 40 C 30 20 70 20 70 40 C 70 50 65 50 65 40 C 65 25 35 25 35 40 Z" fill={c.hair} />
            <path d="M30 40 C 28 45 28 50 32 45" fill={c.hair} />

            {/* Glasses */}
            <circle cx="43" cy="46" r="4" stroke="#333" strokeWidth="1.5" fill="none" />
            <circle cx="57" cy="46" r="4" stroke="#333" strokeWidth="1.5" fill="none" />
            <line x1="47" y1="46" x2="53" y2="46" stroke="#333" strokeWidth="1.5" />

            {/* Beard/Moustache */}
            <path d="M45 58 Q 50 62 55 58" stroke={c.hair} strokeWidth="2" fill="none" />

            {/* Prop: Blueprint Scroll */}
            <rect x="65" y="65" width="20" height="25" rx="2" fill="white" stroke={c.secondary} strokeWidth="1" transform="rotate(-10 65 65)" />
            <line x1="68" y1="70" x2="80" y2="70" stroke={c.secondary} strokeWidth="1" transform="rotate(-10 65 65)" />
            <line x1="68" y1="75" x2="78" y2="75" stroke={c.secondary} strokeWidth="1" transform="rotate(-10 65 65)" />
          </>
        );
      
      case 'INTP': // Logician: Lab coat, messy hair, flask
        return (
          <>
            {/* Clothing: Lab coat */}
            <path d="M25 80 L 25 100 L 75 100 L 75 80 C 75 65 25 65 25 80" fill="white" stroke="#e2e8f0" strokeWidth="1" />
            <path d="M50 65 L 50 100" stroke="#cbd5e1" strokeWidth="1" />
            
            {/* Head */}
            <circle cx="50" cy="45" r="19" fill={c.skin} />
            
            {/* Hair: Messy */}
            <path d="M25 45 C 20 30 30 15 50 15 C 70 15 80 30 75 45 C 75 55 65 50 65 40 C 65 25 35 25 35 40 C 35 50 25 55 25 45 Z" fill={c.hair} />

            {/* Prop: Flask */}
            <path d="M70 70 L 70 65 L 76 65 L 76 70 L 82 85 L 64 85 Z" fill={c.accent} stroke={c.primary} strokeWidth="1" />
            <circle cx="73" cy="78" r="2" fill="white" opacity="0.6" />
          </>
        );

      case 'ENTJ': // Commander: Sharp suit, pointer
        return (
          <>
             {/* Clothing: Sharp Suit with raised collar */}
             <path d="M20 75 L 20 100 L 80 100 L 80 75 C 80 60 20 60 20 75" fill={c.clothing} />
             <path d="M50 60 L 35 75 L 50 90 L 65 75 Z" fill="white" />
             <path d="M50 75 L 50 95" stroke={c.primary} strokeWidth="3" />

             {/* Hair behind the face */}
             <path d="M30 40 C 30 25 70 25 70 40 L 70 50 L 30 50 Z" fill={c.hair} />

             {/* Head */}
             <circle cx="50" cy="42" r="19" fill={c.skin} />

             {/* Eyebrows: Angry/Determine */}
             <line x1="38" y1="38" x2="45" y2="40" stroke={c.hair} strokeWidth="2" />
             <line x1="55" y1="40" x2="62" y2="38" stroke={c.hair} strokeWidth="2" />

             {/* Prop: Pointer/Cane */}
             <line x1="75" y1="60" x2="75" y2="100" stroke="#4a044e" strokeWidth="3" />
             <circle cx="75" cy="60" r="3" fill="#fbbf24" />
          </>
        );

      case 'ENTP': // Debater: Smirk, raised eyebrow, stylish jacket
        return (
          <>
             {/* Clothing: Stylish Jacket */}
             <path d="M25 75 L 25 100 L 75 100 L 75 75 C 75 60 25 60 25 75" fill={c.clothing} />
             <path d="M50 60 L 50 100" stroke={c.accent} strokeWidth="2" />

             {/* Head */}
             <circle cx="50" cy="45" r="19" fill={c.skin} />

             {/* Hair: Asymmetric/Wild */}
             <path d="M28 45 C 25 20 65 15 75 35 C 78 45 70 50 65 45 C 60 30 40 30 35 45 Z" fill={c.hair} />

             {/* Face: Smirk & Eyebrow */}
             <path d="M45 55 Q 50 58 55 53" stroke="#333" strokeWidth="1.5" fill="none" />
             <path d="M38 38 Q 42 35 46 38" stroke={c.hair} strokeWidth="1.5" fill="none" /> {/* Raised */}
             <path d="M54 38 Q 58 40 62 38" stroke={c.hair} strokeWidth="1.5" fill="none" /> {/* Normal */}
          </>
        );

      // --- Diplomats (Green) ---
      case 'INFJ': // Advocate: Wise, robes, staff/orb
        return (
          <>
             {/* Long hair sits behind both the face and clothing */}
             <path
               d="M30 43 Q 30 21 50 20 Q 70 21 70 43 L 73 76 Q 70 84 63 78 L 37 78 Q 30 84 27 76 Z"
               fill={c.hair}
             />

             {/* Clothing: Robes */}
             <path d="M25 70 L 15 100 L 85 100 L 75 70 C 70 55 30 55 25 70" fill={c.clothing} />
             <path d="M50 55 L 50 100" stroke={c.accent} strokeWidth="1" />

             {/* Head */}
             <circle cx="50" cy="44" r="18" fill={c.skin} />

             {/* Calm side-parted hairline */}
             <path
               d="M31 39 Q 34 23 49 23 Q 63 23 69 38 Q 60 34 53 36 Q 43 31 31 39 Z"
               fill={c.hair}
             />
             
             {/* Prop: Glowing Orb */}
             <circle cx="75" cy="75" r="6" fill="white" className="animate-pulse" />
             <circle cx="75" cy="75" r="8" stroke="white" strokeWidth="1" opacity="0.5" className="animate-ping" />
          </>
        );

      case 'INFP': // Mediator: Flower crown, flowy
        return (
          <>
             {/* Wavy hair sits behind both the face and clothing */}
             <path
               d="M28 43 Q 29 25 50 24 Q 71 25 72 43 L 75 70 Q 74 82 65 76 Q 59 83 50 77 Q 41 83 35 76 Q 26 82 25 70 Z"
               fill={c.hair}
             />

             {/* Clothing: Tunic */}
             <path d="M30 75 L 20 100 L 80 100 L 70 75 C 65 60 35 60 30 75" fill={c.accent} />

             {/* Head */}
             <circle cx="50" cy="45" r="18" fill={c.skin} />

             {/* Soft center-parted fringe */}
             <path
               d="M29 39 Q 33 27 49 27 Q 66 26 71 38 Q 61 34 53 37 Q 43 32 29 39 Z"
               fill={c.hair}
             />

             {/* Flowers */}
             <circle cx="35" cy="34" r="3" fill="#f472b6" />
             <circle cx="65" cy="34" r="3" fill="#f472b6" />

             {/* Prop: Butterfly (simplified) */}
             <path d="M75 65 L 80 60 L 85 65 L 80 70 Z" fill="#fcd34d" />
          </>
        );

      case 'ENFJ': // Protagonist: Sword/Heart, Heroic
        return (
          <>
             {/* Flowing hair sits behind both the face and clothing */}
             <path
               d="M30 42 Q 31 23 50 22 Q 69 23 70 42 L 72 61 Q 66 66 61 58 L 39 58 Q 34 66 28 61 Z"
               fill={c.hair}
             />

             {/* Clothing: Armor-like/Heroic */}
             <path d="M25 75 L 20 100 L 80 100 L 75 75 C 70 60 30 60 25 75" fill={c.clothing} />
             <path d="M30 75 L 50 90 L 70 75" fill="none" stroke={c.accent} strokeWidth="2" />

             {/* Head */}
             <circle cx="50" cy="44" r="18" fill={c.skin} />

             {/* Heroic swept fringe */}
             <path
               d="M31 39 Q 35 23 49 23 Q 63 23 69 38 Q 59 33 52 36 Q 42 32 31 39 Z"
               fill={c.hair}
             />

             {/* Prop: Sword Hilt / Torch */}
             <rect x="70" y="60" width="4" height="30" fill="#9ca3af" />
             <rect x="65" y="65" width="14" height="4" fill="#4b5563" />
          </>
        );
      
      case 'ENFP': // Campaigner: Fun hat/hair, balloons
        return (
          <>
             {/* Rounded bob sits behind both the face and clothing */}
             <path
               d="M28 42 Q 29 25 50 24 Q 71 25 72 42 L 74 62 Q 71 69 65 64 Q 58 70 50 64 Q 42 70 35 64 Q 29 69 26 62 Z"
               fill={c.hair}
             />

             {/* Clothing: Colorful */}
             <path d="M30 75 L 20 100 L 80 100 L 70 75 C 65 60 35 60 30 75" fill={c.primary} />
             <circle cx="40" cy="85" r="3" fill="white" opacity="0.5" />
             <circle cx="60" cy="90" r="3" fill="white" opacity="0.5" />

             {/* Head */}
             <circle cx="50" cy="45" r="18" fill={c.skin} />

             {/* Playful front wave */}
             <path
               d="M29 39 Q 33 27 48 27 Q 62 25 71 38 Q 61 34 54 37 Q 44 32 29 39 Z"
               fill={c.hair}
             />
             
             {/* Prop: Balloon */}
             <line x1="75" y1="70" x2="75" y2="90" stroke="#333" strokeWidth="1" />
             <circle cx="75" cy="65" r="8" fill="#f87171" opacity="0.9" />
             <circle cx="77" cy="62" r="2" fill="white" opacity="0.5" />
          </>
        );

      // --- Sentinels (Blue) ---
      case 'ISTJ': // Logistician: Glasses, clipboard, neat
        return (
          <>
             {/* Clothing: Shirt and Tie */}
             <path d="M25 80 L 25 100 L 75 100 L 75 80 C 75 65 25 65 25 80" fill="white" stroke="#94a3b8" />
             <path d="M50 65 L 50 100" stroke="#94a3b8" strokeWidth="1" />
             <path d="M48 65 L 50 85 L 52 65 Z" fill={c.clothing} />

             {/* Neat hair sits behind the face */}
             <path d="M30 35 C 30 20 70 20 70 35 L 70 50 L 30 50 Z" fill={c.hair} />

             {/* Head */}
             <circle cx="50" cy="42" r="19" fill={c.skin} />

             {/* Glasses */}
             <rect x="38" y="40" width="10" height="6" rx="1" stroke="#333" strokeWidth="1" fill="none" />
             <rect x="52" y="40" width="10" height="6" rx="1" stroke="#333" strokeWidth="1" fill="none" />
             <line x1="48" y1="43" x2="52" y2="43" stroke="#333" strokeWidth="1" />

             {/* Prop: Clipboard */}
             <rect x="15" y="65" width="20" height="25" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" transform="rotate(10 15 65)" />
             <line x1="18" y1="70" x2="30" y2="72" stroke="#64748b" strokeWidth="1" />
             <line x1="18" y1="75" x2="30" y2="77" stroke="#64748b" strokeWidth="1" />
          </>
        );

      case 'ISFJ': // Defender: Nurse/Caregiver, gentle
        return (
          <>
             {/* Clothing: Scrub/Uniform */}
             <path d="M25 75 L 20 100 L 80 100 L 75 75 C 70 60 30 60 25 75" fill={c.light} />
             <rect x="45" y="80" width="10" height="10" fill="white" opacity="0.6" />
             <rect x="48" y="82" width="4" height="6" fill="#ef4444" /> {/* Cross */}
             <rect x="47" y="83" width="6" height="4" fill="#ef4444" />

             {/* Bun and hair sit behind the face */}
             <circle cx="50" cy="25" r="8" fill={c.hair} />
             <path d="M30 35 C 30 20 70 20 70 35 L 70 55 L 30 55 Z" fill={c.hair} />

             {/* Head */}
             <circle cx="50" cy="42" r="18" fill={c.skin} />
          </>
        );

      case 'ESTJ': // Executive: Suit, gavel, stern
        return (
          <>
             {/* Clothing: Suit */}
             <path d="M20 75 L 20 100 L 80 100 L 80 75 C 80 60 20 60 20 75" fill={c.clothing} />
             <path d="M50 60 L 40 70 L 50 80 L 60 70 Z" fill="white" />

             {/* Short hair sits behind the face */}
             <path d="M30 40 C 30 25 70 25 70 40 L 70 45 L 30 45 Z" fill={c.hair} />

             {/* Head */}
             <circle cx="50" cy="42" r="19" fill={c.skin} />

             {/* Prop: Gavel */}
             <rect x="70" y="60" width="20" height="10" fill="#78350f" transform="rotate(-15 70 60)" />
             <rect x="78" y="65" width="4" height="25" fill="#92400e" transform="rotate(-15 70 60)" />
          </>
        );

      case 'ESFJ': // Consul: Welcoming, tray
        return (
          <>
             {/* Clothing: Apron/Vest */}
             <path d="M30 75 L 20 100 L 80 100 L 70 75 C 65 60 35 60 30 75" fill={c.primary} />
             <path d="M35 75 L 65 75 L 60 100 L 40 100 Z" fill="white" opacity="0.3" />

             {/* Bob sits behind the face */}
             <path d="M25 40 C 25 20 75 20 75 40 L 80 65 L 20 65 Z" fill={c.hair} />

             {/* Head */}
             <circle cx="50" cy="45" r="18" fill={c.skin} />

             {/* Prop: Cake/Tray */}
             <rect x="65" y="75" width="20" height="2" fill="#94a3b8" />
             <rect x="70" y="65" width="10" height="10" fill="#f472b6" rx="2" />
          </>
        );

      // --- Explorers (Yellow) ---
      case 'ISTP': // Virtuoso: Goggles, wrench, vest
        return (
          <>
             {/* Clothing: Vest/Overalls */}
             <path d="M25 75 L 25 100 L 75 100 L 75 75 C 75 60 25 60 25 75" fill={c.clothing} />
             <path d="M35 75 L 35 100" stroke="#78350f" strokeWidth="2" />
             <path d="M65 75 L 65 100" stroke="#78350f" strokeWidth="2" />

             {/* Rounded cap and short hair frame the face */}
             <path
               d="M30 43 C 30 27 70 27 70 43 L 68 56 Q 64 61 60 57 L 40 57 Q 36 61 32 56 Z"
               fill={c.hair}
             />

             {/* Head */}
             <circle cx="50" cy="45" r="19" fill={c.skin} />

             {/* Mechanic cap */}
             <path d="M31 36 Q 35 24 50 24 Q 65 24 69 36 Z" fill={c.secondary} />
             <path d="M28 36 Q 49 32 72 36" stroke={c.hair} strokeWidth="3" strokeLinecap="round" />

             {/* Goggles rest on the cap instead of across the face */}
             <rect x="36" y="27" width="11" height="7" rx="2" fill="#60a5fa" stroke="#1e293b" strokeWidth="1.5" />
             <rect x="53" y="27" width="11" height="7" rx="2" fill="#60a5fa" stroke="#1e293b" strokeWidth="1.5" />
             <line x1="47" y1="30.5" x2="53" y2="30.5" stroke="#1e293b" strokeWidth="1.5" />

             {/* Prop: Wrench */}
             <path d="M75 70 L 85 80" stroke="#94a3b8" strokeWidth="4" />
             <circle cx="75" cy="70" r="4" stroke="#94a3b8" strokeWidth="2" fill="none" />
          </>
        );

      case 'ISFP': // Adventurer: Beret, palette
        return (
          <>
             {/* Soft hair silhouette sits behind both the face and clothing */}
             <path
               d="M29 43 C 27 27 73 27 71 43 L 75 72 Q 72 84 64 78 Q 58 84 50 78 Q 42 84 36 78 Q 28 84 25 72 Z"
               fill={c.hair}
             />

             {/* Clothing: Paint splattered shirt */}
             <path d="M30 75 L 20 100 L 80 100 L 70 75 C 65 60 35 60 30 75" fill={c.light} />
             <circle cx="40" cy="80" r="2" fill="#ef4444" />
             <circle cx="50" cy="90" r="3" fill="#3b82f6" />
             <circle cx="60" cy="85" r="2" fill="#eab308" />

             {/* Head */}
             <circle cx="50" cy="45" r="18" fill={c.skin} />

             {/* Centered artist beret */}
             <path d="M31 35 Q 34 23 50 23 Q 66 23 69 35 Z" fill={c.secondary} />
             <path d="M32 35 Q 50 32 68 35" stroke={c.hair} strokeWidth="2" strokeLinecap="round" />
             <circle cx="50" cy="22" r="2.5" fill={c.secondary} />

             {/* Prop: Palette */}
             <ellipse cx="75" cy="75" rx="10" ry="8" fill="#d97706" />
             <circle cx="72" cy="73" r="2" fill="#ef4444" />
             <circle cx="78" cy="73" r="2" fill="#3b82f6" />
             <circle cx="75" cy="78" r="2" fill="#22c55e" />
          </>
        );

      case 'ESTP': // Entrepreneur: Sunglasses, leather jacket
        return (
          <>
             {/* Clothing: Jacket with collar */}
             <path d="M20 75 L 20 100 L 80 100 L 80 75 C 80 60 20 60 20 75" fill="#1f2937" />
             <path d="M50 60 L 50 100" stroke="#374151" strokeWidth="1" />
             <path d="M50 60 L 40 70 L 50 80 L 60 70 Z" fill="white" />

             {/* Short hair sits behind the face */}
             <path
               d="M30 43 C 30 23 70 23 70 43 L 68 54 Q 64 58 60 54 L 40 54 Q 36 58 32 54 Z"
               fill={c.hair}
             />

             {/* Head */}
             <circle cx="50" cy="45" r="19" fill={c.skin} />

             {/* Tousled fringe, shaped to avoid the old horn-like silhouette */}
             <path
               d="M31 40 Q 34 24 43 24 L 48 18 L 52 24 L 57 21 L 62 24 Q 68 24 70 39 Q 60 34 52 37 Q 42 33 31 40 Z"
               fill={c.hair}
             />

             {/* Sunglasses */}
             <path d="M35 43 L 48 43 L 48 49 C 48 52 35 52 35 49 Z" fill="#111827" />
             <path d="M52 43 L 65 43 L 65 49 C 65 52 52 52 52 49 Z" fill="#111827" />
             <line x1="48" y1="44" x2="52" y2="44" stroke="#111827" strokeWidth="1.5" />
          </>
        );

      case 'ESFP': // Entertainer: Mic, star
        return (
          <>
             {/* Rounded curls sit behind both the face and clothing */}
             <path
               d="M27 44 C 24 27 76 27 73 44 L 78 67 Q 77 77 68 74 Q 63 82 57 76 Q 50 83 43 76 Q 37 82 32 74 Q 23 77 22 67 Z"
               fill={c.hair}
             />

             {/* Clothing: Sparkly */}
             <path d="M30 75 L 20 100 L 80 100 L 70 75 C 65 60 35 60 30 75" fill={c.primary} />
             <path d="M40 80 L 42 85 L 38 85 Z" fill="white" /> {/* Star shape hint */}
             <path d="M60 90 L 62 95 L 58 95 Z" fill="white" />

             {/* Head */}
             <circle cx="50" cy="45" r="18" fill={c.skin} />

             {/* Soft front wave */}
             <path d="M30 38 Q 34 26 50 26 Q 66 26 70 38 Q 61 33 52 36 Q 42 32 30 38 Z" fill={c.hair} />

             {/* Prop: Microphone */}
             <line x1="75" y1="65" x2="75" y2="80" stroke="#333" strokeWidth="3" />
             <circle cx="75" cy="65" r="4" fill="#64748b" />
          </>
        );

      default:
        return (
           <>
             {/* Generic Body */}
             <path d="M30 80 C 30 65, 70 65, 70 80 L 80 100 L 20 100 Z" fill={c.primary} />
             <circle cx="50" cy="45" r="18" fill={c.skin} />
             <circle cx="50" cy="40" r="22" fill={c.hair} />
           </>
        );
    }
  };

  // 通用面部特征 (如果没有被特定角色覆盖)
  const renderFace = () => {
    // 墨镜角色不需要眼睛
    if (['ESTP'].includes(t)) return null;

    return (
      <motion.g variants={animate ? eyeVariants : undefined} initial="initial" animate="blink">
        <circle cx="43" cy="45" r="2.5" fill="#1e293b" />
        <circle cx="57" cy="45" r="2.5" fill="#1e293b" />
        {/* Eye shine */}
        <circle cx="44" cy="44" r="0.8" fill="white" />
        <circle cx="58" cy="44" r="0.8" fill="white" />
      </motion.g>
    );
  };

  // 通用嘴巴
  const renderMouth = () => {
    // T型通常严肃，F型通常微笑
    if (t.includes('T')) {
      return <path d="M45 56 L 55 56" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />;
    } else {
      return <path d="M45 55 Q 50 60 55 55" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />;
    }
  };

  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={animate ? "hover" : undefined}
      variants={bodyVariants}
    >
      {/* 背景光环 */}
      <circle cx="50" cy="50" r="48" fill={c.light} opacity="0.6" />
      
      {/* 角色特定层 */}
      {renderCharacterDetails()}
      
      {/* 面部 (位于最上层) */}
      {renderFace()}
      {renderMouth()}
      
    </motion.svg>
  );
};
