<script lang="ts">
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import "../app.postcss";
import { AppShell, LightSwitch, Toast, initializeStores, popup, storePopup } from '@skeletonlabs/skeleton';
import { auth } from './../firebase/db';
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
import type { PopupSettings } from "@skeletonlabs/skeleton"

initializeStores()

let user: any = '2314124+4141425+8467+120'

onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user = currentUser.displayName
  } else {
    user = ''
  }
});

storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

const popupClick: PopupSettings = {
  event: 'click',
  target: 'popupClick',
  placement: 'bottom',
  closeQuery: '#wont-close'
}

const githubSignIn = () => {
  signInWithPopup(auth, new GithubAuthProvider())
}

const googleSignIn = () => {
  signInWithPopup(auth, new GoogleAuthProvider())
}

const logOut = async () => {
  await signOut(auth)
}

const styling = "rounded-md border border-secondary-500 w-20 p-2 font-bold"
</script>

<svelte:head>
  <title>rat2rat</title>
</svelte:head>

<Toast />

<AppShell> 
  <div class="w-full flex justify-between z-50 absolute p-4">
    <LightSwitch />
  {#if user}
  <button class={styling} on:click={()=> {logOut()}}>Log Out</button>
  {:else}
  <button class={styling} use:popup={popupClick}>Log In</button>
  <div class="w-48 z-50" data-popup="popupClick">
    <div class="flex flex-col gap-2 mr-2">
    <button on:click={() => githubSignIn()} class={`${styling} w-full px-4`}>Log in with GitHub</button>
    <button on:click={() => googleSignIn()} class={`${styling} w-full px-4`}>Log in with Google</button>
    </div>
  </div>
  {/if}
  </div>
  <div>
  </div>
  <slot />
</AppShell>
