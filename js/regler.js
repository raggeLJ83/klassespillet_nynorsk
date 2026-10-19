// Regelbiblioteket og startlisten for klassens val. Tekstene står i planen, avsnitt 5.9 og 5.10.

export const MAKS_REGLER = 4;

export const BIBLIOTEK = [
  {
    mal: 'tavle',
    navn: 'Tavleundervisning',
    om: 'Læraren eller en elev har ordet.',
    regler: [
      { tekst: 'Eg er stille når nokon har ordet.', brudd: 'Prat, hvisking eller lyd når andre har ordet.' },
      { tekst: 'Eg rekk opp handa når eg vil seie noko.', brudd: 'Å snakke uten ordet, også om fag.' },
      { tekst: 'Eg sit vend mot tavla.', brudd: 'Å snu seg for å prate, eller sitte med ryggen til.' },
    ],
  },
  {
    mal: 'pc',
    navn: 'Sjølvstendig arbeid på PC',
    om: 'Elevene jobber alene på egen PC.',
    merknad: 'Studiene målte bare atferd som synes fra der læreren står, ikke skjermbruk. Reglene virker bare om du faktisk ser skjermene, for eksempel når du går rundt bak elevene. Er du usikker, registrerer du ikke brudd.',
    regler: [
      { tekst: 'Eg har berre skulearbeidet ope.', brudd: 'Spill, video, sosiale medier eller andre sider.' },
      { tekst: 'Chat og meldingar er lukka.', brudd: 'Å skrive eller lese meldinger.' },
      { tekst: 'Eg sit på plassen min.', brudd: 'Å forlate plassen uten lov.' },
    ],
  },
  {
    mal: 'uten-pc',
    navn: 'Sjølvstendig arbeid utan PC',
    om: 'Elevene jobber alene med bok eller ark.',
    regler: [
      { tekst: 'Eg jobbar stille. Eg kviskrar berre om oppgåva.', brudd: 'Prat som flere enn sidemann hører, eller om annet.' },
      { tekst: 'Eg rekk opp handa når eg treng hjelp.', brudd: 'Å rope på eller gå til læreren uten lov.' },
      { tekst: 'Eg sit på plassen min.', brudd: 'Å forlate plassen uten lov.' },
    ],
  },
  {
    mal: 'oppstart',
    navn: 'Oppstart av time',
    om: 'De første minuttene av timen.',
    regler: [
      { tekst: 'Eg sit på plassen min når timen startar.', brudd: 'Å ikke sitte på plassen når timen starter.' },
      { tekst: 'PC-en er lukka til læraren seier noko anna.', brudd: 'Åpen skjerm.' },
      { tekst: 'Eg er stille når læraren gir beskjed.', brudd: 'Prat eller lyd mens læreren gir beskjed.' },
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

// Gjør en regel om til en setning læreren kan si: «Eg sit på plassen min.»
// blir «Jeg ser at mange sitter på plassen sin. Flott!» Reglar som ikke starter
// med «Jeg», roses som de står.
export function rosForslag(regel) {
  const forste = regel.split('.')[0].trim();
  const m = forste.match(/^Jeg (\S+)(.*)$/);
  if (!m) return `Flott! ${forste}.`;
  const resten = m[2]
    .replace(/\bmin\b/g, 'sin').replace(/\bmitt\b/g, 'sitt').replace(/\bmine\b/g, 'sine')
    .replace(/\bmeg\b/g, 'seg').replace(/\bjeg\b/g, 'de');
  return `Jeg ser at mange ${m[1]}${resten}. Flott!`;
}
