import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { ProjectListScreen } from './screens/project-list/index';
import { UnaurhenticatedApp } from 'Unauthenticated-app'
import { AuthenticateApp } from './authenticated-app'
import { useAuth } from 'context/auth-context'
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticateApp /> : <UnaurhenticatedApp />}
    </div>
  );
}

export default App;
