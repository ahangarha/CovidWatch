import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CountriesPage from './pages/CountriesPage';
import CountryPage from './pages/CountryPage';

function App() {
  return (
    <div className="min-h-screen bg-pink-400 text-white">
      <Header />
      <Routes>
        <Route path="/" element={<CountriesPage />} />
        <Route path="/countries/:countryName" element={<CountryPage />} />
        <Route
          path="*"
          element={(
            <main className="p-4">
              <p>Not exist!</p>
            </main>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
