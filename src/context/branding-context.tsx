"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

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

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<BrandingConfig>(defaultBranding)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Poll for branding changes every 5 seconds or just fetch once
    const fetchBranding = () => {
        fetch('http://localhost:3000/api/branding')
        .then(res => res.json())
        .then(data => {
            setConfig(data)
            updateTheme(data.primaryColor)
        })
        .catch(err => {
            console.error('Failed to fetch branding:', err)
            // Fallback to default
            updateTheme(defaultBranding.primaryColor)
        })
        .finally(() => setLoading(false))
    }

    fetchBranding()
    
    // Optional: polling for demo purposes
    const interval = setInterval(fetchBranding, 5000)
    return () => clearInterval(interval)
  }, [])

  const updateTheme = (colorHex: string) => {
    // Only update if hex is valid
    if (!/^#[0-9A-F]{6}$/i.test(colorHex)) return

    // Simple approach: Set a global CSS variable and use it in a style tag for specific overrides
    document.documentElement.style.setProperty('--primary-brand', colorHex)
  }

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
