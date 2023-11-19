<script lang="ts">
import "../app.postcss";
import { AppShell, LightSwitch, Toast, initializeStores } from '@skeletonlabs/skeleton';

initializeStores()
</script>

<Toast />

<AppShell> 
  <LightSwitch class="z-50 absolute m-4" />
  <slot />
</AppShell>
