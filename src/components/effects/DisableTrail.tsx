// src/components/effects/DisableTrail.tsx
'use client';
import { useEffect } from 'react';

export default function DisableTrail() {
  useEffect(() => {
    document.body.dataset.noTrail = 'true';
    return () => {
      delete document.body.dataset.noTrail;
    };
  }, []);
  return null;
}
