<script>
  import Inputs from "./lib/Inputs.svelte";
  import Legende from "./lib/Legende.svelte";
  import ListeAppel from "./lib/ListeAppel.svelte";
  import MultiStickman from "./lib/MultiStickman.svelte";
  import Stickman from "./lib/Stickman.svelte";
  import {
    places,
    position_liste_attente,
    candidats_liste_attente,
    position_liste_appel,
    position_liste_appel_dernier_candidat,
    position_liste_appel_dernier_candidat_annee_precedente,
  } from "./stores.js";
</script>

<main>
  <Inputs />

  <Legende />

  Il y a {$position_liste_appel_dernier_candidat} personnes ayant reçu une proposition
  d'admission. Certaines de ces personnes l'ont <Stickman
    color="green"
    size={32}
  /> acceptés et d'autres l'ont <Stickman color="red" size={32} /> refusées.
  <br />

  <ListeAppel />

  <!--

  {#if rouge >= 0 && vertjaune >= 0 && bleu1 >= 0 && orange1 >= 0 && rose >= 0 && bleu2 >= 0}
  {#each Array(Math.round(Math.log2(1 + rouge))) as _}
  <Stickman color="red" />
  {/each}{#each Array(Math.round(Math.log2(1 + vertjaune))) as _}
  <MultiStickman colors={["green", "yellow"]} />
  {/each}{#each Array(Math.round(Math.log2(1 + bleu1))) as _}
      <Stickman color="blue" />
    {/each}{#each Array(Math.round(Math.log2(1 + orange1))) as _}
      <Stickman color="orange" />
      {/each}{#each Array(rose) as _}
      <Stickman color="pink" />
      {/each}{#each Array(Math.round(Math.log2(bleu2))) as _}
      <Stickman color="blue" />
      {/each}
      {/if}
    -->
</main>
