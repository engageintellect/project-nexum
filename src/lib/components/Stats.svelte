<script>
	export let avatar;
	export let likes;
	export let favorites;

	import { Icon, Heart, HandThumbUp, Share } from 'svelte-hero-icons';
</script>

<div class="stats shadow w-full">
	<div class="grid grid-cols-1 md:grid-cols-3">
		<div class="stat">
			<div class="stat-figure text-primary">
				<Icon src={Heart} class="w-8 h-8" />
			</div>
			<div class="stat-title">Total Likes</div>
			<div class="stat-value text-primary">{likes}</div>
			<div class="stat-desc">21% more than last month</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-secondary">
				<Icon src={HandThumbUp} class="w-8 h-8" />
			</div>
			<div class="stat-title">Favorites</div>
			<div class="stat-value text-secondary">{favorites}</div>
			<div class="stat-desc">21% more than last month</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-secondary">
				<div class="avatar online">
					<div class="w-16 rounded-full">
						<img src={avatar} alt="user avatar" />
					</div>
				</div>
			</div>
			<div class="stat-value">86%</div>
			<div class="stat-title">Tasks done</div>
			<div class="stat-desc text-secondary">31 tasks remaining</div>
		</div>
	</div>
</div>
