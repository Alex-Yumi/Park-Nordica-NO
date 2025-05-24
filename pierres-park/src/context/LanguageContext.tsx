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
          title: 'Angaben gemäß § 5 E-Commerce-Gesetz (ECG) / § 5 Telemediengesetz (TMG) sowie norsk ehandelslov',
          content: `Verantwortlich für den Inhalt dieser Website:\n\nPark Nordica\nParkveien 1\n7892 Trones\nNorwegen\n\nBetreibergesellschaft:\nNordisk Opplevelse AS\nFinvolldalsveien 1244\n7896 Brekkvasselv\nNorwegen\n\nKontakt:\nE-Mail: info@parknordica.no\nTelefon: +47 944 64 223\nOrganisasjonsnummer: 935 112 761`
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
    followSocialMedia: "Folgt unserem Fortschritt auf Social Media!",
    copyright: "Alle Rechte vorbehalten",
    privacy: {
      title: 'Datenschutzerklärung',
      sections: {
        introduction: {
          title: '1. Einleitung',
          content: 'Diese Datenschutzerklärung informiert Sie darüber, wie wir, Park Nordica, Ihre personenbezogenen Daten erheben, verarbeiten und schützen, wenn Sie unsere Website besuchen oder unsere Dienstleistungen nutzen.'
        },
        responsible: {
          title: '2. Verantwortliche Stelle',
          content: 'Park Nordica\nParkveien 1\n7892 Trones, Norwegen\nE-Mail: info@parknordica.no\nOrganisasjonsnummer: 935 112 761'
        },
        data: {
          title: '3. Welche Daten wir erheben',
          content: 'Wir erheben personenbezogene Daten, wenn Sie:\n• unsere Website besuchen (z. B. durch Cookies, IP-Adresse, Gerätedaten)\n• ein Ticket kaufen oder sich anmelden\n• mit uns in Kontakt treten\n\nBeispiele für erhobene Daten:\n• Name, Adresse, E-Mail-Adresse\n• Zahlungs- und Kaufdetails\n• IP-Adresse, Browserinformationen, Geräteinformationen (über Cookies)'
        },
        purpose: {
          title: '4. Zwecke der Datenverarbeitung',
          content: 'Wir verwenden Ihre Daten für folgende Zwecke:\n• Abwicklung von Ticketkäufen und Bestellungen\n• Kundenservice und Kommunikation\n• Verbesserung der Websitefunktionalität (Analyse, Nutzererlebnis)\n• Erfüllung rechtlicher Pflichten'
        },
        legal: {
          title: '5. Rechtsgrundlagen der Verarbeitung',
          content: 'Ihre Daten verarbeiten wir auf Basis von:\n• Ihrer Einwilligung (z. B. für Newsletter oder Cookies)\n• Vertraglicher Erfüllung (z. B. Ticketkauf)\n• Gesetzlicher Verpflichtung (z. B. Aufbewahrungspflichten)'
        },
        storage: {
          title: '6. Speicherdauer',
          content: 'Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzlich vorgeschrieben ist. Danach werden sie gelöscht oder anonymisiert.'
        },
        sharing: {
          title: '7. Weitergabe an Dritte',
          content: 'Eine Weitergabe Ihrer Daten erfolgt nur:\n• mit Ihrer ausdrücklichen Zustimmung\n• zur Vertragserfüllung (z. B. Zahlungsdienstleister)\n• wenn wir gesetzlich dazu verpflichtet sind (z. B. Steuerbehörden)'
        },
        rights: {
          title: '8. Ihre Rechte',
          content: 'Sie haben das Recht auf:\n• Auskunft über Ihre gespeicherten Daten\n• Berichtigung unrichtiger Daten\n• Löschung ("Recht auf Vergessenwerden")\n• Einschränkung der Verarbeitung\n• Datenübertragbarkeit\n• Widerspruch gegen die Verarbeitung\n• Beschwerde bei einer Datenschutzbehörde (z. B. Datatilsynet in Norwegen oder eine Aufsichtsbehörde in Ihrem Wohnsitzland)'
        },
        cookies: {
          title: '9. Cookies',
          content: 'Unsere Website verwendet Cookies und ähnliche Technologien, um:\n• die Funktionalität der Seite zu gewährleisten\n• das Nutzerverhalten zu analysieren (z. B. Google Analytics)\n\nBeim ersten Besuch fragen wir nach Ihrer Einwilligung zur Verwendung dieser Cookies. Sie können Ihre Einstellungen jederzeit anpassen.'
        },
        security: {
          title: '10. Datensicherheit',
          content: 'Wir treffen geeignete technische und organisatorische Maßnahmen, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.'
        },
        changes: {
          title: '11. Änderungen dieser Datenschutzerklärung',
          content: 'Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren. Änderungen werden auf dieser Website veröffentlicht. Bitte informieren Sie sich regelmäßig über den aktuellen Stand.'
        }
      },
      lastUpdated: 'Stand: 24. Mai 2025'
    },
    terms: {
      title: 'Allgemeine Geschäftsbedingungen (AGB)',
      sections: {
        introduction: {
          title: '1. Allgemeine Informationen',
          content: 'Diese Website wird betrieben von Park Nordica, einem Angebot der Nordisk Opplevelse AS, Finvolldalsveien 1244, 7896 Brekkvasselv, Norwegen.\nMit dem Kauf eines Tickets oder der Nutzung dieser Website erklären Sie sich mit den nachstehenden Bedingungen einverstanden.'
        },
        contact: {
          title: '2. Kontakt',
          content: 'Park Nordica\nParkveien 1\n7892 Trones, Norwegen\nE-Mail: info@parknordica.no\nOrganisasjonsnummer: 935 112 761'
        },
        tickets: {
          title: '3. Tickets und Reservierungen',
          items: {
            '0': '• Tickets gelten ausschließlich für das gewählte Datum und die gebuchte Veranstaltung.',
            '1': '• Eine Rückgabe oder Erstattung ist ausgeschlossen, es sei denn, die Veranstaltung wird von uns abgesagt oder verschoben.',
            '2': '• Tickets sind nicht übertragbar, sofern nicht anders angegeben.',
            '3': '• Bei Zutritt ist ein gültiges Ticket (digital oder ausgedruckt) vorzulegen.',
            '4': '• Bei Absage erstatten wir den vollen Ticketpreis, jedoch keine Folgekosten (z. B. Reise oder Unterkunft).'
          }
        },
        withdrawal: {
          title: '4. Widerrufsrecht / Rücktritt',
          content: 'Für Online-Ticketkäufe besteht kein Widerrufsrecht gemäß § 22 des norwegischen Fernabsatzgesetzes (Angrerettloven), da es sich um Freizeitveranstaltungen mit festem Termin handelt.'
        },
        usage: {
          title: '5. Nutzung der Website',
          items: {
            '0': '• Alle Inhalte (Texte, Bilder, Logos, Gestaltung) unterliegen dem Urheberrecht.',
            '1': '• Die Nutzung der Inhalte zu kommerziellen Zwecken oder automatisiertes Auslesen der Website ist untersagt.',
            '2': '• Wir behalten uns das Recht vor, die Website jederzeit inhaltlich zu verändern oder einzustellen.'
          }
        },
        privacy: {
          title: '6. Datenschutz',
          content: 'Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung. Wir halten uns an die geltenden Vorschriften der DSGVO sowie das norwegische Personopplysningsloven.'
        },
        liability: {
          title: '7. Haftungsbeschränkung',
          content: 'Wir haften nicht für Schäden, die aus der Nutzung dieser Website, aus technischen Störungen oder durch Dritte entstehen – es sei denn, es liegt vorsätzliches oder grob fahrlässiges Verhalten unserseits vor.'
        },
        security: {
          title: '8. Sicherheit',
          content: 'Wir bemühen uns um den Schutz Ihrer persönlichen Daten und setzen geeignete technische Maßnahmen ein. Ein vollständiger Schutz gegen Angriffe von Dritten kann jedoch nicht garantiert werden.'
        },
        changes: {
          title: '9. Änderungen der AGB',
          content: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu aktualisieren. Änderungen treten in Kraft, sobald sie auf dieser Seite veröffentlicht wurden.'
        },
        jurisdiction: {
          title: '10. Anwendbares Recht & Gerichtsstand',
          content: 'Es gilt ausschließlich norwegisches Recht. Gerichtsstand für alle Streitigkeiten im Zusammenhang mit der Nutzung dieser Website oder der Ticketkäufe ist das zuständige Gericht in Oslo, Norwegen.'
        }
      },
      lastUpdated: 'Stand: 24. Mai 2024'
    },
    disclaimer: {
      title: 'Haftungsausschluss',
      sections: {
        behavior: {
          title: '1. Verhalten im Park und gegenüber Tieren',
          content: 'Park Nordica ist ein naturnaher Erlebnispark, in dem sich Wildtiere in großzügigen Gehegen oder frei zugänglichen Bereichen bewegen. Wir bitten alle Gäste dringend, sich rücksichtsvoll und umsichtig zu verhalten – gegenüber Tieren, Natur und Mitmenschen.\n\nDas Füttern, Stören oder Berühren von Tieren außerhalb ausdrücklich ausgewiesener Bereiche (z. B. Streichelzoo) ist streng untersagt. Zuwiderhandlungen können zu Gefahren für Tier und Mensch führen und haben ggf. den Verweis vom Gelände zur Folge.\n\nEltern und Begleitpersonen sind für die Aufsicht über Kinder verantwortlich. Kinder unter 12 Jahren dürfen sich im Streichelzoo nur in Begleitung eines Erwachsenen aufhalten.\n\nBitte halten Sie die markierten Wege ein und folgen Sie den Hinweisen des Personals.'
        },
        facilities: {
          title: '2. Nutzung von Einrichtungen, Fahrgeschäften und Spielbereichen',
          content: 'Die Nutzung unserer Attraktionen erfolgt unter Beachtung der Sicherheitsvorgaben, Alters- oder Größenbeschränkungen sowie aller Anweisungen des Personals.\n\nBei unsachgemäßer Nutzung oder Missachtung der Hinweise kann keine Haftung übernommen werden. Schäden, die aus falscher Nutzung oder Fehlverhalten entstehen, liegen im Verantwortungsbereich des Besuchers.'
        },
        liability: {
          title: '3. Haftungsausschluss',
          content: 'Park Nordica haftet nur bei Vorsatz oder grober Fahrlässigkeit. Eine weitergehende Haftung – insbesondere für Schäden durch unsachgemäßes Verhalten von Gästen oder bei Missachtung von Sicherheitshinweisen – ist ausgeschlossen.\n\nWir haften nicht für:\n• Unfälle aufgrund von eigenem Fehlverhalten\n• den Verlust oder Diebstahl persönlicher Gegenstände\n• witterungsbedingte Einschränkungen oder Schäden\n• Schäden durch höhere Gewalt (z. B. Sturm, Pandemie, Stromausfall)\n\nFür technische Störungen, Systemausfälle oder Fehler bei Onlinebuchungen über Drittanbieter (z. B. Stripe) haften wir nicht. Die Zahlungsabwicklung erfolgt über einen zertifizierten Zahlungsdienstleister – wir haben keinen Zugriff auf Ihre Zahlungsdaten.'
        },
        events: {
          title: '4. Veranstaltungen',
          content: 'Tickets gelten nur am gebuchten Datum. Rückgabe oder Erstattung ist nicht möglich – Ausnahmen gelten bei Absage durch uns.\n\nDer Aufenthalt während Sonderveranstaltungen ist nur in ausgewiesenen Bereichen erlaubt. Das Betreten von nicht öffentlich zugänglichen Zonen ist untersagt und erfolgt auf eigene Gefahr.'
        },
        website: {
          title: '5. Hinweise zur Website',
          content: 'Wir bemühen uns um korrekte und aktuelle Informationen. Dennoch können sich Inhalte (z. B. Preise, Öffnungszeiten) kurzfristig ändern. Für technische Probleme, Datenverluste oder Schäden durch Viren oder Dritte übernehmen wir keine Haftung.'
        }
      },
      lastUpdated: 'Zuletzt aktualisiert: 24. Mai 2024'
    },
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
          title: 'Information according to § 5 E-Commerce Act (ECG) / § 5 Telemedia Act (TMG) and Norwegian e-commerce law',
          content: 'Responsible for the content of this website:\n\nPark Nordica\nParkveien 1\n7892 Trones\nNorway\n\nOperating Company:\nNordisk Opplevelse AS\nFinvolldalsveien 1244\n7896 Brekkvasselv\nNorway\n\nContact:\nE-Mail: info@parknordica.no\nPhone: +47 944 64 223\nOrganization Number: 935 112 761'
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
    previewDetailedText: "[NEEDS TRANSLATION - German original: Erleben Sie eine exklusive Vorschau auf den neuen Park Nordica an unseren Wochenend-Events im Mai 2026, noch vor der offiziellen Wiedereröffnung! Wir öffnen unsere Tore für eine begrenzte Anzahl von Besuchern.\n\nWas Sie erwartet:\n• Begleitende Fütterungen unserer charismatischen Polarfüchse und des beeindruckenden Wolfsrudels durch unsere erfahrenen Ranger.\n• Ein erster, exklusiver Blick auf die neugestalteten, naturnahen Gehege und die modernen Anlagen, die für das Wohlbefinden unserer Tiere und ein intensives Besuchererlebnis sorgen.\n• Wärmen Sie sich bei kostenlosem Kaffee, Tee und traditionellem norwegischen Gebäck in unserem gemütlichen Besucherzentrum auf.\n• Nutzen Sie die einmalige Gelegenheit, den Park in einer ruhigen Atmosphäre zu erkunden und mit unseren Experten ins Gespräch zu kommen.\n\nDie Plätze für diese besonderen Vorschau-Wochenenden sind stark limitiert, um ein persönliches und ungestörtes Erlebnis zu garantieren. Sichern Sie sich Ihre Tickets frühzeitig!]",
    readMore: "Read more",
    close: "Close",
    followSocialMedia: "Follow our progress on social media!",
    copyright: "All rights reserved",
    privacy: {
      title: 'Privacy Policy',
      sections: {
        introduction: {
          title: '1. Introduction',
          content: 'This privacy policy informs you about how we, Park Nordica, collect, process and protect your personal data when you visit our website or use our services.'
        },
        responsible: {
          title: '2. Responsible Entity',
          content: 'Park Nordica\nParkveien 1\n7892 Trones, Norway\nE-Mail: info@parknordica.no\nOrganization Number: 935 112 761'
        },
        data: {
          title: '3. What Data We Collect',
          content: 'We collect personal data when you:\n• visit our website (e.g. through cookies, IP address, device data)\n• purchase a ticket or register\n• contact us\n\nExamples of collected data:\n• Name, address, email address\n• Payment and purchase details\n• IP address, browser information, device information (via cookies)'
        },
        purpose: {
          title: '4. Purposes of Data Processing',
          content: 'We use your data for the following purposes:\n• Processing ticket purchases and orders\n• Customer service and communication\n• Improving website functionality (analysis, user experience)\n• Fulfilling legal obligations'
        },
        legal: {
          title: '5. Legal Basis for Processing',
          content: 'We process your data based on:\n• Your consent (e.g. for newsletters or cookies)\n• Contract fulfillment (e.g. ticket purchase)\n• Legal obligation (e.g. retention requirements)'
        },
        storage: {
          title: '6. Storage Duration',
          content: 'Personal data is only stored for as long as necessary for the respective purposes or as required by law. After that, it is deleted or anonymized.'
        },
        sharing: {
          title: '7. Sharing with Third Parties',
          content: 'Your data is only shared:\n• with your express consent\n• for contract fulfillment (e.g. payment service providers)\n• when we are legally obliged to do so (e.g. tax authorities)'
        },
        rights: {
          title: '8. Your Rights',
          content: 'You have the right to:\n• Information about your stored data\n• Correction of incorrect data\n• Deletion ("right to be forgotten")\n• Restriction of processing\n• Data portability\n• Object to processing\n• Lodge a complaint with a data protection authority (e.g. Datatilsynet in Norway or a supervisory authority in your country of residence)'
        },
        cookies: {
          title: '9. Cookies',
          content: 'Our website uses cookies and similar technologies to:\n• ensure the functionality of the site\n• analyze user behavior (e.g. Google Analytics)\n\nWe ask for your consent to use these cookies on your first visit. You can adjust your settings at any time.'
        },
        security: {
          title: '10. Data Security',
          content: 'We take appropriate technical and organizational measures to protect your data from unauthorized access, loss or misuse.'
        },
        changes: {
          title: '11. Changes to this Privacy Policy',
          content: 'We reserve the right to update this privacy policy as needed. Changes will be published on this website. Please check regularly for updates.'
        }
      },
      lastUpdated: 'Last updated: May 24, 2025'
    },
    terms: {
      title: 'Terms and Conditions',
      sections: {
        introduction: {
          title: '1. General Information',
          content: 'This website is operated by Park Nordica, an offering of Nordisk Opplevelse AS, Finvolldalsveien 1244, 7896 Brekkvasselv, Norway.\nBy purchasing a ticket or using this website, you agree to the following terms and conditions.'
        },
        contact: {
          title: '2. Contact',
          content: 'Park Nordica\nParkveien 1\n7892 Trones, Norway\nE-Mail: info@parknordica.no\nOrganization Number: 935 112 761'
        },
        tickets: {
          title: '3. Tickets and Reservations',
          items: {
            '0': '• Tickets are valid exclusively for the selected date and booked event.',
            '1': '• Returns or refunds are excluded, unless the event is cancelled or postponed by us.',
            '2': '• Tickets are non-transferable unless otherwise stated.',
            '3': '• A valid ticket (digital or printed) must be presented upon entry.',
            '4': '• In case of cancellation, we will refund the full ticket price, but not consequential costs (e.g. travel or accommodation).'
          }
        },
        withdrawal: {
          title: '4. Right of Withdrawal / Cancellation',
          content: 'For online ticket purchases, there is no right of withdrawal according to § 22 of the Norwegian Distance Selling Act (Angrerettloven), as these are leisure events with a fixed date.'
        },
        usage: {
          title: '5. Website Usage',
          items: {
            '0': '• All content (texts, images, logos, design) is protected by copyright.',
            '1': '• Commercial use of content or automated reading of the website is prohibited.',
            '2': '• We reserve the right to change or discontinue the website content at any time.'
          }
        },
        privacy: {
          title: '6. Privacy',
          content: 'Information on the processing of personal data can be found in our privacy policy. We comply with the applicable provisions of the GDPR as well as the Norwegian Personal Data Act (Personopplysningsloven).'
        },
        liability: {
          title: '7. Limitation of Liability',
          content: 'We are not liable for damages arising from the use of this website, technical malfunctions or third parties – unless there is intentional or grossly negligent behavior on our part.'
        },
        security: {
          title: '8. Security',
          content: 'We strive to protect your personal data and employ appropriate technical measures. However, complete protection against third-party attacks cannot be guaranteed.'
        },
        changes: {
          title: '9. Changes to Terms and Conditions',
          content: 'We reserve the right to update these terms at any time. Changes take effect as soon as they are published on this page.'
        },
        jurisdiction: {
          title: '10. Applicable Law & Jurisdiction',
          content: 'Norwegian law applies exclusively. The competent court in Oslo, Norway, has jurisdiction for all disputes relating to the use of this website or ticket purchases.'
        }
      },
      lastUpdated: 'Last updated: May 24, 2024'
    },
    disclaimer: {
      title: 'Disclaimer',
      sections: {
        behavior: {
          title: '1. Behavior in the Park and Towards Animals',
          content: 'Park Nordica is a nature-oriented adventure park where wildlife roams in spacious enclosures or freely accessible areas. We urgently ask all guests to behave considerately and carefully – towards animals, nature, and fellow visitors.\n\nFeeding, disturbing, or touching animals outside expressly designated areas (e.g., petting zoo) is strictly prohibited. Violations can lead to dangers for both animals and humans and may result in expulsion from the premises.\n\nParents and accompanying persons are responsible for supervising children. Children under 12 years may only enter the petting zoo area when accompanied by an adult.\n\nPlease stay on marked paths and follow staff instructions.'
        },
        facilities: {
          title: '2. Use of Facilities, Rides and Play Areas',
          content: 'The use of our attractions is subject to observance of safety regulations, age or height restrictions, and all staff instructions.\n\nNo liability can be assumed for improper use or disregard of instructions. Damages resulting from incorrect use or misconduct are the responsibility of the visitor.'
        },
        liability: {
          title: '3. Disclaimer of Liability',
          content: 'Park Nordica is only liable in cases of intent or gross negligence. Further liability – particularly for damages caused by improper behavior of guests or disregard of safety instructions – is excluded.\n\nWe are not liable for:\n• Accidents due to personal misconduct\n• Loss or theft of personal belongings\n• Weather-related restrictions or damages\n• Damages due to force majeure (e.g., storms, pandemics, power outages)\n\nFür technische Störungen, Systemausfälle oder Fehler bei Onlinebuchungen über Drittanbieter (z. B. Stripe) haften wir nicht. Die Zahlungsabwicklung erfolgt über einen zertifizierten Zahlungsdienstleister – wir haben keinen Zugriff auf Ihre Zahlungsdaten.'
        },
        events: {
          title: '4. Events',
          content: 'Tickets are only valid on the booked date. Return or refund is not possible – exceptions apply for cancellations by us.\n\nStaying during special events is only allowed in designated areas. Entering non-publicly accessible zones is prohibited and done at your own risk.'
        },
        website: {
          title: '5. Website Information',
          content: 'We strive to provide correct and current information. However, content (e.g., prices, opening hours) may change at short notice. We assume no liability for technical problems, data loss, or damages caused by viruses or third parties.'
        }
      },
      lastUpdated: 'Last updated: May 24, 2024'
    }
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
          title: 'Opplysninger i henhold til § 5 E-handelsloven (ECG) / § 5 Telemedieloven (TMG) samt norsk ehandelslov',
          content: 'Ansvarlig for innholdet på denne nettsiden:\n\nPark Nordica\nParkveien 1\n7892 Trones\nNorge\n\nDriftsselskap:\nNordisk Opplevelse AS\nFinvolldalsveien 1244\n7896 Brekkvasselv\nNorge\n\nKontakt:\nE-post: info@parknordica.no\nTelefon: +47 944 64 223\nOrganisasjonsnummer: 935 112 761'
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
    previewDetailedText: "[TRENGER OVERSETTELSE - Tysk original: Erleben Sie eine exklusive Vorschau på den nye Park Nordica an unsere Wochenend-Events im Mai 2026, noch før den offisielle Wiedereröffnung! Vi åpner våre dører for en begrenset antall besøkere.\n\nHva du forventes:\n• Begleitende fütteringer av våre charismatiske polarrever og det beeindrende ulveflokket gjennom våre erfarne ranger.\n• Ein erster, eksklusiver Blick på de nye, naturorienterte gehegnene og de moderne anleggene, som sikrer et behagelig besøksopplevelse for våre dyr og et intensivt besøksopplevelse.\n• Varm deg opp ved kostnadsfrie kaffe, te og tradisjonelt norsk brød i vårt behagelige besøkssentrum.\n• Bruk den unike muligheten til å utforske parken i en rolig atmosfære og komme inn i dialog med våre eksperter.\n\nPlassene for disse spesielle weekend-forhåndsvisningene er strengt begrenset for å sikre et personlig og uforstyrret opplevelse. Bestill dine billetter tidlig!\n\nErleben Sie eine exklusive Vorschau på den nye Park Nordica an unsere Wochenend-Events im Mai 2026, noch før den offisielle Wiedereröffnung! Vi åpner våre dører for en begrenset antall besøkere.\n\nHva du forventes:\n• Begleitende fütteringer av våre charismatiske polarrever og det beeindrende ulveflokket gjennom våre erfarne ranger.\n• Ein erster, eksklusiver Blick på de nye, naturorienterte gehegnene og de moderne anleggene, som sikrer et behagelig besøksopplevelse for våre dyr og et intensivt besøksopplevelse.\n• Varm deg opp ved kostnadsfrie kaffe, te og tradisjonelt norsk brød i vårt behagelige besøkssentrum.\n• Bruk den unike muligheten til å utforske parken i en rolig atmosfære og komme inn i dialog med våre eksperter.\n\nPlassene for disse spesielle weekend-forhåndsvisningene er strengt begrenset for å sikre et personlig og uforstyrret opplevelse. Bestill dine billetter tidlig!]",
    readMore: "Les mer",
    close: "Lukk",
    followSocialMedia: "Følg vårt fremgang på sosiale medier!",
    copyright: "Alle rettigheter forbeholdt",
    privacy: {
      title: 'Personvernerklæring',
      sections: {
        introduction: {
          title: '1. Innledning',
          content: 'Denne personvernerklæringen informerer deg om hvordan vi, Park Nordica, samler inn, behandler og beskytter dine personopplysninger når du besøker nettstedet vårt eller bruker tjenestene våre.'
        },
        responsible: {
          title: '2. Ansvarlig enhet',
          content: 'Park Nordica\nParkveien 1\n7892 Trones, Norge\nE-post: info@parknordica.no\nOrganisasjonsnummer: 935 112 761'
        },
        data: {
          title: '3. Hvilke data vi samler inn',
          content: 'Vi samler inn personopplysninger når du:\n• besøker nettstedet vårt (f.eks. gjennom cookies, IP-adresse, enhetsdata)\n• kjøper en billett eller registrerer deg\n• kontakter oss\n\nEksempler på innsamlede data:\n• Navn, adresse, e-postadresse\n• Betalings- og kjøpsdetaljer\n• IP-adresse, nettleserinformasjon, enhetsinformasjon (via cookies)'
        },
        purpose: {
          title: '4. Formål med databehandling',
          content: 'Vi bruker dataene dine til følgende formål:\n• Behandling av billettkjøp og bestillinger\n• Kundeservice og kommunikasjon\n• Forbedring av nettstedets funksjonalitet (analyse, brukeropplevelse)\n• Oppfyllelse av juridiske forpliktelser'
        },
        legal: {
          title: '5. Rettslig grunnlag for behandling',
          content: 'Vi behandler dataene dine basert på:\n• Ditt samtykke (f.eks. for nyhetsbrev eller cookies)\n• Kontraktoppfyllelse (f.eks. billettkjøp)\n• Juridisk forpliktelse (f.eks. oppbevaringskrav)'
        },
        storage: {
          title: '6. Lagringsvarighet',
          content: 'Personopplysninger lagres kun så lenge som nødvendig for de respektive formålene eller som påkrevd av loven. Etter det slettes de eller anonymiseres.'
        },
        sharing: {
          title: '7. Deling med tredjeparter',
          content: 'Dataene dine deles kun:\n• med ditt uttrykkelige samtykke\n• for kontraktoppfyllelse (f.eks. betalingstjenesteleverandører)\n• når vi er juridisk forpliktet til å gjøre det (f.eks. skattemyndigheter)'
        },
        rights: {
          title: '8. Dine rettigheter',
          content: 'Du har rett til:\n• Informasjon om dine lagrede data\n• Korrigering av feilaktige data\n• Sletting ("rett til å bli glemt")\n• Begrensning av behandling\n• Dataportabilitet\n• Motsette deg behandling\n• Klage til en datatilsynsmyndighet (f.eks. Datatilsynet i Norge eller en tilsynsmyndighet i ditt bostedsland)'
        },
        cookies: {
          title: '9. Cookies',
          content: 'Nettstedet vårt bruker cookies og lignende teknologier for å:\n• sikre funksjonaliteten til siden\n• analysere brukeratferd (f.eks. Google Analytics)\n\nVi ber om ditt samtykke til å bruke disse cookies ved ditt første besøk. Du kan justere innstillingene dine når som helst.'
        },
        security: {
          title: '10. Datasikkerhet',
          content: 'Vi tar passende tekniske og organisatoriske tiltak for å beskytte dataene dine mot uautorisert tilgang, tap eller misbruk.'
        },
        changes: {
          title: '11. Endringer i denne personvernerklæringen',
          content: 'Vi forbeholder oss retten til å oppdatere denne personvernerklæringen etter behov. Endringer vil bli publisert på dette nettstedet. Vennligst sjekk regelmessig for oppdateringer.'
        }
      },
      lastUpdated: 'Sist oppdatert: 24. mai 2025'
    },
    terms: {
      title: 'Vilkår og betingelser',
      sections: {
        introduction: {
          title: '1. Generell informasjon',
          content: 'Denne nettsiden drives av Park Nordica, et tilbud fra Nordisk Opplevelse AS, Finvolldalsveien 1244, 7896 Brekkvasselv, Norge.\nVed å kjøpe en billett eller bruke denne nettsiden godtar du følgende vilkår og betingelser.'
        },
        contact: {
          title: '2. Kontakt',
          content: 'Park Nordica\nParkveien 1\n7892 Trones, Norge\nE-post: info@parknordica.no\nOrganisasjonsnummer: 935 112 761'
        },
        tickets: {
          title: '3. Billetter og reservasjoner',
          items: {
            '0': '• Billetter gjelder utelukkende for valgt dato og bestilt arrangement.',
            '1': '• Retur eller refusjon er utelukket, med mindre arrangementet blir avlyst eller utsatt av oss.',
            '2': '• Billetter kan ikke overføres med mindre annet er angitt.',
            '3': '• En gyldig billett (digital eller utskrevet) må vises ved inngang.',
            '4': '• Ved avlysning refunderer vi full billettprisen, men ikke følgekostnader (f.eks. reise eller overnatting).'
          }
        },
        withdrawal: {
          title: '4. Angrerrett / Avbestilling',
          content: 'For online billettkjøp finnes det ingen angrerrett i henhold til § 22 i norsk angrerettlov, da det gjelder fritidsarrangementer med fast dato.'
        },
        usage: {
          title: '5. Bruk av nettsiden',
          items: {
            '0': '• Alt innhold (tekster, bilder, logoer, design) er beskyttet av opphavsrett.',
            '1': '• Kommersiell bruk av innhold eller automatisert lesing av nettsiden er forbudt.',
            '2': '• Vi forbeholder oss retten til å endre eller avslutte nettsidens innhold når som helst.'
          }
        },
        privacy: {
          title: '6. Personvern',
          content: 'Informasjon om behandling av personopplysninger finnes i vår personvernerklæring. Vi overholder gjeldende bestemmelser i GDPR samt norsk personopplysningslov.'
        },
        liability: {
          title: '7. Ansvarsbegrensning',
          content: 'Vi er ikke ansvarlige for skader som oppstår ved bruk av denne nettsiden, tekniske feil eller tredjeparter – med mindre det foreligger forsettlig eller grovt uaktsom oppførsel fra vår side.'
        },
        security: {
          title: '8. Sikkerhet',
          content: 'Vi streber etter å beskytte dine personopplysninger og bruker passende tekniske tiltak. Fullstendig beskyttelse mot tredjeparts angrep kan imidlertid ikke garanteres.'
        },
        changes: {
          title: '9. Endringer av vilkår og betingelser',
          content: 'Vi forbeholder oss retten til å oppdatere disse vilkårene når som helst. Endringer trer i kraft så snart de publiseres på denne siden.'
        },
        jurisdiction: {
          title: '10. Gjeldende lov og verneting',
          content: 'Norsk lov gjelder utelukkende. Kompetent domstol i Oslo, Norge, har jurisdiksjon for alle tvister knyttet til bruk av denne nettsiden eller billettkjøp.'
        }
      },
      lastUpdated: 'Sist oppdatert: 24. mai 2024'
    },
    disclaimer: {
      title: 'Ansvarsfraskrivelse',
      sections: {
        behavior: {
          title: '1. Oppførsel i parken og overfor dyr',
          content: 'Park Nordica er en naturnær opplevelsespark hvor ville dyr beveger seg i romslige innhegninger eller fritt tilgjengelige områder. Vi ber alle gjester innstendig om å oppføre seg hensynsfullt og forsiktig – overfor dyr, natur og medmennesker.\n\nFôring, forstyrrelse eller berøring av dyr utenfor uttrykkelig utpekte områder (f.eks. kosepark) er strengt forbudt. Overtredelser kan føre til fare for både dyr og mennesker og kan resultere i utvisning fra området.\n\nForeldre og følgepersoner er ansvarlige for tilsyn med barn. Barn under 12 år kan bare komme inn i koseparken når de er i følge med en voksen.\n\nVennligst hold deg på merkede stier og følg personalets instruksjoner.'
        },
        facilities: {
          title: '2. Bruk av fasiliteter, karuseller og lekeområder',
          content: 'Bruk av våre attraksjoner er underlagt overholdelse av sikkerhetsforskrifter, alders- eller høydebegrensninger og alle personalets instruksjoner.\n\nIngen ansvar kan påtas for feil bruk eller ignorering av instruksjoner. Skader som følge av feil bruk eller dårlig oppførsel er besøkerens ansvar.'
        },
        liability: {
          title: '3. Ansvarsfraskrivelse',
          content: 'Park Nordica er kun ansvarlig i tilfeller av forsett eller grov uaktsomhet. Videre ansvar – spesielt for skader forårsaket av upassende oppførsel fra gjester eller ignorering av sikkerhetsinstruksjoner – er ekskludert.\n\nVi er ikke ansvarlige for:\n• Ulykker på grunn av personlig dårlig oppførsel\n• Tap eller tyveri av personlige eiendeler\n• Værrelaterte begrensninger eller skader\n• Skader på grunn av force majeure (f.eks. stormer, pandemier, strømbrudd)\n\nVi er ikke ansvarlige for tekniske feil, systemsvikt eller feil i online bookinger gjennom tredjepartsleverandører (f.eks. Stripe). Betalingsbehandling håndteres av en sertifisert betalingstjenesteleverandør – vi har ikke tilgang til dine betalingsdata.'
        },
        events: {
          title: '4. Arrangementer',
          content: 'Billetter er kun gyldige på den bookede datoen. Retur eller refusjon er ikke mulig – unntak gjelder for kanselleringer fra vår side.\n\nOpphold under spesielle arrangementer er kun tillatt i utpekte områder. Å gå inn i ikke-offentlig tilgjengelige soner er forbudt og gjøres på egen risiko.'
        },
        website: {
          title: '5. Nettstedsinformasjon',
          content: 'Vi streber etter å gi korrekt og oppdatert informasjon. Imidlertid kan innhold (f.eks. priser, åpningstider) endres på kort varsel. Vi påtar oss ikke ansvar for tekniske problemer, datatap eller skader forårsaket av virus eller tredjeparter.'
        }
      },
      lastUpdated: 'Sist oppdatert: 24. mai 2024'
    }
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
          title: 'Información según § 5 Ley de Comercio Electrónico (ECG) / § 5 Ley de Telemedia (TMG) y ley noruega de comercio electrónico',
          content: 'Responsable del contenido de esta página web:\n\nPark Nordica\nParkveien 1\n7892 Trones\nNoruega\n\nEmpresa operadora:\nNordisk Opplevelse AS\nFinvolldalsveien 1244\n7896 Brekkvasselv\nNoruega\n\nContacto:\nCorreo electrónico: info@parknordica.no\nTeléfono: +47 944 64 223\nNúmero de organización: 935 112 761'
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
    previewDetailedText: "[NECESITA TRADUCCIÓN - Original alemán: Erleben Sie eine exklusive Vorschau auf den neuen Park Nordica an unseren Wochenend-Events im Mai 2026, noch vor la offiziellen Wiedereröffnung! Wir öffnen unsere Tore für eine begrenzte Anzahl von Besuchern.\n\nWas Sie erwartet:\n• Begleitende Fütterungen unserer charismatischen Polarfüchse und des beeindruckenden Wolfsrudels durch unsere erfahrenen Ranger.\n• Ein erster, exklusiver Blick auf die neugestalteten, naturnahen Gehege und die modernen Anlagen, die für das Wohlbefinden unserer Tiere und ein intensives Besuchererlebnis sorgen.\n• Wärmen Sie sich bei kostenlosem Kaffee, Tee und traditionellem norwegischen Gebäck in unserem gemütlichen Besucherzentrum auf.\n• Nutzen Sie die einmalige Gelegenheit, den Park in einer ruhigen Atmosphäre zu erkunden und mit unseren Experten ins Gespräch zu kommen.\n\nDie Plätze für diese besonderen Vorschau-Wochenenden sind stark limitiert, um ein persönliches und ungestörtes Erlebnis zu garantieren. Sichern Sie sich Ihre Tickets frühzeitig!]",
    readMore: "Leer más",
    close: "Cerrar",
    followSocialMedia: "¡Sigue nuestro progreso en las redes sociales!",
    copyright: "Todos los derechos reservados",
    privacy: {
      title: 'Política de Privacidad',
      sections: {
        introduction: {
          title: '1. Introducción',
          content: 'Esta política de privacidad le informa sobre cómo nosotros, Park Nordica, recopilamos, procesamos y protegemos sus datos personales cuando visita nuestro sitio web o utiliza nuestros servicios.'
        },
        responsible: {
          title: '2. Entidad Responsable',
          content: 'Park Nordica\nParkveien 1\n7892 Trones, Noruega\nCorreo electrónico: info@parknordica.no\nNúmero de organización: 935 112 761'
        },
        data: {
          title: '3. Qué Datos Recopilamos',
          content: 'Recopilamos datos personales cuando usted:\n• visita nuestro sitio web (por ejemplo, a través de cookies, dirección IP, datos del dispositivo)\n• compra un boleto o se registra\n• se pone en contacto con nosotros\n\nEjemplos de datos recopilados:\n• Nombre, dirección, dirección de correo electrónico\n• Detalles de pago y compra\n• Dirección IP, información del navegador, información del dispositivo (a través de cookies)'
        },
        purpose: {
          title: '4. Propósitos del Procesamiento de Datos',
          content: 'Utilizamos sus datos para los siguientes propósitos:\n• Procesamiento de compras de boletos y pedidos\n• Servicio al cliente y comunicación\n• Mejora de la funcionalidad del sitio web (análisis, experiencia del usuario)\n• Cumplimiento de obligaciones legales'
        },
        legal: {
          title: '5. Base Legal para el Procesamiento',
          content: 'Procesamos sus datos basándose en:\n• Su consentimiento (por ejemplo, para boletines o cookies)\n• Cumplimiento del contrato (por ejemplo, compra de boletos)\n• Obligación legal (por ejemplo, requisitos de retención)'
        },
        storage: {
          title: '6. Duración del Almacenamiento',
          content: 'Los datos personales se almacenan solo durante el tiempo necesario para los propósitos respectivos o según lo requerido por la ley. Después de eso, se eliminan o se anonimizan.'
        },
        sharing: {
          title: '7. Compartir con Terceros',
          content: 'Sus datos solo se comparten:\n• con su consentimiento expreso\n• para el cumplimiento del contrato (por ejemplo, proveedores de servicios de pago)\n• cuando estamos legalmente obligados a hacerlo (por ejemplo, autoridades fiscales)'
        },
        rights: {
          title: '8. Sus Derechos',
          content: 'Usted tiene derecho a:\n• Información sobre sus datos almacenados\n• Corrección de datos incorrectos\n• Eliminación ("derecho al olvido")\n• Restricción del procesamiento\n• Portabilidad de datos\n• Oponerse al procesamiento\n• Presentar una queja ante una autoridad de protección de datos (por ejemplo, Datatilsynet en Noruega o una autoridad supervisora en su país de residencia)'
        },
        cookies: {
          title: '9. Cookies',
          content: 'Nuestro sitio web utiliza cookies y tecnologías similares para:\n• asegurar la funcionalidad del sitio\n• analizar el comportamiento del usuario (por ejemplo, Google Analytics)\n\nSolicitamos su consentimiento para usar estas cookies en su primera visita. Puede ajustar su configuración en cualquier momento.'
        },
        security: {
          title: '10. Seguridad de Datos',
          content: 'Tomamos medidas técnicas y organizativas apropiadas para proteger sus datos contra acceso no autorizado, pérdida o mal uso.'
        },
        changes: {
          title: '11. Cambios a esta Política de Privacidad',
          content: 'Nos reservamos el derecho de actualizar esta política de privacidad según sea necesario. Los cambios se publicarán en este sitio web. Por favor, consulte regularmente las actualizaciones.'
        }
      },
      lastUpdated: 'Última actualización: 24 de mayo de 2025'
    },
    terms: {
      title: 'Términos y Condiciones',
      sections: {
        introduction: {
          title: '1. Información General',
          content: 'Este sitio web es operado por Park Nordica, una oferta de Nordisk Opplevelse AS, Finvolldalsveien 1244, 7896 Brekkvasselv, Noruega.\nAl comprar un boleto o usar este sitio web, usted acepta los siguientes términos y condiciones.'
        },
        contact: {
          title: '2. Contacto',
          content: 'Park Nordica\nParkveien 1\n7892 Trones, Noruega\nCorreo electrónico: info@parknordica.no\nNúmero de organización: 935 112 761'
        },
        tickets: {
          title: '3. Entradas y Reservas',
          items: {
            '0': '• Los boletos son válidos exclusivamente para la fecha seleccionada y el evento reservado.',
            '1': '• Devoluciones o reembolsos están excluidos, a menos que el evento sea cancelado o pospuesto por nosotros.',
            '2': '• Los boletos no son transferibles a menos que se indique lo contrario.',
            '3': '• Se debe presentar un boleto válido (digital o impreso) al ingresar.',
            '4': '• En caso de cancelación, reembolsaremos el precio completo del boleto, pero no los costos consecuentes (ej. viaje o alojamiento).'
          }
        },
        withdrawal: {
          title: '4. Derecho de Desistimiento / Cancelación',
          content: 'Para compras de boletos en línea, no existe derecho de desistimiento según el § 22 de la Ley Noruega de Ventas a Distancia (Angrerettloven), ya que se trata de eventos de ocio con fecha fija.'
        },
        usage: {
          title: '5. Uso del Sitio Web',
          items: {
            '0': '• Todo el contenido (textos, imágenes, logos, diseño) está protegido por derechos de autor.',
            '1': '• El uso comercial del contenido o la lectura automatizada del sitio web está prohibido.',
            '2': '• Nos reservamos el derecho de cambiar o descontinuar el contenido del sitio web en cualquier momento.'
          }
        },
        privacy: {
          title: '6. Privacidad',
          content: 'La información sobre el procesamiento de datos personales se puede encontrar en nuestra política de privacidad. Cumplimos con las disposiciones aplicables del RGPD así como la Ley Noruega de Datos Personales (Personopplysningsloven).'
        },
        liability: {
          title: '7. Limitación de Responsabilidad',
          content: 'No somos responsables de daños que surjan del uso de este sitio web, fallas técnicas o terceros – a menos que haya comportamiento intencional o groseramente negligente de nuestra parte.'
        },
        security: {
          title: '8. Seguridad',
          content: 'Nos esforzamos por proteger sus datos personales y empleamos medidas técnicas apropiadas. Sin embargo, no se puede garantizar una protección completa contra ataques de terceros.'
        },
        changes: {
          title: '9. Cambios a los Términos y Condiciones',
          content: 'Nos reservamos el derecho de actualizar estos términos en cualquier momento. Los cambios entran en vigor tan pronto como se publican en esta página.'
        },
        jurisdiction: {
          title: '10. Ley Aplicable y Jurisdicción',
          content: 'La ley noruega se aplica exclusivamente. El tribunal competente en Oslo, Noruega, tiene jurisdicción para todas las disputas relacionadas con el uso de este sitio web o compras de boletos.'
        }
      },
      lastUpdated: 'Última actualización: 24 de mayo de 2024'
    },
    disclaimer: {
      title: 'Exención de responsabilidad',
      sections: {
        behavior: {
          title: '1. Comportamiento en el parque y hacia los animales',
          content: 'Park Nordica es un parque de aventuras orientado a la naturaleza donde la vida silvestre se mueve en recintos espaciosos o áreas de libre acceso. Pedimos urgentemente a todos los huéspedes que se comporten de manera considerada y cuidadosa, hacia los animales, la naturaleza y otros visitantes.\n\nAlimentar, molestar o tocar animales fuera de las áreas expresamente designadas (por ejemplo, zoológico de mascotas) está estrictamente prohibido. Las violaciones pueden llevar a peligros tanto para animales como para humanos y pueden resultar en expulsión de las instalaciones.\n\nLos padres y personas acompañantes son responsables de supervisar a los niños. Los niños menores de 12 años solo pueden ingresar al área del zoológico de mascotas cuando estén acompañados por un adulto.\n\nPor favor manténganse en los senderos marcados y sigan las instrucciones del personal.'
        },
        facilities: {
          title: '2. Uso de instalaciones, atracciones y áreas de juego',
          content: 'El uso de nuestras atracciones está sujeto a la observancia de las regulaciones de seguridad, restricciones de edad o altura, y todas las instrucciones del personal.\n\nNo se puede asumir responsabilidad por el uso inadecuado o el incumplimiento de las instrucciones. Los daños resultantes del uso incorrecto o mala conducta son responsabilidad del visitante.'
        },
        liability: {
          title: '3. Exención de responsabilidad',
          content: 'Park Nordica solo es responsable en casos de intención o negligencia grave. La responsabilidad adicional, particularmente por daños causados por el comportamiento inadecuado de los huéspedes o el incumplimiento de las instrucciones de seguridad, está excluida.\n\nNo somos responsables de:\n• Accidentes debido a mala conducta personal\n• Pérdida o robo de pertenencias personales\n• Restricciones o daños relacionados con el clima\n• Daños debido a fuerza mayor (por ejemplo, tormentas, pandemias, cortes de energía)\n\nNo somos responsables de fallas técnicas, fallas del sistema o errores en reservas en línea a través de proveedores externos (por ejemplo, Stripe). El procesamiento de pagos es manejado por un proveedor de servicios de pago certificado: no tenemos acceso a sus datos de pago.'
        },
        events: {
          title: '4. Eventos',
          content: 'Los boletos solo son válidos en la fecha reservada. La devolución o reembolso no es posible: se aplican excepciones para cancelaciones por nuestra parte.\n\nPermanecer durante eventos especiales solo está permitido en áreas designadas. Ingresar a zonas no públicamente accesibles está prohibido y se hace bajo su propio riesgo.'
        },
        website: {
          title: '5. Información del sitio web',
          content: 'Nos esforzamos por proporcionar información correcta y actualizada. Sin embargo, el contenido (por ejemplo, precios, horarios de apertura) puede cambiar con poca antelación. No asumimos responsabilidad por problemas técnicos, pérdida de datos o daños causados por virus o terceros.'
        }
      },
      lastUpdated: 'Última actualización: 24 de mayo de 2024'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de');
  const [currentTranslations, setCurrentTranslations] = useState<TranslationObject>({});
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  // Browser-Sprache erkennen
  const detectBrowserLanguage = (): Language => {
    if (typeof window === 'undefined') return 'de';
    
    const browserLang = navigator.language.toLowerCase();
    
    // Deutsch
    if (browserLang.startsWith('de')) return 'de';
    // Norwegisch
    if (browserLang.startsWith('no') || browserLang.startsWith('nb') || browserLang.startsWith('nn')) return 'no';
    // Spanisch
    if (browserLang.startsWith('es')) return 'es';
    // Englisch (Fallback)
    if (browserLang.startsWith('en')) return 'en';
    
    // Standard-Fallback ist Englisch
    return 'en';
  };

  // Initiale Sprache setzen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Zuerst localStorage prüfen
      const savedLanguage = localStorage.getItem('park-nordica-language') as Language;
      if (savedLanguage && ['de', 'en', 'no', 'es'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      } else {
        // Fallback auf Browser-Sprache
        const detectedLanguage = detectBrowserLanguage();
        setLanguageState(detectedLanguage);
        localStorage.setItem('park-nordica-language', detectedLanguage);
      }
    }
  }, []);

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
        // JSON-Daten haben Vorrang, globalTranslations nur für fehlende Keys
        // AGB Terms Bug Fix - Force redeploy v2.1
        const globalData = globalTranslations[lang] || {};
        const mergedData = { ...globalData, ...data } as TranslationObject;
        setCurrentTranslations(mergedData);
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
    // Sprache in localStorage speichern
    if (typeof window !== 'undefined') {
      localStorage.setItem('park-nordica-language', lang);
    }
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