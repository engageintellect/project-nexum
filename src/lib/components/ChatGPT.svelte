<script>
	import { Icon, MagnifyingGlass, PaperAirplane } from 'svelte-hero-icons';
	import { useChat } from 'ai/svelte';
	const { input, handleSubmit, messages } = useChat();
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">GPT 3.5-turbo</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
			</p>

			<div class="my-10">
				<div class="max-h-[40rem] overflow-scroll my-5">
					<ul class="text-left">
						{#each $messages as message}
							<li class="my-2">
								<span class="font-bold">{message.role}</span>: {@html message.content}
							</li>
						{/each}
					</ul>
				</div>

				<form class="flex" on:submit={handleSubmit}>
					<input class="w-full input input-bordered" bind:value={$input} />
					<button type="submit" class="btn btn-primary">
						<Icon src={PaperAirplane} class="text-white w-10 h-10" />
					</button>
				</form>
			</div>

			<button class="btn btn-primary">Get Started</button>
		</div>
	</div>
</div>
