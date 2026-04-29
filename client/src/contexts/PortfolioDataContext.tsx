import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import * as fallbackPortfolioData from "@/lib/portfolioData";
import { repairTextEncodingDeep } from "@/lib/repairTextEncoding";

export type PortfolioData = typeof fallbackPortfolioData;

interface PortfolioDataContextValue {
  portfolioData: PortfolioData;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const defaultPortfolioData = repairTextEncodingDeep(
  fallbackPortfolioData as PortfolioData
);

const PortfolioDataContext = createContext<PortfolioDataContextValue | null>(
  null
);

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [portfolioData, setPortfolioData] =
    useState<PortfolioData>(defaultPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setError(null);
      const response = await fetch("/api/portfolio");
      if (!response.ok) {
        throw new Error(`Failed to load portfolio data (${response.status})`);
      }

      const nextData = repairTextEncodingDeep(
        (await response.json()) as PortfolioData
      );
      setPortfolioData(nextData);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Failed to load portfolio data."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <PortfolioDataContext.Provider
      value={{
        portfolioData,
        isLoading,
        error,
        refresh,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw new Error(
      "usePortfolioData must be used within PortfolioDataProvider"
    );
  }

  return context;
}
