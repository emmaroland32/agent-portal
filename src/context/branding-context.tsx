"use client"

import React, { createContext, useContext, useEffect } from 'react'

interface BrandingConfig {
  organizationName: string
  primaryColor: string
  layout: 'vertical' | 'horizontal'
  logoUrl: string
}

const defaultBranding: BrandingConfig = {
  organizationName: 'ZGATE Distribution',
  primaryColor: '#10b981', // Emerald-500
  layout: 'vertical',
  logoUrl: ''
}

interface BrandingContextType {
  config: BrandingConfig
  loading: boolean
}

const BrandingContext = createContext<BrandingContextType>({
  config: defaultBranding,
  loading: true
})

function updateTheme(colorHex: string) {
  // Only update if hex is valid
  if (!/^#[0-9A-F]{6}$/i.test(colorHex)) return

  // Simple approach: Set a global CSS variable and use it in a style tag for specific overrides
  document.documentElement.style.setProperty('--primary-brand', colorHex)
}

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  // Static while there is nothing to fetch it from, so there is nothing to wait for either and
  // `loading` is a constant. It stays on the context so consumers need not change when a backend
  // does appear and this goes back to being state.
  const config = defaultBranding
  const loading = false

  /*
   * Branding was fetched from `http://localhost:3000/api/branding` — the staff dashboard, on a
   * different origin — and re-fetched every five seconds. It never worked: that route sends no CORS
   * headers, so the browser blocked every response and the catch branch ran each time, logging an
   * error and falling back to these defaults twenty times a minute. The hardcoded dev host also meant
   * it could never work anywhere else.
   *
   * Until this portal has a backend of its own (see README.md), the defaults ARE the branding.
   */
  useEffect(() => {
    updateTheme(config.primaryColor)
  }, [config.primaryColor])

  // Effect to update Favicon
  useEffect(() => {
    if (config.logoUrl) {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = config.logoUrl;
        document.head.appendChild(newLink);
      } else {
        link.href = config.logoUrl;
      }
    }
  }, [config.logoUrl])

  return (
    <BrandingContext.Provider value={{ config, loading }}>
      {children}
    </BrandingContext.Provider>
  )
}

export const useBranding = () => useContext(BrandingContext)
