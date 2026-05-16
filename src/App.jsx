import { useCallback, useState } from 'react';

import HomeScreen from './screens/Home.jsx';
import JourneyScreen from './screens/Journey.jsx';
import LessonPlayerScreen from './screens/LessonPlayer.jsx';
import LibraryScreen from './screens/Library.jsx';
import OnboardingScreen from './screens/Onboarding.jsx';
import ParentDashboardScreen from './screens/ParentDashboard.jsx';
import ProfileScreen from './screens/Profile.jsx';
import QuizScreen from './screens/Quiz.jsx';

const SCREENS = {
  onboarding: OnboardingScreen,
  home:       HomeScreen,
  map:        JourneyScreen,
  library:    LibraryScreen,
  lesson:     LessonPlayerScreen,
  quiz:       QuizScreen,
  profile:    ProfileScreen,
  parent:     ParentDashboardScreen,
};

export default function App() {
  const [screen, setScreen] = useState('onboarding');
  const onNav = useCallback((next) => {
    if (SCREENS[next]) setScreen(next);
  }, []);

  const Screen = SCREENS[screen] ?? HomeScreen;

  return (
    <div className="curio-shell">
      <div className="curio-device">
        <div className="curio-app">
          <Screen onNav={onNav} />
        </div>
      </div>
    </div>
  );
}
