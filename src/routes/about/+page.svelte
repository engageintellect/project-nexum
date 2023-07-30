<script>
	import { githubURL } from '../../lib/store';

	import FeatureCard from '$lib/components/FeatureCard.svelte';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineGithub from 'svelte-icons-pack/ai/AiOutlineGithub';
	import homepage from '$lib/assets/homepage.png';
	import quantumComputing from '$lib/assets/quantum-computing.png';
</script>

<div>
	<div class="hero mb-20">
		<div class="hero-content flex w-full flex-col items-center justify-between lg:flex-row-reverse">
			<img
				src="https://cdn.discordapp.com/attachments/1008571063732539392/1115921630120656957/engage_intellect_cyberpunk_graph_network_on_a_white_background_5b873da3-eb66-4c8a-b8dd-6dad314f3238.png"
				class="object-cover max-w-0 lg:max-w-lg animate-pulse"
			/>
			<div class="max-w-lg">
				<div class="text-6xl lg:text-7xl font-bold">Connect People and Content</div>
				<div class="text-2xl py-6">
					A people-driven knowledge base that connects people and content to improve cross-team
					connections, foster collaborations, and improve modeling.
				</div>

				<div class="flex items-center gap-2">
					<a
						href="/register"
						class="btn btn-primary bg-purple-500 border-purple-500 hover:bg-purple-700 rounded"
						>Get Started</a
					>
					<a href={$githubURL} class="btn btn-outline group rounded">
						<div class="flex gap-1 items-center">
							<div class="group-hover:fill-base-100 transition-color duration-200">
								<Icon src={AiOutlineGithub} size="20" />
							</div>
							<div class="">GitHub</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="divider" />

	<div class="px-4 my-20 max-w-5xl text-center mx-auto flex flex-col items-center group">
		<div>
			<div class="text-4xl font-bold flex justify-center">Everything in one place.</div>

			<div class="my-5 text-lg">
				Unlike traditional knowledge bases, we focus on connecting people and content. We believe
				that the best way to learn is through people. Most knowledge bases are static and don't
				allow for a way to connect with the people behind the content. We want to change that.
			</div>
		</div>
		<div class="relative">
			<img
				src={homepage}
				alt="hello"
				class="max-3xl lg:max-w-6xl shadow-lg border border-primary/50"
			/>

			<div
				class="group-hover:opacity-100 opacity-0 transition-all duration-500 absolute -bottom-5 -right-5 shadow-lg h-64 w-full max-w-lg bg-base-100 border border-primary/50 rounded"
			>
				<div class="text-2xl font-semibold">Built on search.</div>
			</div>
		</div>
	</div>

	<div class="px-4 my-20 max-w-5xl text-center mx-auto flex flex-col items-center">
		<div>
			<div class="text-4xl font-bold flex justify-center">Dynamic UI</div>

			<div class="my-5 text-lg">
				Unlike traditional knowledge bases, we focus on connecting people and content. We believe
				that the best way to learn is through people. Most knowledge bases are static and don't
				allow for a way to connect with the people behind the content. We want to change that.
			</div>
		</div>
		<img
			src={quantumComputing}
			alt="hello"
			class="max-3xl lg:max-w-6xl shadow-lg border border-primary/50"
		/>
	</div>

	<div class="px-4 my-20 max-w-5xl text-center mx-auto flex flex-col items-center">
		<div>
			<div class="text-4xl font-bold flex justify-center">
				Quick access to the things that matter most.
			</div>

			<div class="my-5 text-lg">
				Unlike traditional knowledge bases, we focus on connecting people and content. We believe
				that the best way to learn is through people. Most knowledge bases are static and don't
				allow for a way to connect with the people behind the content. We want to change that.
			</div>
		</div>
		<img
			src={homepage}
			alt="hello"
			class="max-3xl lg:max-w-6xl shadow-lg border border-primary/50"
		/>
	</div>

	<div class="my-10 bg-base-200 py-10 rounded">
		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1586543354240-2187898bb2e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGNvbGxhYm9yYXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">Improve Cross-team Connections</div>
					<div class="py-5">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
						exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>

		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row-reverse xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGFib3JhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">Foster Collaborations</div>
					<div class="py-5">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
						exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>

		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">Better Developer Experience</div>
					<div class="py-5">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
						exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>

		<div class="hero min-h-full rounded">
			<div class="hero-content flex-col lg:flex-row-reverse xl:gap-32">
				<img
					alt="hero"
					src="https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80"
					class="h-80 w-full object-cover rounded shadow-lg"
				/>
				<div class="text-center max-w-lg">
					<div class="text-3xl font-bold">Improved Data Modeling</div>
					<div class="py-5">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
						exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
					</div>
					<!-- <button class="btn btn-primary w-full">Get Started</button> -->
				</div>
			</div>
		</div>
	</div>

	<div class="my-20">
		<div class="px-4 my-5 max-w-5xl text-center mx-auto flex flex-col items-center">
			<div>
				<div class="text-4xl font-bold flex justify-center">Features</div>

				<div class="my-5 text-lg">
					Unlike traditional knowledge bases, we focus on connecting people and content. We believe
					that the best way to learn is through people. Most knowledge bases are static and don't
					allow for a way to connect with the people behind the content. We want to change that.
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5">
			<FeatureCard
				title="Modern UX"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Built for AI"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Search-centric"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Filter by person, tags, page content, etc."
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Easy to user interface"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Integrated CMS"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Built-in Analytics"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Modern Tech Stack"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Self-documenting APIs"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Easy integration with existing tools"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Mobile-first development."
				description="some descripdksjdklsj dlksj dkljs dlkjs dlkj skldj slkdj slkdj lksjd lksjd lksjd lksjd lksjd lksjdlskdj dtion about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>

			<FeatureCard
				title="Flat Page Structure"
				description="some description about shoes"
				image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				button="click me"
			/>
		</div>
	</div>
</div>
