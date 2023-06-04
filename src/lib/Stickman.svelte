<script>
    import stickman from "../assets/stickman.svg";
    import stickmanElipsis from "../assets/stickman-elipsis.svg";

    export let size = 50;

    export let color = "red";

    const COLORS = {
        red: {
            hue: 0,
        },
        green: {
            hue: 120,
        },
        blue: {
            hue: 240,
        },
        orange: {
            hue: 30,
            brightness: 5,
        },
        yellow: {
            hue: 65,
            brightness: 3.25,
        },
        purple: {
            hue: 270,
        },
        pink: {
            hue: 300,
            brightness: 2,
        },
        "[...]": {},
    };

    let hue = COLORS[color].hue || 0;
    let brightness = COLORS[color].brightness || 1;

    // hue = Math.floor(Math.random()*360);
</script>

{#if color !== "[...]"}
    <img
        src={stickman}
        style:filter="hue-rotate({hue}deg) brightness({brightness})"
        alt=""
        height={size}
    />
{:else}
    <img src={stickmanElipsis} alt="" height={size} />
{/if}
