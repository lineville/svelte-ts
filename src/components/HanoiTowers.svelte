<script lang="ts">
    import Tower from './Tower.svelte'
    import Stack from '../utils/Stack'
    let tower1 : Stack<number> = new Stack<number>([4, 3, 2, 1]);
    let tower2 : Stack<number> = new Stack<number>();
    let tower3 : Stack<number> = new Stack<number>();
    let towers : Array<Stack<number>> = [tower1, tower2, tower3]

    function solveTowers() {
        const len : number = tower1.items.length;
        return solveTowersRec(len, 1, 2, 3);
        
    }

    function solveTowersRec(len: number, source: number, dest: number, middle: number) {
        if (len == 1)  {
            console.log("Move disk 1 from rod " + source  + " to rod " + dest)
            // towers[dest].push(towers[source].pop());
            return; 
        } 
        
        // towers[dest].push(towers[source].pop());
        solveTowersRec(len - 1, source, middle, dest); 
        console.log("Move disk " + len + " source rod "  + source + " to rod " + dest); 
        solveTowersRec(len - 1, middle, dest, source); 
    }
</script>

<h3>
Tower of Hanoi
</h3>

<br />

<button class="uk-button uk-button-info" on:click={() => solveTowers()}>Solve Towers</button>

<br />

<div class="uk-column-1-3 uk-column-divider">
  <Tower value={tower1} index={1}/>
  <Tower value={tower2} index={2}/>
  <Tower value={tower3} index={3}/>
</div>

