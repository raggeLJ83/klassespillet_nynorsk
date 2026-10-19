// Rettleiingen. Tallene og påstandene er hentet fra forskningsgrunnlag.md,
// og tall fra studiene står alltid sammen med kilde og forbehold.

import { BIBLIOTEK } from './regler.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// Kildene i forskningsgrunnlag.md, med lenke til fulltekst. KILDER er de to artiklene
// tallene er hentet fra. OMTALTE er studier som bare er gjengitt i dem.
const KILDER = [
  ['Stangjordet, P., Isaksen, J. og Strømgren, B. (2026). Effektforskjeller mellom Caught Being Good Game, Good Behavior Board Game og en modifisert versjon av Good Behavior Board Game på elever i grunnskolen.',
    'Norsk Tidsskrift for Atferdsanalyse', '53, 43–57.', 'https://nta.atferd.no/getFile.ashx?IdFile=3100'],
  ['Isaksen, J., Stangjordet, P., Johannessen, T. M., Majkic, K., Ottersen, K. O. og Viken, K. (2026). Hvilken effekt har Caught Being Good Game og Good Behavior Board Game på forstyrrende atferd og arbeidsro på sjette trinn i barneskolen?',
    'Norsk Tidsskrift for Atferdsanalyse', '53, 31–42.', 'https://nta.atferd.no/getFile.ashx?IdFile=3099'],
];

const OMTALTE = [
  ['Viken, K., Johannessen, T. M., Fredheim, O. R., Vorum, I., Ottersen, K.-O. og Isaksen, J. (2024). Hvilken effekt har Caught Being Good Game på forstyrrende atferd i klasserommet?',
    'Norsk Tidsskrift for Atferdsanalyse', '51, 205–222.', 'https://nta.atferd.no/getFile.ashx?IdFile=2920'],
  ['Strømgren, B. og Sørheim, D. G. (2015). Evaluering av the Good Behavior Board Game, en variant av the Good Behavior Game.',
    'Norsk Tidsskrift for Atferdsanalyse', '42, 1–19.', 'https://nta.atferd.no/getFile.ashx?IdFile=1270'],
  ['Berge, V. R. og Ødegård, E. P. (2024). Good Behavior Game med elementer fra PAX: Et tilpasset klasseromstiltak.',
    'Norsk Tidsskrift for Atferdsanalyse', '51, 57–69.', 'https://nta.atferd.no/getFile.ashx?IdFile=2910'],
  ['Barrish, H. H., Saunders, M. og Wolf, M. M. (1969). Good Behavior Game: Effects of individual contingencies for group consequences on disruptive behavior in a classroom.',
    'Journal of Applied Behavior Analysis', '2, 119–124.', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1311049/'],
  ['Cipani, E. (2010). The Class-wide Good Behavior Board Game.', 'ERIC', 'ED512078.', 'https://files.eric.ed.gov/fulltext/ED512078.pdf'],
  ['Ford, W. B., Radley, K. C., Tingstrom, D. H. og Dufrene, B. A. (2020). Efficacy of a no-team version of the Good Behavior Game in high school classrooms.',
    'Journal of Positive Behavior Interventions', '22(3), 181–190.', 'https://doi.org/10.1177/1098300719890059'],
  ['Bowman-Perrott, L., Burke, M. D., Zaini, S., Zhang, N. og Vannest, K. (2016). Promoting positive behavior using the Good Behavior Game: A meta-analysis of single-case research.',
    'Journal of Positive Behavior Interventions', '18(3), 180–190.', 'https://doi.org/10.1177/1098300715592355'],
  ['Kellam, S. G., Mackenzie, A. C., Brown, C. H., Poduska, J. M., Wang, W., Petras, H. og Wilcox, H. C. (2011). The Good Behavior Game and the future of prevention and treatment.',
    'Addiction Science & Clinical Practice', '6(1), 73–84.', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3188824/'],
  ['Kellam, S. G., Wang, W., Mackenzie, A. C. L., Brown, C. H., Ompad, D. C., Or, F., Ialongo, N. S., Poduska, J. M. og Windham, A. (2014). The impact of the Good Behavior Game, a universal classroom-based preventive intervention in first and second grades, on high-risk sexual behaviors and drug abuse and dependence disorders into young adulthood.',
    'Prevention Science', '15(1), 6–18.', 'https://doi.org/10.1007/s11121-012-0296-z'],
];

const kilde = ([ref, tidsskrift, rest, url]) =>
  `<li>${esc(ref)} <cite>${esc(tidsskrift)}</cite>, ${esc(rest)} <a href="${url}" target="_blank" rel="noopener">Les artikkelen</a></li>`;

export const AVSNITT = [
  ['for-start', 'Før første økt'],
  ['spille', 'Slik spelar du'],
  ['registrere', 'Slik registrerer du brot'],
  ['rose', 'Ros det som går bra'],
  ['valg', 'Klassens val'],
  ['regler', 'Reglane og kva som er brot'],
  ['forskning', 'Kva forskinga viser'],
  ['personvern', 'Personvern'],
];

function regelsett(liste) {
  return liste.map((rs) => `
    <div class="veil-regelsett">
      <h3>${esc(rs.navn)}</h3>
      ${rs.merknad ? `<p class="hjelp">${esc(rs.merknad)}</p>` : ''}
      <ol>${rs.regler.map((r) => `
        <li><strong>${esc(r.tekst)}</strong>
          <span class="veil-brudd">${r.brudd ? `Brot: ${esc(r.brudd)}` : 'Ingen definisjon enno. Skriv han i oppsettet.'}</span></li>`).join('')}
      </ol>
    </div>`).join('');
}

// klasse kan være null før første oppsett. Da vises regelbiblioteket.
export function veiledning(klasse) {
  const sett = klasse?.regelsett.length
    ? klasse.regelsett.map((rs) => ({ ...rs, merknad: BIBLIOTEK.find((b) => b.mal === rs.mal)?.merknad }))
    : BIBLIOTEK;

  return `
    <main class="veiledning">
      <header class="veil-topp">
        <h1>Lærarrettleiing</h1>
        <p class="skjema-ingress">Klassespillet byggjer på Good Behavior Game. Klassen spelar saman om å følgje tre reglar i ei økt med valfri lengd.
          Når de klarer målet, trekkjer de eit lodd frå klassens val.</p>
        <div class="hjem-knapper">
          <button class="knapp knapp-stille" id="vis-opplaering">Kort gjennomgang</button>
          <button class="knapp knapp-stille" id="til-elev">Elevrettleiing til tavla</button>
        </div>
      </header>

      <nav class="veil-innhold" aria-label="Innhold">
        <ol>${AVSNITT.map(([id, navn]) => `<li><a href="#${id}">${navn}</a></li>`).join('')}</ol>
      </nav>

      <div class="veil-tekst">
        <section id="for-start">
          <h2>Før første økt</h2>
          <ol class="veil-steg">
            <li><strong>Kartlegg klassen.</strong> Tel brot i ti minutt med vanleg undervisning, utan spel, på tre til fem ulike dagar.
              I den eine norske studien trong halvparten av klassane som vart kartlagde, ikkje tiltaket. Kartlegginga hjelper deg å vurdere behovet i din klasse.</li>
            <li><strong>Vel reglar.</strong> Bruk eit ferdig regelsett eller lag eit eige. Tre reglar er nok. Fleire gjer det vanskelegare å registrere likt.</li>
            <li><strong>Samle forslag til klassens val.</strong> La elevane skrive forslag på lappar, og legg inn dei som passar.</li>
            <li><strong>Gå gjennom reglane med døme.</strong> Vis kva som er eit brot og kva som ikkje er det. Forklar kva som skal til for å vinne.</li>
          </ol>
          <p>Sjekklisten før kvar økt tek deg gjennom det viktigaste. Den blir lagra i loggen, så du seinare ser kva økter som var godt førebudd.</p>
        </section>

        <section id="spille">
          <h2>Slik spelar du</h2>
          <div class="anim-plass"></div>
          <p>Du vel sjølv kor lenge økta skal vare. Spelet tel eitt minutt om gongen. Start når klassen har kome til ro.
            Forskinga fann ingen tydeleg skilnad mellom spelformene. Vel den du klarer å gjennomføre medan du underviser.</p>
          <div class="veil-varianter">
            <div>
              <h3>Fjelltur</h3>
              <p>Heile klassen er eitt lag. Brikken går eitt felt for kvart minutt utan brot. Klassen ser ikkje når du registrerer eit brot,
                berre at brikken blir ståande. Kjem brikken til målfeltet du har valt i oppsettet, har klassen vunne. I studiane var målet felt 7.</p>
              <p class="hjelp">Lettast å gjennomføre åleine. Tilrådd å starte med.</p>
            </div>
            <div>
              <h3>Skodde</h3>
              <p>Heile klassen er eitt lag. Kvart brot tel, og klassen ser teljinga. For kvart brot driv ein sky inn over fjellet,
                og ved grensa ligg toppen i skodde. Samstundes står «Hugs reglane» på tavla, utan at nokon blir peika ut.
                Klassen vinn med færre brot enn grensa du har valt i oppsettet. I studiane var grensa 10.</p>
            </div>
            <div>
              <h3>Stjernehimmel</h3>
              <p>Klassen blir delt i to eller tre lag etter kvar elevane sit. Kvart lag har sitt eige stjernebilete på nattehimmelen,
                og får ein stjerne for kvart minutt utan brot på laget.
                Når minst eitt lag har 8 stjerner, trekkjer heile klassen.</p>
              <p class="hjelp">Krevjande åleine, fordi du må registrere brot på rett lag. To lag gir betre oversikt enn tre.</p>
            </div>
          </div>
          <p>Når de ikkje vinn, står det «Me prøver igjen neste gong». Sei det same sjølv, utan å leite etter skuldige.</p>
          <p>Effekten i studiane fall kvar gong spelet vart teke bort. Planlegg for jamleg bruk, ikkje for å trappe ned.</p>
        </section>

        <section id="registrere">
          <h2>Slik registrerer du brot</h2>
          <ul>
            <li>Registrer berre det som står i definisjonen av regelen. Er du usikker, lèt du det vere.</li>
            <li>Åtferd som varer, tel som nytt brot kvart 15. sekund. Det er slik brota vart talde i studiane.</li>
            <li>Sei aldri høgt kven som braut regelen. Appen lagrar det heller ikkje.</li>
            <li>Blir timen avbroten, avsluttar du økta. Den blir då ikkje lagra i loggen.</li>
          </ul>
          <h3>Fjernkontroll og tastatur</h3>
          <p>Ein presentasjonsfjernkontroll sender piltaster og Page Up og Page Down. Då kan du registrere frå kvar som helst i rommet.</p>
          <dl class="veil-taster">
            <div><dt><kbd>Mellomrom</kbd> <kbd>Pil ned</kbd> <kbd>Page Down</kbd></dt><dd>Brot. På stjernehimmelen: brot på lag 1</dd></div>
            <div><dt><kbd>Pil opp</kbd> <kbd>Page Up</kbd></dt><dd>Brot på lag 2 på stjernehimmelen</dd></div>
            <div><dt><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd></dt><dd>Brot på lag 1, 2 eller 3 på stjernehimmelen</dd></div>
            <div><dt><kbd>P</kbd></dt><dd>Pause og fortsett</dd></div>
            <div><dt><kbd>F</kbd></dt><dd>Fullskjerm av og på</dd></div>
            <div><dt><kbd>Esc</kbd></dt><dd>Avslutt, med stadfesting</dd></div>
          </dl>
          <p class="hjelp">Prikkane ved bruddknappen viser kvar mange brot du har registrert i minuttet som går føre seg. De er små, så klassen legg ikkje merke til dei.</p>
        </section>

        <section id="rose">
          <h2>Ros det som går bra</h2>
          <p>Spelet virker best når du samstundes legg merke til det klassen gjer rett, og sier det høgt.
            I de eldre norske studiane roste lærarane meir berre der de hadde fått opplæring i dette. Ein påminnelse åleine er altså ikkje nok.</p>
          <ul>
            <li><strong>Vær konkret.</strong> Sei kva du ser, knytt til ein regel: «No rekk mange opp handa.» Ikkje berre «Flott».</li>
            <li><strong>Ros klassen eller laget, ikkje enkeltelever.</strong> Då slepp ingen å stå fram.</li>
            <li><strong>Ros oftere enn du retter.</strong> Småting som ikkje er brot, treng ingen kommentar.</li>
            <li><strong>Ros rett etter.</strong> Jo nærare det skjer, jo tydeligere er koplinga.</li>
          </ul>
          <p>Slå på påminnelsen i oppsettet om du vil. Kvart andre minutt står det då ein liten, dempet tekst ved knappane dine, med ein setning du kan seie ut frå reglane. Sei den berre når den stemmer.</p>
        </section>

        <section id="valg">
          <h2>Klassens val</h2>
          <p>La elevane skrive forslag på lappar. Eit godt forslag er realistisk, tek rundt ti minutt og gjeld heile klassen.
            Når klassen vinn, trekkjer appen eitt av dei. Kven som trykker på Trekk, avgjør de i klasserommet, for døme med ispinner.</p>
          <p>Unngå fritak frå lekser, prøver eller vurdering. Det kobler ro til faglig innhold og gir spørsmål om likebehandling.
            Unngå òg mat og godteri, og alt som gir enkeltelever fordeler.</p>
          <p>Ønskene endrer seg. Appen minner deg på å samle nye forslag etter fire veker, og etter pauser på over to veker.</p>
        </section>

        <section id="regler">
          <h2>Reglane og kva som er brot</h2>
          <p>Definisjonane står berre her og i oppsettet, ikkje på tavla. Gå gjennom dei med klassen med døme før de spelar.</p>
          ${regelsett(sett)}
        </section>

        <section id="forskning">
          <h2>Kva forskinga viser</h2>
          <p>To norske studiar frå 2026 prøvde ut spelet i fire klassar på barnetrinnet. Brota gjekk ned med 84 til 96 prosent medan spelet pågikk,
            og det var ingen tydeleg skilnad mellom spelformene. I den eine studien svarte 80 prosent av elevane at det var roligere i klassen under spelet.</p>
          <p>Brota steg igjen kvar gong spelet vart teke bort. Etter tre månaders pause var nivået høgare enn før første runde.</p>
          <h3>Det forskinga ikkje gir svar på</h3>
          <ul>
            <li>Om spelet virker på ungdomstrinnet. Ingen av de norske studiane gjaldt det.</li>
            <li>Om lærarar klarer å gjennomføre spelet sjølv. I studiane vart det ledet av studenter.</li>
            <li>Effekt på karakterer, fravær eller kvar mykje elevane får gjort.</li>
            <li>Kvar lenge roen varer etter økta, og kvar ofte de bør spele.</li>
            <li>Effekt på skjermbruk og meldingar, og i gruppearbeid.</li>
            <li>Kvar mange brot som betyr at ein klasse treng spelet. Det vurderer du sjølv ut frå kartlegginga.</li>
          </ul>
          <p class="hjelp">Grunnlaget er fire klassar. Klassen på 6. trinn er med i begge artiklene, så de er ikkje to uavhengige bekreftelser.</p>
          <h3>Kilder</h3>
          <p class="hjelp">Tallene i rettleiinga er hentet frå desse to artiklene. Begge er gratis PDF-er frå Norsk Tidsskrift for Atferdsanalyse.</p>
          <ul class="veil-kilder">${KILDER.map(kilde).join('')}</ul>
          <h3>Studiar omtalt i artiklene</h3>
          <p class="hjelp">Desse studiane er gjengitt i de to artiklene over. Funnene om lærerens ros er frå Strømgren og Sørheim (2015) og Viken mfl. (2024).
            Langtidsstudiene til Kellam mfl. gjeld 1. og 2. trinn i USA og sier ikkje noko om kva spelet gir i norske klassar.</p>
          <ul class="veil-kilder">${OMTALTE.map(kilde).join('')}</ul>
        </section>

        <section id="personvern">
          <h2>Personvern</h2>
          <p>Appen lagrar klassenamn, reglar, innstillinger, klassens val og loggen over økter. Alt ligg berre i nettleseren på denne maskinen.
            Ingenting sendes noko sted, og det er ingen innlogging eller sporing.</p>
          <p>Skriv aldri elevnamn i appen. Appen registrerer ikkje kven som braut ein regel, og lagrar ikkje kven som er på hvilket lag.</p>
          <p>Tømmer du nettleserdataene, forsvinn loggen. Last ned CSV frå loggen om du vil ta vare på tala. Klassar slettes frå oppsettet.</p>
        </section>
      </div>
    </main>`;
}

// Elevrettleiingen vises på tavla når læreren introduserer spillet. Den er
// lik for alle klasser: reglene, målet og spillbrettet veler læreren, og
// hva som teller som brudd, går læreren gjennom muntlig med eksempler.
const ELEV_STEG = [
  ['Reglene', 'Læraren veler reglene vi skal følge. De står nederst på tavla hele tiden, så alle kan se dem.'],
  ['Ti minutt', 'Vi jobber som vanlig. Læraren følger med og holder telling.'],
  ['Målet', 'Før vi starter, forteller læreren hva som skal til for å klare det.'],
  ['Klassens val', 'Klarer vi det, trekker vi noe fra listen dere har laget. Alle får være med på det som blir trukket.'],
  ['Me prøver igjen', 'Klarer vi det ikke, prøver vi igjen neste gang. Ingen blir pekt ut, og ingen får skylda.'],
];

const ELEV_BRETT = [
  ['Fjelltur', 'Hele klassen er ett lag. For hvert minutt alle følger reglene, går brikken ett steg opp mot fjellet. Når brikken når flagget, har vi klart det.'],
  ['Skodde', 'Hele klassen er ett lag. Hver gang en regel blir brutt, driver en sky inn over fjellet. Er toppen fortsatt fri for skodde når tiden er ute, har vi klart det.'],
  ['Stjernehimmel', 'Klassen deles i lag. Hvert lag har sitt eget stjernebilde. For hvert minutt laget følger reglene, tennes en stjerne. Når ett lag har nok stjerner, har hele klassen klart det.'],
];

export function elevveiledning() {
  return `
    <main class="elev">
      <header class="elev-topp">
        <h1>Slik spelar me</h1>
        <button class="knapp knapp-stille" id="fullskjerm">Fullskjerm</button>
      </header>
      <div class="anim-plass"></div>
      <ol class="elev-steg">
        ${ELEV_STEG.map(([tittel, tekst]) => `<li><h2>${tittel}</h2><p>${tekst}</p></li>`).join('')}
      </ol>
      <h2 class="elev-under">Tre spillbrett</h2>
      <ul class="elev-brett">
        ${ELEV_BRETT.map(([tittel, tekst]) => `<li><h3>${tittel}</h3><p>${tekst}</p></li>`).join('')}
      </ul>
    </main>`;
}
