<script lang="ts">
  import {getToastStore} from "@skeletonlabs/skeleton"
  import type {ToastSettings} from "@skeletonlabs/skeleton"
  import {collection, addDoc} from "firebase/firestore"
  import {db} from "./../firebase/db.js"

  const toastStore = getToastStore()

const toastMessage = (message: string) => {
    const toast: ToastSettings = {
    message: message,
    hideDismiss: true,
    background: "border border-secondary-500"
    }
    toastStore.trigger(toast)
  }

let disabled = false

const sendRat = async () => {
  try {
  await addDoc(collection(db, "rats"), {
    user: "mpu",
    sentAt: new Date().getTime()
  })
  } catch (err) {
    disabled = false
    console.log(err)
  }
}


</script>

<main class="absolute inset-0 flex flex-col justify-center items-center gap-12 select-none">
  <img src="https://i.ibb.co/yPQ4fbG/xdd.png" alt="xdd" class="w-80" />
  <button disabled={disabled} on:click={() => {disabled = true; toastMessage("You sent a rat!"); sendRat()}} class="rounded-md border border-secondary-500 w-80 p-3 text-2xl font-bold">{disabled ? "You can rat in XX:XX:XX" : "Send your rat"}</button>
</main>
