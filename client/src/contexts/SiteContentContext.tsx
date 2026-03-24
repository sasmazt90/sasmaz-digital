import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as fallbackSiteContent from "@/lib/siteContent";

export type SiteContent = typeof fallbackSiteContent;

interface SiteContentContextValue {
  siteContent: SiteContent;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const defaultSiteContent = fallbackSiteContent as SiteContent;

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setError(null);
      const response = await fetch("/api/site-content");
      if (!response.ok) {
        throw new Error(`Failed to load site content (${response.status})`);
      }

      const nextData = (await response.json()) as SiteContent;
      setSiteContent(nextData);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Failed to load site content.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        siteContent,
        isLoading,
        error,
        refresh,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }

  return context;
}
