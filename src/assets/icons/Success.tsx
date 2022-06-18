import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const SuccessIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    style={{
      enableBackground: 'new 0 0 50 50',
    }}
    xmlSpace="preserve"
    {...props}>
    <Circle
      style={{
        fill: '#25ae88',
      }}
      cx={25}
      cy={25}
      r={25}
    />
    <Path
      style={{
        fill: 'none',
        stroke: '#fff',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 10,
      }}
      d="M38 15 22 33l-10-8"
    />
  </Svg>
);

export default SuccessIcon;