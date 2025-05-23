'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'de' | 'no' | 'en' | 'es';

interface PrivacySection {
  title: string;
  content?: string;
  items?: {
    [key: string]: string;
  };
}

interface PrivacyTranslation {
  title: string;
  sections: {
    [key: string]: PrivacySection;
  };
  lastUpdated: string;
}

interface TermsSection {
  title: string;
  content?: string;
  items?: string[] | { [key: string]: string };
}

interface TermsTranslation {
  title: string;
  sections: {
    [key: string]: TermsSection;
  };
  lastUpdated: string;
}

interface TranslationObject {
  [key: string]: string | TranslationObject | PrivacyTranslation | TermsTranslation;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
  translationsLoaded: boolean;
}

const globalTranslations: Record<Language, Partial<TranslationObject>> = {
  de: {
    parkName: 'Tier- und Abenteuerland Namsskogan',
    parkSlogan: 'Tier- und Abenteuerland Namsskogan',
    attractions: 'Attraktionen',
    tickets: 'Tickets',
    contact: 'Kontakt',
    welcome: 'Park Nordica - Wiedereröffnung im Juni 2026',
    subtitle: 'Unser Park bleibt 2025 geschlossen - wir bauen für die Zukunft',
    bookTickets: 'Sneak Peek Tickets',
    openingHours: 'Folgt uns gerne!',
    prices: 'Ticketpreise',
    address: 'Adresse',
    phone: 'Telefon',
    email: 'E-Mail',
    legal: 'Rechtliches',
    imprint: {
      title: 'Impressum',
      sections: {
        company: {
          title: 'Angaben gemäß § 5 E-Commerce-Gesetz (ECG) / norsk ehandelslov',
          content: `Verantwortlich für den Inhalt dieser Website:\n\nPark Nordica\nParkveien 1, 7892 Trones\n\nBetreibergesellschaft:\nNordisk Opplevelse AS\nFinvolldalsveien 1244, 7896 Brekkvasselv\n\nKontakt:\nE-Mail: info@parknordica.no\nOrganisasjonsnummer: 935112761`
        },
        contact: {
          title: 'Kontakt',
          content: `Adresse: Parkstraße 1, 60313 Frankfurt am Main\nTelefon: +49 (0) 69 123456\nE-Mail: info@parknordica.de`
        },
        responsible: {
          title: 'Verantwortlich für den Inhalt',
          content: `Pierre Nordica\nParkstraße 1\n60313 Frankfurt am Main`
        },
        registration: {
          title: 'Handelsregister',
          content: `Eintragung im Handelsregister\nRegistergericht: Amtsgericht Frankfurt am Main\nRegisternummer: HRB 123456`
        },
        vat: {
          title: 'Umsatzsteuer-ID',
          content: 'DE123456789'
        },
        dispute: {
          title: 'Streitschlichtung',
          content: `Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/\nUnsere E-Mail-Adresse finden Sie oben im Impressum.\n\nWir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`
        }
      }
    },
    addressValue: 'Nordisk Opplevelse AS\nFinnvolldalsveien 1244\n7896 Brekkvasselv\nNorway',
    phoneValue: '+47 743 33 700',
    weekdays: 'Montag - Freitag',
    weekends: 'Samstag - Sonntag',
    timeWeekdays: '10:00 - 18:00',
    timeWeekends: '09:00 - 19:00',
    adults: 'Erwachsene',
    children: 'Kinder',
    seniors: 'Senioren',
    family: 'Familienkarte (2+2)',
    priceAdults: '250 NOK',
    priceChildren: '150 NOK',
    priceSeniors: '200 NOK',
    priceFamily: '700 NOK',
    age: 'Alter',
    years: 'Jahre',
    species: 'Art',
    bearName: 'Thor',
    bearSpecies: 'Polarbär',
    bearDescription: 'Unser ältester Bewohner. Thor liebt es, im Wasser zu spielen und den Besuchern seine Schwimmkünste zu zeigen.',
    foxName: 'Frost',
    foxSpecies: 'Polarfuchs',
    foxDescription: 'Frost ist unser neuestes Mitglied. Mit seinem dichten, weißen Fell ist er besonders bei den Kindern beliebt.',
    wolfName: 'Luna',
    wolfSpecies: 'Arktischer Wolf',
    wolfDescription: 'Luna ist die Anführerin unseres Wolfsrudels. Sie ist besonders sozial und interagiert gerne mit den anderen Wölfen.',
    parkHighlights: 'Park-Highlights',
    highlight1: 'Tägliche Tierfütterungen mit Ranger-Führungen',
    highlight2: 'Weitläufige natürliche Gehege für alle Tiere',
    highlight3: 'Interaktive Lernstationen für Kinder',
    highlight4: 'Atemberaubende Aussichtspunkte über die norwegische Landschaft',
    visitorInfo: 'Besucherinformationen',
    visitorInfo1: 'Komfortable Wanderwege durch den gesamten Park',
    visitorInfo2: 'Restaurants und Cafés mit regionalen Spezialitäten',
    visitorInfo3: 'Kostenlose Parkplätze und gute Anbindung an öffentliche Verkehrsmittel',
    bannerTitle: 'Erleben Sie die wilde Schönheit des Nordens',
    bannerText: 'Entdecken Sie unsere majestätischen Tiere in ihrer natürlichen Umgebung und tauchen Sie ein in die faszinierende arktische Welt.',
    monday: 'Montag',
    tuesday: 'Dienstag',
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag',
    holidays: 'Feiertage',
    lastEntry: 'Letzter Einlass',
    hour: 'Stunde',
    beforeClosing: 'vor Schließung',
    ticketPrices: 'Ticketpreise',
    familyTicket: 'Familienticket',
    familyTicketNote: 'Das Familienticket gilt für 2 Erwachsene und bis zu 3 Kinder unter 16 Jahren.',
    buyTickets: 'Tickets kaufen',
    directions: 'Anreise',
    byBus: 'Mit dem Bus',
    busDirections: 'Buslinie 42 vom Hauptbahnhof Trones, stündlich von 8:00 bis 19:00 Uhr',
    byCar: 'Mit dem Auto',
    carDirections: 'Folgen Sie der E6 Richtung Norden und nehmen Sie die Ausfahrt Trones-Nord',
    viewOnMap: 'Auf Karte ansehen',
    buildingFuture: "Wir bauen für Ihre Zukunft",
    parkClosed: "Park Nordica bleibt während der Saison 2025 geschlossen",
    constructionSafety: "Umfangreiche Umbauten für erhöhte Sicherheit und Nachhaltigkeit",
    modernization: "Neugestaltung zu einem modernen, naturnahen Erlebnispark",
    reopening: "Wiedereröffnung im Juni 2026 mit neuen Highlights für die ganze Familie",
    futureDetailedText: "Der Park Nordica wird im gesamten Jahr 2025 geschlossen bleiben, um umfangreiche Modernisierungs- und Umbauarbeiten durchzuführen. Diese Maßnahmen sind notwendig, um unseren Besuchern in Zukunft ein noch sichereres, attraktiveres und nachhaltigeres Parkerlebnis bieten zu können.\n\nWir gestalten den Park grundlegend neu, um die Gehege unserer Tiere noch artgerechter zu gestalten und neue, spannende Attraktionen für alle Altersgruppen zu schaffen. Freuen Sie sich auf eine Wiedereröffnung im Frühsommer 2026 mit einem rundum erneuerten Park, der die Schönheit der nordischen Natur mit aufregenden Abenteuern verbindet.\n\nWährend der Schließungszeit halten wir Sie auf unserer Webseite und unseren Social-Media-Kanälen über die Fortschritte auf dem Laufenden. Wir danken Ihnen für Ihr Verständnis und Ihre Geduld und freuen uns darauf, Sie 2026 in einem neuen Park Nordica begrüßen zu dürfen!",
    weekendPreview: "Exklusive Wochenend-Vorschau",
    sneakPeekDates: "Termine: Jedes Wochenende im Mai 2026 (Sa & So)",
    guidedFeeding: "Begleitete Fütterungen der Polarfüchse & Wölfe",
    firstLook: "Erster Blick auf die neuen Gehege und Anlagen",
    foodIncluded: "Kaffee, Tee und traditionelles Gebäck inklusive",
    limitedSpots: "Stark limitierte Plätze – jetzt schnell buchen!",
    previewDetailedText: "Sneak Peek am 19. & 20. Juli – ein erster Blick hinter die Kulissen\nAm 19. und 20. Juli 2025 öffnen wir exklusiv für zwei Tage ausgewählte Bereiche von Park Nordica – und laden euch herzlich zu einem ganz besonderen Sneak Peek-Wochenende ein!\nErlebt hautnah, was sich bereits verändert hat, werft einen ersten Blick auf unsere neuen Ideen und begleitet uns bei Fütterungen ausgewählter Tiere, die zu festen Uhrzeiten stattfinden. Beim Ticketkauf könnt ihr euch für eine der Fütterungszeiten anmelden, um die Tiere hautnah zu erleben und erste Begegnungen im neuen Park zu genießen.\nBitte beachtet: Die Besucherzahl ist pro Tag stark begrenzt, da sich der Park weiterhin im Umbau befindet und nur teilweise geöffnet wird.\nZusätzlich laden wir euch zu herzhaften Snacks vom Grill und alkoholfreien Erfrischungsgetränken ein.\nJedes Ticket beinhaltet eine Essensmarke und eine Getränkemarke, die vor Ort eingelöst werden können.\nWir freuen uns besonders, Gäste aus der Region Namdalen, aus Trøndelag und darüber hinaus bei dieser einmaligen Gelegenheit begrüßen zu dürfen – um euch einen ersten Vorgeschmack auf das neue Park Nordica Erlebnis zu geben.\nTickets sind ab sofort verfügbar – solange der Vorrat reicht!",
    readMore: "Mehr erfahren",
    close: "Schließen",
    followSocialMedia: "Folgt unserem Fortschritt auf Social Media!"
  },
  en: {
    parkName: 'Namsskogan Wildlife and Adventure Park',
    parkSlogan: 'Namsskogan Wildlife and Adventure Park',
    attractions: 'Attractions',
    tickets: 'Tickets',
    contact: 'Contact',
    welcome: 'Park Nordica - Reopening in June 2026',
    subtitle: 'Our park is closed in 2025 - we are building for the future',
    bookTickets: 'Sneak Peek Tickets',
    openingHours: 'Follow us!',
    prices: 'Ticket Prices',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    legal: 'Legal',
    imprint: {
      title: 'Imprint',
      sections: {
        company: {
          title: 'Company Information',
          content: 'Responsible for the content of this website:\n\nPark Nordica\nParkveien 1, 7892 Trones\n\nOperating Company:\nNordisk Opplevelse AS\nFinvolldalsveien 1244, 7896 Brekkvasselv\n\nContact:\nE-Mail: info@parknordica.no\nOrganization Number: 935112761'
        },
        contact: {
          title: 'Contact',
          content: `Address: Parkstraße 1, 60313 Frankfurt am Main\nPhone: +49 (0) 69 123456\nE-Mail: info@parknordica.de`
        },
        responsible: {
          title: 'Responsible for the content',
          content: `Pierre Nordica\nParkstraße 1\n60313 Frankfurt am Main`
        },
        registration: {
          title: 'Commercial Register',
          content: `Entry in the Commercial Register\nRegister Court: Local Court Frankfurt am Main\nRegister Number: HRB 123456`
        },
        vat: {
          title: 'VAT ID',
          content: 'DE123456789'
        },
        dispute: {
          title: 'Dispute Resolution',
          content: `The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr/\nOur e-mail address can be found above in the imprint.\n\nWe are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.`
        }
      }
    },
    addressValue: 'Nordisk Opplevelse AS\nFinnvolldalsveien 1244\n7896 Brekkvasselv\nNorway',
    phoneValue: '+47 743 33 700',
    weekdays: 'Monday - Friday',
    weekends: 'Saturday - Sunday',
    timeWeekdays: '10:00 - 18:00',
    timeWeekends: '09:00 - 19:00',
    adults: 'Adults',
    children: 'Children',
    seniors: 'Seniors',
    family: 'Family ticket (2+2)',
    priceAdults: '250 NOK',
    priceChildren: '150 NOK',
    priceSeniors: '200 NOK',
    priceFamily: '700 NOK',
    age: 'Age',
    years: 'years',
    species: 'Species',
    bearName: 'Thor',
    bearSpecies: 'Polar Bear',
    bearDescription: 'Our oldest resident. Thor loves playing in the water and showing off his swimming skills to visitors.',
    foxName: 'Frost',
    foxSpecies: 'Arctic Fox',
    foxDescription: 'Frost is our newest member. With his thick, white fur, he is especially popular with the children.',
    wolfName: 'Luna',
    wolfSpecies: 'Arctic Wolf',
    wolfDescription: 'Luna is the leader of our wolf pack. She is particularly social and enjoys interacting with the other wolves.',
    parkHighlights: 'Park Highlights',
    highlight1: 'Daily animal feedings with ranger-guided tours',
    highlight2: 'Spacious natural enclosures for all animals',
    highlight3: 'Interactive learning stations for children',
    highlight4: 'Breathtaking viewpoints over the Norwegian landscape',
    visitorInfo: 'Visitor Information',
    visitorInfo1: 'Comfortable walking trails throughout the park',
    visitorInfo2: 'Restaurants and cafes featuring regional specialties',
    visitorInfo3: 'Free parking and good public transportation connections',
    bannerTitle: 'Experience the Wild Beauty of the North',
    bannerText: 'Discover our majestic animals in their natural habitat and immerse yourself in the fascinating Arctic world.',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    holidays: 'Holidays',
    lastEntry: 'Last entry',
    hour: 'hour',
    beforeClosing: 'before closing',
    ticketPrices: 'Ticket Prices',
    familyTicket: 'Family Ticket',
    familyTicketNote: 'The family ticket is valid for 2 adults and up to 3 children under 16 years.',
    buyTickets: 'Buy Tickets',
    directions: 'Directions',
    byBus: 'By Bus',
    busDirections: 'Bus line 42 from Trones main station, hourly from 8:00 to 19:00',
    byCar: 'By Car',
    carDirections: 'Follow the E6 northbound and take the Trones-North exit',
    viewOnMap: 'View on Map',
    copyAddress: 'Copy address',
    buildingFuture: 'We are building for your future',
    parkClosed: 'Park Nordica will remain closed for the 2025 season',
    constructionSafety: 'Extensive reconstruction for increased safety & sustainability',
    modernization: 'Redesign into a modern, nature-oriented experience park',
    reopening: 'Reopening in June 2026 with new highlights for the whole family',
    futureDetailedText: "[NEEDS TRANSLATION - German original: Der Park Nordica wird im gesamten Jahr 2025 geschlossen bleiben, um umfangreiche Modernisierungs- und Umbauarbeiten durchzuführen. Diese Maßnahmen sind notwendig, um unseren Besuchern in Zukunft ein noch sichereres, attraktiveres und nachhaltigeres Parkerlebnis bieten zu können.\n\nWir gestalten den Park grundlegend neu, um die Gehege unserer Tiere noch artgerechter zu gestalten und neue, spannende Attraktionen für alle Altersgruppen zu schaffen. Freuen Sie sich auf eine Wiedereröffnung im Frühsommer 2026 mit einem rundum erneuerten Park, der die Schönheit der nordischen Natur mit aufregenden Abenteuern verbindet.\n\nWährend der Schließungszeit halten wir Sie auf unserer Webseite und unseren Social-Media-Kanälen über die Fortschritte auf dem Laufenden. Wir danken Ihnen für Ihr Verständnis und Ihre Geduld und freuen uns darauf, Sie 2026 in einem neuen Park Nordica begrüßen zu dürfen!]",
    weekendPreview: 'Exclusive Weekend Preview',
    sneakPeekDates: 'Dates: Every weekend in May 2026 (Sat & Sun)',
    guidedFeeding: 'Guided feedings of Arctic foxes & wolves',
    firstLook: 'First glimpse of the new enclosures and facilities',
    foodIncluded: 'Coffee, tea, and traditional pastries included',
    limitedSpots: 'Strictly limited spots – book quickly!',
    previewDetailedText: "[NEEDS TRANSLATION - German original: Erleben Sie eine exklusive Vorschau auf den neuen Park Nordica an unseren Wochenend-Events im Mai 2026, noch vor der offiziellen Wiedereröffnung! Wir öffnen unsere Tore für eine begrenzte Anzahl von Besuchern.\n\nWas Sie erwartet:\n• Begleitete Fütterungen unserer charismatischen Polarfüchse und des beeindruckenden Wolfsrudels durch unsere erfahrenen Ranger.\n• Ein erster, exklusiver Blick auf die neugestalteten, naturnahen Gehege und die modernen Anlagen, die für das Wohlbefinden unserer Tiere und ein intensives Besuchererlebnis sorgen.\n• Wärmen Sie sich bei kostenlosem Kaffee, Tee und traditionellem norwegischen Gebäck in unserem gemütlichen Besucherzentrum auf.\n• Nutzen Sie die einmalige Gelegenheit, den Park in einer ruhigen Atmosphäre zu erkunden und mit unseren Experten ins Gespräch zu kommen.\n\nDie Plätze für diese besonderen Vorschau-Wochenenden sind stark limitiert, um ein persönliches und ungestörtes Erlebnis zu garantieren. Sichern Sie sich Ihre Tickets frühzeitig!]",
    readMore: "Read more",
    close: "Close",
    followSocialMedia: "Follow our progress on social media!"
  },
  no: {
    parkName: 'Namsskogan Familiepark og Rovdyrsenter',
    parkSlogan: 'Namsskogan Familiepark og Rovdyrsenter',
    attractions: 'Attraksjoner',
    tickets: 'Billetter',
    contact: 'Kontakt',
    welcome: 'Park Nordica - Gjenåpner juni 2026',
    subtitle: 'Parken vår er stengt i 2025 - vi bygger for fremtiden',
    bookTickets: 'Forhåndstitt-billetter',
    openingHours: 'Følg oss gjerne!',
    prices: 'Billettpriser',
    address: 'Adresse',
    phone: 'Telefon',
    email: 'E-post',
    legal: 'Juridisk',
    imprint: {
      title: 'Impressum',
      sections: {
        company: {
          title: 'Foretaksinformasjon',
          content: 'Ansvarlig for innholdet på denne nettsiden:\n\nPark Nordica\nParkveien 1, 7892 Trones\n\nDriftsselskap:\nNordisk Opplevelse AS\nFinvolldalsveien 1244, 7896 Brekkvasselv\n\nKontakt:\nE-post: info@parknordica.no\nOrganisasjonsnummer: 935112761'
        },
        contact: {
          title: 'Kontakt',
          content: `Adresse: Parkstraße 1, 60313 Frankfurt am Main\nTelefon: +49 (0) 69 123456\nE-post: info@parknordica.de`
        },
        responsible: {
          title: 'Ansvarlig for innholdet',
          content: `Pierre Nordica\nParkstraße 1\n60313 Frankfurt am Main`
        },
        registration: {
          title: 'Foretaksregister',
          content: `Registrering i Foretaksregisteret\nRegisterdomstol: Brønnøysundregistrene\nOrganisasjonsnummer: HRB 123456` // Placeholder, Norwegian equivalent for HRB needed
        },
        vat: {
          title: 'MVA-ID',
          content: 'NO123456789MVA' // Placeholder
        },
        dispute: {
          title: 'Tvisteløsning',
          content: `EU-kommisjonen tilbyr en plattform for online tvisteløsning (ODR): https://ec.europa.eu/consumers/odr/\nVår e-postadresse finner du ovenfor i impressumet.\n\nVi er ikke villige eller forpliktet til å delta i tvisteløsningssaker for et forbrukerklageorgan.`
        }
      }
    },
    addressValue: 'Nordisk Opplevelse AS\nFinnvolldalsveien 1244\n7896 Brekkvasselv\nNorway',
    phoneValue: '+47 743 33 700',
    weekdays: 'Mandag - Fredag',
    weekends: 'Lørdag - Søndag',
    timeWeekdays: '10:00 - 18:00',
    timeWeekends: '09:00 - 19:00',
    adults: 'Voksne',
    children: 'Barn',
    seniors: 'Seniorer',
    family: 'Familietilbud (2+2)',
    priceAdults: '250 NOK',
    priceChildren: '150 NOK',
    priceSeniors: '200 NOK',
    priceFamily: '700 NOK',
    age: 'Alder',
    years: 'år',
    species: 'Art',
    bearName: 'Thor',
    bearSpecies: 'Isbjørn',
    bearDescription: 'Vår eldste beboer. Thor elsker å leke i vannet og vise fram svømmekunstene sine til besøkende.',
    foxName: 'Frost',
    foxSpecies: 'Polarrev',
    foxDescription: 'Frost er vårt nyeste medlem. Med sin tykke, hvite pels er han spesielt populær blant barna.',
    wolfName: 'Luna',
    wolfSpecies: 'Arktisk ulv',
    wolfDescription: 'Luna er lederen av ulveflokken vår. Hun er spesielt sosial og liker å samhandle med de andre ulvene.',
    parkHighlights: 'Parkens høydepunkter',
    highlight1: 'Daglig fôring av dyr med ranger-guidet tur',
    highlight2: 'Romslige naturlige innhegninger for alle dyr',
    highlight3: 'Interaktive læringsstasjoner for barn',
    highlight4: 'Fantastiske utsiktspunkter over det norske landskapet',
    visitorInfo: 'Besøksinformasjon',
    visitorInfo1: 'Komfortable turstier gjennom hele parken',
    visitorInfo2: 'Restauranter og kafeer med regionale spesialiteter',
    visitorInfo3: 'Gratis parkering og god tilgang til offentlig transport',
    bannerTitle: 'Opplev Nordens ville skjønnhet',
    bannerText: 'Utforsk våre majestetiske dyr i deres naturlige omgivelser og fordyp deg i den fascinerende arktiske verden.',
    monday: 'Mandag',
    tuesday: 'Tirsdag',
    wednesday: 'Onsdag',
    thursday: 'Torsdag',
    friday: 'Fredag',
    saturday: 'Lørdag',
    sunday: 'Søndag',
    holidays: 'Helligdager',
    lastEntry: 'Siste inngang',
    hour: 'time',
    beforeClosing: 'før stengetid',
    ticketPrices: 'Billettpriser',
    familyTicket: 'Familiebillett',
    familyTicketNote: 'Familiebilletten gjelder for 2 voksne og opptil 3 barn under 16 år.',
    buyTickets: 'Kjøp billetter',
    directions: 'Veibeskrivelse',
    byBus: 'Med buss',
    busDirections: 'Busslinje 42 fra Trones hovedstasjon, hver time fra 8:00 til 19:00',
    byCar: 'Med bil',
    carDirections: 'Følg E6 nordover og ta avkjørselen Trones-Nord',
    viewOnMap: 'Vis på kart',
    copyAddress: 'Kopier adresse',
    buildingFuture: 'Vi bygger for din fremtid',
    parkClosed: 'Park Nordica holder stengt i sesongen 2025',
    constructionSafety: 'Omfattende ombygging for økt sikkerhet og bærekraft',
    modernization: 'Omforming til en moderne, naturnær opplevelsespark',
    reopening: 'Gjenåpning i juni 2026 med nye høydepunkter for hele familien',
    futureDetailedText: "[TRENGER OVERSETTELSE - Tysk original: Der Park Nordica wird im gesamten Jahr 2025 geschlossen bleiben, um umfangreiche Modernisierungs- und Umbauarbeiten durchzuführen. Diese Maßnahmen sind notwendig, um unseren Besuchern in Zukunft ein noch sichereres, attraktiveres und nachhaltigeres Parkerlebnis bieten zu können.\n\nWir gestalten den Park grundlegend neu, um die Gehege unserer Tiere noch artgerechter zu gestalten und neue, spannende Attraktionen für alle Altersgruppen zu schaffen. Freuen Sie sich auf eine Wiedereröffnung im Frühsommer 2026 mit einem rundum erneuerten Park, der die Schönheit der nordischen Natur mit aufregenden Abenteuern verbindet.\n\nWährend der Schließungszeit halten wir Sie auf unserer Webseite und unseren Social-Media-Kanälen über die Fortschritte auf dem Laufenden. Wir danken Ihnen für Ihr Verständnis und Ihre Geduld und freuen uns darauf, Sie 2026 in einem neuen Park Nordica begrüßen zu dürfen!]",
    weekendPreview: 'Eksklusiv helgeforhåndsvisning',
    sneakPeekDates: 'Datoer: Hver helg i mai 2026 (lør & søn)',
    guidedFeeding: 'Guidede matinger av polarrever og ulver',
    firstLook: 'Første glimt av de nye innhegningene og anleggene',
    foodIncluded: 'Kaffe, te og tradisjonelt bakverk inkludert',
    limitedSpots: 'Strengt begrensede plasser – bestill raskt!',
    previewDetailedText: "[TRENGER OVERSETTELSE - Tysk original: Erleben Sie eine exklusive Vorschau auf den neuen Park Nordica an unseren Wochenend-Events im Mai 2026, noch vor der offiziellen Wiedereröffnung! Wir öffnen unsere Tore für eine begrenzte Anzahl von Besuchern.\n\nWas Sie erwartet:\n• Begleitete Fütterungen unserer charismatischen Polarfüchse und des beeindruckenden Wolfsrudels durch unsere erfahrenen Ranger.\n• Ein erster, exklusiver Blick auf die neugestalteten, naturnahen Gehege und die modernen Anlagen, die für das Wohlbefinden unserer Tiere und ein intensives Besuchererlebnis sorgen.\n• Wärmen Sie sich bei kostenlosem Kaffee, Tee und traditionellem norwegischen Gebäck in unserem gemütlichen Besucherzentrum auf.\n• Nutzen Sie die einmalige Gelegenheit, den Park in einer ruhigen Atmosphäre zu erkunden und mit unseren Experten ins Gespräch zu kommen.\n\nDie Plätze für diese besonderen Vorschau-Wochenenden sind stark limitiert, um ein persönliches und ungestörtes Erlebnis zu garantieren. Sichern Sie sich Ihre Tickets frühzeitig!]",
    readMore: "Les mer",
    close: "Lukk",
    followSocialMedia: "Følg vårt fremgang på sosiale medier!"
  },
  es: {
    parkName: 'Parque de Vida Silvestre y Aventuras Namsskogan',
    parkSlogan: 'Parque de Vida Silvestre y Aventuras Namsskogan',
    attractions: 'Atracciones',
    tickets: 'Entradas',
    contact: 'Contacto',
    welcome: 'Park Nordica - Reapertura en junio de 2026',
    subtitle: 'Nuestro parque está cerrado en 2025 - estamos construyendo para el futuro',
    bookTickets: 'Entradas anticipadas',
    openingHours: '¡Síguenos!',
    prices: 'Precios de las entradas',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Correo electrónico',
    legal: 'Legal',
    imprint: {
      title: 'Aviso legal',
      sections: {
        company: {
          title: 'Información de la empresa',
          content: 'Responsable del contenido de esta página web:\n\nPark Nordica\nParkveien 1, 7892 Trones\n\nEmpresa operadora:\nNordisk Opplevelse AS\nFinvolldalsveien 1244, 7896 Brekkvasselv\n\nContacto:\nCorreo electrónico: info@parknordica.no\nNúmero de organización: 935112761'
        },
        contact: {
          title: 'Contacto',
          content: `Dirección: Parkstraße 1, 60313 Fráncfort del Meno\nTeléfono: +49 (0) 69 123456\nCorreo electrónico: info@parknordica.de`
        },
        responsible: {
          title: 'Responsable del contenido',
          content: `Pierre Nordica\nParkstraße 1\n60313 Fráncfort del Meno`
        },
        registration: {
          title: 'Registro Mercantil',
          content: `Inscripción en el Registro Mercantil\nTribunal de Registro: Tribunal Local de Fráncfort del Meno\nNúmero de Registro: HRB 123456` // Placeholder, Spanish equivalent needed
        },
        vat: {
          title: 'ID DE IVA',
          content: 'ESX1234567Z' // Placeholder
        },
        dispute: {
          title: 'Resolución de litigios',
          content: `La Comisión Europea ofrece una plataforma para la resolución de litigios en línea (RLL): https://ec.europa.eu/consumers/odr/\nNuestra dirección de correo electrónico se encuentra más arriba en el aviso legal.\n\nNo estamos dispuestos ni obligados a participar en procedimientos de resolución de litigios ante una junta de arbitraje de consumo.`
        }
      }
    },
    addressValue: 'Nordisk Opplevelse AS\nFinnvolldalsveien 1244\n7896 Brekkvasselv\nNorway',
    phoneValue: '+47 743 33 700',
    weekdays: 'Lunes - Viernes',
    weekends: 'Sábado - Domingo',
    timeWeekdays: '10:00 - 18:00',
    timeWeekends: '09:00 - 19:00',
    adults: 'Adultos',
    children: 'Niños',
    seniors: 'Personas mayores',
    family: 'Entrada familiar (2+2)',
    priceAdults: '250 NOK',
    priceChildren: '150 NOK',
    priceSeniors: '200 NOK',
    priceFamily: '700 NOK',
    age: 'Edad',
    years: 'años',
    species: 'Especie',
    bearName: 'Thor',
    bearSpecies: 'Oso Polar',
    bearDescription: 'Nuestro residente más antiguo. A Thor le encanta jugar en el agua y mostrar sus habilidades de natación a los visitantes.',
    foxName: 'Frost',
    foxSpecies: 'Zorro Ártico',
    foxDescription: 'Frost es nuestro miembro más reciente. Con su espeso pelaje blanco, es especialmente popular entre los niños.',
    wolfName: 'Luna',
    wolfSpecies: 'Lobo Ártico',
    wolfDescription: 'Luna es la líder de nuestra manada de lobos. Es particularmente sociable y disfruta interactuando con los otros lobos.',
    parkHighlights: 'Destacados del parque',
    highlight1: 'Alimentación diaria de animales con visitas guiadas por guardabosques',
    highlight2: 'Amplios recintos naturales para todos los animales',
    highlight3: 'Estaciones de aprendizaje interactivas para niños',
    highlight4: 'Impresionantes miradores sobre el paisaje noruego',
    visitorInfo: 'Información para visitantes',
    visitorInfo1: 'Cómodos senderos para caminar por todo el parque',
    visitorInfo2: 'Restaurantes y cafeterías con especialidades regionales',
    visitorInfo3: 'Estacionamiento gratuito y buenas conexiones de transporte público',
    bannerTitle: 'Experimenta la Belleza Salvaje del Norte',
    bannerText: 'Descubre nuestros majestuosos animales en su hábitat natural y sumérgete en el fascinante mundo ártico.',
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',
    holidays: 'Días festivos',
    lastEntry: 'Última entrada',
    hour: 'hora',
    beforeClosing: 'antes del cierre',
    ticketPrices: 'Precios de Entradas',
    familyTicket: 'Entrada Familiar',
    familyTicketNote: 'La entrada familiar es válida para 2 adultos y hasta 3 niños menores de 16 años.',
    buyTickets: 'Comprar Entradas',
    directions: 'Cómo Llegar',
    byBus: 'En Autobús',
    busDirections: 'Línea de autobús 42 desde la estación principal de Trones, cada hora desde las 8:00 hasta las 19:00',
    byCar: 'En Coche',
    carDirections: 'Siga la E6 hacia el norte y tome la salida Trones-Norte',
    viewOnMap: 'Ver en Mapa',
    copyAddress: 'Copiar dirección',
    buildingFuture: 'Construimos para tu futuro',
    parkClosed: 'Park Nordica permanecerá cerrado durante la temporada 2025',
    constructionSafety: 'Reconstrucción extensa para mayor seguridad y sostenibilidad',
    modernization: 'Rediseño hacia un parque de experiencias moderno y natural',
    reopening: 'Reapertura en junio de 2026 con nuevas atracciones para toda la familia',
    futureDetailedText: "[NECESITA TRADUCCIÓN - Original alemán: Der Park Nordica wird im gesamten Jahr 2025 geschlossen bleiben, um umfangreiche Modernisierungs- und Umbauarbeiten durchzuführen. Diese Maßnahmen sind notwendig, um unseren Besuchern in Zukunft ein noch sichereres, attraktiveres und nachhaltigeres Parkerlebnis bieten zu können.\n\nWir gestalten den Park grundlegend neu, um die Gehege unserer Tiere noch artgerechter zu gestalten und neue, spannende Attraktionen für alle Altersgruppen zu schaffen. Freuen Sie sich auf eine Wiedereröffnung im Frühsommer 2026 mit einem rundum erneuerten Park, der die Schönheit der nordischen Natur mit aufregenden Abenteuern verbindet.\n\nWährend der Schließungszeit halten wir Sie auf unserer Webseite und unseren Social-Media-Kanälen über die Fortschritte auf dem Laufenden. Wir danken Ihnen für Ihr Verständnis und Ihre Geduld und freuen uns darauf, Sie 2026 in einem neuen Park Nordica begrüßen zu dürfen!]",
    weekendPreview: 'Avance exclusivo de fin de semana',
    sneakPeekDates: 'Fechas: Cada fin de semana de mayo de 2026 (sáb y dom)',
    guidedFeeding: 'Alimentaciones guiadas de zorros árticos y lobos',
    firstLook: 'Primer vistazo a los nuevos recintos e instalaciones',
    foodIncluded: 'Café, té y bollería tradicional incluidos',
    limitedSpots: 'Plazas estrictamente limitadas – ¡reserve rápido!',
    previewDetailedText: "[NECESITA TRADUCCIÓN - Original alemán: Erleben Sie eine exklusive Vorschau auf den neuen Park Nordica an unseren Wochenend-Events im Mai 2026, noch vor la offiziellen Wiedereröffnung! Wir öffnen unsere Tore für eine begrenzte Anzahl von Besuchern.\n\nWas Sie erwartet:\n• Begleitete Fütterungen unserer charismatischen Polarfüchse und des beeindruckenden Wolfsrudels durch unsere erfahrenen Ranger.\n• Ein erster, exklusiver Blick auf die neugestalteten, naturnahen Gehege und die modernen Anlagen, die für das Wohlbefinden unserer Tiere und ein intensives Besuchererlebnis sorgen.\n• Wärmen Sie sich bei kostenlosem Kaffee, Tee und traditionellem norwegischen Gebäck in unserem gemütlichen Besucherzentrum auf.\n• Nutzen Sie die einmalige Gelegenheit, den Park in einer ruhigen Atmosphäre zu erkunden und mit unseren Experten ins Gespräch zu kommen.\n\nDie Plätze für diese besonderen Vorschau-Wochenenden sind stark limitiert, um ein persönliches und ungestörtes Erlebnis zu garantieren. Sichern Sie sich Ihre Tickets frühzeitig!]",
    readMore: "Leer más",
    close: "Cerrar",
    followSocialMedia: "¡Sigue nuestro progreso en las redes sociales!"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de');
  const [currentTranslations, setCurrentTranslations] = useState<TranslationObject>({});
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    async function loadTranslations(lang: Language) {
      setTranslationsLoaded(false);
      try {
        const response = await fetch(`/translations/${lang}.json`);
        if (!response.ok) {
          console.warn(`Translations for ${lang} not found or fetch error, using global/fallback translations.`);
          setCurrentTranslations((globalTranslations[lang] || {}) as TranslationObject);
          setTranslationsLoaded(true);
          return;
        }
        const data: TranslationObject = await response.json();
        setCurrentTranslations({ ...(globalTranslations[lang] || {}), ...data } as TranslationObject);
      } catch (error) {
        console.error(`Error loading translations for ${lang}:`, error);
        setCurrentTranslations((globalTranslations[lang] || {}) as TranslationObject);
      } finally {
        setTranslationsLoaded(true);
      }
    }

    loadTranslations(language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let result: unknown = currentTranslations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (typeof result === 'string' && params) {
      return result.replace(/{{(.*?)}}/g, (match, paramKey) => {
        return params[paramKey.trim()] || match;
      });
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translationsLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 