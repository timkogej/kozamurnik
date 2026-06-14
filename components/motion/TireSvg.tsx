type TireSvgProps = {
  className?: string;
};

/**
 * Detailed SVG tire placeholder — concentric circles, tread marks around
 * the circumference and a spoked hub, all in graphite tones. Used as the
 * rotating element until a real transparent-PNG tire replaces it.
 */
export function TireSvg({ className }: TireSvgProps) {
  const treadMarks = Array.from({ length: 36 }, (_, i) => i * 10);
  const spokes = Array.from({ length: 5 }, (_, i) => i * 72);

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden
      role="presentation"
      fill="none"
    >
      {/* Outer tyre body */}
      <circle cx="200" cy="200" r="196" fill="#15171B" />
      <circle cx="200" cy="200" r="196" stroke="#2A2D33" strokeWidth="2" />

      {/* Tread marks around the circumference */}
      {treadMarks.map((deg) => (
        <rect
          key={deg}
          x="195"
          y="6"
          width="10"
          height="26"
          rx="3"
          fill="#2E323A"
          transform={`rotate(${deg} 200 200)`}
        />
      ))}

      {/* Sidewall rings */}
      <circle cx="200" cy="200" r="160" stroke="#3A3F47" strokeWidth="2" />
      <circle cx="200" cy="200" r="148" stroke="#23262B" strokeWidth="6" />

      {/* Sidewall lettering hint */}
      <circle
        cx="200"
        cy="200"
        r="170"
        stroke="#4A4F58"
        strokeWidth="1.5"
        strokeDasharray="14 22"
      />

      {/* Rim */}
      <circle cx="200" cy="200" r="118" fill="#EFF1F3" />
      <circle cx="200" cy="200" r="118" stroke="#C2C7CE" strokeWidth="2" />
      <circle cx="200" cy="200" r="104" fill="#E3E6EA" />

      {/* Spokes */}
      {spokes.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <path
            d="M200 110 L218 186 Q200 196 182 186 Z"
            fill="#F7F8F9"
            stroke="#C2C7CE"
            strokeWidth="1.5"
          />
        </g>
      ))}

      {/* Lug bolts */}
      {spokes.map((deg) => (
        <circle
          key={deg}
          cx="200"
          cy="156"
          r="7"
          fill="#9097A0"
          transform={`rotate(${deg + 36} 200 200)`}
        />
      ))}

      {/* Hub */}
      <circle cx="200" cy="200" r="34" fill="#F7F8F9" stroke="#C2C7CE" strokeWidth="2" />
      <circle cx="200" cy="200" r="12" fill="#E11D2E" />
    </svg>
  );
}
