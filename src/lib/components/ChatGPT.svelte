<!-- <script>
	import { Icon, MagnifyingGlass, PaperAirplane } from 'svelte-hero-icons';
	import { useChat } from 'ai/svelte';
	const { input, handleSubmit, messages } = useChat();
</script>

<div class="max-h-screen px-4">
	<div class="flex flex-col mt-10">
		<div class="flex-1">
			<h1 class="text-6xl font-bold">ET-GPT</h1>
			<p class="">
				ET-GPT is a GPT-3 powered chatbot that can answer questions about just about anything.
			</p>
			<div class="divider" />
		</div>

		<div class="overflow-scroll max-h-[50vh] shadow-lg rounded">
			<div class="max-w-md">
				<div class="overflow-hidden p-2">
					<ul class="text-left">
						{#each $messages as message}
							<li class="my-2">
								<span class="font-bold">{message.role}</span>: {@html message.content}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
		<div class="mt-5">
			<form class="flex gap-4" on:submit={handleSubmit}>
				<input class="w-full input input-bordered" bind:value={$input} />
				<button type="submit" class="btn btn-primary">
					<Icon src={PaperAirplane} class="text-white w-10 h-10" />
				</button>
			</form>
		</div>
	</div>
</div> -->

<script>
	import { Icon, MagnifyingGlass, PaperAirplane } from 'svelte-hero-icons';
	import { useChat } from 'ai/svelte';
	import { afterUpdate } from 'svelte';

	const { input, handleSubmit, messages } = useChat();

	// Scroll to the bottom of the chat after each update
	afterUpdate(() => {
		const chatContainer = document.getElementById('chat-container');
		chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
	});
</script>

<div class="min-h-screen max-h-screen px-4">
	<div class="flex flex-col mt-10">
		<div class="flex-1">
			<div class="text-center text-7xl font-bold tracking-tight text-base-content">
				<div>ET-GPT</div>
			</div>
			<div class="text-center mt-1">
				ET-GPT is a GPT-3 powered chatbot that can answer questions about just about anything.
			</div>

			<div class="divider" />
		</div>

		<div class="overflow-scroll max-h-[50vh] rounded" id="chat-container">
			<div class="max-w-full">
				<div class="overflow-hidden p-2">
					<ul>
						{#each $messages as message}
							<li class="my-2">
								{#if message.role === 'user'}
									<div class="chat chat-end">
										<div class="chat-header">User</div>
										<div class="chat-bubble chat-bubble-info">{@html message.content}</div>
									</div>
								{:else}
									<div class="chat chat-start">
										<div class="chat-header">Robot</div>
										<div class="chat-bubble">{@html message.content}</div>
									</div>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
		<div class="mt-5">
			<form class="flex gap-4" on:submit={handleSubmit}>
				<!-- svelte-ignore a11y-autofocus -->
				<input
					class="w-full input input-bordered"
					bind:value={$input}
					placeholder={'search for anything'}
					autofocus
				/>
				<button type="submit" class="btn btn-primary">
					<Icon src={PaperAirplane} class="text-white w-10 h-10" />
				</button>
			</form>
		</div>
	</div>
</div>
