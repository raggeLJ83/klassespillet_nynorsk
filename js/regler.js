// Regelbiblioteket og startlista for klassens val.

export const MAKS_REGLER = 4;

export const BIBLIOTEK = [
  {
    mal: 'tavle',
    navn: 'Gjennomgang på tavla',
    om: 'Felles gjennomgang der læraren eller ein elev har ordet.',
    regler: [
      { tekst: 'Me følgjer med og har blikket mot den som snakkar.', brudd: 'Å drive med andre aktivitetar eller vende seg bort frå gjennomgangen over tid.' },
      { tekst: 'Me rekkjer opp handa og ventar på tur.', brudd: 'Å rope ut eller snakke utan å ha fått ordet.' },
      { tekst: 'Me lyttar til kvarandre utan å avbryte.', brudd: 'Å avbryte eller snakke medan andre har ordet.' },
    ],
  },
  {
    mal: 'stillelesing',
    navn: 'Stillelesing',
    om: 'Alle les kvar si bok i ro.',
    regler: [
      { tekst: 'Me les i boka vår utan å snakke.', brudd: 'Å snakke eller lage lydar som forstyrrar lesinga.' },
      { tekst: 'Me sit på plassen vår og held på med lesinga.', brudd: 'Å gå frå plassen utan avtale eller drive med andre aktivitetar.' },
      { tekst: 'Me lèt andre lese i fred.', brudd: 'Å forstyrre andre som les.' },
    ],
  },
  {
    mal: 'kahoot',
    navn: 'Kahoot',
    om: 'Quiz med rom for latter og jubel, men med ro mellom spørsmåla.',
    regler: [
      { tekst: 'Me svarar på vår eigen Kahoot utan å forstyrre andre.', brudd: 'Å sjå på andre sine svar eller forstyrre nokon medan dei svarar.' },
      { tekst: 'Me kan juble og le, men ikkje rope eller kommentere andre sine svar.', brudd: 'Å rope høgt, håne andre eller kommentere svara deira.' },
      { tekst: 'Me kjem raskt til ro mellom kvart spørsmål.', brudd: 'Å halde fram med høglydt prat eller lydar når neste spørsmål skal starte.' },
    ],
  },
  {
    mal: 'pc',
    navn: 'Sjølvstendig arbeid på PC',
    om: 'Elevane arbeider kvar for seg på eigen PC.',
    merknad: 'Registrer berre brot du faktisk kan observere. Dersom du ikkje ser skjermane, skal du ikkje registrere brot på skjermbruk.',
    regler: [
      { tekst: 'Me har berre skulearbeidet ope.', brudd: 'Å bruke spel, videoar, sosiale medium eller andre sider som ikkje høyrer til oppgåva.' },
      { tekst: 'Me har chat og meldingar lukka.', brudd: 'Å skrive eller lese meldingar som ikkje høyrer til oppgåva.' },
      { tekst: 'Me sit på plassen vår.', brudd: 'Å forlate plassen utan avtale.' },
    ],
  },
  {
    mal: 'uten-pc',
    navn: 'Sjølvstendig arbeid utan PC',
    om: 'Elevane arbeider kvar for seg med bok eller ark.',
    regler: [
      { tekst: 'Me arbeider stille og kviskrar berre om oppgåva.', brudd: 'Høglydt prat eller samtalar som ikkje handlar om oppgåva.' },
      { tekst: 'Me rekkjer opp handa når me treng hjelp.', brudd: 'Å rope på læraren eller forlate plassen for å be om hjelp utan avtale.' },
      { tekst: 'Me sit på plassen vår.', brudd: 'Å forlate plassen utan avtale.' },
    ],
  },
  {
    mal: 'oppstart',
    navn: 'Oppstart av timen',
    om: 'Dei første minutta av timen.',
    regler: [
      { tekst: 'Me finn plassane våre raskt.', brudd: 'Å bli ståande eller gå rundt etter at timen har starta.' },
      { tekst: 'Me har utstyret klart.', brudd: 'Å ikkje finne fram avtalt utstyr etter beskjed og rimeleg tid.' },
      { tekst: 'Me er stille når læraren gir beskjed.', brudd: 'Prat eller forstyrrande lydar medan læraren gir beskjed.' },
    ],
  },
  {
    mal: 'gruppe',
    navn: 'Samarbeid i grupper',
    om: 'Elevane arbeider saman om ei felles oppgåve.',
    regler: [
      { tekst: 'Me brukar innestemme.', brudd: 'Å rope eller snakke så høgt at andre grupper blir forstyrra.' },
      { tekst: 'Me lèt alle bidra.', brudd: 'Å avbryte, stengje andre ute eller ikkje gi dei høve til å delta.' },
      { tekst: 'Me held oss til oppgåva.', brudd: 'Prat eller aktivitetar som ikkje høyrer til oppgåva.' },
    ],
  },
];

export function fraBibliotek(mal) {
  const b = BIBLIOTEK.find((r) => r.mal === mal);
  return { id: crypto.randomUUID(), mal, navn: b.navn, regler: b.regler.map((r) => ({ ...r })) };
}

export function egetRegelsett() {
  return {
    id: crypto.randomUUID(), mal: null, navn: '',
    regler: [{ tekst: '', brudd: '' }, { tekst: '', brudd: '' }, { tekst: '', brudd: '' }],
  };
}

export const FORSLAG = [
  '⭐ 1 stjerne',
  '⭐ 1 stjerne',
  '⭐ 1 stjerne',
  '⭐ 1 stjerne',
  '⭐ 1 stjerne',
  '⭐⭐ 2 stjerner',
];

// Kort roseforslag som fungerer med reglar i «Me»-form.
export function rosForslag(regel) {
  const tekst = String(regel).trim().replace(/[.!?]+$/, '');
  return `Flott innsats! De følgjer regelen «${tekst}».`;
}
