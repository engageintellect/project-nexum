<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea, WYSIWYG } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col w-full h-full px-4 max-w-screen-md mx-auto">
	<div class="w-full mt-2">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<!-- <div class="flex flex-col justify-center text-center">
				<div class="text-center text-3xl font-bold">Tell us more about this topic</div>
				<div class="pt-2 text-lg">We'll need a name, tagline, link, and content</div>
			</div> -->

			<div class="w-full grid grid-cols-1 gap-x-5 md:grid-cols-2">
				<div>
					<Input
						id="name"
						placeholder="Page Name*"
						value={form?.data?.name}
						errors={form?.errors?.name}
					/>
				</div>

				<div>
					<Input
						id="tagline"
						placeholder="Page Tagline*"
						value={form?.data?.tagline}
						errors={form?.errors?.tagline}
					/>
				</div>

				<div>
					<Input
						id="url"
						placeholder="Homepage URL"
						value={form?.data?.url}
						errors={form?.errors?.url}
					/>
				</div>

				<div class="w-full">
					<!-- <label for="division" class="label font-medium pb-1"> -->
					<!-- <span class="label-text">Division</span> -->
					<!-- </label> -->
					<select
						id="division"
						name="division"
						label="Division"
						class="select select-bordered w-full text-neutral/50"
					>
						<!-- TODO: Make this dynamic -->
						<option disabled selected>Select Division</option>
						<option value="NCS">NCS</option>
						<option value="BTS">BTS</option>
						<option value="CORP">CORP</option>
						<option value="Direct">DIRECT</option>
					</select>
					<!-- <span class="text-sm text-red-600">{form?.errors?.division}</span> -->
				</div>
			</div>

			<div class="w-full">
				<Input id="thumbnail" label="Thumbnail" type="file" errors={form?.errors?.thumbnail} />
			</div>

			<div class="w-full">
				<WYSIWYG
					type="hidden"
					id="content"
					label="Page Content"
					value={form?.data?.content}
					errors={form?.errors?.content}
				/>
			</div>
			<div class="w-full pt-3">
				<button type="submit" class="btn btn-success rounded w-full">Create Page</button>
			</div>
		</form>
	</div>
</div>
