<script>
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import toast from 'svelte-french-toast';

	import { Icon, PencilSquare, Trash } from 'svelte-hero-icons';

	export let project;

	let modalOpen;
	let loading = false;

	const submitDeleteProject = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Project deleted successfully!');
					await update();
					break;
				case 'error':
					toast.error('Could not delete project. Try again later.');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	$: modalOpen = false;

	const dateTimeString = project.updated;
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

<a href="/projects/{project.id}" class="w-full">
	<div class="w-full flex items-center justify-between my-2 border boder-primary shadow-md">
		<div class="avatar">
			<div class="w-24 rounded">
				<a href="/projects/{project.id}">
					<img
						src={project?.thumbnail
							? getImageURL(project.collectionId, project.id, project.thumbnail, '80x80')
							: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${project.name}`}
						alt="project thumbnail"
					/>
				</a>
			</div>
		</div>
		<div class="flex flex-col w-full ml-4 h-full justify-center">
			<a href="/projects/{project.id}" class="font-semibold text-lg">{project.name}</a>
			<p>{project.tagline}</p>
			<div class="mt-2">
				<div class="font-bold text-xs">
					Last Update: <span class="font-medium">{formattedDateTime}</span>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-end md:flex-row md:items-center justify-end w-full gap-2 p-4">
			<a href="/projects/{project.id}/edit" class="btn btn-outline">
				<Icon src={PencilSquare} class="w-4 h-4" />
			</a>
			<Modal label={project.id} checked={modalOpen}>
				<span slot="trigger" class="btn btn-error ml-2">
					<Icon src={Trash} class="w-4 h-4" />
				</span>
				<div slot="heading">
					<h3 class="text-2xl">Delete {project.name}</h3>
					<p class="text-base font-normal mt-2">
						Are you sure you want to delete this project? Once deleted, the project cannot be
						restored.
					</p>
				</div>
				<div slot="actions" class="flex w-full items-center justify-center space-x-2">
					<label for={project.id} class="btn btn-outline">Cancel</label>
					<form action="?/deleteProject" method="POST" use:enhance={submitDeleteProject}>
						<input type="hidden" name="id" value={project.id} />
						<button type="submit" class="btn btn-error" disabled={loading}>Delete</button>
					</form>
				</div>
			</Modal>
		</div>
	</div>
</a>
