// SearchContext.jsx (Optimized for UX)
import {
  createContext,
  useState,
  useContext,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState(""); // typed query
  const [debouncedQuery, setDebouncedQuery] = useState(""); // for filtering/API
  const [isSearching, setIsSearching] = useState(false);

  const debounceRef = useRef(null);

  // Instant typing updates searchQuery
  const updateSearch = useCallback((query) => {
    setSearchQuery(query); // instant typing

    // Debounce filtering / API
    setIsSearching(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query); // use this in filtering
      setIsSearching(false);
    }, 300);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const value = useMemo(
    () => ({
      searchQuery,      // instant value for input
      debouncedQuery,   // debounced value for filtering
      updateSearch,
      isSearching,
    }),
    [searchQuery, debouncedQuery, isSearching, updateSearch]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
}

