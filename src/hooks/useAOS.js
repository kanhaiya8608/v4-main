// useAOS.js
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function useAOS() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      once: true, // Whether the animation should occur only once
    });
  }, []);

  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.refresh();
  });

  return AOS;
}

export default useAOS;
