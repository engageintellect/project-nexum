<script>
	import { page } from '$app/stores';
	const navigation = [
		{
			title: 'Profile',
			href: '/my/settings/profile'
		},
		{
			title: 'Account',
			href: '/my/settings/account'
		},
		{
			title: 'Security',
			href: '/my/settings/security'
		}
	];
</script>

<div class="w-full h-full px-2 mt-10">
	<div class="text-6xl font-bold">Settings</div>
	<div class="divider" />
</div>
<div class="flex w-full h-full space-x-4">
	<ul class="menu bg-base-100 w-56 p-2 rounded-box">
		{#each navigation as navItem}
			<li>
				<a
					href={navItem.href}
					class="font-medium {$page.url.pathname === navItem.href ? 'active hover:bg-neutral' : ''}"
					>{navItem.title}</a
				>
			</li>
		{/each}
	</ul>
	<div class="w-full max-w-lg px-2">
		<slot />
	</div>
</div>
