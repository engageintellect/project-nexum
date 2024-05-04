<script>
	export let msg;
	export let isNew = false;
	export let isOld = false;
</script>

{#if isNew}
	<div class="z-40">
		<div
			class="badge badge-success rounded-r-full gap-2 absolute -left-1 -top-1 p-4 font-extrabold shadow-md"
		>
			{msg}
		</div>
	</div>
{/if}

{#if isOld}
	<div class="z-40">
		<div
			class="badge badge-error rounded-r-full gap-2 absolute -left-1 -top-1 p-4 font-extrabold shadow-md"
		>
			{msg}
		</div>
	</div>
{/if}
