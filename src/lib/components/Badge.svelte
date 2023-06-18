<script>
	export let msg;
	export let isNew = false;
	export let isOld = false;
</script>

{#if isNew}
	<div class="flex justify-end">
		<div class="badge badge-success gap-2 absolute -right-2 -top-2 p-4 shadow-md">{msg}</div>
	</div>
{/if}

{#if isOld}
	<div class="flex justify-end">
		<div class="badge badge-error gap-2 absolute -right-2 -top-2 p-4 shadow-md">{msg}</div>
	</div>
{/if}
