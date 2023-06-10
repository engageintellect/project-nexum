<script>
	import Editor from '@tinymce/tinymce-svelte';
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let type = 'hidden';
	export let disabled = false;
	export let required = false;

	export let errors;
</script>

<div class="form-control w-full">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<Editor class="textarea textarea-bordered resize-y h-full" bind:value />

	<input
		class="textarea textarea-bordered resize-y h-full"
		{type}
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		{value}
	/>

	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
