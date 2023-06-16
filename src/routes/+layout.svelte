<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { getImageURL } from '$lib/utils';
	import { Icon, Plus } from 'svelte-hero-icons';
	export let data;
</script>

<Toaster />
<div class="min-h-full">
	<nav class="navbar bg-base-100 border-b max-w-7xl mx-auto">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">
				<div>
					Ne<span class="text-purple-500">x</span>um
				</div>
			</a>
		</div>
		<div class="flex-none">
			{#if !data.user}
				<div class="dropdown dropdown-end">
					<a href="/login" class="btn btn-outline">Login</a>
					<a href="/register" class="btn btn-outline">Register</a>
				</div>
			{:else}
				<div class="dropdown dropdown-end mr-4">
					<div class="tooltip tooltip-open tooltip-bottom" data-tip="hello world">
						<button classs="btn">
							<a href="/projects/new" class="btn btn-primary btn-outline">
								<Icon src={Plus} class="w-5 h-5" />
							</a>
						</button>
					</div>
				</div>
				<div class="dropdown dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img
								src={data.user?.avatar
									? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
									: `https://ui-avatars.com/api/?name=${data.user?.name}`}
								alt="User avatar"
							/>
						</div>
					</label>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52 z-50"
					>
						<li>
							<a href="/my/projects" class="justify-between">My Projects</a>
						</li>

						<li>
							<a href="/my/dashboard" class="justify-between">My Dashboard</a>
						</li>

						<li>
							<a href="/ai" class="justify-between">AI</a>
						</li>
						<li><a href="/my/settings">Settings</a></li>
						<li>
							<form action="/logout" method="POST">
								<button type="submit" class="w-full text-start">Logout</button>
							</form>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</nav>
	<div class="py-4">
		<div class="mx-auto max-w-7xl sm:px-4 lg:px-8">
			<slot />
		</div>
	</div>
</div>
