<script>
    import Stickman from "./Stickman.svelte";
    export let colors = ["red", "green"];
    export let size = 50;
</script>

<div class="main">
    {#each colors as color, i}
    <div style="height:{size}px;clip-path: polygon(0% {Math.round(i/colors.length*100)}%, 100% {Math.round(i/colors.length*100)}%, 100% {Math.round((i+1)/colors.length*100)}%, 0% {Math.round((i+1)/colors.length*100)}%);"><Stickman {color} {size} /></div>
    {/each}
    <div style="visibility: hidden;position: static;">
        <Stickman {size} />
    </div>
</div>

<style>
    .main {
        position: relative;
        top: 0px;
        left: 0px;
        display: inline-block;
    }
    div.main > div {
        position: absolute;
        top: 0px;
        left: 0px;
    }
</style>
