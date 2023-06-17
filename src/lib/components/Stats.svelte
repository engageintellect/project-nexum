<script>
	export let avatar;
	export let likes;
	export let favorites;
	export let projects;

	import { Icon, Heart, HandThumbUp, Share } from 'svelte-hero-icons';
</script>

<div class="stats shadow w-full">
	<div class="grid grid-cols-1 md:grid-cols-3">
		<div class="stat">
			<div class="stat-figure text-secondary">
				<div class="avatar online">
					<div class="w-16 rounded-full shadow-lg border border-primary">
						<img src={avatar} alt="user avatar" />
					</div>
				</div>
			</div>
			<div class="stat-title">Projects</div>
			<div class="stat-value">{projects}</div>
			<div class="stat-desc text-secondary">Your contributions</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-secondary">
				<Icon src={Heart} class="w-8 h-8 text-error drop-shadow-md" solid />
			</div>
			<div class="stat-title">Favorites</div>
			<div class="stat-value text-secondary">{favorites}</div>
			<div class="stat-desc">Total pages favorited.</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-primary">
				<Icon src={HandThumbUp} class="w-8 h-8 text-info drop-shadow-md" solid />
			</div>
			<div class="stat-title">Likes</div>
			<div class="stat-value text-primary">{likes}</div>
			<div class="stat-desc">Total pages liked.</div>
		</div>
	</div>
</div>
