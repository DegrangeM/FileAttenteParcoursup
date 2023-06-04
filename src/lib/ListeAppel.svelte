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
        orange1 = $position_liste_appel - rougevertjaune - bleu1 - rose;
        // $: orange2 = 0; // inconnu
        zone1 = [
            ...new Array(
                rouge <= 10 ? rouge : 10 + Math.round(Math.log2(rouge - 10 + 1))
            ).fill("red"),
            ...new Array(
                vertjaune <= 10
                    ? vertjaune
                    : 10 + Math.round(Math.log2(vertjaune - 10 + 1))
            ).fill("vertjaune"),
        ];
        zone1.sort(() => Math.random() - 0.5);
        if (rouge > 10 || vertjaune > 10) {
            zone1.splice(Math.round(zone1.length / 2), 0, "[...]");
        }
        console.log(zone1);
        zone2 = [
            ...new Array(
                bleu1 <= 10 ? bleu1 : 10 + Math.round(Math.log2(bleu1 - 10 + 1))
            ).fill("blue"),
            ...new Array(
                orange1 <= 10
                    ? orange1
                    : 10 + Math.round(Math.log2(orange1 - 10 + 1))
            ).fill("orange"),
        ];
        zone2.sort(() => Math.random() - 0.5);
        if (bleu1 > 10 || orange1 > 10) {
            zone2.splice(Math.round(zone2.length / 2), 0, "[...]");
        }
        zone3 = [
            ...new Array(
                bleu2 <= 10 ? bleu2 : 10 + Math.round(Math.log2(bleu2 - 10 + 1))
            ).fill("blue"),
            ...new Array(3).fill("orange"),
        ];
        zone3.sort(() => Math.random() - 0.5);
        zone3.splice(Math.round(zone3.length / 2), 0, "[...]"); // On ne connait pas le orange, on met donc toujours un [...]
    }
</script>

<div id="grille">
    <div class="zone1">
        <div class="decompte">
            <div class="nombre">{rouge} ×</div>
            <div class="stickman"><Stickman color="red" size={32} /></div>
            <div class="description">
                Personne ayant reçu une proposition d'admission mais l'ayant
                refusé<br />
            </div>
        </div>
        <div class="decompte">
            <div class="nombre">
                {vertjaune} ×
            </div>
            <div class="stickman">
                <MultiStickman colors={["green", "yellow"]} size={32} />
            </div>
            <div class="description">
                Personne ayant reçu une proposition d'admission et l'ayant soit
                accepté, soit pas encore accepté ou refusé
            </div>
        </div>
        <div>
            {#each zone1 as p}
                {#if p === "vertjaune"}
                    <MultiStickman colors={["green", "yellow"]} />
                {:else}
                    <div><Stickman color={p} /></div>
                {/if}
            {/each}
        </div>
    </div>
    <div class="zone2">
        <div class="decompte">
            <div class="nombre">{bleu1} ×</div>
            <div class="stickman">
                <Stickman color="blue" size={32} />
            </div>
            <div class="description">
                Personne en liste d'attente devant vous
            </div>
        </div>
        <div class="decompte">
            <div class="nombre">{orange1} ×</div>
            <div class="stickman"><Stickman color="orange" size={32} /></div>
            <div class="description">
                Personnes qui ont abandonné sa place en file d'attente et qui
                étaient devant vous
            </div>
        </div>
        <div>
            {#each zone2 as p}
                <div><Stickman color={p} /></div>
            {/each}
        </div>
    </div>
    <div style="flex: none;">
        <div class="decompte">
            <div class="nombre">{rose} ×</div>
            <div class="stickman"><Stickman color="pink" size={32} /></div>
            <div class="description">Vous</div>
        </div>
        <div>
            <div><Stickman color="pink" /></div>
        </div>
    </div>
    <div class="zone3">
        <div class="decompte">
            <div class="nombre">{bleu2} ×</div>
            <div class="stickman"><Stickman color="blue" size={32} /></div>
            <div class="description">
                personne en liste d'attente derrière vous
            </div>
        </div>
        <div class="decompte">
            <div class="nombre">? ×</div>
            <div class="stickman"><Stickman color="orange" size={32} /></div>
            <div class="description">
                personnes qui ont abandonné sa place en file d'attente et qui
                étaient derrière vous
            </div>
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
        padding: 0px 5px;
    }
    #grille > div > .decompte {
        display: flex;
        align-items: center;
        flex: 1;
    }
    #grille > div > .decompte > .nombre {
        min-width: 40px;
        text-align: center;
    }
    #grille > div > .decompte > .stickman {
        min-width: 25px;
        text-align: center;
    }
    #grille > div > div:last-of-type {
        flex: none;
        display: flex;
        justify-content: space-around;
    }
</style>
