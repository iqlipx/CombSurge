// src/types/index.ts

export interface SearchResult {
  found: boolean;
  breachDetails?: {
    breachName: string;
    affectedData: string[];
    breachDate?: string;
    occurrences: number;
    breachedLines?: string[]; // Update to an array of strings (assuming breach data is in a readable format)
  };
  errorMessage?: string; // Optional error message when something goes wrong
}

export interface SearchFormData {
  query: string; // General query instead of separate search types for 'email', 'username', and 'phone'
}
