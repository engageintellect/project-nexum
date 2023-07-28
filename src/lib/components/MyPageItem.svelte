<script>
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import toast from 'svelte-french-toast';

	import { Icon, PencilSquare, Trash } from 'svelte-hero-icons';

	export let page;

	let modalOpen;
	let loading = false;

	const submitDeletePage = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Page deleted successfully!');
					await update();
					break;
				case 'error':
					toast.error('Could not delete page. Try again later.');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	$: modalOpen = false;

	const dateTimeString = page.updated;
	const dateTime = new Date(dateTimeString);

	const options = {
		timeZone: 'America/Los_Angeles', // Specify the desired time zone
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};

	const formattedDateTime = dateTime.toLocaleString('en-US', options);

	console.log(formattedDateTime);
</script>

<div class="w-full flex items-center justify-between my-2 border boder-primary shadow-md">
	<div class="avatar">
		<div class="w-24 lg:w-40 rounded">
			<a href="/pages/{page.id}">
				<img
					src={page?.thumbnail
						? getImageURL(page.collectionId, page.id, page.thumbnail, '80x80')
						: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${page.name}`}
					alt="page thumbnail"
				/>
			</a>
		</div>
	</div>
	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/pages/{page.id}" class="font-semibold text-lg">{page.name}</a>
		<div>{page.tagline}</div>
		<div class="mt-2">
			<div class="font-bold text-xs">
				Last Update: <span class="font-medium">{formattedDateTime}</span>
			</div>
		</div>
	</div>

	<div class="flex flex-col items-end md:flex-row md:items-center justify-end w-full gap-2 p-4">
		<a href="/pages/{page.id}/edit" class="btn btn-outline">
			<Icon src={PencilSquare} class="w-4 h-4" />
		</a>
		<Modal label={page.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error ml-2">
				<Icon src={Trash} class="w-4 h-4" />
			</span>
			<div slot="heading">
				<div class="text-2xl">Delete {page.name}</div>
				<div class="text-base font-normal mt-2">
					Are you sure you want to delete this page? Once deleted, the page cannot be restored.
				</div>
			</div>
			<div slot="actions" class="flex w-full items-center justify-center space-x-2">
				<label for={page.id} class="btn btn-outline">Cancel</label>
				<form action="?/deletePage" method="POST" use:enhance={submitDeletePage}>
					<input type="hidden" name="id" value={page.id} />
					<button type="submit" class="btn btn-error" disabled={loading}>Delete</button>
				</form>
			</div>
		</Modal>
	</div>
</div>
