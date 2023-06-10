<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, TextArea, WYSIWYG } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let data;
	export let form;

	let loading = false;

	const submitUpdateProject = () => {
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
			action="?/updateProject"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdateProject}
		>
			<div class="flex flex-col justify-center text-center">
				<h3 class="text-3xl font-bold">Edit "{data.project.name}"</h3>
				<p class="pt-2 text-lg">Update whatever you live, then click "save changes"</p>
			</div>

			<div class="w-full grid grid-cols-1 gap-5 md:grid-cols-2">
				<div>
					<Input
						id="name"
						label="Project Name"
						value={form?.data?.name ?? data.project.name}
						errors={form?.errors?.name}
					/>
				</div>

				<div>
					<Input
						id="tagline"
						label="Project Tagline"
						value={form?.data?.tagline ?? data.project.tagline}
						errors={form?.errors?.tagline}
					/>
				</div>

				<div>
					<Input
						id="url"
						label="Project URL"
						value={form?.data?.url ?? data.project.url}
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
						<option disabled selected>{data.project.division}</option>
						<option value="NCS">NCS</option>
						<option value="BTS">BTS</option>
						<option value="CORP">CORP</option>
						<option value="Direct">Direct</option>
					</select>
					<!-- <span class="text-sm text-red-600">{form?.errors?.division}</span> -->
				</div>
			</div>

			<div class="w-full">
				<WYSIWYG
					type="hidden"
					id="description"
					label="Project Description"
					value={form?.data?.description ?? data.project.description}
					errors={form?.errors?.description}
				/>

				<div class="form-control w-full max-w-lg">
					<label for="thumbnail" class="label font-medium pb-1">
						<span class="label-text">Thumbnail</span>
					</label>
					{#if data.project.thumbnail}
						<label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
							<label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer">
								<button formaction="?/deleteThumbnail" class="btn btn-error btn-sm btn-circle">
									<Icon src={Trash} class="w-5 h-5 text-white" />
								</button>
							</label>
							<div class="w-20 rounded">
								<img
									src={getImageURL(
										data.project.collectionId,
										data.project.id,
										data.project.thumbnail,
										'80x80'
									)}
									alt="project thumbnail"
								/>
							</div>
						</label>
					{/if}
					<input
						type="file"
						name="thumbnail"
						id="thumbnail"
						class="file-input file-input-bordered w-full max-w-lg mt-2"
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
			</div>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Save Changes</button>
			</div>
		</form>
	</div>
</div>
