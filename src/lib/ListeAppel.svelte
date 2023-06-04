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
        {rouge} × <Stickman color="red" size={32} /> Personne ayant reçu une proposition d'admission
        mais l'ayant refusé<br />
      </div>
      <div>
        {vertjaune} × <MultiStickman colors={["green", "yellow"]} size={32} /> Personne ayant
        reçu une proposition d'admission et l'ayant soit accepté, soit pas encore
        accepté ou refusé
      </div>
      <div>
        {#each zone1 as p}
          {#if p == "vertjaune"}
            <MultiStickman colors={["green", "yellow"]} />
          {:else}
            <div><Stickman color={p} /></div>
          {/if}
        {/each}
      </div>
    </div>
    <div class="zone2">
      <div>
        {bleu1} × <Stickman color="blue" size={32} /> Personne en liste d'attente devant vous<br
        />
      </div>
      <div>
        {orange1} × <Stickman color="orange" size={32} /> Personnes qui ont abandonné sa place
        en file d'attente et qui étaient devant vous<br />
      </div>
      <div>
        {#each zone2 as p}
        <div><Stickman color={p} /></div>
        {/each}
      </div>
    </div>
    <div style="flex: none;">
      <div>
        {rose} × <Stickman color="pink" size={32} /> Vous<br />
      </div>
      <div>
        <div><Stickman color="pink" /></div>
      </div>
    </div>
    <div class="zone3">
      <div>
        {bleu2} × <Stickman color="blue" size={32} /> personne en liste d'attente derrière
        vous<br /><br />
      </div>
      <div>
        ? × <Stickman color="orange" size={32} /> personnes qui ont abandonné sa place en file
        d'attente et qui étaient derrière vous<br />
      </div>
      <div>
        {#each zone3 as p}
          <div><Stickman color={p} /></div>
        {/each}
      </div>
    </div>
  </div>

  <style>
    #grille {
      display: flex;
      align-items: center;
      height: 200px;
    }
    #grille > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    #grille > div > div {
      display: flex;
      align-items: center;
      flex: 1;
    }
    #grille > div > div:last-of-type {
      flex: none;
      display: flex;
      justify-content: space-around;
    }
  </style>