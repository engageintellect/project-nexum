<script>
	import { Stats } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import { Icon, PencilSquare } from 'svelte-hero-icons';
	import { MyPageItem, DashboardHeader } from '$lib/components';
	export let data;

	const countMyFollowers = (users, currentUser) => {
		if (!currentUser || !currentUser.id) {
			return 0;
		}
		const count = users.reduce((acc, user) => {
			return acc + (user.following.includes(currentUser.id) ? 1 : 0);
		}, 0);

		return count;
	};

	const countUsersFollowing = (following, users) => {
		const followingSet = new Set(following);
		let count = 0;

		for (let i = 0; i < users.length; i++) {
			if (followingSet.has(users[i].id)) {
				count++;
			}
		}

		return count;
	};

	let count = {
		likes: data.user.likes.length,
		favorites: data.user.favorites.length
	};

	const pageCount = data.pages.reduce((count, page) => {
		if (page.user === data.user.id) {
			return count + 1;
		}
		return count;
	}, 0);

	const isOld = (date) => {
		const currentDate = new Date(); // Current date
		const updatedDate = new Date(date); // Replace with page.updated value
		const differenceInMilliseconds = currentDate - updatedDate;
		const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
		if (daysDifference > 30) {
			return true;
		}
	};
</script>

<div>
	<DashboardHeader
		name={data.user.name}
		title={data.user.job_title}
		division={data.user.division}
		avatar={data.user?.avatar
			? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
			: `https://ui-avatars.com/api/?name=${data.user?.name}`}
		{pageCount}
		pageLikes={count.likes}
		pageFavorites={count.favorites}
		followers={countMyFollowers(data.users, data.user)}
		following={countUsersFollowing(data.user.following, data.users)}
	/>
</div>

<div class="px-4">
	<div class="divider" />
	<Stats
		pages={pageCount}
		likes={count.likes}
		favorites={count.favorites}
		avatar={data.user?.avatar
			? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
			: `https://ui-avatars.com/api/?name=${data.user?.name}`}
	/>

	<div class="flex flex-col gap-5 mt-5">
		<div class="collapse collapse-arrow bg-base-100 border shadow-md">
			<input type="checkbox" checked="checked" />
			<div class="collapse-title text-3xl font-bold">Likes & Favorites</div>
			<div class="collapse-content">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
					<div class="">
						<div class="text-2xl">Stale Pages</div>
						<div class=" flex flex-col">
							{#each data.pages as page}
								{#if page.user === data.user.id}
									{#if isOld(page.updated)}
										<a
											class="p-5 border border-warning hover:shadow rounded my-2 transition-all duration-200 text-warning"
											href={`/pages/${page.id}`}
										>
											<div class="flex justify-between gap-2">
												<div>
													{page.name}
												</div>

												<div
													class="hover:scale-[102%] active:scale-[98%] transition-transform duration-200"
												>
													<a href={`/pages/${page.id}/edit`}>
														<Icon src={PencilSquare} class="w-5 h-5" solid />
													</a>
												</div>
											</div>
										</a>
									{/if}
								{/if}
							{/each}
						</div>
					</div>

					<div class="">
						<div class="text-2xl">Favorites</div>
						<div class=" flex flex-col">
							{#each data.user.favorites as favorite}
								{#each data.pages as page}
									{#if page.id === favorite}
										<a
											class="p-5 border border-error text-error hover:shadow rounded my-2 transition-all duration-200"
											href={`/pages/${page.id}`}
										>
											{page.name}
										</a>
									{/if}
								{/each}
							{/each}
						</div>
					</div>

					<div class="">
						<div class="text-2xl">Likes</div>
						<div class=" flex flex-col">
							{#each data.user.likes as like}
								{#each data.pages as page}
									{#if page.id === like}
										<a
											class="p-5 border border-info text-info hover:shadow rounded my-2 transition-all duration-200"
											href={`/pages/${page.id}`}
										>
											{page.name}
										</a>
									{/if}
								{/each}
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="collapse collapse-arrow bg-base-100 border shadow-md">
			<input type="checkbox" checked="checked" />
			<div id="mypages" class="collapse-title text-3xl font-bold">My Pages</div>
			<div class="collapse-content">
				<div class="px-4 mt-5">
					<div class="w-full mt-4 flex flex-col items-center">
						{#each data.pages as page}
							{#if page.user === data.user.id}
								<MyPageItem {page} />
								<!-- <div class="divider mt-0 mb-2" /> -->
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
