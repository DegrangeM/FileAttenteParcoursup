<script>
    import Stickman from "./stickman.svelte";
</script>

<div id="legende">
    <div>
        <div>
            <Stickman color="red" size={32} />
        </div>
        <div>
            Personne ayant reçu une proposition d'admission mais l'ayant refusé
        </div>
    </div>
    <div>
        <div>
            <Stickman color="green" size={32} />
        </div>
        <div>
            Personne ayant reçu une proposition d'admission et l'ayant accepté
        </div>
    </div>
    <div>
        <div>
            <Stickman color="yellow" size={32} />
        </div>
        <div>
            Personne ayant reçu une proposition d'admission et ne l'ayant pas
            encore accepté ou refusé
        </div>
    </div>
    <div>
        <div>
            <Stickman color="blue" size={32} />
        </div>
        <div>Personne en liste d'attente</div>
    </div>
    <div>
        <div>
            <Stickman color="orange" size={32} />
        </div>
        <div>Personne qui a abandonné sa place en file d'attente</div>
    </div>
    <div>
        <div>
            <Stickman color="pink" size={32} />
        </div>
        <div>Vous</div>
    </div>
</div>

<style>
    #legende {
        display: flex;
    }
    #legende > div {
        display: flex;
        align-items: center;
        border: 1px solid black;
        font-style: italic;
    }
    #legende > div > div {
        text-align: center;
        padding: 5px;
    }
</style>
