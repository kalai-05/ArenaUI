import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const ArenaLogo = ({ size = 32 }) => {
  const scale = size / 60;
  const width = 58.63 * scale;
  const height = 60 * scale;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 58.6335 60"
      fill="none"
    >
      <G>
        {/* Back gray fold */}
        <Path
          d="M58.6335 19.0144H17.3738V59.9314L0.000717163 41.0437V1.6414H41.2605L58.6335 19.0144Z"
          fill="#D9D9D9"
        />
        {/* Blue arrow fold */}
        <Path
          d="M0.000587463 41.043L41.0436 41.043L41.0436 0L58.6334 18.9326L58.6334 60L17.3736 60L0.000587463 41.043Z"
          fill="#52B4F5"
        />
      </G>
      {/* White inner square */}
      <Path
        d="M39.0889 1.9541V39.3936L1.9541 39.1035V1.9541H39.0889Z"
        fill="#F2F2F2"
        stroke="#F2F2F2"
        strokeWidth={3.909}
      />
      {/* Purple L-border */}
      <Path
        d="M41.0434 17.7855H17.59V41.1705"
        stroke="#8E5FEC"
        strokeWidth={4.886}
      />
      {/* Dark front square */}
      <Path
        d="M19.5445 19.8651H41.0434V41.364L19.5445 41.2266V19.8651Z"
        fill="#151621"
      />
    </Svg>
  );
};

export default ArenaLogo;
