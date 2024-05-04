<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { getImageURL } from '$lib/utils';
	import {
		Icon,
		Plus,
		Cog6Tooth,
		Power,
		Users,
		ChatBubbleLeftRight,
		MagnifyingGlassCircle,
		RectangleGroup,
		UserCircle,
		InformationCircle,
		Home
	} from 'svelte-hero-icons';
	import { Footer } from '$lib/components';
	import { PUBLIC_SEARCH_URL } from '$env/static/public';
	import { onMount } from 'svelte';

	export let data;

	let isLoaded = false;

	onMount(async () => {
		// Simulating an asynchronous action. In real scenarios, this could be an API call or some resource loading.
		// await new Promise((resolve) => setTimeout(resolve));
		isLoaded = true;
	});
</script>

<Toaster />
<div class="min-h-full">
	<nav class="navbar bg-base-100 border-b border-neutral/10 max-w-5xl mx-auto">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-2xl">
				<div>
					Ne<span class="text-purple-500">x</span>um
				</div>
			</a>
		</div>
		<div class="flex-none">
			{#if !data.user}
				<div class="dropdown dropdown-end">
					<a href="/login" class="btn rounded">Login</a>
					<a href="/register" class="btn rounded">Register</a>
				</div>
			{:else}
				<div class="dropdown dropdown-end mr-4">
					<button classs="btn">
						<a
							href="/pages/new"
							class="btn btn-ghost hover:scale-[105%] active:scale-[98%] transition-transform duration-50"
						>
							<Icon src={Plus} class="w-5 h-5" />
						</a>
					</button>

					<button classs="btn">
						<a
							href="/my/dashboard"
							class="btn btn-ghost hover:scale-[105%] active:scale-[98%] transition-transform duration-50"
						>
							<Icon src={RectangleGroup} class="w-5 h-5" />
						</a>
					</button>
				</div>
				<div class="dropdown md:dropdown-hover dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full border border-neutral/10">
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
						class="menu menu-compact border border-neutral/10 dropdown-content p-2 shadow-lg bg-base-100 rounded-box w-52 z-[999]"
					>
						<div class="my-2">
							<li>
								<a href={`/`} class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={Home} class="w-5 h-5" solid />
										</div>
										<div>Home</div>
									</div>
								</a>
							</li>

							<li>
								<a href={`/about`} class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={InformationCircle} class="w-5 h-5" solid />
										</div>
										<div>About</div>
									</div>
								</a>
							</li>

							<li>
								<a href="/people" class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={Users} class="w-5 h-5" solid />
										</div>
										<div>People</div>
									</div>
								</a>
							</li>
						</div>

						<hr class="border border-neutral/10/25" />

						<div class="my-2">
							<li>
								<a href={`/people/${data.user.id}`} class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={UserCircle} class="w-5 h-5" solid />
										</div>
										<div>My Profile</div>
									</div>
								</a>
							</li>

							<!-- <li>
								<a href="/my/pages" class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={RectangleStack} class="w-5 h-5" />
										</div>
										<div>My Pages</div>
									</div>
								</a>
							</li> -->

							<li>
								<a href="/my/dashboard" class="justify-between">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={RectangleGroup} class="w-5 h-5" solid />
										</div>
										<div>My Dashboard</div>
									</div>
								</a>
							</li>
						</div>

						<hr class="border border-neutral/10/25" />
						<div class="my-2">
							<li>
								<a href="/ai" class="flex justify-between w-full">
									<div class="flex gap-2">
										<div>
											<Icon src={ChatBubbleLeftRight} class="w-5 h-5" solid />
										</div>
										<div>ET-GPT</div>
									</div>
									<div class="badge badge-error uppercase badge-sm ml-5">beta</div>
								</a>
							</li>

							<li>
								<a href={PUBLIC_SEARCH_URL} target="_blank" class="flex w-full justify-between">
									<div class="flex gap-2">
										<div>
											<Icon src={MagnifyingGlassCircle} class="w-5 h-5" solid />
										</div>
										<div>AI Search</div>
									</div>
									<div class="badge badge-error uppercase badge-sm">beta</div>
								</a>
							</li>
						</div>

						<div class="my-2">
							<hr class="border border-neutral/10/25" />
							<li>
								<a href="/my/settings">
									<div class="flex gap-2 items-center">
										<div>
											<Icon src={Cog6Tooth} class="w-5 h-5" solid />
										</div>
										<div>Settings</div>
									</div>
								</a>
							</li>
							<li>
								<form action="/logout" method="POST">
									<button type="submit" class="w-full text-start">
										<div class="flex gap-2 items-center">
											<div>
												<Icon src={Power} class="w-5 h-5" solid />
											</div>
											<div>Logout</div>
										</div>
									</button>
								</form>
							</li>
						</div>
					</ul>
				</div>
			{/if}
		</div>
	</nav>
	<div class="py-4">
		<div class="mx-auto max-w-5xl">
			{#if !isLoaded}
				<div class="scale-150 flex justify-center items-center h-screen w-full">
					<span class="loading loading-dots loading-lg" />
				</div>
			{:else}
				<slot />
			{/if}
		</div>
	</div>
	<Footer />
</div>
