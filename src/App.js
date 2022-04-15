import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CountriesPage from './pages/CountriesPage';
import CountryPage from './pages/CountryPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-pink-400 text-white">
      <Header />
      <Routes>
        <Route path="/" element={<CountriesPage />} />
        <Route path="/countries/:countryName" element={<CountryPage />} />
        <Route
          path="*"
          element={(
            <main className="p-4 grow">
              <p>Not exist!</p>
            </main>
          )}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
