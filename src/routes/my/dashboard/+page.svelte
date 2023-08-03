<script>
	import { Stats } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import { Icon, PencilSquare, UserPlus, UserGroup, Check, Trash } from 'svelte-hero-icons';
	import { Modal, MyPageItem, DashboardHeader } from '$lib/components';
	import { fade } from 'svelte/transition';
	export let data;

	export let badges;
	export let userBadges;

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

	export let tabs;
	export let activeTab = 0;

	function setActiveTab(tabIndex) {
		activeTab = tabIndex;
	}
</script>

{#if badges}
	<div class="mt-10">
		<div class="w-full font-bold text-lg md:text-xl">
			Badges <span class="badge badge-success rounded uppercase">beta</span>
		</div>
		<div class="flex my-2 overflow-x-auto overflow-y-hidden hide-scrollbar">
			<!-- Step 1: Add overflow-x-auto class -->
			{#each badges as badge}
				{#if userBadges.includes(badge.id)}
					<div class="flex-shrink-0">
						<!-- Step 2: Add flex-shrink-0 class to prevent badges from shrinking -->
						<div>
							<Modal label={badge.name} checked={modalOpen}>
								<div
									slot="trigger"
									class="cursor-pointer hover:scale-[102%] transition-all duration-200 hover:saturate-150"
								>
									<div class="">
										<img
											class="w-16 h-16"
											src={badge?.thumbnail
												? getImageURL(badge.collectionId, badge.id, badge.thumbnail, '0x0')
												: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
											alt="page thumbnail"
										/>
									</div>
								</div>
								<div slot="heading">
									<div class="">
										<div class="w-full bg-purple-100 flex justify-center">
											<img
												class="w-32 h-32 lg:w-40 lg:h-40 p-2"
												src={badge?.thumbnail
													? getImageURL(badge.collectionId, badge.id, badge.thumbnail, '0x0')
													: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
												alt="page thumbnail"
											/>
										</div>
									</div>

									<div class="text-2xl my-5">{badge.name}</div>
									<div class="text-base font-normal mt-2">
										{badge.description}
									</div>

									<div class="flex gap-2 justify-center mt-10 my-5">
										<div class="btn btn-info">About Badges</div>

										<div class="btn btn-success">Claim Prize!</div>
									</div>
								</div>
							</Modal>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<!-- <div class="text-sm text-primary/50">click here to learn more</div> -->
	</div>
{/if}

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

<div class="flex flex-col mx-4">
	<div class="text-lg md:text-xl font-bold">Page Data</div>

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

<div class=" bg-base-100 px-4 my-5 md:my-10">
	<!-- <input type="checkbox" checked="checked" /> -->
	<div id="mypages" class=" text-xl font-bold">My Pages</div>
	<div class="">
		<div class="">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each data.pages as page}
					{#if page.user === data.user.id}
						<MyPageItem {page} />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
