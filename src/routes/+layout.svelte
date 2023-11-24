<script lang="ts">
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import "../app.postcss";
import { AppShell, LightSwitch, Toast, initializeStores, popup, storePopup, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
import { auth } from './../lib/db';
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
import type { DrawerSettings, PopupSettings } from "@skeletonlabs/skeleton"
import type { PageData } from "./$types";
export let data: PageData

const ranking: any[] = data.data[0]
let recent: any[] = data.data[1]

initializeStores()

let user: any = '2314124+4141425+8467+120'

onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user = currentUser
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

const drawerStore = getDrawerStore()

const leaderboardDrawer: DrawerSettings = {
  id: "leaderboard",
  bgDrawer: "bg-gradient-to-tr dark:from-surface-900 from-surface-200 dark:to-secondary-900 to-secondary-300",
  width: 'sm:w-2/3 w-3/4'
}

const recentDrawer: DrawerSettings = {
  id: "recent",
  bgDrawer: "bg-gradient-to-tr dark:from-surface-900 from-surface-200 dark:to-secondary-900 to-secondary-300",
  width: 'sm:w-2/3 w-3/4'
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
<Drawer class="z-50">
  {#if $drawerStore.id === "leaderboard"}
  <div class="w-full h-full sm:p-12 p-10">
  <h1 class="text-4xl my-4">Leaderboard</h1>
  <div class="flex flex-col gap-4 w-full">
  {#each ranking as rank, index}
  <div class="flex items-center gap-4 font-bold text-xl">{index + 1}
  <div class="rounded-md border border-secondary-500 p-2 flex gap-1 w-full">{rank.displayName} - <span class="text-primary-500">{rank.ratsSent}</span></div>
  </div>
  {/each}
  </div>
  </div>
  {:else if $drawerStore.id === "recent"}
  <div class="w-full h-full sm:p-12 p-10">
    <h1 class="text-4xl my-4">Recent rats</h1>
  <div class="relative flex flex-col justify-end items-start gap-4 h-5/6 overflow-hidden">
  {#each recent as user}
  <div class="flex flex-col"><span class="text-secondary-500 my-2">{Math.floor((new Date().getTime() - user.sentAt)/60000)} min ago</span><div class="border border-secondary-500 rounded-md p-4">{user.displayName} ratted!</div></div>
  {/each}
  </div>
  </div>
  {/if}
</Drawer>

<AppShell> 
  <div class="w-full flex justify-between z-40 absolute p-4">
    <LightSwitch />
  {#if user}
  <div class="flex gap-4">
    <button class={`${styling} w-auto`} on:click={() => drawerStore.open(recentDrawer)}>Recent</button>
    <button class={`${styling} w-auto`} on:click={() => drawerStore.open(leaderboardDrawer)}>Leaderboard</button>
    <button class={styling} on:click={()=> {logOut()}}>Log Out</button>
  </div>
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
