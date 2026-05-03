export default function TreeSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="120px" height="120px" viewBox="0 0 120 120">
      <g fill="#1a0a24">
        {/* Trunk */}
        <rect x="57" y="60" width="6" height="55" rx="2" />
        {/* Palm fronds */}
        <path d="M60,58 Q40,30 15,35 Q38,42 55,55 Z" />
        <path d="M60,58 Q80,30 105,35 Q82,42 65,55 Z" />
        <path d="M60,55 Q30,40 10,50 Q35,48 55,55 Z" />
        <path d="M60,55 Q90,40 110,50 Q85,48 65,55 Z" />
        <path d="M60,52 Q50,25 35,15 Q48,30 58,50 Z" />
        <path d="M60,52 Q70,25 85,15 Q72,30 62,50 Z" />
      </g>
    </svg>
  );
}
