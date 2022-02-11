import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { ProjectListScreen } from './screens/project-list/index';
// import { UnaurhenticatedApp } from 'Unauthenticated-app'
// import { AuthenticateApp } from './authenticated-app'
import { useAuth } from 'context/auth-context'
import { ErrorBoundary } from 'components/error-boundart';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
const AuthenticateApp = React.lazy(() => import('authenticated-app'))
const UnaurhenticatedApp = React.lazy(() => import('Unauthenticated-app'))
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticateApp /> : <UnaurhenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
