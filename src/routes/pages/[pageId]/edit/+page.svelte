<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, TextArea, WYSIWYG } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let data;
	export let form;

	let loading = false;

	const submitUpdatePage = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await update();
			}

			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full px-4">
	<div class="w-full mt-2">
		<form
			action="?/updatePage"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdatePage}
		>
			<div class="flex flex-col justify-center text-center mt-10">
				<div class="text-3xl font-bold">Edit "{data.page.name}"</div>
				<div class="pt-2 text-lg">Update whatever you like, then click "save changes"</div>
			</div>

			<div class="w-full grid grid-cols-1 gap-x-5 md:grid-cols-2">
				<div>
					<Input
						id="name"
						label="Page Name"
						value={form?.data?.name ?? data.page.name}
						errors={form?.errors?.name}
					/>
				</div>

				<div>
					<Input
						id="tagline"
						label="Page Tagline"
						value={form?.data?.tagline ?? data.page.tagline}
						errors={form?.errors?.tagline}
					/>
				</div>

				<div>
					<Input
						id="url"
						label="Homepage URL"
						value={form?.data?.url ?? data.page.url}
						errors={form?.errors?.url}
					/>
				</div>

				<div class="w-full">
					<label for="division" class="label font-medium pb-1">
						<span class="label-text">Division</span>
					</label>
					<select
						id="division"
						name="division"
						label="Division"
						class="select select-bordered w-full"
					>
						<!-- TODO: Make this dynamic -->
						<option disabled selected>{data.page.division}</option>
						<option value="NCS">NCS</option>
						<option value="BTS">BTS</option>
						<option value="CORP">CORP</option>
						<option value="Direct">DIRECT</option>
					</select>
					<!-- <span class="text-sm text-red-600">{form?.errors?.division}</span> -->
				</div>
			</div>

			<div class="form-control w-full">
				<label for="thumbnail" class="label font-medium -mb-3 -mt-0">
					{#if data.page.thumbnail}
						<span class="label-text pb-2">Thumbnail</span>
					{:else}
						<span class="label-text">Thumbnail</span>
					{/if}
				</label>
				{#if data.page.thumbnail}
					<label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
						<label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer">
							<button formaction="?/deleteThumbnail" class="btn btn-error btn-sm btn-circle">
								<Icon src={Trash} class="w-5 h-5 text-white" />
							</button>
						</label>
						<div class="w-20 rounded">
							<img
								src={getImageURL(
									data.page.collectionId,
									data.page.id,
									data.page.thumbnail,
									'80x80'
								)}
								alt="page thumbnail"
							/>
						</div>
					</label>
				{/if}
				<input
					type="file"
					name="thumbnail"
					id="thumbnail"
					label="Thumbnail"
					class="file-input file-input-bordered w-full mt-2"
				/>
				{#if form?.errors?.thumbnail}
					{#each form?.errors?.thumbnail as error}
						<label for="thumbnail" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
						</label>
					{/each}
				{/if}
			</div>

			<div class="w-full pt-2">
				<WYSIWYG
					type="hidden"
					id="content"
					label="Page Content"
					value={form?.data?.content ?? data.page.content}
					errors={form?.errors?.content}
				/>
			</div>

			<div class="flex gap-2 w-full max-w-md my-5">
				<div class="w-full">
					<a href={`/pages/${data.page.id}`} class="btn btn-outline rounded w-full">Cancel</a>
				</div>
				<div class="w-full">
					<button type="submit" class="btn btn-success rounded w-full">Save Changes</button>
				</div>
			</div>
		</form>
	</div>
</div>
