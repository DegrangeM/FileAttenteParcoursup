<script>
import MultiStickman from './lib/MultiStickman.svelte';
import Stickman from './lib/Stickman.svelte'
  // import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'
  
  let places = 20;
  let position_liste_attente = 10;
  let candidats_liste_attente = 21;
  let position_liste_appel = 51;
  let position_liste_appel_dernier_candidat = 30;
  let position_liste_appel_dernier_candidat_annee_precedente = 15;

// 10R 5V 15J 10B1 10O1 1R 10B2 10O2

  let rougevertjaune = 0, vertjaune = 0, rouge = 0, bleu = 0, bleu1 = 0, rose = 0, bleu2 = 0, orange1 = 0;
  let zone1, zone2, zone3;

  $: { // On déclare tout dans une même variable pour éviter que Svelte change l'ordre
    rougevertjaune = position_liste_appel_dernier_candidat;
    vertjaune = places;
    rouge = rougevertjaune - vertjaune;
    // $: vert = 0; // inconnu
    // $: jaune = 0; // inconnu
    bleu = candidats_liste_attente;
    rose = 1;
    bleu1 = position_liste_attente - rose; // devant vous
    bleu2 = bleu - bleu1 - rose; // derrière vous
    // $: orange = 0; // inconnu
    orange1 = position_liste_appel - rougevertjaune - bleu1;
    // $: orange2 = 0; // inconnu

    zone1 = [... new Array(rouge).fill('red'), ... new Array(vertjaune).fill('vertjaune')];
    zone1.sort(() => Math.random() - 0.5);
    zone2 = [... new Array(bleu1).fill('blue'), ... new Array(orange1).fill('orange')];
    zone2.sort(() => Math.random() - 0.5);
    zone3 = [... new Array(bleu2).fill('blue'), ... new Array(3).fill('orange')];
    zone3.sort(() => Math.random() - 0.5);

    console.log(zone1, zone2, zone3)
  }
</script>

<main>
Nombre de places dans la formation : 	<input type=number bind:value={places} min=0 /><br />

Votre position dans la liste d'attente : 	  <input type=number bind:value={position_liste_attente} min=0 /><br />
Nombre total de candidats dans la liste d'attente : <input type=number bind:value={candidats_liste_attente} min=0 /><br />

Votre position dans la liste d'appel de la formation : <input type=number bind:value={position_liste_appel} min=0 /> <br />
Position dans la liste d'appel du dernier candidat qui a reçu une proposition d’admission : <input type=number bind:value={position_liste_appel_dernier_candidat} min=0 /><br />

Position dans la liste d'appel du dernier candidat qui a reçu une proposition d’admission en 2022 : <input type=number bind:value={position_liste_appel_dernier_candidat_annee_precedente} min=0 /><br />

<Stickman color="red" /> Personne ayant reçu une proposition d'admission mais l'ayant refusé <br />
<Stickman color="green" /> Personne ayant reçu une proposition d'admission et l'ayant accepté<br />
<Stickman color="yellow" /> Personne ayant reçu une proposition d'admission et ne l'ayant pas encore accepté ou refusé<br />
<Stickman color="blue" /> Personne en liste d'attente<br />
<Stickman color="orange" /> Personne qui a abandonné sa place en file d'attente<br />
<Stickman color="pink" /> Vous<br />

  <Stickman color="green" />
  <Stickman color="red" />
  <Stickman color="green" />
  <Stickman color="red" />

  Il y a {position_liste_appel_dernier_candidat} personnes ayant reçu une proposition
  d'admission. Certaines de ces personnes l'ont <Stickman
    color="green"
    size={32}
  /> acceptés et d'autres l'ont <Stickman color="red" size={32} /> refusées.
  <br />

  <div id="grille">
    <div>
      <div>
        {rouge} X <Stickman color="red" /> Personne ayant reçu une proposition d'admission mais l'ayant refusé<br />
      </div>
      <div>
        {vertjaune} X <MultiStickman colors={['green', 'yellow']} /> Personne ayant reçu une proposition d'admission et l'ayant soit accepté, soit pas encore accepté ou refusé
      </div>
    </div>
    <div>
      <div>
        {bleu1} X <Stickman color="blue" /> Personne en liste d'attente devant vous<br />
      </div>
      <div>
        {orange1} X <Stickman color="orange" /> Personnes qui a abandonné sa place en file d'attente et qui était devant vous<br />
      </div>
    </div>
    <div style="flex: none;">
      <div>
        {rose} X <Stickman color="pink" /> Vous<br />
      </div>
    </div>
    <div>
      <div>
        {bleu2} X <Stickman color="blue" /> Personne en liste d'attente derrière vous<br /><br />
      </div>
      <div>
        ? X <Stickman color="orange" /> Personnes qui a abandonné sa place en file d'attente et qui était derrière vous<br />
      </div>
    </div>
  </div>

  <style>
    #grille {
      display: flex;
      align-items: center;
    }
    #grille > div {
      flex: 1;
    }
    #grille > div > div {
      display: flex;
      align-items: center;
    }
  </style>

{#each zone1 as p}
  {#if p == 'vertjaune'}
    <MultiStickman colors={['green', 'yellow']} />
  {:else}
    <Stickman color={p} />
  {/if}
{/each}{#each zone2 as p}
  <Stickman color={p} />
{/each}<Stickman color="pink" />{#each zone3 as p}
<Stickman color={p} />
{/each}
<br />
zzzz
<br />

{#if rouge >= 0 && vertjaune >= 0 && bleu1 >= 0 && orange1 >= 0 && rose >= 0 && bleu2 >= 0}
  {#each Array(Math.round(Math.log2(1+rouge))) as _}
  <Stickman color="red" />
  {/each}{#each Array(Math.round(Math.log2(1+vertjaune))) as _}
  <MultiStickman colors={['green', 'yellow']} />
  {/each}{#each Array(Math.round(Math.log2(1+bleu1))) as _}
  <Stickman color="blue" />
  {/each}{#each Array(Math.round(Math.log2(1+orange1))) as _}
  <Stickman color="orange" />
  {/each}{#each Array(rose) as _}
  <Stickman color="pink" />
  {/each}{#each Array(Math.round(Math.log2(bleu2))) as _}
  <Stickman color="blue" />
  {/each}
{/if}
</main>
