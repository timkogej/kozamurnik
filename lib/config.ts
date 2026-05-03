export const siteConfig = {
  name: "Kozamurnik",
  legalName: "KOZAMURNIK Center mobilnosti d.o.o.",
  tagline: "Zanesljiv partner za vaše vozilo",
  description:
    "Pnevmatike, vulkanizerstvo in avtovleka 24/7 v Šentjanžu. Zanesljiv partner za vaše vozilo že več kot 30 let.",
  founded: 1993,
  address: {
    street: "PE Bukovska vas 15",
    city: "Šentjanž",
    zip: "2373",
    country: "Slovenija",
    full: "PE Bukovska vas 15, 2373 Šentjanž",
  },
  contact: {
    phone: "+386 (0)2 878 67 40",
    phoneTel: "+38602878670",
    fax: "+386 (0)2 878 67 41",
    gsm: "041 607 298",
    gsmTel: "041607298",
    email: "boris.kozamurnik@gmail.com",
  },
  hours: {
    weekdays: "Pon–Pet: 8:00 – 16:00",
    weekdaysNote: "(malica 13:00 – 14:00)",
    saturday: "Sobota: 9:00 – 12:00",
    sunday: "Nedelja in prazniki: zaprto",
  },
  ratings: {
    score: "9.6",
    count: 96,
    platform: "Google",
  },
  externalLinks: {
    shop: "http://gume.kozamurnik.si/",
    configurator:
      "https://boris-kozamurnik-vulkanizerstvo.reifen-felgen-konfigurator.de/gb/complete",
    booking: "https://booking.jedroplus.com/jedroplus-d-o-o/elegant",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Bukovska+vas+15,+2373+%C5%A0entjan%C5%BE",
  },
  socialLinks: {
    facebook: "#",
    instagram: "#",
  },
  // Change this each season — no code changes needed
  seasonalBanner: {
    active: true,
    text: "Čas je za menjavo na letne pnevmatike — rezervirajte termin pravočasno",
  },
};

export type SiteConfig = typeof siteConfig;
