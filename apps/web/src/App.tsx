import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Test = lazy(() => import('./pages/Test').then((module) => ({ default: module.Test })));
const Result = lazy(() => import('./pages/Result').then((module) => ({ default: module.Result })));
const PersonalityDetail = lazy(() =>
  import('./pages/PersonalityDetail').then((module) => ({ default: module.PersonalityDetail })),
);
const TypeLibrary = lazy(() =>
  import('./pages/TypeLibrary').then((module) => ({ default: module.TypeLibrary })),
);
const Profile = lazy(() => import('./pages/Profile').then((module) => ({ default: module.Profile })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const Privacy = lazy(() => import('./pages/Privacy').then((module) => ({ default: module.Privacy })));

function App() {
  return (
    <Router>
      <Suspense fallback={<RouteLoadingState />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test/:version" element={<Test />} />
          <Route path="/result/:type" element={<Result />} />
          <Route path="/type/:typeId" element={<PersonalityDetail />} />
          <Route path="/types" element={<TypeLibrary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

const RouteLoadingState = () => (
  <main className="site-root flex items-center justify-center bg-[var(--clay-bg)]">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--clay-border)] border-t-[var(--clay-blueberry)]" />
  </main>
);

export default App;
