<script>
	import { PUBLIC_HOME_URL } from '$env/static/public';
	import { getImageURL } from '$lib/utils';
	export let user;
</script>

<a class="group" href={`/people/${user.id}`}>
	<div
		class="border border-neutral/25 rounded group-hover:shadow-md transition-all duration-50 group-active:scale-[99%] p-2 md:p-4 h-full"
	>
		<div class="flex items-center gap-2">
			<div class="avatar">
				<div class="w-16 rounded-full shadow-md group-hover:shadow-lg border border-primary">
					<img
						class="group-hover:scale-[105%] group-hover:saturate-150 transition-all duration-500"
						src={user?.avatar
							? getImageURL(user?.collectionId, user?.id, user?.avatar)
							: `https://ui-avatars.com/api/?name=${user?.name}`}
						alt="User avatar"
					/>
				</div>
			</div>
			<div>
				<div class="text-lg font-semibold capitalize">
					{user.name}
				</div>
				<div class="text-md font-thin capitalize">{user.job_title}</div>
				{#if user.division}
					<div class="badge badge-sm badge-primary rounded mt-2 uppercase py-3">
						{user.division}
					</div>
				{/if}
			</div>
		</div>
	</div>
</a>
