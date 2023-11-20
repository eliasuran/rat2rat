<script lang="ts">
  import { db } from "../firebase/db";
  import { onSnapshot, query, collection, limit } from "firebase/firestore";
  
  let rats: string[] = []

  const q = query(collection(db, "rats"), limit(20))
  onSnapshot(q, (snapshot) => {
    snapshot.forEach((doc) => {
      rats.push(doc.id)
    })
  })

</script>

<div class="fixed bottom-0 w-screen h-24">
  {#each rats as rat}
  <div class="rounded-md border border-secondary-500 w-20 p-2 font-bold">{rat} just ratted!</div>
  {/each}
</div>
