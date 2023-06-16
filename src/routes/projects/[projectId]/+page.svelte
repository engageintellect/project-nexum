<script>
	import { enhance } from '$app/forms';
	import { getImageURL } from '$lib/utils';
	import { Icon, Heart, HandThumbUp, Share } from 'svelte-hero-icons';
	import readtime from 'read-time';
	import ToolTipButton from '../../../lib/components/ToolTipButton.svelte';
	export let data;
	import Toc from 'svelte-toc';

	const readTime = readtime(data.project.description);

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
		<!-- TITLE -->
		<div>
			<h1 class="text-6xl font-bold">
				{data.project.name}
			</h1>
			<p class="text-2xl font-light mt-2">{data.project.tagline}</p>
		</div>
		<div>
			<p class="mt-1">
				<a class="text-primary hover:underline" target="_blank" href={data.project.url}
					>{data.project.url}</a
				>
			</p>
		</div>
		<!-- CREATOR -->
		{#each data.users as creator}
			{#if creator.id === data.project.user}
				<div class="flex gap-2 my-10">
					<div class="flex gap-5 items-center">
						<div>
							<img
								class="w-16 h-16 rounded-full border border-primary"
								src={creator?.avatar
									? getImageURL(creator?.collectionId, creator?.id, creator?.avatar)
									: `https://ui-avatars.com/api/?name=${creator?.name}`}
								alt="User avatar"
							/>
						</div>

						<div class="flex flex-col justify-center">
							<p class="text-lg font-semibold primary-content">{creator.name}</p>
							<p class="text-sm font-medium secondary-content">{creator.job_title}</p>
							<p class="text-md font-bold primary-content">{readTime.text} read.</p>
						</div>
					</div>
				</div>
			{/if}
		{/each}

		<!-- TAGS -->

		<div class="flex flex-col gap-5 md:flex-row justify-between">
			<div class="flex flex-wrap gap-2">
				{#if data.project.expand.tags}
					{#each data.project.expand.tags as tag}
						<div class="badge badge-outline badge-primary">{tag.name}</div>
					{/each}
				{/if}
			</div>

			<div class="flex gap-5">
				<!-- LIKE -->
				<form action="?/likePage" method="POST" use:enhance>
					<button type="submit" class="hover:scale-110 active:scale-95 transition-all duration-200">
						<input type="hidden" name="id" value={data.project.id} />
						<div>
							{#if data.user.likes.includes(data.project.id)}
								<input type="hidden" name="like" value="true" />
								<Icon src={HandThumbUp} class="text-info w-7 h-7" solid />
							{:else}
								<input type="hidden" name="like" value="false" />
								<Icon src={HandThumbUp} class="text-primary w-7 h-7" />
							{/if}
						</div>
					</button>
				</form>
				{getTotalLikes(data.users, data.project)}

				<!-- FAVORITE -->
				<form action="?/favoritePage" method="POST" use:enhance>
					<button type="submit" class="hover:scale-110 active:scale-95 transition-all duration-200">
						<input type="hidden" name="id" value={data.project.id} />
						<div>
							{#if data.user.favorites.includes(data.project.id)}
								<input type="hidden" name="favorite" value="true" />
								<Icon src={Heart} class="text-error w-7 h-7" solid />
							{:else}
								<input type="hidden" name="favorite" value="false" />
								<Icon src={Heart} class="text-primary w-7 h-7" />
							{/if}
						</div>
					</button>
				</form>
				{getTotalFavorites(data.users, data.project)}

				<!-- SHARE -->
				<div>
					<a href="mailto:">
						<Icon src={Share} class="text-primary w-7 h-7" />
					</a>
				</div>
			</div>
		</div>

		<!-- IMAGE -->
		<div class="avatar">
			<div class="w-full h-96 rounded shadow-lg">
				<img
					src={data.project?.thumbnail
						? getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail, '0x0')
						: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${data.project.name}`}
					alt="project thumbnail"
				/>
			</div>
		</div>

		<!-- CONTENT -->

		<div class="mt-10 page-content overflow-x-hidden">
			{@html data.project.description}
		</div>
	</div>

	<div class="mt-10 hidden xl:flex">
		<Toc title={'Page Contents'} />
	</div>
</div>
