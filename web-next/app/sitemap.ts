import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://DEINE-DOMAIN.DE'
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
    {
      url: `${baseUrl}/leistungen/elektrotechnik`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/e-mobility`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/elektro-notdienst`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/hauselektrik`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/klingelanlagen`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/led`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/messsysteme`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/neubau`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/reparaturen`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/sanierung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/sicherheitstechnik`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/smart-home`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/winterdienst`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/unterhaltsreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/grundreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/fensterreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/glas-fassade`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/sonderreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/grauflaechenreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/tiefgaragenreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/gruenpflege`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/baumpflege`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/hausmeisterservice`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/objektmanagement`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/service-wartung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/sanitaer-heizung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/winterdienst-aussen`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/bueroreinigung`,
      lastModified,
    },
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
