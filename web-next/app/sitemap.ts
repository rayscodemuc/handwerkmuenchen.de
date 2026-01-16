import { MetadataRoute } from 'next'

// Base URL aus Environment Variable, Fallback zu Production Domain
const getBaseUrl = (): string => {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://www.mr-clean.services'
  )
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()
  const lastModified = new Date()

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified,
    },
    {
      url: `${baseUrl}/ueber-uns`,
      lastModified,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified,
    },
    {
      url: `${baseUrl}/anfrage`,
      lastModified,
    },
    {
      url: `${baseUrl}/rechner`,
      lastModified,
    },
    {
      url: `${baseUrl}/partner-werden`,
      lastModified,
    },
    {
      url: `${baseUrl}/service-24-7`,
      lastModified,
    },
    // Kategorie-Landingpages
    {
      url: `${baseUrl}/handwerk`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/facility-management`,
      lastModified,
    },
    {
      url: `${baseUrl}/aussenanlagen`,
      lastModified,
    },
    // Handwerk: Elektrotechnik
    {
      url: `${baseUrl}/handwerk/elektrotechnik`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/e-mobility`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/elektro-notdienst`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/hauselektrik`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/klingelanlagen`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/led`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/messsysteme`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/neubau`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/reparaturen`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/sanierung`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/sicherheitstechnik`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/elektrotechnik/smart-home`,
      lastModified,
    },
    // Handwerk: Weitere Services
    {
      url: `${baseUrl}/handwerk/sanitaer-heizung`,
      lastModified,
    },
    {
      url: `${baseUrl}/handwerk/service-wartung`,
      lastModified,
    },
    // Reinigung
    {
      url: `${baseUrl}/reinigung/unterhaltsreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/grundreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/fensterreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/glas-fassade`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/sonderreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/grauflaechenreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/tiefgaragenreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/bueroreinigung`,
      lastModified,
    },
    // Facility Management
    {
      url: `${baseUrl}/facility-management/hausmeisterservice`,
      lastModified,
    },
    {
      url: `${baseUrl}/facility-management/objektmanagement`,
      lastModified,
    },
    {
      url: `${baseUrl}/facility-management/winterdienst`,
      lastModified,
    },
    // Außenanlagen
    {
      url: `${baseUrl}/aussenanlagen/gruenpflege`,
      lastModified,
    },
    {
      url: `${baseUrl}/aussenanlagen/baumpflege`,
      lastModified,
    },
    {
      url: `${baseUrl}/aussenanlagen/winterdienst-aussen`,
      lastModified,
    },
    // Standorte
    {
      url: `${baseUrl}/standorte/muenchen`,
      lastModified,
    },
    {
      url: `${baseUrl}/standorte/augsburg`,
      lastModified,
    },
    {
      url: `${baseUrl}/standorte/nuernberg`,
      lastModified,
    },
    {
      url: `${baseUrl}/standorte/ingolstadt`,
      lastModified,
    },
    {
      url: `${baseUrl}/standorte/hamburg`,
      lastModified,
    },
    {
      url: `${baseUrl}/standorte/berlin`,
      lastModified,
    },
    {
      url: `${baseUrl}/standorte/frankfurt`,
      lastModified,
    },
  ]
}
