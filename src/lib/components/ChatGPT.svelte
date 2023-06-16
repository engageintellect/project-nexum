<script>
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
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
					<div>
						Anim cupidatat incididunt laboris velit Lorem eu aute. Qui ut proident veniam ea quis
						anim laboris irure velit velit consequat. Consectetur culpa incididunt laboris nulla
						pariatur magna. Fugiat magna ex deserunt enim ad commodo aliquip pariatur. Excepteur id
						velit id consectetur aliqua consectetur ut qui excepteur anim. Laborum ullamco veniam
						quis cupidatat Lorem non culpa id incididunt dolor.
					</div>
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
				<input class="w-full input input-bordered rounded" bind:value={$input} />
				<button type="submit" class="btn btn-primary rounded">
					<Icon src={PaperAirplane} class="text-white w-10 h-10" />
				</button>
			</form>
		</div>
	</div>
</div>
