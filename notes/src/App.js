import './App.scss';
import NotesHome from './pages/Notes/NotesHome';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {IntlProvider} from 'react-intl';

function App() {
  return (
    <div>
      <Router>
        <IntlProvider>
          <Routes>
            <Route exact path="/" element={<NotesHome />} />
          </Routes>
        </IntlProvider>
      </Router>
    </div>
  );
}

export default App;
