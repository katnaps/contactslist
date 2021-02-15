import React from 'react';
import './App.css';
import AddContact from './components/AddContact';
import ContactContent from './components/ContactContent';
import ContactContextProvider from './contexts/ContactContext';

function App() {
  return (
    <div className="container">
      <div className="container-content">
        <ContactContextProvider>
          <AddContact />
          <ContactContent />
        </ContactContextProvider>
      </div>
    </div>
  );
}

export default App;
