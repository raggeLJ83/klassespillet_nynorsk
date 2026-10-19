// Kort gjennomgang for læreren. Åpnes fra startsiden før første klasse og
// fra lærerveiledningen. Detaljene står i veiledningen.

export const STEG = [
  ['Set opp klassen', `
    <p>Skriv klassenavnet, vel reglar og spelform, og legg inn forslaga elevane har til klassens val.
      Det gjer du éin gong per klasse. Seinare finn du det under «Endre oppsett».</p>
    <p class="hjelp">Skriv aldri elevnamn i appen.</p>`],
  ['Start ein økt', `
    <p>Trykk <strong>Start økt</strong> og gå gjennom sjekklista. Tavla viser landskapet og reglane, og økta varer i ti minutt.</p>
    <p class="hjelp">Vil du først sjå korleis klassen har det utan spel, trykker du «Kartlegg».</p>`],
  ['Registrer brot', `
    <p>Trykk <strong>Brot</strong> kvar gong nokon bryt ein regel. Med tastatur eller fjernkontroll brukar du mellomrom, pil ned eller Page Down.
      Sei aldri høgt kven det gjaldt.</p>
    <p class="hjelp"><kbd>P</kbd> set på pause. <kbd>Esc</kbd> avsluttar økta.</p>`],
  ['Trekk klassens val', `
    <p>Når klassen når målet, trykker ein elev på <strong>Trekk</strong>, og appen trekkjer eitt av forslaga.
      Klarer de det ikkje, står det «Me prøver igjen neste gong».</p>
    <p class="hjelp">Ros det som går bra undervegs. Rettleiinga forklarar korleis.</p>`],
];

// tilRettleiing kalles når læreren veler å lese mer. Dialogen lukkes først.
export function visOpplaering({ tilRettleiing } = {}) {
  document.querySelector('.opplaering')?.remove();
  const tilbakeFokus = document.activeElement;
  const dialog = document.createElement('dialog');
  dialog.className = 'dialog opplaering';
  dialog.setAttribute('aria-labelledby', 'opplaering-tittel');
  document.body.append(dialog);
  let steg = 0;

  function tegn() {
    const [tittel, tekst] = STEG[steg];
    const siste = steg === STEG.length - 1;
    dialog.innerHTML = `
      <p class="opplaering-steg">Steg ${steg + 1} av ${STEG.length}</p>
      <h2 id="opplaering-tittel">${tittel}</h2>
      <div class="opplaering-tekst">${tekst}</div>
      <div class="hjem-knapper">
        <button class="knapp knapp-hoved" id="opplaering-neste">${siste ? 'Kom i gong' : 'Neste'}</button>
        ${steg > 0 ? '<button class="knapp knapp-stille" id="opplaering-forrige">Førre</button>' : ''}
      </div>
      <div class="hjem-lenker">
        ${tilRettleiing ? '<button class="lenke" id="opplaering-veiledning">Les lærarrettleiinga</button>' : ''}
        ${siste ? '' : '<button class="lenke" id="opplaering-lukk">Hopp over</button>'}
      </div>`;
    dialog.querySelector('#opplaering-neste').onclick = () => {
      if (siste) return dialog.close();
      steg += 1;
      tegn();
    };
    dialog.querySelector('#opplaering-forrige')?.addEventListener('click', () => {
      steg -= 1;
      tegn();
    });
    dialog.querySelector('#opplaering-lukk')?.addEventListener('click', () => dialog.close());
    dialog.querySelector('#opplaering-veiledning')?.addEventListener('click', () => {
      dialog.close();
      tilRettleiing();
    });
    dialog.querySelector('#opplaering-neste').focus();
  }

  // Esc lukker dialogen av seg selv.
  dialog.addEventListener('close', () => {
    dialog.remove();
    if (tilbakeFokus?.isConnected) tilbakeFokus.focus();
  });
  tegn();
  dialog.showModal();
  dialog.querySelector('#opplaering-neste').focus();
}
