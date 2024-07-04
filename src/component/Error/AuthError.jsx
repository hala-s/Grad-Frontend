import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';

export default function AuthError() {
  return (
    <div>
      <Player
    autoplay
    loop
    src="https://lottie.host/e1c45cf1-5ba8-40a1-9aac-3afbb02dcbd2/x2kf05hDj5.json"
    style={{ height: '100%', width: '100%' }}
  >
    <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
  </Player>
</div>
  )
}
