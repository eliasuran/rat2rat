<script lang="ts">
import { GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import "../app.postcss";
import { AppShell, LightSwitch, Toast, initializeStores } from '@skeletonlabs/skeleton';
import { auth } from './../firebase/db';
import { Circle2 } from "svelte-loading-spinners"

let user: any = '2314124+4141425+8467+120'

onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user = currentUser.displayName
  } else {
    user = ''
  }
});

const githubSignIn = () => {
  signInWithPopup(auth, new GithubAuthProvider())
}

const logOut = async () => {
  await signOut(auth)
}

initializeStores()
</script>

<Toast />

<AppShell> 
  <div class="w-full flex justify-between z-50 absolute p-4">
    <LightSwitch />
  {#if user}
  <button class="rounded-md border border-secondary-500 w-20 p-2 font-bold" on:click={()=> {logOut()}}>Log Out</button>
  {:else}
  <button class="rounded-md border border-secondary-500 w-20 p-2 font-bold" on:click={()=> {githubSignIn()}}>Log In</button>
  {/if}
  </div>
  <slot />
</AppShell>
