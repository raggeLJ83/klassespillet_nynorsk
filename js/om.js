// Om-vinduet: hva appen er, og hvem som har laget den.

export function visOm() {
  document.querySelector('.om')?.remove();
  const tilbakeFokus = document.activeElement;
  const dialog = document.createElement('dialog');
  dialog.className = 'dialog om';
  dialog.setAttribute('aria-labelledby', 'om-tittel');
  dialog.innerHTML = `
    <h2 id="om-tittel">Om Klassespillet</h2>
    <p>Klassespillet er eit digitalt brett for Good Behavior Game. Klassen spelar saman om å følgje tre reglar i ti minutt.
      Klarer de det, trekkjer de noko frå ein liste elevane sjølv har foreslått. Alt blir lagra berre i nettleseren på denne maskinen.</p>
    <div class="om-person">
      <img class="om-logo" src="ikoner/logo.png" alt="Lærarliv. Fra klasserom til storsamfunn." width="2560" height="1449" />
      <h3>Kenneth Bareksten</h3>
      <p>Lærar og hobbyprogrammerer som lager digitale verktøy for å gjere kvardagen litt enklare og meir kreativ.</p>
      <p><a href="https://www.laererliv.no" target="_blank" rel="noopener">www.laererliv.no</a><br />
        <a href="mailto:kenneth@laererliv.no">kenneth@laererliv.no</a></p>
    </div>
        <div class="om-tilpassing">
      <h3>Om denne utgåva</h3>
      <p>Dette er ei tilpassa nynorskutgåve av Klassespillet, utvikla av Kenneth Bareksten (Lærerliv).</p>
      <p><strong>Tilpassingar:</strong> Valfri speletid, nynorsk språk og seks ferdige stjernelodd, der eitt gir to stjerner.</p>
      <p><strong>Originalprosjekt:</strong>
        <a href="https://github.com/barx10/klassespillet" target="_blank" rel="noopener">Sjå kjeldekoden på GitHub</a>
      </p>
      <p>Originalkoden er publisert under MIT-lisensen.</p>
    </div>
  
    <form method="dialog" class="hjem-knapper">
      <button class="knapp knapp-hoved">Lukk</button>
    </form>`;
  document.body.append(dialog);
  dialog.addEventListener('close', () => {
    dialog.remove();
    if (tilbakeFokus?.isConnected) tilbakeFokus.focus();
  });
  dialog.showModal();
  dialog.querySelector('button').focus();
}
