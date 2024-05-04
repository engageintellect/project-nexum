<script>
	export let statTitle;
	export let statValue;
	export let statDescription;
	export let userStat = false;
	export let pageLink;
</script>

{#if userStat && pageLink}
	<div class="border border-neutral/10 rounded shadow w-full h-full">
		<a href={pageLink} class="w-full">
			<div class="flex items-center justify-between h-full w-full p-4">
				<div class="flex flex-col items-center md:items-start w-full">
					<div class="text-sm md:text-md font-thin">{statTitle}</div>
					<div class="text-xl md:text-2xl font-extrabold">{statValue}</div>
					<div class="text-xs hidden md:flex">{statDescription}</div>
				</div>
				<div class="hidden h-full md:flex items-center">
					<slot />
				</div>
			</div>
		</a>
	</div>
{:else}
	<div class="border border-neutral/10 rounded shadow w-full h-full">
		<div class="flex items-center justify-between h-full w-full p-4">
			<div class="flex flex-col w-full">
				<div class="text-sm md:text-md font-thin">{statTitle}</div>
				<div class="text-xl md:text-2xl font-extrabold">{statValue}</div>
				<div class="text-xs">{statDescription}</div>
			</div>
			<div class=" h-full flex items-center">
				<slot />
			</div>
		</div>
	</div>
{/if}
