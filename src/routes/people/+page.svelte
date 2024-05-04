<script>
	import { Icon, MagnifyingGlass, XMark, Users } from 'svelte-hero-icons';
	import PersonCard from '$lib/components/PersonCard.svelte';
	export let data;
	let filter;

	const getUserCount = () => {
		return data.users.length;
	};
</script>

<div class="px-4">
	<div class="mt-10 text-center text-7xl font-bold tracking-tight text-base-content">
		<div>People</div>
	</div>
	<div class="text-center my-5">
		<div class="flex justify-center items-center gap-2">
			<div class="">Displaying all <span class="font-bold">{getUserCount()}</span> users.</div>
			<div><Icon src={Users} class="w-7 h-7 text-purple-500" solid /></div>
		</div>
	</div>

	<div class="my-5">
		<div class="flex justify-center w-full max-w-lg mx-auto border border-neutral/10 rounded p-3">
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

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:my-10">
		{#each data.users as user}
			{#if !filter || user.name.toLowerCase().includes(filter.toLowerCase()) || user.job_title
					.toLowerCase()
					.includes(filter.toLowerCase()) || user.division
					.toLowerCase()
					.includes(filter.toLowerCase())}
				<PersonCard {user} />
			{/if}
		{/each}
	</div>
</div>
