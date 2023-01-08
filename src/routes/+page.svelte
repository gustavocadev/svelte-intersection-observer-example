<script lang="ts">
  import { inview } from 'svelte-inview';
  import type { ObserverEventDetails, Options } from 'svelte-inview';
  import { afterUpdate } from 'svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { getImages } from '../helpers/getImages';

  let counter = 10;

  const queryImages = createQuery({
    queryKey: ['images', counter],
    queryFn: () => getImages(counter),
    refetchOnWindowFocus: false,
  });

  const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
    if (detail.inView && $queryImages.data) {
      console.log('in View: ', detail.inView);
      counter += 10;
      console.log(counter);
      $queryImages.refetch();
    }
  };

  const options: Options = {
    threshold: 0,
  };

  let all_images: HTMLElement;

  afterUpdate(() => {
    // select the last tag of all_images in svelte
    const last_image = all_images.lastElementChild;

    if (!last_image) return;

    console.log(last_image);
    // add event listener to the last tag
    last_image.addEventListener('change', handleChange as any);
    // use inview
    inview(last_image as HTMLElement, options);
  });

  $: console.log($queryImages.data);
</script>

<main bind:this={all_images}>
  {#if $queryImages.isLoading}
    <h1>Loading...</h1>
  {:else if $queryImages.isError}
    <h1>Error</h1>
  {:else}
    {#each $queryImages?.data as image}
      <figure>
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          src={image.download_url}
          alt="random image"
          width="500"
          height="500"
        />
        <figcaption>Random image</figcaption>
      </figure>
    {/each}
  {/if}
</main>

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
