import type { Dict } from "./types";

// Brand and technical names are deliberately left in their original form:
// DRYPOINT, the four concept projects, Hiše Žilavec, and the stack names.
export const sl: Dict = {
  nav: {
    links: [
      { to: "/#work", label: "Delo" },
      { to: "/#services", label: "Storitve" },
      { to: "/#approach", label: "Pristop" },
      { to: "/#process", label: "Proces" },
      { to: "/#about", label: "O nas" },
    ],
    cta: "Začnimo projekt",
    openMenu: "Odpri meni",
    closeMenu: "Zapri meni",
    languageLabel: "Jezik",
    sectionsLabel: "Sekcije",
    sections: [
      { id: "top", to: "/#top", label: "Domov" },
      { id: "work", to: "/#work", label: "Delo" },
      { id: "services", to: "/#services", label: "Storitve" },
      { id: "approach", to: "/#approach", label: "Pristop" },
      { id: "process", to: "/#process", label: "Proces" },
      { id: "about", to: "/#about", label: "O nas" },
      { id: "contact", to: "/#contact", label: "Kontakt" },
    ],
  },

  hero: {
    eyebrow: "DRYPOINT — Studio za digitalno oblikovanje",
    title: { lead: "Oblikujemo znamke, ki", accent: "ganejo", tail: "." },
    body: "Vrhunske spletne strani, pristajalne strani in AI-vodena kreativa za znamke, ki nočejo izgledati povprečno. Vsak projekt se začne na prazni plošči — nikoli na predlogi.",
    primary: "Začnimo projekt",
    secondary: "Poglejte naše delo",
    tags: ["Spletno oblikovanje", "Pristajalne strani", "AI kreativa"],
    scroll: "Pomakni se na delo",
  },

  work: {
    eyebrow: "Izbrano delo",
    title: { lead: "Delo za naročnike,", accent: "ustvarjeno za rezultat." },
    description:
      "Dostavljena stran za naročnika, ob njej pa samoiniciativni koncepti, ki prikazujejo naš pristop k spletnemu oblikovanju.",
    client: {
      category: "Projekt za naročnika · V živo",
      description:
        "Krovstvo, kleparstvo in izdelava montažnih hiš, dejavni od leta 2008. Stran vodi dve ločeni storitveni liniji in štiri modele hiš do ene same, jasne poti do povpraševanja — za stranke po Sloveniji in Avstriji.",
      meta: "Krovske in kleparske storitve, Robert Žilavec s.p. — Gornja Radgona, Slovenija",
      metaPrefix: "Zasnovano in izdelano za delujoče podjetje",
      action: "Oglejte si case study",
    },
    conceptsEyebrow: "Konceptne smeri",
    conceptsTitle: "Samoiniciativno delo, izdelano po istem merilu.",
    conceptCategory: "Spletno oblikovanje",
    concepts: {
      lumiere:
        "Stran za vrhunsko zasebno zobozdravstveno kliniko, osredotočena na zaupanje, izkušnjo pacienta in sodobno oblikovanje v zdravstvu. Zasnovana tako, da obiskovalca pripelje do rezerviranega termina.",
      aurelia:
        "Stran za vrhunsko restavracijo, zasnovana za predstavitev kulinarične izkušnje, vzdušja in identitete znamke. Ustvarjena tako, da privabi goste, gradi zaupanje in vodi do rezervacij mize prek elegantne digitalne prisotnosti.",
      nova: "Osebno vodenje, znanstveno utemeljeni programi in dosledna odgovornost — za tiste, ki se ne zadovoljijo s povprečjem.",
      vivelle:
        "Stran za luksuzni lepotni salon, zgrajena na uredniški umirjenosti, filmskem videu in premišljenem detajlu. Ustvarjena tako, da vsak obisk deluje kot izkušnja, še preden stranka stopi skozi vrata.",
    },
  },

  services: {
    eyebrow: "Storitve",
    title: { lead: "Tri discipline,", accent: "en studio." },
    description:
      "Vse, kar DRYPOINT izdela, leži nekje med temi tremi — strateško vodeno oblikovanje za znamke, ki morajo izgledati in delovati na vrhu svoje kategorije.",
    items: [
      {
        title: "Spletno oblikovanje",
        description:
          "Celovite predstavitvene in znamčne spletne strani, zasnovane za jasnost, hitrost in vrhunski prvi vtis — narejene tako, da zdržijo resničen promet, ne le posnetek za portfelj.",
      },
      {
        title: "Pristajalne strani",
        description:
          "Osredotočene enostranske predstavitve z visoko konverzijo za lansiranja, kampanje in ponudbe — zgrajene okoli enega cilja, ene zgodbe in jasne poti do dejanja.",
      },
      {
        title: "AI kreativa",
        description:
          "AI-vodeni oglasi, produktni filmi in kampanjski vizuali — filmski rezultat, ustvarjen hitreje od klasičnega snemanja, brez odrekanja obrti.",
      },
    ],
  },

  approach: {
    eyebrow: "Pristop",
    title: { lead: "Kako", accent: "razmišljamo", tail: ", preden oblikujemo." },
    quote: "„Prvi kader določi ton vsemu, kar sledi.“",
    pillars: [
      {
        title: "Vodeni s strategijo",
        description:
          "Vsaka oblikovalska odločitev se vrne k poslovnemu cilju, ne k trenutnemu trendu.",
      },
      {
        title: "Filmska obrt",
        description:
          "Ritem, kontrast in tempo jemljemo enako resno, kot režiser jemlje prizor.",
      },
      {
        title: "Podprto z AI",
        description:
          "AI pospeši izdelavo in raziskovanje — nikoli pa ne nadomesti okusa ali presoje.",
      },
      {
        title: "Obsesiven detajl",
        description:
          "Razmiki, gibanje in besedilo so brušeni, dokler nič ne deluje naključno.",
      },
    ],
  },

  process: {
    eyebrow: "Proces",
    title: { lead: "Pet korakov.", accent: "Brez ugibanja." },
    description:
      "Strukturirana pot od prvega pogovora do lansiranja — pregledna na vsaki stopnji.",
    steps: [
      {
        title: "Spoznavanje",
        description:
          "Spoznamo znamko, občinstvo in cilj projekta, preden postavimo prvi piksel.",
      },
      {
        title: "Opredelitev",
        description:
          "Obseg, struktura strani in kreativna smer so dogovorjeni najprej na papirju — brez presenečenj med izdelavo.",
      },
      {
        title: "Oblikovanje",
        description:
          "Natančno oblikovanje za vsako širino zaslona, pregledano skupaj v strukturiranih krogih.",
      },
      {
        title: "Razvoj",
        description:
          "Produkcijska izdelava v Next.js — hitra, dostopna in animirana z namenom.",
      },
      {
        title: "Predaja",
        description:
          "Lansiranje, predaja in kratko obdobje podpore, da stran deluje tako, kot je bila zasnovana.",
      },
    ],
  },

  about: {
    eyebrow: "O nas",
    title: { lead: "Studio, zgrajen za", accent: "mojstrstvo." },
    paragraphs: [
      "DRYPOINT obstaja, ker je večina „kreativnega“ dela na spletu videti enako — iste predloge, isti generični gradienti, isti pozabljivi uvodni zaslon. Ta studio smo ustanovili, da delamo nasprotno: vsako spletno stran obravnavamo kot film, ki potrebuje svoj ton, ritem in glas.",
      "To pomeni manj naročnikov, več pozornosti na projekt in odklonitev vsega, kar bi delovalo generično. Kjer je smiselno, v proces vključimo AI — ne zato, da bi rezali ovinke, ampak da hitreje raziščemo več smeri, preden se odločimo za pravo.",
    ],
    beliefs: [
      "Manj naročnikov, več pozornosti na projekt.",
      "Vsaka znamka dobi izvirno smer — nikoli predloge.",
      "AI je orodje v procesu, nikoli nadomestilo za okus.",
    ],
  },

  contact: {
    eyebrow: "Kontakt",
    title: { lead: "Ustvarimo nekaj", accent: "vrhunskega." },
    description:
      "Povejte nam o svojem projektu in odgovorili bomo v enem delovnem dnevu. Raje po e-pošti? Pišite nam neposredno spodaj.",
    name: "Ime in priimek",
    email: "E-pošta",
    projectType: "Vrsta projekta",
    message: "Sporočilo",
    projectTypes: [
      { value: "Web Design", label: "Spletno oblikovanje" },
      { value: "Landing Page", label: "Pristajalna stran" },
      { value: "AI Creative", label: "AI kreativa" },
      { value: "Not sure yet", label: "Še nisem odločen" },
    ],
    send: "Pošlji sporočilo",
    sending: "Pošiljam…",
    successTitle: "Sporočilo prejeto.",
    successBody:
      "Hvala za sporočilo — javimo se v enem delovnem dnevu.",
    genericError: "Nekaj je šlo narobe. Poskusite znova.",
    networkError:
      "Nekaj je šlo narobe. Preverite povezavo in poskusite znova.",
  },

  footer: {
    blurb:
      "Vrhunski studio za digitalno oblikovanje — spletne strani, pristajalne strani in AI-podprte kreativne izkušnje.",
    links: [
      { to: "/#work", label: "Delo" },
      { to: "/#services", label: "Storitve" },
      { to: "/#approach", label: "Pristop" },
      { to: "/#process", label: "Proces" },
      { to: "/#about", label: "O nas" },
      { to: "/#contact", label: "Kontakt" },
    ],
    nav: "Noga",
    follow: "Sledite nam",
    rights: "Vse pravice pridržane.",
    backToTop: "Nazaj na vrh",
    privacy: "Zasebnost",
  },

  caseStudy: {
    metaTitle: "Hiše Žilavec",
    metaDescription:
      "Case study: spletna stran za Krovske in kleparske storitve, Robert Žilavec s.p. — krovstvo, kleparstvo in montažne hiše od leta 2008, z dvema storitvenima linijama in štirimi modeli hiš, ki vodijo do ene same poti do povpraševanja.",
    ogTitle: "Hiše Žilavec — Case Study",
    ogDescription:
      "Dve storitveni liniji, štirje modeli hiš, ena pot do povpraševanja. Kako je DRYPOINT strukturiral in izdelal stran za krovstvo in montažne hiše po Sloveniji in Avstriji.",

    eyebrow: "Projekt za naročnika / 2026",
    title: "Hiše Žilavec",
    intro:
      "Spletna stran za krovstvo, kleparstvo in izdelavo montažnih hiš, dejavne od leta 2008, ki vodi dve ločeni storitveni liniji in štiri modele hiš do ene same, jasne poti do povpraševanja.",
    meta: [
      { label: "Disciplina", value: "Spletno oblikovanje" },
      { label: "Disciplina", value: "Spletni razvoj" },
      { label: "Območje", value: "Slovenija" },
    ],
    visit: "Obiščite spletno stran",
    back: "Nazaj na izbrano delo",
    heroAlt:
      "Domača stran Hiš Žilavec: dokončana hiša v mraku pod naslovom strani.",

    overviewEyebrow: "Pregled",
    overviewTitle: { lead: "Obrtno podjetje,", accent: "na spletu." },
    overview: [
      "Krovske in kleparske storitve, Robert Žilavec s.p. delujejo iz Gornje Radgone in so dejavne od leta 2008. Podjetje pokriva dve povezani obrti: krovstvo in kleparstvo ter zasnovo in izdelavo montažnih hiš.",
      "Stranke so razpršene po severovzhodni Sloveniji — Gornja Radgona, Kidričevo, Maribor, Ormož, Ptuj, Slovenska Bistrica in Koroška — ter v sosednji Avstriji. Stran je morala postreči tako nekomu, ki menja streho, kot nekomu, ki načrtuje celo hišo, ne da bi kdorkoli od njiju moral prebrskati gradivo drugega.",
    ],

    challengeEyebrow: "Izziv",
    challengeTitle: { lead: "Pet problemov,", accent: "pet odgovorov." },
    challenge: [
      {
        title: "Dve obrti, eno podjetje",
        body: "Krovstvo in kleparstvo stojita ob izdelavi montažnih hiš. Nagovarjata različna kupca z različnima časovnicama, stran pa je morala držati oboje, ne da bi delovala kot dve podjetji, zbiti skupaj.",
        alt: "Sekcija storitev: krovstvo in kleparstvo levo, montažne hiše desno, vsaka s svojim seznamom del.",
      },
      {
        title: "Štirje modeli, pošteno primerjani",
        body: "Ponudba hiš sega od 68 do 206 m². Vsak model je potreboval dovolj vsebine, da ga je mogoče presojati samostojno, hkrati pa ostati primerljiv z ostalimi na prvi pogled.",
        alt: "Model TREND 68,10 m²: fotografija zgrajene hiše čez celotno širino, opis, povezava do povpraševanja in ostali trije modeli ob strani.",
      },
      {
        title: "Navigacija, ki jo krovec dejansko uporabi",
        body: "Občinstvo ne brska za zabavo. Orientacija je morala biti kratka, očitna in dosegljiva s katerega koli mesta na strani.",
      },
      {
        title: "Ena pot do povpraševanja",
        body: "Vsaka pot skozi stran se izteče na isto mesto: en obrazec, ki že ve, s katere storitve ali modela je obiskovalec prišel.",
        alt: "Sekcija kontakta: telefonske številke, e-pošta in naslov levo, desno pa obrazec za povpraševanje z izbirnikom storitve in modela.",
      },
      {
        title: "Obrt, predstavljena kot se spodobi",
        body: "Osemnajst let obrti si je zaslužilo digitalno prisotnost z enako mero skrbi. Delo je fizično in neblišč; predstavitev je morala biti umirjena, temna in samozavestna, ne glasna.",
      },
    ],

    structureEyebrow: "Struktura",
    structureTitle: { lead: "Ena stran,", accent: "devet postaj." },
    structureDescription:
      "Celotno podjetje stoji na eni sami strani. Sidra opravijo delo podstrani, zato nič ne stane nalaganja, obrazec za povpraševanje pa ni nikoli več kot en skok stran.",

    directionEyebrow: "Oblikovalska smer",
    directionTitle: { lead: "Zgrajeno kot", accent: "delo samo." },
    direction: [
      {
        label: "Tipografija",
        body: "Big Shoulders v verzalkah pri debelini 700 za naslove — zgoščena groteska, ki bere kot oznaka na gradbišču. Archivo nosi tekoče besedilo in ohranja daljše slovenske stavke enakomerne in berljive.",
      },
      {
        label: "Barva",
        body: "Topla, skoraj črna podlaga z enim medeninastim poudarkom, ki jo prekine ena sekcija v barvi papirja. Paleta se umakne arhitekturi.",
      },
      {
        label: "Vizualni jezik",
        body: "Arhitekturna fotografija čez celotno širino pod temnim nanosom, tanke črte in radodarni robovi. Stran nosi struktura, ne okras.",
      },
      {
        label: "Fotografija",
        body: "Zgrajeno delo, posneto v mraku, ko dokončana strešna linija bere kot silhueta in so notranje luči prižgane. Motiv je vedno dokončana hiša, nikoli generična notranjost.",
      },
    ],

    typeEyebrow: "Tipografija in barva",
    typeTitle: { lead: "Dve pisavi,", accent: "pet vrednosti." },
    displayLabel: "Naslovna",
    displayNote:
      "700, verzalke. Dovolj zgoščena, da drži dolg slovenski naslov v eni vrstici.",
    bodyLabel: "Tekoče besedilo",
    bodyNote:
      "400–500. Enakomerna, nevsiljiva groteska, ki ohrani čiste strešice pri majhnih velikostih.",
    palette: [
      { name: "Podlaga", note: "Ozadje strani" },
      { name: "Črnilo", note: "Besedilo na temnem" },
      { name: "Medenina", note: "Poudarek in pozivi k dejanju" },
      { name: "Papir", note: "Svetla sekcija" },
      { name: "Kontrast", note: "Besedilo na medenini" },
    ],

    responsiveEyebrow: "Odzivnost",
    responsiveTitle: {
      lead: "Oblikovano od",
      accent: "najmanjšega zaslona navzgor.",
    },
    responsiveDescription:
      "Večina obiskovalcev pride s telefona, pogosto kar z gradbišča. Ozka postavitev je bila oblikovana prva; širše jo odprejo, namesto da bi jo preurejale.",
    responsive: [
      {
        label: "Mobilno",
        body: "Glavni primer. Sekcije se zložijo v vrstnem redu branja, modeli hiš postanejo zaporedje za drsenje namesto mreže, gumb za povpraševanje pa ves čas ostane na dosegu palca.",
      },
      {
        label: "Tablica",
        body: "Storitveni par se razdeli v dva stolpca, medtem ko modeli ostanejo čez celotno širino, tako da tloris 68 m² nikoli ni pomanjšan do točke, kjer preneha biti berljiv.",
      },
      {
        label: "Namizje",
        body: "Uvodni zaslon zavzame celoten pogled, tipografska lestvica pa se odpre. Širijo se robovi, ne dolžina vrstice, zato besedilo ohrani svoj ritem branja.",
      },
    ],
    mobileAlt:
      "Modeli hiš na telefonu: fotografija, ime modela, opis in povezava do povpraševanja, zloženi v en stolpec.",

    devEyebrow: "Razvoj",
    devTitle: { lead: "Na čem", accent: "dejansko stoji." },
    stack: [
      {
        name: "Next.js",
        body: "App Router s strežniško izrisanimi stranmi, tako da stran prispe kot HTML — tako za iskalnike kot za počasne povezave.",
      },
      {
        name: "TypeScript",
        body: "Modeli hiš, storitve in možnosti obrazca so tipizirani podatki namesto podvojene kode — dodati model pomeni spremeniti podatek.",
      },
      {
        name: "Tailwind CSS",
        body: "En sam nabor tokenov za barvo, razmike in tipografijo, kar ohranja temne in papirnate sekcije usklajene.",
      },
      {
        name: "Framer Motion",
        body: "Vstopna razkritja in zaporedje modelov, omejena na prosojnost in majhne premike, ter izklopljena pri zmanjšanem gibanju.",
      },
      {
        name: "Vercel",
        body: "Objavljeno na Vercelu, s kontaktnim obrazcem, povezanim na naročnikov lastni e-poštni predal.",
      },
    ],

    resultEyebrow: "V živo",
    resultTitle: {
      lead: "Dve storitveni liniji in štirje modeli hiš, razrešeni v eno stran in",
      accent: "eno povpraševanje.",
    },
    resultBody:
      "Stran je v živo in v uporabi podjetja, kontaktni obrazec pa teče na naročnikov lastni e-poštni predal.",
    resultCta: "Obiščite spletno stran",
  },

  // TODO: dopolni registrirano pravno osebo, poslovni naslov in morebitno
  // matično/davčno številko, ko bodo potrjeni, ter zamenjaj nevtralne
  // formulacije v razdelkih „Kdo smo“ in „Vaše pravice“.
  privacy: {
    metaTitle: "Politika zasebnosti",
    metaDescription:
      "Kako DRYPOINT ravna z osebnimi podatki, ki jih pošljete prek kontaktnega obrazca: kaj se zbira, zakaj, kdo obdeluje in kakšne pravice imate po GDPR.",
    eyebrow: "Pravno",
    title: "Politika zasebnosti",
    updated: "Zadnja posodobitev: 22. avgust 2026",
    intro:
      "DRYPOINT je studio za digitalno oblikovanje, ki deluje iz Slovenije, znotraj Evropske unije. Ta politika pojasnjuje, katere osebne podatke prejmemo, ko nas kontaktirate, zakaj jih hranimo in kaj lahko od nas zahtevate. Napisana je zato, da se prebere, ne da se preživi.",
    sections: [
      {
        heading: "Kdo smo",
        body: [
          "DRYPOINT je studio, ki stoji za to spletno stranjo, in je odgovoren za osebne podatke, opisane tukaj — po izrazoslovju GDPR upravljavec osebnih podatkov.",
          "Za vse v zvezi z vašimi podatki pišite na hello@drypointcreative.com. Na ta sporočila odgovarjamo neposredno; vmes ni nobenega sistema za zahtevke.",
        ],
      },
      {
        heading: "Kaj zbiramo",
        body: [
          "Samo tisto, kar vpišete v kontaktni obrazec: ime, e-poštni naslov, izbrano vrsto projekta in vaše sporočilo. Nič drugega ni zahtevano in nič drugega ne zbiramo.",
          "Ta spletna stran ne nastavlja piškotkov, ne uporablja analitike in ne vključuje sledilnikov tretjih oseb. Ni oglaševalskih pikslov, snemanja seje ali kakršnegakoli profiliranja.",
          "Naš ponudnik gostovanja obdeluje običajne podatke o zahtevkih, kot so IP-naslovi, kot del varnega streženja strani. Teh podatkov ne uporabljamo za prepoznavanje ali sledenje posameznim obiskovalcem.",
        ],
      },
      {
        heading: "Zakaj jih hranimo",
        body: [
          "Da preberemo vaše povpraševanje in nanj odgovorimo ter — če pride do sodelovanja — izvedemo korake, ki vodijo do pogodbe.",
          "Pravna podlaga je naš zakoniti interes, da odgovorimo tistim, ki nas kontaktirajo, in, kadar sledi projekt, predpogodbeni ter pogodbeni koraki, ki ste jih zahtevali.",
        ],
      },
      {
        heading: "Kdo drug jih vidi",
        body: [
          "Kontaktni obrazec dostavi vaše sporočilo po e-pošti prek ponudnika Resend v naš lastni predal. Resend sporočilo obdela izključno zato, da ga dostavi.",
          "Spletna stran gostuje na Vercelu, ki obdeluje tehnične podatke o zahtevkih kot del streženja strani.",
          "Osebnih podatkov ne prodajamo in jih ne delimo z nikomer za trženje.",
        ],
      },
      {
        heading: "Kako dolgo jih hranimo",
        body: [
          "Povpraševanja ostanejo v našem predalu, dokler so uporabna — med pogovorom, ves čas morebitnega projekta, ki sledi, in obdobje, ko smo poslovno dokumentacijo dolžni hraniti.",
          "Če želite, da vaše sporočilo izbrišemo prej, nam to sporočite in bomo to storili.",
        ],
      },
      {
        heading: "Vaše pravice",
        body: [
          "Po GDPR lahko od nas zahtevate kopijo podatkov, ki jih hranimo o vas, njihov popravek, izbris, omejitev obdelave, prenos v prenosljivi obliki ali ugovarjate obdelavi.",
          "Pišite na hello@drypointcreative.com in bomo ukrepali. Razloga vam ni treba navesti.",
          "Če z našim ravnanjem niste zadovoljni, lahko vložite pritožbo pri Informacijskem pooblaščencu Republike Slovenije ali pri nadzornem organu v svoji državi.",
        ],
      },
      {
        heading: "Spremembe te politike",
        body: [
          "Če se ta politika spremeni, se na tej strani pojavi popravljena različica z novim datumom na vrhu. Sprememb ne uveljavljamo za nazaj.",
        ],
      },
    ],
  },
};
