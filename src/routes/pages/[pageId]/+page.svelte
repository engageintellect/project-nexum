<script>
	import { PUBLIC_HOME_URL } from '$env/static/public';
	import { enhance } from '$app/forms';
	import { getImageURL } from '$lib/utils';
	import {
		Icon,
		Heart,
		HandThumbUp,
		Share,
		PencilSquare,
		ArrowPathRoundedSquare,
		CheckCircle
	} from 'svelte-hero-icons';
	import readtime from 'read-time';
	export let data;

	import Toc from 'svelte-toc';

	const readTime = readtime(data.page.content);

	const dateTimeString = data.page.updated;
	const dateTime = new Date(dateTimeString);

	const options = {
		timeZone: 'America/Los_Angeles', // Specify the desired time zone
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};

	const formattedDateTime = dateTime.toLocaleString('en-US', options);

	const getTotalLikes = (users, pages) => {
		const total = users.reduce((count, user) => {
			if (user.likes.includes(pages.id)) {
				return count + 1;
			}
			return count;
		}, 0);

		return total;
	};

	const getTotalFavorites = (users, pages) => {
		const total = users.reduce((count, user) => {
			if (user.favorites.includes(pages.id)) {
				return count + 1;
			}
			return count;
		}, 0);

		return total;
	};
</script>

<div class="flex">
	<div class="flex flex-col w-full mt-10 max-w-4xl mx-auto px-4">
		{#if data.page.verified}
			<div class="badge badge-sm badge-success rounded-full p-4">
				<div class="flex gap-1 items-center justify-center">
					<div>
						<Icon src={CheckCircle} class=" w-5 h-5" />
					</div>
					<div class="uppercase font-semibold">verified</div>
				</div>
			</div>
		{/if}

		<!-- TITLE -->
		<div>
			<div class="text-5xl font-bold">
				{data.page.name}<span />
			</div>

			<div class="text-2xl font-light mt-2">{data.page.tagline}</div>
		</div>
		<div>
			<div class="mt-1">
				<a class="text-primary hover:underline" target="_blank" href={data.page.url}
					>{data.page.url}</a
				>
			</div>
		</div>

		<!-- CREATOR -->
		{#each data.users as creator}
			{#if creator.id === data.page.user}
				<div class="flex gap-2 my-10">
					<div class="flex items-center gap-4">
						<div>
							<a href={`/people/${creator.id}`}>
								<img
									class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border border-primary hover:saturate-150 hover:scale-[102%] transition-all duration-50 active:scale-[98%]"
									src={creator?.avatar
										? getImageURL(creator?.collectionId, creator?.id, creator?.avatar)
										: `https://ui-avatars.com/api/?name=${creator?.name}`}
									alt="User avatar"
								/>
							</a>
						</div>

						<div class="flex flex-col justify-center">
							<div class="text-lg font-semibold primary-content">
								{creator.name}
							</div>
							<div class="text-sm font-medium secondary-content">{creator.job_title}</div>

							{#if creator.id != data.user.id}
								<div class="my-2">
									<form action="?/followUser" method="POST" use:enhance>
										<button type="submit" class="active:scale-[98%] transition-all duration-200">
											<input type="hidden" name="id" value={creator.id} />
											<div>
												{#if data.user.following.includes(creator.id)}
													<input type="hidden" name="follow" value="true" />
													<button class="flex btn btn-sm btn-success rounded capitalize">
														<!-- <Icon src={CheckCircle} class="text-primary w-5 h-5" solid /> -->
														<div>Following</div>
													</button>
												{:else}
													<input type="hidden" name="follow" value="false" />

													<button class="flex btn btn-sm rounded capitalize">
														<!-- <Icon src={PlusCircle} class="text-primary w-5 h-5" /> -->
														<div>Follow</div>
													</button>
												{/if}
											</div>
										</button>
									</form>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		{/each}

		<!-- PAGE METAGS -->
		<div class="flex flex-col gap-2 md:flex-row justify-between">
			<div>
				<div class="text-sm md:text-md font-bold primary-content">
					Read Time: {readTime.text}.
				</div>
				<div class="font-medium flex items-center gap-2">
					<Icon src={ArrowPathRoundedSquare} class="w-5 h-5" />
					<div class="font-thin text-sm md:text-md">
						{formattedDateTime}.
					</div>
				</div>
			</div>

			<!-- TAGS -->
			<div class="flex flex-wrap gap-2">
				{#if data.page.expand.tags}
					{#each data.page.expand.tags as tag}
						<div class="badge badge-outline badge-primary">{tag.name}</div>
					{/each}
				{/if}
			</div>

			<!-- ACTION BUTTONS -->
			<div class="flex gap-5">
				<!-- EDIT -->
				{#if data.page.user === data.user.id}
					<a href="/pages/{data.page.id}/edit">
						<Icon
							src={PencilSquare}
							class="text-primary w-7 h-7 hover:scale-105 active:scale-95 transition-all duration-200"
						/>
					</a>
				{/if}

				<!-- LIKE -->
				<form action="?/likePage" method="POST" use:enhance>
					<button type="submit" class="hover:scale-105 active:scale-95 transition-all duration-200">
						<input type="hidden" name="id" value={data.page.id} />
						<div>
							{#if data.user.likes.includes(data.page.id)}
								<input type="hidden" name="like" value="true" />
								<Icon src={HandThumbUp} class="text-info w-7 h-7" solid />
							{:else}
								<input type="hidden" name="like" value="false" />
								<Icon src={HandThumbUp} class="text-primary w-7 h-7" />
							{/if}
						</div>
					</button>
				</form>
				{getTotalLikes(data.users, data.page)}

				<!-- FAVORITE -->
				<form action="?/favoritePage" method="POST" use:enhance>
					<button type="submit" class="hover:scale-105 active:scale-95 transition-all duration-200">
						<input type="hidden" name="id" value={data.page.id} />
						<div>
							{#if data.user.favorites.includes(data.page.id)}
								<input type="hidden" name="favorite" value="true" />
								<Icon src={Heart} class="text-error w-7 h-7" solid />
							{:else}
								<input type="hidden" name="favorite" value="false" />
								<Icon src={Heart} class="text-primary w-7 h-7" />
							{/if}
						</div>
					</button>
				</form>
				{getTotalFavorites(data.users, data.page)}

				<!-- SHARE -->
				<!-- TODO: CHANEGE TO SOMETHING LIKE SENDGRID TO MAKE LINK CLICKABLE IN EMAIL CLIENT -->
				<div>
					<a
						href={`mailto:?subject=Nexum: ${data.page.name}&body=${PUBLIC_HOME_URL}/pages/${data.page.id}`}
					>
						<Icon
							src={Share}
							class="text-primary w-7 h-7 hover:scale-105 active:scale-95 transition-all duration-200"
						/>
					</a>
				</div>
			</div>
		</div>

		<!-- IMAGE -->
		{#if data.page.thumbnail}
			<div class="avatar">
				<div class="w-full h-64 md:h-96 rounded shadow-lg">
					<img
						src={data.page?.thumbnail
							? getImageURL(data.page.collectionId, data.page.id, data.page.thumbnail, '0x0')
							: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${data.page.name}`}
						alt="page thumbnail"
					/>
				</div>
			</div>
		{/if}

		<!-- CONTENT -->

		<div class="mt-10 page-content overflow-x-hidden">
			{@html data.page.content}
		</div>
	</div>

	<div class="mt-10 hidden xl:flex">
		<Toc title={'Page Contents'} autoHide={false} />
	</div>
</div>
