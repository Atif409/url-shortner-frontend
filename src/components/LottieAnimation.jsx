// src/components/LottieAnimation.jsx
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import qrCodeAnimation from '../assets/animations/qrCode.json'; // Adjust the path to your JSON file

const LottieAnimation = () => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      const animation = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: qrCodeAnimation, // The JSON animation data
      });

      // Cleanup function to stop animation on component unmount
      return () => {
        animation.destroy();
      };
    }
  }, []);

  return (
    <div className="w-[300px] h-[300px]">
      <div ref={container} className="w-full h-full"></div>
    </div>
  );
};

export default LottieAnimation;
