import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { ProjectListScreen } from './screens/project-list/index';
import { UnaurhenticatedApp } from 'Unauthenticated-app'
import { AuthenticateApp } from './authenticated-app'
import { useAuth } from 'context/auth-context'
import { ErrorBoundary } from 'components/error-boundart';
import { FullPageErrorFallback } from 'components/lib';
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticateApp /> : <UnaurhenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
