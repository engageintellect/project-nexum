<script>
	import {
		Icon,
		RectangleGroup,
		FolderOpen,
		ChatBubbleLeftEllipsis,
		Cog6Tooth,
		MagnifyingGlassCircle
	} from 'svelte-hero-icons';
</script>

<div class="flex gap-5 justify-between items-center max-w-3xl mx-auto my-10 overflow-auto">
	<div class="btn h-full rounded-lg p-2">
		<Icon src={RectangleGroup} class=" w-16 h-16" solid />
	</div>

	<div class="btn h-full rounded-lg p-2">
		<Icon src={FolderOpen} class=" w-16 h-16" solid />
	</div>

	<div class="btn h-full rounded-lg p-2">
		<Icon src={ChatBubbleLeftEllipsis} class=" w-16 h-16" solid />
	</div>

	<div class="btn h-full rounded-lg p-2">
		<Icon src={MagnifyingGlassCircle} class=" w-16 h-16" solid />
	</div>

	<div class="btn h-full rounded-lg p-2">
		<Icon src={Cog6Tooth} class=" w-16 h-16" solid />
	</div>
</div>
