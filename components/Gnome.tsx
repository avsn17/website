export default function Gnome({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="The garden gnome caretaker" className="gnome-breathe">
      <defs>
        <linearGradient id="gnomeHat" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#e8a45d"/><stop offset="1" stopColor="#9d4c38"/></linearGradient>
        <linearGradient id="gnomeCoat" x1="0" x2="1"><stop stopColor="#6b9b67"/><stop offset="1" stopColor="#315c49"/></linearGradient>
        <filter id="gnomeShadow"><feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#06140f" floodOpacity=".45"/></filter>
      </defs>
      <ellipse cx="60" cy="108" rx="32" ry="6" fill="#06140f" opacity=".35" />
      <g filter="url(#gnomeShadow)">
        <path d="M29 45 Q60 2 91 45 Z" fill="url(#gnomeHat)" />
        <circle cx="60" cy="47" r="25" fill="#e4b27d" />
        <path d="M35 54 Q60 67 85 54 Q82 82 60 86 Q38 82 35 54Z" fill="#f4ead4" />
        <circle cx="51" cy="46" r="2.5" fill="#163528" /><circle cx="69" cy="46" r="2.5" fill="#163528" />
        <path d="M55 57 Q60 61 65 57" stroke="#8a4f3a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M35 78 Q60 68 85 78 L92 105 H28Z" fill="url(#gnomeCoat)" />
        <path d="M39 84 L20 94" stroke="#d7a374" strokeWidth="7" strokeLinecap="round" /><path d="M81 84 L101 73" stroke="#d7a374" strokeWidth="7" strokeLinecap="round" />
        <path d="M96 70 L103 93" stroke="#6b472e" strokeWidth="3" /><path d="M89 78 L105 76" stroke="#d4a85f" strokeWidth="4" />
      </g>
    </svg>
  );
}
