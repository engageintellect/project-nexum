<script>
	export let content;
</script>

<div
	class="hero h-screen"
	style="background-image: url('https://cdn.discordapp.com/attachments/1008571063732539392/1115921630120656957/engage_intellect_cyberpunk_graph_network_on_a_white_background_5b873da3-eb66-4c8a-b8dd-6dad314f3238.png');"
>
	<div class="hero-overlay bg-opacity-80 h-72 w-72 lg:h-96 lg:w-96 rounded-full" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<div class="mb-5 text-5xl lg:text-6xl font-bold">
				<div>
					Ne<span class="text-purple-500">x</span>um Wiki
				</div>
			</div>
			<div class="mb-5 text-sm md:text-md lg:text-lg">
				{content}
			</div>

			<div class="grid grid-cols-2 gap-2">
				<a href="/about" class="btn btn-primary bg-purple-500">About</a>
				<a href="/register" class="btn btn-primary bg-purple-500">Get Started</a>
			</div>
		</div>
	</div>
</div>
