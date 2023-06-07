<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col w-full h-full px-4">
	<div class="w-full mt-2">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<div class="flex flex-col justify-center text-center">
				<h3 class="text-center text-3xl font-bold">Tell us more about this project</h3>
				<p class="pt-2 text-lg">We'll need the name, tagline, link, and description</p>
			</div>

			<Input id="name" label="Project Name" value={form?.data?.name} errors={form?.errors?.name} />
			<Input
				id="tagline"
				label="Project Tagline"
				value={form?.data?.tagline}
				errors={form?.errors?.tagline}
			/>
			<Input id="url" label="Project URL" value={form?.data?.url} errors={form?.errors?.url} />

			<div class="w-full max-w-lg">
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
					<option disabled selected>Select Division</option>
					<option value="NCS">NCS</option>
					<option value="BTS">BTS</option>
					<option value="BTS">CORP</option>
					<option value="Direct">Direct</option>
				</select>
				<!-- <span class="text-sm text-red-600">{form?.errors?.division}</span> -->
			</div>

			<TextArea
				id="description"
				label="Project Description"
				value={form?.data?.description}
				errors={form?.errors?.description}
			/>
			<Input id="thumbnail" label="Thumbnail" type="file" errors={form?.errors?.thumbnail} />
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create Project</button>
			</div>
		</form>
	</div>
</div>
