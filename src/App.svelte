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

{#if rouge >= 0 && vertjaune >= 0 && bleu1 >= 0 && orange1 >= 0 && rose >= 0 && bleu2 >= 0}
  {#each Array(rouge) as _}
  <Stickman color="red" />
  {/each}{#each Array(vertjaune) as _}
  <MultiStickman colors={['green', 'yellow']} />
  {/each}{#each Array(bleu1) as _}
  <Stickman color="blue" />
  {/each}{#each Array(orange1) as _}
  <Stickman color="orange" />
  {/each}{#each Array(rose) as _}
  <Stickman color="pink" />
  {/each}{#each Array(bleu2) as _}
  <Stickman color="blue" />
  {/each}
{/if}
</main>
