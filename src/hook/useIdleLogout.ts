// src/hooks/useIdleLogout.ts
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const useIdleLogout = (timeoutDuration = 1200000) => { // 5 minutes in milliseconds
  const router = useRouter();

  useEffect(() => {
    const resetTimer = () => {
      const now = Date.now();
      localStorage.setItem('lastActivityTime', now.toString());
    };

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    const interval = setInterval(() => {
      const lastTime = parseInt(localStorage.getItem('lastActivityTime') || '0', 10);
      if (Date.now() - lastTime >= timeoutDuration && localStorage.getItem('isLoggedIn') !== '1') {
        signOut();
        localStorage.setItem('isLoggedIn', '1')

      }
    }, 1000);

    const confirmLogout = async () => {
      await signOut({ redirect: false });
      router.push('/auth/login');  
    };
    const checkInitialInactivity = () => {
      const lastTime = parseInt(localStorage.getItem('lastActivityTime') || '0', 10);
      if ( Date.now() - lastTime >= timeoutDuration && localStorage.getItem('isLoggedIn') !== '1') {
        console.log("Logging out due to initial inactivity"); // Debug log
        signOut();
        localStorage.setItem('isLoggedIn', '1')
      }
    };

    checkInitialInactivity(); 

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearInterval(interval);
    };
  }, [timeoutDuration]);
};

export default useIdleLogout;
