import React from 'react';
import Svg, {Path} from 'react-native-svg';

function Profile() {
  return (
    <Svg width="24" height="24">
      <Path
        fill="#34495e"
        d="M12 1028.4a4.903 4.903 0 00-1.844.375c-.083.034-.168.055-.25.094-.034.016-.06.046-.094.062-.203.1-.402.217-.593.344-.027.017-.067.013-.094.031-.056.039-.101.084-.156.125-.157.113-.322.216-.469.344-.134.12-.25.272-.375.406a6.714 6.714 0 00-1.094 1.438c-.515.903-.9 1.92-1.062 2.969a.417.417 0 00-.219 0c-.525.17-.655 1.168-.313 2.218.201.616.535 1.102.875 1.375.458 1.778 1.426 3.26 2.688 4.188v1.031l-1 1-2 1c-1.617.801-3.228 1.605-4.844 2.406-.895.54-1.241 1.6-1.156 2.594.042.626-.184 1.427.437 1.844.591.304 1.296.106 1.938.156H16c2.367 0 4.727.004 7.094 0 .768-.054.981-.865.906-1.5.014-.932.069-1.976-.656-2.688-.592-.602-1.434-.84-2.156-1.25-1.061-.525-2.128-1.037-3.188-1.562l-2-1-1-1v-1.031c1.262-.928 2.23-2.41 2.688-4.188.34-.273.674-.759.874-1.375.342-1.05.213-2.048-.312-2.219a.418.418 0 00-.219 0c-.162-1.048-.547-2.065-1.062-2.968a6.712 6.712 0 00-1.094-1.438c-.126-.134-.241-.285-.375-.406-.006-.005-.025.005-.031 0a5.686 5.686 0 00-1.281-.844 5.186 5.186 0 00-.594-.25 4.93 4.93 0 00-.782-.218c-.02-.004-.042.003-.062 0a4.477 4.477 0 00-.75-.063z"
        transform="translate(0 -1028.4)"
      />
      <Path
        fill="#2c3e50"
        d="M0 1051.4c.026.3.127.6.438.8.59.3 1.295.1 1.937.2h20.719c.576-.1.842-.5.906-1H0z"
        transform="translate(0 -1028.4)"
      />
    </Svg>
  );
}

export default Profile;