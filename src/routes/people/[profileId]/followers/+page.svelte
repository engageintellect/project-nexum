<script>
	import { Icon, MagnifyingGlass, XMark, CheckCircle, UserGroup } from 'svelte-hero-icons';
	import PersonCard from '$lib/components/PersonCard.svelte';
	export let data;
	let filter;

	const userId = data.user.id;

	const followerCount = () => {
		return data.users.filter((user) => user.following.includes(data.pageUser.id)).length;
	};

	const getFollowers = () => {
		return data.users.filter((user) => user.following.includes(data.pageUser.id));
	};
</script>

<div class="px-4">
	<div class="mt-10 text-center text-7xl font-bold tracking-tight text-base-content">
		<div>Followers</div>
	</div>
	<div class="text-center my-5">
		<div class="flex justify-center items-center gap-2">
			<div class="">
				<span class="font-bold">
					{followerCount()}
				</span>
				People following
				<span class="font-bold capitalize">{data.pageUser.name}</span>
			</div>
			<div><Icon src={UserGroup} class="w-7 h-7 text-purple-500" solid /></div>
		</div>
	</div>

	<div class="my-5">
		<div
			class="flex justify-center w-full max-w-lg mx-auto border border-neutral/10/25 rounded p-3"
		>
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

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:my-10">
		{#each getFollowers() as user}
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
