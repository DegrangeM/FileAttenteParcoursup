<script>
    import Stickman from "./Stickman.svelte";
    import MultiStickman from "./MultiStickman.svelte";

    import {
    places,
    position_liste_attente,
    candidats_liste_attente,
    position_liste_appel,
    position_liste_appel_dernier_candidat,
    position_liste_appel_dernier_candidat_annee_precedente,
  } from "../stores.js";


  let rougevertjaune = 0,
    vertjaune = 0,
    rouge = 0,
    bleu = 0,
    bleu1 = 0,
    rose = 0,
    bleu2 = 0,
    orange1 = 0;
  let zone1, zone2, zone3;

  $: {
    // On déclare tout dans une même variable pour éviter que Svelte change l'ordre
    rougevertjaune = $position_liste_appel_dernier_candidat;
    vertjaune = $places;
    rouge = rougevertjaune - vertjaune;
    // $: vert = 0; // inconnu
    // $: jaune = 0; // inconnu
    bleu = $candidats_liste_attente;
    rose = 1;
    bleu1 = $position_liste_attente - rose; // devant vous
    bleu2 = bleu - bleu1 - rose; // derrière vous
    // $: orange = 0; // inconnu
    orange1 = $position_liste_appel - rougevertjaune - bleu1;
    // $: orange2 = 0; // inconnu

    zone1 = [
      ...new Array(rouge).fill("red"),
      ...new Array(vertjaune).fill("vertjaune"),
    ];
    zone1.sort(() => Math.random() - 0.5);
    zone2 = [
      ...new Array(bleu1).fill("blue"),
      ...new Array(orange1).fill("orange"),
    ];
    zone2.sort(() => Math.random() - 0.5);
    zone3 = [...new Array(bleu2).fill("blue"), ...new Array(3).fill("orange")];
    zone3.sort(() => Math.random() - 0.5);

    console.log(zone1, zone2, zone3);
  }
</script>
<div id="grille">
    <div class="zone1">
      <div>
        {rouge} X <Stickman color="red" /> Personne ayant reçu une proposition d'admission
        mais l'ayant refusé<br />
      </div>
      <div>
        {vertjaune} X <MultiStickman colors={["green", "yellow"]} /> Personne ayant
        reçu une proposition d'admission et l'ayant soit accepté, soit pas encore
        accepté ou refusé
      </div>
      <div>
        {#each zone1 as p}
          {#if p == "vertjaune"}
            <MultiStickman colors={["green", "yellow"]} />
          {:else}
            <Stickman color={p} />
          {/if}
        {/each}
      </div>
    </div>
    <div class="zone2">
      <div>
        {bleu1} X <Stickman color="blue" /> Personne en liste d'attente devant vous<br
        />
      </div>
      <div>
        {orange1} X <Stickman color="orange" /> Personnes qui a abandonné sa place
        en file d'attente et qui était devant vous<br />
      </div>
      <div>
        {#each zone2 as p}
          <Stickman color={p} />
        {/each}
      </div>
    </div>
    <div style="flex: none;">
      <div>
        {rose} X <Stickman color="pink" /> Vous<br />
      </div>
      <div>
        <Stickman color="pink" />
      </div>
    </div>
    <div class="zone3">
      <div>
        {bleu2} X <Stickman color="blue" /> Personne en liste d'attente derrière
        vous<br /><br />
      </div>
      <div>
        ? X <Stickman color="orange" /> Personnes qui a abandonné sa place en file
        d'attente et qui était derrière vous<br />
      </div>
      <div>
        {#each zone3 as p}
          <Stickman color={p} />
        {/each}
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
      display: flex;
    }
    #grille > div > div {
      display: flex;
      align-items: center;
    }
  </style>