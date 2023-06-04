<script>
    import {
        places,
        position_liste_attente,
        candidats_liste_attente,
        position_liste_appel,
        position_liste_appel_dernier_candidat,
        position_liste_appel_dernier_candidat_annee_precedente,
    } from "../stores.js";
</script>

Nombre de places dans la formation : <input
    type="number"
    bind:value={$places}
    min="0"
/><br />

Votre position dans la liste d'attente :
<input type="number" bind:value={$position_liste_attente} min="0" /><br />
Nombre total de candidats dans la liste d'attente :
<input type="number" bind:value={$candidats_liste_attente} min="0" /><br />

Votre position dans la liste d'appel de la formation :
<input type="number" bind:value={$position_liste_appel} min="0" /> <br />
Position dans la liste d'appel du dernier candidat qui a reçu une proposition d’admission
:
<input
    type="number"
    bind:value={$position_liste_appel_dernier_candidat}
    min="0"
/><br />

Position dans la liste d'appel du dernier candidat qui a reçu une proposition
d’admission en 2022 :
<input
    type="number"
    bind:value={$position_liste_appel_dernier_candidat_annee_precedente}
    min="0"
/><br />
