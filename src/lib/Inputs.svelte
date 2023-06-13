<script>
    import {
        places,
        position_liste_attente,
        candidats_liste_attente,
        position_liste_appel,
        position_liste_appel_dernier_candidat,
        position_liste_appel_dernier_candidat_annee_precedente,
        rougevertjaune,
        vertjaune,
        rouge,
        bleu,
        rose,
        bleu1,
        bleu2,
        orange1,
    } from "../stores.js";
    import Shepherd from "shepherd.js";
    import "shepherd.js/dist/css/shepherd.css";

    $: {
        // On déclare tout dans une même variable pour éviter que Svelte change l'ordre
        $rougevertjaune = $position_liste_appel_dernier_candidat;
        $vertjaune = $places;
        $rouge = $rougevertjaune - $vertjaune;
        // $: vert = 0; // inconnu
        // $: jaune = 0; // inconnu
        $bleu = $candidats_liste_attente;
        $rose = 1;
        $bleu1 = $position_liste_attente - $rose; // devant vous
        $bleu2 = $bleu - $bleu1 - $rose; // derrière vous
        // $: orange = 0; // inconnu
        $orange1 = $position_liste_appel - $rougevertjaune - $bleu1 - $rose;
        // $: orange2 = 0; // inconnu
    }

    let appel_tour_1, appel_tour_2, appel_tour_3, appel_tour_4;

    function startAppelTour() {
        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                classes: "shadow-md bg-purple-dark",
                scrollTo: true,
            },
        });
        const PREVIOUS = {
            text: "Précédent",
            action: tour.back,
        };
        const NEXT = {
            text: "Suivant",
            action: tour.next,
        };
        const END = {
            text: "Terminer",
            action: tour.complete,
        };
        tour.addStep({
            text: appel_tour_1,
            buttons: [NEXT],
        });
        tour.addStep({
            text: appel_tour_2,
            attachTo: {
                element: ".zone1",
                on: "bottom",
            },
            buttons: [PREVIOUS, NEXT],
        });
        tour.addStep({
            text: appel_tour_3,
            attachTo: {
                element: ".zone2",
                on: "bottom",
            },
            buttons: [PREVIOUS, NEXT],
        });
        tour.addStep({
            text: appel_tour_4,
            buttons: [PREVIOUS, END],
        });
        tour.start();
    }

    function startAttenteTour() {
        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                classes: "shadow-md bg-purple-dark",
                scrollTo: true,
            },
        });
        const PREVIOUS = {
            text: "Précédent",
            action: tour.back,
        };
        const NEXT = {
            text: "Suivant",
            action: tour.next,
        };
        const END = {
            text: "Terminer",
            action: tour.complete,
        };
        tour.addStep({
            text: `
                La formation a classé chaque candidature selon ses critères.<br />
                Les personnes qui n'ont pas encore reçu de proposition d'admission sont placées en liste d'attente.<br />
                Votre position dans cette liste d'attente va diminuer au fur et à mesure que des personnes placées
                devant vous vont recevoir des propositions d'admission ou abandonner leur place en liste d'attente.`,
            buttons: [NEXT],
        });
        tour.addStep({
            text: `Initialement, il y avait ${
                $position_liste_appel - 1
            } personnes devant vous. Parmi ces personnes, il y en a :<br />
                <ul>
                    <li><strong>${$rouge} qui ont reçu une proposition d'admission mais l'ont refusé</strong></li>
                    <li><strong>${$vertjaune} qui ont reçu une proposition d'admission et l'ont soit accepté, soit pas encore accepté ou refusé</strong></li>
                    <li>${$orange1} qui ont abandonnés leur place en file d'attente</li>
                </ul>`,
            attachTo: {
                element: ".zone1",
                on: "bottom",
            },
            buttons: [PREVIOUS, NEXT],
        });
        tour.addStep({
            text: `Initialement, il y avait ${
                $position_liste_appel - 1
            } personnes devant vous. Parmi ces personnes, il y en a :<br />
                <ul>
                    <li>${$rouge} qui ont reçu une proposition d'admission mais l'ont refusé</li>
                    <li>${$vertjaune} qui ont reçu une proposition d'admission et l'ont soit accepté, soit pas encore accepté ou refusé</li>
                    <li><strong>${$orange1} qui ont abandonnés leur place en file d'attente</strong></li>
                </ul>`,
            attachTo: {
                element: ".zone2",
                on: "bottom",
            },
            buttons: [PREVIOUS, NEXT],
        });
        tour.addStep({
            text: `${
                $position_liste_appel - 1
            } - ${$rouge} - ${$vertjaune} - ${$orange1} = ${$bleu1}<br />
                Il y a donc ${$bleu1} personnes devant vous et vous êtes donc ${$position_liste_attente}ème sur la liste d'attente.`,
            buttons: [PREVIOUS, END],
        });
        tour.start();
    }
</script>

Nombre de places dans la formation : <input
    type="number"
    bind:value={$places}
    min="0"
/><br />

Votre position dans la liste d'attente :
<input type="number" bind:value={$position_liste_attente} min="0" /><br />
Nombre total de candidats dans la liste d'attente :
<input type="number" bind:value={$candidats_liste_attente} min="0" />
<a href="#" on:click={startAttenteTour}>(?)</a><br />

Votre position dans la liste d'appel de la formation :
<input type="number" bind:value={$position_liste_appel} min="0" />
<a href="#" on:click={startAppelTour}>(?)</a><br />
Position dans la liste d'appel du dernier candidat qui a reçu une proposition d’admission
:
<input
    type="number"
    bind:value={$position_liste_appel_dernier_candidat}
    min="0"
/><br />

<div style:display="none">
    <div bind:this={appel_tour_1}>
        La formation a classé chaque candidature selon ses critères.<br />
        Votre position dans ce classement correspond à votre rang dans la liste d'appel.<br
        />
        Cette position est fixe et ne changera pas.
    </div>
    <div bind:this={appel_tour_2}>
        Il y a devant vous :
        <ul>
            <li>
                <strong>
                    {$rouge} Personnes ayant reçu une proposition d'admission mais
                    l'ayant refusé
                </strong>
            </li>
            <li>
                <strong>
                    {$vertjaune} Personnes ayant reçu une proposition d'admission
                    et l'ayant soit accepté, soit pas encore accepté ou refusé
                </strong>
            </li>
            <li>{$bleu1} Personnes en liste d'attente devant vous</li>
            <li>
                {$orange1} Personnes qui ont abandonnés leur place en file d'attente
                et qui étaient devant vous
            </li>
        </ul>
    </div>
    <div bind:this={appel_tour_3}>
        Il y a devant vous :
        <ul>
            <li>
                {$rouge} Personnes ayant reçu une proposition d'admission mais l'ayant
                refusé
            </li>
            <li>
                {$vertjaune} Personnes ayant reçu une proposition d'admission et
                l'ayant soit accepté, soit pas encore accepté ou refusé
            </li>
            <li>
                <strong>
                    {$bleu1} Personnes en liste d'attente devant vous
                </strong>
            </li>
            <li>
                <strong>
                    {$orange1} Personnes qui ont abandonnés leur place en file d'attente
                    et qui étaient devant vous
                </strong>
            </li>
        </ul>
    </div>
    <div bind:this={appel_tour_4}>
        {$rouge} + {$vertjaune} + {$bleu1} + {$orange1} = {$position_liste_appel -
            1}<br />
        Il y a donc {$position_liste_appel - 1} personnes devant vous et vous êtes
        donc {$position_liste_appel}ème sur la liste d'appel.
    </div>
</div>

Position dans la liste d'appel du dernier candidat qui a reçu une proposition
d’admission en 2022 :
<input
    type="number"
    bind:value={$position_liste_appel_dernier_candidat_annee_precedente}
    min="0"
/><br />
