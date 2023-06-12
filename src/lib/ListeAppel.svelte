<script>
    import Stickman from "./Stickman.svelte";
    import MultiStickman from "./MultiStickman.svelte";

    import {
        vertjaune,
        rouge,
        bleu1,
        rose,
        bleu2,
        orange1
    } from "../stores.js";

    let zone1, zone2, zone3;

    $: {
        if($rouge>=0 && $vertjaune>=0 && $bleu1>=0 && $orange1>=0 && $rose>=0 && $bleu2>=0) {
            zone1 = [
                ...new Array(
                    $rouge <= 8 ? $rouge : 8 + Math.round(Math.log2($rouge - 8 + 1))
                ).fill("red"),
                ...new Array(
                    $vertjaune <= 8
                        ? $vertjaune
                        : 8 + Math.round(Math.log2($vertjaune - 8 + 1))
                ).fill("vertjaune"),
            ];
            zone1.sort(() => Math.random() - 0.5);
            if ($rouge > 8 || $vertjaune > 8) {
                zone1.splice(Math.round(zone1.length / 2), 0, "[...]");
            }
            zone2 = [
                ...new Array(
                    $bleu1 <= 8 ? $bleu1 : 8 + Math.round(Math.log2($bleu1 - 8 + 1))
                ).fill("blue"),
                ...new Array(
                    $orange1 <= 8
                        ? $orange1
                        : 8 + Math.round(Math.log2($orange1 - 8 + 1))
                ).fill("orange"),
            ];
            zone2.sort(() => Math.random() - 0.5);
            if ($bleu1 > 8 || $orange1 > 8) {
                zone2.splice(Math.round(zone2.length / 2), 0, "[...]");
            }
            zone3 = [
                ...new Array(
                    $bleu2 <= 8 ? $bleu2 : 8 + Math.round(Math.log2($bleu2 - 8 + 1))
                ).fill("blue"),
                ...new Array(3).fill("orange"),
            ];
            zone3.sort(() => Math.random() - 0.5);
            zone3.splice(Math.round(zone3.length / 2), 0, "[...]"); // On ne connait pas le orange, on met donc toujours un [...]
        } else {
            zone1 = ["[...]"];
            zone2 = ["[...]"];
            zone3 = ["[...]"];
        }
    }
</script>

<div id="grille">
    <div class="zone1">
        <div class="decompte">
            <div class="nombre">{$rouge} ×</div>
            <div class="stickman"><Stickman color="red" size={32} /></div>
            <div class="description">
                Personne ayant reçu une proposition d'admission mais l'ayant
                refusé<br />
            </div>
        </div>
        <div class="decompte">
            <div class="nombre">
                {$vertjaune} ×
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
            <div class="nombre">{$bleu1} ×</div>
            <div class="stickman">
                <Stickman color="blue" size={32} />
            </div>
            <div class="description">
                Personne en liste d'attente devant vous
            </div>
        </div>
        <div class="decompte">
            <div class="nombre">{$orange1} ×</div>
            <div class="stickman"><Stickman color="orange" size={32} /></div>
            <div class="description">
                Personne qui a abandonné sa place en file d'attente et qui
                était devant vous
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
            <div class="nombre">{$rose} ×</div>
            <div class="stickman"><Stickman color="pink" size={32} /></div>
            <div class="description">Vous</div>
        </div>
        <div>
            <div><Stickman color="pink" /></div>
        </div>
    </div>
    <div class="zone3">
        <div class="decompte">
            <div class="nombre">{$bleu2} ×</div>
            <div class="stickman"><Stickman color="blue" size={32} /></div>
            <div class="description">
                personne en liste d'attente derrière vous
            </div>
        </div>
        <div class="decompte">
            <div class="nombre">? ×</div>
            <div class="stickman"><Stickman color="orange" size={32} /></div>
            <div class="description">
                personne qui a abandonné sa place en file d'attente et qui
                était derrière vous
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
