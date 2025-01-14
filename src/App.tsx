import React from "react";
import { Shield } from "lucide-react";
import { SearchForm } from "./components/SearchForm";
import { SearchResults } from "./components/SearchResults";
import type { SearchFormData, SearchResult } from "./types";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<SearchResult | null>(
    null
  );
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  React.useEffect(() => {
    // Apply dark mode class to the body element based on the state
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSearch = async (data: SearchFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.proxynova.com/comb?query=${encodeURIComponent(
          data.query
        )}&start=0&limit=15`
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const apiResponse = await response.json();
      console.log("API Response:", apiResponse); 

      
      if (apiResponse.count > 0) {
        setSearchResult({
          found: true,
          breachDetails: {
            breachName: "COMB Breach",
            affectedData: ["email", "password"], 
            breachDate: "2021-02-02",
            occurrences: apiResponse.count,
            breachedLines: apiResponse.lines,
          },
        });
      } else {
        setSearchResult({
          found: false,
          breachDetails: undefined,
          errorMessage: "No breaches found for the given query.",
        });
      }
    } catch (error) {
      console.error("Error fetching API:", error);
      setSearchResult({
        found: false,
        breachDetails: undefined,
        errorMessage: "Unable to fetch breach data. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1
            className={`text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            CombSurge
          </h1>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Check if your credentials have been exposed in the Compilation of
            Many Breaches (COMB). Your search is secure and private.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
          <SearchResults result={searchResult} />
        </div>

        <footer
          className={`mt-16 text-center text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p>
            This tool securely transmits your query using HTTPS to protect your
            privacy.
          </p>
          <p className="mt-1">
            No personal information is stored or logged during the process.
          </p>

          <p className="mt-4 text-1.5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
            Made by iqlip with ❣️
          </p>
          <p className="mt-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 animate-pulse">
            ⚡
          </p>
        </footer>
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-md"
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
}

export default App;
