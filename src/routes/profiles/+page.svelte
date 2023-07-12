<script>
	import { Icon, MagnifyingGlass, XMark } from 'svelte-hero-icons';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	export let data;
	let filter;
</script>

<div class="my-10 px-4">
	<div class="text-center text-6xl font-bold tracking-tight text-base-content">
		<div>Profiles</div>
	</div>
	<div class="text-center mt-1">Find content by person, division, or job title.</div>

	<div class="my-10">
		<div class="flex justify-center w-full max-w-lg mx-auto border border-primary rounded p-3">
			<div class="flex items-center gap-2 w-full">
				<Icon src={MagnifyingGlass} class=" text-primary w-5 h-5" />
				<!-- svelte-ignore a11y-autofocus -->
				<input
					type="text"
					placeholder="Search Pages, People, Divisions, and Content"
					class="w-full focus:outline-none bg-base-100"
					bind:value={filter}
					autofocus
				/>
			</div>

			{#if filter}
				<button class="focus:outline-none md:hover:scale-110" on:click={() => (filter = '')}>
					<Icon src={XMark} class="w-5 h-5" />
				</button>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
		{#each data.users as user}
			{#if !filter || user.name.toLowerCase().includes(filter.toLowerCase()) || user.job_title
					.toLowerCase()
					.includes(filter.toLowerCase()) || user.division
					.toLowerCase()
					.includes(filter.toLowerCase())}
				<ProfileCard {user} />
			{/if}
		{/each}
	</div>
</div>
