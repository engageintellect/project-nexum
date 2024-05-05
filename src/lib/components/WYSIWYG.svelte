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

	let conf = {
		skin: 'borderless',
		content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
		// min_height: 720,
		selector: 'textarea',
		placeholder: `Add your page's content here. Click save when finished.`,
		toolbar_mode: 'sliding',
		// menubar: 'file edit view insert format tools table tc help',
		menubar: false,
		toolbar:
			'undo redo | blocks | bold italic underline strikethrough codesample | numlist bullist checklist | link insertfile image media table |' +
			'alignleft aligncenter alignright alignjustify |' +
			'forecolor backcolor casechange permanentpen formatpainter |' +
			'code fullscreen',

		plugins: [
			'advlist',
			'codesample',
			'autolink',
			'lists',
			'link',
			'image',
			'charmap',
			'preview',
			'anchor',
			'searchreplace',
			'visualblocks',
			'code',
			'fullscreen',
			'insertdatetime',
			'media',
			'table',
			'help',
			'wordcount'
		]
	};
</script>

<div class="form-control w-full">
	<!-- <label for={id} class="label font-medium pb-1"> -->
	<!-- <span class="label-text">{label}</span> -->
	<!-- </label> -->
	<Editor {conf} class="textarea textarea-bordered resize-y h-full" bind:value />

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
