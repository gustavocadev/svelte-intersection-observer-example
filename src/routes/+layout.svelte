<script lang="ts">
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';

  const queryClient = new QueryClient();
</script>

<h1>Welcome to your library project</h1>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
