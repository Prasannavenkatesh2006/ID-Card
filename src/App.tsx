import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { TemplateCategoriesPage } from './pages/TemplateCategoriesPage';
import { CategoryTemplatesPage } from './pages/CategoryTemplatesPage';
import { FeatureDetailsPage } from './pages/FeatureDetailsPage';
import { CapturePhotoPage } from './pages/CapturePhotoPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Background } from './components/Background';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Background />
        <ThemeSwitcher />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplateCategoriesPage />} />
          <Route path="/templates/:category" element={<CategoryTemplatesPage />} />
          <Route path="/feature/:slug" element={<FeatureDetailsPage />} />
          <Route path="/capture" element={<CapturePhotoPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
