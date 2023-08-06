<script>
	import PersonCard from '$lib/components/PersonCard.svelte';

	export let data;

	// get userId of this page
	const userId = data.user.id;

	const getFollowers = () => {
		return data.users.filter((user) => user.following.includes(data.pageUser.id));
	};
</script>

<div>
	<div>{getFollowers().length} Following {data.pageUser.name}:</div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
	{#each getFollowers() as user}
		<PersonCard {user} />
	{/each}
</div>
