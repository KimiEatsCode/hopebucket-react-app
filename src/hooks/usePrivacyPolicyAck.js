import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorageReceipe";

const STORAGE_KEY = "acceptedPrivacyVersion";

export function usePrivacyPolicyAck() {
  const [acceptedVersion, setAcceptedVersion] = useLocalStorage(STORAGE_KEY, null);
  const [currentVersion, setCurrentVersion] = useState(null);
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [metaLoaded, setMetaLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`${process.env.PUBLIC_URL}/privacy-meta.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`privacy-meta.json responded with ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setCurrentVersion(data.version ?? null);
        setEffectiveDate(data.effectiveDate ?? null);
      })
      .catch((err) => {
        console.warn("Could not load privacy policy version:", err);
      })
      .finally(() => {
        if (!cancelled) setMetaLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const needsAck = Boolean(
    metaLoaded && currentVersion && acceptedVersion !== currentVersion
  );

  const acknowledge = useCallback(() => {
    if (currentVersion) setAcceptedVersion(currentVersion);
  }, [currentVersion, setAcceptedVersion]);

  return {
    needsAck,
    metaLoaded,
    currentVersion,
    effectiveDate,
    acknowledge,
  };
}
