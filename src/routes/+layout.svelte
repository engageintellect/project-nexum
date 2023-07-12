<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { getImageURL } from '$lib/utils';
	import { Icon, Plus } from 'svelte-hero-icons';
	import { Footer } from '$lib/components';
	import { PUBLIC_SEARCH_URL } from '$env/static/public';

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
					<button classs="btn">
						<a
							href="/pages/new"
							class="btn btn-primary btn-outline hover:scale-[105%] active:scale-[98%] transition-transform duration-50"
						>
							<Icon src={Plus} class="w-5 h-5" />
						</a>
					</button>
				</div>
				<div class="dropdown md:dropdown-hover dropdown-end">
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
						class="menu menu-compact dropdown-content p-2 shadow-lg bg-base-100 rounded-box w-52 z-50"
					>
						<div class="my-2">
							<li>
								<a href={`/profiles/${data.user.id}`} class="justify-between">My Profile</a>
							</li>

							<li>
								<a href="/my/pages" class="justify-between">My Pages</a>
							</li>

							<li>
								<a href="/my/dashboard" class="justify-between">My Dashboard</a>
							</li>
						</div>
						<hr />

						<div class="my-2">
							<li>
								<a href="/profiles" class="justify-between"> Profiles </a>
							</li>

							<li>
								<a href="/ai" class="justify-between"
									>ET-GPT<span class="badge badge-error badge-sm uppercase py-3 rounded"
										>Experimental</span
									></a
								>
							</li>

							<li>
								<a href={PUBLIC_SEARCH_URL} target="_blank" class="justify-between"
									>AI Search<span class="badge badge-error badge-sm uppercase py-3 rounded"
										>Experimental</span
									></a
								>
							</li>
						</div>
						<div>
							<hr />
							<li><a href="/my/settings">Settings</a></li>
							<li>
								<form action="/logout" method="POST">
									<button type="submit" class="w-full text-start">Logout</button>
								</form>
							</li>
						</div>
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
	<Footer />
</div>
