import { CheckCircle, AlertTriangle, Shield, AlertCircle } from "lucide-react";
import type { SearchResult } from "../types";

interface SearchResultsProps {
  result: SearchResult | null;
}

export function SearchResults({ result }: SearchResultsProps) {
  if (!result) return null;

  return (
    <div className="w-full max-w-2xl mt-8">
      {result.found ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold text-red-700">
                Data Breach Detected!
              </h3>
              <p className="text-red-600 mt-1">
                Your information was found in the COMB breach database.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-2">
              <span className="font-semibold">Breach Name:</span>
              <span>{result.breachDetails?.breachName}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold">Affected Data:</span>
              <span>{result.breachDetails?.affectedData.join(", ")}</span>
            </div>
            {result.breachDetails?.breachDate && (
              <div className="flex items-start gap-2">
                <span className="font-semibold">Date of Breach:</span>
                <span>{result.breachDetails.breachDate}</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="font-semibold">Occurrences:</span>
              <span>{result.breachDetails?.occurrences} time(s)</span>
            </div>
          </div>

          {/* Display Breached Lines if available */}
          {result.breachDetails?.breachedLines && (
            <div className="mt-6 bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Breached Data:
              </h4>
              <ul className="mt-2 space-y-2 text-gray-700">
                {result.breachDetails.breachedLines.map(
                  (line: string, index: number) => (
                    <li key={index} className="text-sm">
                      {/* Remove quotes and display the breached line in a readable format */}
                      <pre>{line.replace(/['"]+/g, "").trim()}</pre>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-green-700">
                Good News!
              </h3>
              <p className="text-green-600">
                Your information was not found in the COMB breach database.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-500" />
          <p className="text-blue-700 text-sm">
            Your search is securely transmitted over HTTPS. We do not store or
            log any of your personal information or search queries.
          </p>
        </div>
      </div>
      <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700 text-sm">
            <strong>Warning:</strong>
            <span className="block mt-1">
              This tool is designed for ethical and lawful use only.
            </span>
            <span className="block mt-1">
              Any misuse or illegal activity is strictly prohibited and may
              result in legal consequences.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
