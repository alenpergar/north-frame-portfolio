import type { Dict } from "./types";

// Brand and technical names are deliberately left in their original form:
// DRYPOINT, the campaign brands, Hiše Žilavec, VIVELLE and the stack names.
export const sl: Dict = {
  nav: {
    links: [
      { to: "/#work", label: "Delo" },
      { to: "/#services", label: "Storitve" },
      { to: "/#digital", label: "Digitalno" },
      { to: "/#pricing", label: "Cenik" },
      { to: "/#faq", label: "Vprašanja" },
      { to: "/#contact", label: "Kontakt" },
    ],
    cta: "Začnimo projekt",
    openMenu: "Odpri meni",
    closeMenu: "Zapri meni",
    languageLabel: "Jezik",
  },

  // Status labels stay in English on both locales (decided 2026-09-26): they
  // are industry terms and should read identically in either language.
  status: {
    client: "Client work",
    spec: "Spec commercial",
    concept: "Concept",
    website: "Website",
  },

  player: {
    play: "Predvajaj",
    close: "Zapri",
    frameLabel: "Predvajaj {name}, {status}, {seconds} sekund",
    specNote: "Nenaročeno spec delo. Ni naročeno s strani znamke {brand} in z njo ni povezano.",
    conceptNote: "Koncept. Izvirno znamko in izdelek je ustvaril DRYPOINT.",
  },

  hero: {
    title: ["Reklame, ustvarjene z AI.", "Režirane kot film."],
    primary: "Začnimo projekt",
    secondary: "Oglejte si film",
  },

  commercials: {
    title: "Izbrane reklame",
    feedTitle: "Za družbena omrežja.",
    lines: {
      snap: "Tridesetsekundna zgodba v eni vrsti pred blagajno.",
      proda: "Češnjeva soda, posneta kot koktajl.",
      matcha: "Proces, ljudje in kozarec, za katerega se splača počakati.",
    },
  },

  capabilities: {
    title: "Od scenarija do končne montaže.",
    items: [
      {
        title: "AI reklame",
        description: "Spoti za lansiranja, kampanje in družbena omrežja, od ideje do končne montaže.",
      },
      {
        title: "AI video produkcija",
        description: "Produktni filmi in vizuali znamke, brez klasičnega snemanja.",
      },
      {
        title: "Kreativno oglaševanje",
        description: "Koncepti, scenariji in kampanjske linije, ki dajo izdelku kaj povedati.",
      },
      {
        title: "Splet in digitalno",
        description: "Spletne in pristajalne strani, zasnovane in izdelane v studiu.",
      },
    ],
  },

  process: {
    title: "Kako nastane spot.",
    steps: [
      {
        title: "Brief",
        description: "Kaj je izdelek, komu je namenjen in kje bo spot živel.",
      },
      {
        title: "Koncept in scenarij",
        description: "Ena ideja, napisana in narisana, preden karkoli generiramo.",
      },
      {
        title: "Produkcija",
        description: "Kadri, generirani, režirani in dodelani, dokler ne zdrži vsak kader.",
      },
      {
        title: "Dostava",
        description: "Končna montaža in formati, ki jih potrebujete: 16:9, 9:16 in 1:1.",
      },
    ],
  },

  digital: {
    title: "Splet in digitalno",
    description: "Spletne strani, zasnovane in izdelane v studiu.",
    zilavec: {
      title: "Hiše Žilavec",
      description: "Dve storitveni liniji in štirje modeli hiš, ena pot do povpraševanja.",
      action: "Oglejte si case study",
      alt: "Domača stran Hiše Žilavec: naslov „Streha nad glavo. Dom za življenje.“ ob sodobni hiši s temno strešno kritino.",
    },
    vivelle: {
      title: "VIVELLE Beauty",
      description: "Uredniški koncept spletne strani za luksuzni salon.",
      action: "Oglejte si stran",
      alt: "Koncept VIVELLE Beauty: terapevtka izvaja nego obraza v salonu iz marmorja in zlata.",
    },
  },

  pricing: {
    eyebrow: "Cenik",
    title: "Jasna začetna cena. Vsak projekt je drugačen.",
    description:
      "Vsak projekt je pripravljen individualno glede na cilje, zahtevnost in produkcijske potrebe.",
    items: [
      {
        name: "AI reklame",
        price: "Od 300 €",
        description: "AI produkcija reklam, od koncepta do končnega filma.",
      },
      {
        name: "Spletno oblikovanje in razvoj",
        price: "Od 700 €",
        description: "Oblikovanje in izdelava spletnih strani, prilagojenih vašemu podjetju.",
      },
      {
        name: "Projekti po meri",
        price: "Pogovorimo se",
        description: "Za večje, kompleksnejše ali kombinirane kreativne projekte.",
      },
    ],
    ctaLead: "Imate projekt v mislih?",
    ctaLabel: "Stopite v stik",
  },

  faq: {
    eyebrow: "Pogosta vprašanja",
    title: "Vprašanja, ki jih morda imate.",
    items: [
      {
        question: "Kaj vključuje AI reklama?",
        answer:
          "Odvisno od projekta lahko produkcija vključuje razvoj koncepta, vizualno režijo, AI generiranje, montažo, oblikovanje zvoka in končno izvedbo. Natančen obseg določimo pred začetkom produkcije.",
      },
      {
        question: "Koliko stane AI reklama?",
        answer:
          "Projekti AI reklam se začnejo pri 300 €. Končna cena je odvisna od koncepta, dolžine, števila kadrov, zahtevnosti produkcije in končnih materialov.",
      },
      {
        question: "Koliko časa traja projekt?",
        answer:
          "Čas izvedbe je odvisen od obsega projekta. Manjše produkcije so lahko izvedene hitro, kompleksnejši koncepti pa zahtevajo več časa za razvoj, generiranje in dodelavo.",
      },
      {
        question: "Ali lahko skupaj izdelate spletno stran in reklamo?",
        answer:
          "Da. Oblikovanje spletne strani, razvoj in produkcijo AI reklame lahko združimo v enoten kreativni projekt, kadar je to smiselno za znamko.",
      },
      {
        question: "Ali sodelujete s strankami zunaj Slovenije?",
        answer: "Da. DRYPOINT ima sedež v Sloveniji in sodeluje s strankami ne glede na njihovo lokacijo.",
      },
      {
        question: "Kako začnemo?",
        answer:
          "Pošljite sporočilo preko kontaktnega obrazca s kratkim opisom projekta. Pred začetkom se pogovorimo o ideji, obsegu in naslednjih korakih.",
      },
    ],
  },

  closing: {
    about:
      "DRYPOINT je neodvisen kreativni studio, ki ga vodi Alen. S sedežem v Sloveniji, za znamke kjerkoli.",
    title: "Imate izdelek, ki si zasluži film?",
  },

  contact: {
    name: "Ime",
    email: "E-pošta",
    projectType: "Vrsta projekta",
    message: "Sporočilo",
    projectTypes: [
      { value: "AI Commercial", label: "AI reklama" },
      { value: "Video Production", label: "Video produkcija" },
      { value: "Website", label: "Spletna stran" },
      { value: "Not sure yet", label: "Še ne vem" },
    ],
    send: "Pošlji sporočilo",
    sending: "Pošiljam…",
    successTitle: "Sporočilo prejeto.",
    successBody: "Hvala za sporočilo. Odgovor prejmete v enem delovnem dnevu.",
    genericError: "Nekaj je šlo narobe. Poskusite znova.",
    networkError: "Nekaj je šlo narobe. Preverite povezavo in poskusite znova.",
    invalid: "Izpolnite obvezna polja in vpišite veljaven e-poštni naslov.",
  },

  footer: {
    blurb: "Neodvisni kreativni studio za AI reklame, video produkcijo in digitalno delo.",
    links: [
      { to: "/#work", label: "Delo" },
      { to: "/#services", label: "Storitve" },
      { to: "/#process", label: "Proces" },
      { to: "/#digital", label: "Digitalno" },
      { to: "/#pricing", label: "Cenik" },
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
      "Case study: DRYPOINT je zgradil stran za krovstvo, kleparstvo in izdelavo montažnih hiš — dve storitveni liniji, štirje modeli hiš, ena pot do povpraševanja.",
    ogTitle: "Hiše Žilavec Case Study — DRYPOINT",
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
