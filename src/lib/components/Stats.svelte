<script>
	export let avatar;
	export let likes;
	export let favorites;
	export let stalePages;
	export let verifiedPages;

	import {
		Icon,
		Heart,
		HandThumbUp,
		Share,
		CheckCircle,
		ExclamationTriangle
	} from 'svelte-hero-icons';
</script>

<div class="">
	<div class="grid gap-5 grid-cols-1 md:grid-cols-4">
		<div class="stat shadow rounded">
			<div class="stat-figure text-secondary">
				<!-- <img src={avatar} alt="user avatar" /> -->
				<Icon src={CheckCircle} class="w-7 h-7 md:w-12 md:h-12 text-success drop-shadow" solid />
			</div>
			<div class="text-sm font-thin">Verified Pages</div>
			<div class="text-2xl md:text-3xl font-extrabold">{verifiedPages}</div>
			<div class="text-xs">Pages marked as verified content.</div>
		</div>

		<div class="stat shadow rounded">
			<div class="stat-figure text-secondary">
				<!-- <div class="avatar online"> -->
				<!-- <div class="w-16 rounded-full shadow-lg border border-primary"> -->
				<!-- <img src={avatar} alt="user avatar" /> -->
				<!-- </div> -->
				<!-- </div> -->
				<Icon
					src={ExclamationTriangle}
					class="w-7 h-7 md:w-12 md:h-12 text-warning drop-shadow"
					solid
				/>
			</div>
			<div class="text-sm font-thin">Stale Pages</div>
			<div class="text-2xl md:text-3xl font-extrabold">{stalePages}</div>
			<div class="text-xs">Pages older than 30 days.</div>
		</div>

		<div class="stat shadow rounded">
			<div class="stat-figure text-secondary">
				<Icon src={Heart} class="w-7 h-7 md:w-12 md:h-12 text-error drop-shadow-md" solid />
			</div>
			<div class="text-sm font-thin">Favorites</div>
			<div class="text-2xl md:text-3xl font-extrabold">{favorites}</div>
			<div class="text-xs">Total pages favorited.</div>
		</div>

		<div class="stat shadow rounded">
			<div class="stat-figure text-primary">
				<Icon src={HandThumbUp} class="w-7 h-7 md:w-12 md:h-12 text-info drop-shadow" solid />
			</div>
			<div class="text-sm font-thin">Likes</div>
			<div class="text-2xl md:text-3xl font-extrabold">{likes}</div>
			<div class="text-xs">Total pages liked.</div>
		</div>
	</div>
</div>
