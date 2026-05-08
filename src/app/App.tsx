import React from 'react';
import { LanguageProvider } from './LanguageContext';
import { ErrorBoundary } from './ErrorBoundary';
import { AppContent } from './components/AppContent';

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
