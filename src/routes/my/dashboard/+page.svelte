<script>
	import { Stats } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import { Icon, PencilSquare } from 'svelte-hero-icons';
	import { MyPageItem, DashboardHeader } from '$lib/components';
	export let data;

	let staleCount = 0;
	let verifiedCount = 0;

	const incrementVerifiedCount = () => {
		verifiedCount++;
	};

	const incrementStaleCount = () => {
		staleCount++;
	};

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

	const isPageVerified = (page) => {
		if (page.verified) {
			return true;
		}
		return false;
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
		userBadges={data.user.badges}
		badges={data.badges}
		pageLikes={count.likes}
		pageFavorites={count.favorites}
		followers={countMyFollowers(data.users, data.user)}
		following={countUsersFollowing(data.user.following, data.users)}
	/>
</div>

<div class="flex flex-col">
	<div class="collapse collapse-arrow bg-base-100 shadow">
		<input type="checkbox" checked="checked" />
		<div class="collapse-title text-lg md:text-xl font-bold">Page Data</div>

		<div class="collapse-content">
			<div class="flex flex-col gap-2">
				<Stats
					verifiedPages={verifiedCount}
					stalePages={staleCount}
					likes={count.likes}
					favorites={count.favorites}
					avatar={data.user?.avatar
						? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
						: `https://ui-avatars.com/api/?name=${data.user?.name}`}
				/>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-4 gap-2">
				<div class="">
					<div class="text-lg md:hidden mt-5">Verified Pages: {verifiedCount}</div>
					<div class=" flex flex-col gap-2 my-2">
						{#each data.pages as page}
							{#if page.user === data.user.id}
								{#if page.verified}
									<div class="hidden">
										{incrementVerifiedCount()}
									</div>

									<a
										class=" border bg-success/10 hover:shadow rounded transition-all duration-200"
										href={`/pages/${page.id}`}
									>
										<div class="flex items-start h-16 overflow-hidden text-ellipsis rounded">
											<!-- IMAGE -->
											{#if page.thumbnail}
												<div class="">
													<div class="h-16 w-12">
														<img
															class="h-full object-cover rounded rounded-r-3xl shadow"
															src={page?.thumbnail
																? getImageURL(page.collectionId, page.id, page.thumbnail, '0x0')
																: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
															alt="page thumbnail"
														/>
													</div>
												</div>
											{/if}

											<div class="flex justify-between gap-2 w-full items-start p-2 h-full">
												<div class="text-sm font-semibold">
													{page.name}
												</div>
											</div>
											<div
												class="hover:scale-[102%] active:scale-[98%] transition-transform duration-200 flex items-center h-full"
											>
												<a href={`/pages/${page.id}/edit`}>
													<Icon src={PencilSquare} class="w-7 h-7 pr-2" solid />
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
					<div class="text-lg md:hidden mt-5">Stale Pages: {staleCount}</div>
					<div class=" flex flex-col gap-2 my-2">
						{#each data.pages as page}
							{#if page.user === data.user.id}
								{#if isOld(page.updated)}
									<div class="hidden">
										{incrementStaleCount()}
									</div>

									<a
										class=" border bg-warning/10 hover:shadow rounded transition-all duration-200"
										href={`/pages/${page.id}`}
									>
										<div class="flex items-start h-16 overflow-hidden text-ellipsis rounded">
											<!-- IMAGE -->
											{#if page.thumbnail}
												<div class="">
													<div class="h-16 w-12">
														<img
															class="h-full object-cover rounded rounded-r-3xl shadow"
															src={page?.thumbnail
																? getImageURL(page.collectionId, page.id, page.thumbnail, '0x0')
																: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
															alt="page thumbnail"
														/>
													</div>
												</div>
											{/if}

											<div class="flex justify-between gap-2 w-full items-start p-2 h-full">
												<div class="text-sm font-semibold">
													{page.name}
												</div>
											</div>
											<div
												class="hover:scale-[102%] active:scale-[98%] transition-transform duration-200 flex items-center h-full"
											>
												<a href={`/pages/${page.id}/edit`}>
													<Icon src={PencilSquare} class="w-7 h-7 pr-2" solid />
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
					<div class="text-lg md:hidden mt-5">Favorites</div>
					<div class=" flex flex-col gap-2 my-2">
						{#each data.user.favorites as favorite}
							{#each data.pages as page}
								{#if page.id === favorite}
									<a
										class=" border bg-error/10 hover:shadow rounded transition-all duration-200"
										href={`/pages/${page.id}`}
									>
										<div class="flex items-start h-16 overflow-hidden text-ellipsis rounded">
											<!-- IMAGE -->
											{#if page.thumbnail}
												<div class="">
													<div class="h-16 w-12">
														<img
															class="h-full object-cover rounded rounded-r-3xl shadow"
															src={page?.thumbnail
																? getImageURL(page.collectionId, page.id, page.thumbnail, '0x0')
																: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
															alt="page thumbnail"
														/>
													</div>
												</div>
											{/if}

											<div class="flex justify-between gap-2 w-full items-start p-2 h-full">
												<div class="text-sm font-semibold">
													{page.name}
												</div>
											</div>
										</div>
									</a>
								{/if}
							{/each}
						{/each}
					</div>
				</div>

				<div class="">
					<div class="text-lg md:hidden mt-5">Likes</div>
					<div class=" flex flex-col gap-2 my-2">
						{#each data.user.likes as like}
							{#each data.pages as page}
								{#if page.id === like}
									<a
										class=" border bg-info/10 hover:shadow rounded transition-all duration-200"
										href={`/pages/${page.id}`}
									>
										<div class="flex items-start h-16 overflow-hidden text-ellipsis rounded">
											<!-- IMAGE -->
											{#if page.thumbnail}
												<div class="">
													<div class="h-16 w-12">
														<img
															class="h-full object-cover rounded rounded-r-3xl shadow"
															src={page?.thumbnail
																? getImageURL(page.collectionId, page.id, page.thumbnail, '0x0')
																: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
															alt="page thumbnail"
														/>
													</div>
												</div>
											{/if}

											<div class="flex justify-between gap-2 w-full items-start p-2 h-full">
												<div class="text-sm font-semibold">
													{page.name}
												</div>
											</div>
										</div>
									</a>
								{/if}
							{/each}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="collapse collapse-arrow bg-base-100 shadow">
		<input type="checkbox" checked="checked" />
		<div id="mypages" class="collapse-title text-xl font-bold">My Pages</div>
		<div class="collapse-content">
			<div class="px-4 mt-5">
				<div class="w-full mt-4 flex flex-col items-center">
					{#each data.pages as page}
						{#if page.user === data.user.id}
							<MyPageItem {page} />
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
