<script>
	import { githubURL } from '../../lib/store';
	import FeatureCard from '$lib/components/FeatureCard.svelte';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineGithub from 'svelte-icons-pack/ai/AiOutlineGithub';
	import FaRobot from 'svelte-icons-pack/fa/FaSolidRobot';
	import BsCardList from 'svelte-icons-pack/bs/BsCardList';
	import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';
	import AiOutlineApi from 'svelte-icons-pack/ai/AiOutlineApi';
	import AiFillDatabase from 'svelte-icons-pack/ai/AiFillDatabase';
	import SiSvelte from 'svelte-icons-pack/si/SiSvelte';
	import SiOpenai from 'svelte-icons-pack/si/SiOpenai';
	import SiTailwindcss from 'svelte-icons-pack/si/SiTailwindcss';
	import BiNetworkChart from 'svelte-icons-pack/bi/BiNetworkChart';
	import BiUserCircle from 'svelte-icons-pack/bi/BiUserCircle';
	import SiVercel from 'svelte-icons-pack/si/SiVercel';

	import homepage from '$lib/assets/homepage.png';
	import quantumComputing from '$lib/assets/quantum-computing.png';

	import nexumImg from '$lib/assets/nexum.png';
</script>

<div>
	<div class="hero mb-20">
		<div class="hero-content flex w-full flex-col items-center justify-between lg:flex-row-reverse">
			<img src={nexumImg} class="object-cover max-w-0 lg:max-w-lg" alt="hero" />
			<div class="max-w-lg">
				<div class="text-5xl md:text-6xl lg:text-7xl font-bold">Connect People and Content</div>
				<div class="text-xl lg:text-2xl py-6">
					A user-driven knowledge base that connects content and people to improve cross-team
					connections, foster collaborations, improve data modeling, and increase productivity.
				</div>

				<div class="flex items-center gap-2">
					<a
						href="/register"
						class="btn btn-primary bg-purple-500 border-purple-500 hover:bg-purple-700 rounded"
						>Get Started</a
					>
					<a href={$githubURL} class="btn btn-outline group rounded">
						<div class="flex gap-1 items-center">
							<div
								class="group-hover:fill-purple-500 fill-purple-500 transition-color duration-200"
							>
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
				allow for a way to connect with the people behind the content. <span class="font-bold"
					>We're here to change all of that.</span
				>
			</div>
		</div>
		<div class="relative">
			<img
				src={homepage}
				alt="hello"
				class="max-3xl lg:max-w-6xl shadow-lg border border-neutral/10/50"
			/>
		</div>
	</div>

	<div class="px-4 my-20 max-w-5xl text-center mx-auto flex flex-col items-center">
		<div>
			<div class="text-4xl font-bold flex justify-center">Dynamic UI.</div>

			<div class="my-5 text-lg">
				<strong>A UI that adapts</strong> to your content to show you only the most relevant information
				at all times. Your page has tags and headings? Great! We'll show you a table of contents and
				all of your tags. No Headings? No problem. We'll automatically hide any elements that aren't
				being used, so your content shines.
			</div>
		</div>
		<img
			src={quantumComputing}
			alt="hello"
			class="max-3xl lg:max-w-6xl shadow-lg border border-neutral/10/50"
		/>
	</div>

	<div class="px-4 my-20 max-w-5xl text-center mx-auto flex flex-col items-center">
		<div>
			<div class="text-4xl font-bold flex justify-center">
				Quick access to the things that matter most.
			</div>

			<div class="my-5 text-lg">
				Personalized user dashboards that give you <strong
					>quick access to the things that matter most</strong
				> to you.
			</div>
		</div>
		<img
			src={homepage}
			alt="hello"
			class="max-3xl lg:max-w-6xl shadow-lg border border-neutral/10/50"
		/>
	</div>

	<div class="my-10 bg-base-200 py-10 rounded shadow-lg">
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

	<div class="my-40">
		<div class="px-4 my-10 max-w-5xl text-center mx-auto flex flex-col items-center">
			<div>
				<div class="text-4xl font-bold flex justify-center">Optimized for Mobile.</div>

				<div class="my-5 text-lg">
					Unlike traditional knowledge bases, we focus on connecting people and content. We believe
					that the best way to learn is through people. Most knowledge bases are static and don't
					allow for a way to connect with the people behind the content. We want to change that.
				</div>
			</div>
		</div>

		<div class="flex justify-center">
			<a href="/about" class="mockup-phone border-neutral/10 shadow-xl shadow-purple-500">
				<div class="camera" />
				<div class="display">
					<div class="artboard artboard-demo phone-1">
						<div class="text-5xl font-bold animate-pulse">
							Ne<span class="text-purple-500">x</span>um
						</div>
						<div>Optimized for mobile.</div>
					</div>
				</div>
			</a>
		</div>

		<div class="my-40">
			<div class="px-4 my-10 max-w-5xl text-center mx-auto flex flex-col items-center">
				<div>
					<div class="text-4xl font-bold flex justify-center">Features</div>

					<div class="my-5 text-lg">The features that matter most to you.</div>
				</div>
			</div>

			<div
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 md:gap-5 px-4 md:px-0"
			>
				<FeatureCard
					title="Open Source"
					description="Built using open-sourced technologies."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={AiOutlineGithub} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Built for AI"
					description="Designed with AI Embeddings in mind."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={FaRobot} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Flat Page Structure"
					description="Don't worry about nested pages, or where to put your content."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={BsCardList} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Designed for Search"
					description="Search-centric user experience, with a focus on speed."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={AiOutlineSearch} size="24" />
					</div></FeatureCard
				>
				<FeatureCard
					title="Sane APIs"
					description="Self-documented APIs for easy and seamless integrations with your app or service."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={AiOutlineApi} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Integrated CMS"
					description="Fully integrated backend CMS for easy content management."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={AiFillDatabase} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="Connect People and Content"
					description="People are the best way to learn. Connect with the people behind the content.	"
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={BiNetworkChart} size="24" />
					</div></FeatureCard
				>

				<FeatureCard
					title="User-first design"
					description="Minimalist design with a focus on the user experience."
					button="click me"
					><div class="fill-teal-500 text-teal-500">
						<Icon src={BiUserCircle} size="24" />
					</div></FeatureCard
				>
			</div>
		</div>

		<div class="my-40">
			<div class="px-4 my-10 max-w-5xl text-center mx-auto flex flex-col items-center">
				<div>
					<div class="text-4xl font-bold flex justify-center">Technology Stack</div>

					<div class="my-5 text-lg">
						Built using state-of-the-art technologies that you will love.
					</div>
				</div>

				<div class="my-10 flex flex-col md:flex-row gap-2 sm:gap-5 w-full items-center">
					<a
						href="https://kit.svelte.dev/"
						target="_blank"
						class="flex-col hover:scale-[102%] tranistion-all duration-200 h-40 w-full lg:h-72 lg:w-72 shadow-lg border border-neutral/10/50 rounded flex items-center
						justify-center hover:fill-orange-500"
					>
						<Icon src={SiSvelte} size="72" />
						<div>Sveltekit</div>
					</a>

					<a
						href="https://vercel.com"
						target="_blank"
						class="flex-col hover:scale-[102%] tranistion-all duration-200 h-40 w-full lg:h-72 lg:w-72 lg:translate-y-5 shadow-lg border border-neutral/10/50 rounded flex items-center justify-center hover:fill-neutral/50"
					>
						<Icon src={SiVercel} size="72" />
						<div>Vercel</div>
					</a>

					<a
						href="https://openai.com/"
						target="_blank"
						class="flex-col hover:scale-[102%] tranistion-all duration-200 h-40 w-full lg:h-72 lg:w-72 shadow-lg border border-neutral/10/50 rounded flex items-center justify-center hover:fill-teal-500"
					>
						<Icon src={SiOpenai} size="72" />
						<div>OpenAI</div>
					</a>

					<a
						href="https://tailwindcss.com/"
						target="_blank"
						class="flex-col hover:scale-[102%] tranistion-all duration-200 h-40 w-full lg:h-72 lg:w-72 lg:translate-y-5 shadow-lg border border-neutral/10/50 rounded flex items-center justify-center hover:fill-sky-600"
					>
						<Icon src={SiTailwindcss} size="72" />
						<div>Tailwind CSS</div>
					</a>

					<a
						href="https://huggingface.co/"
						target="_blank"
						class="flex-col saturate-0 hover:saturate-100 hover:scale-[102%] tranistion-all duration-200 h-40 w-full lg:h-72 lg:w-72 shadow-lg border border-neutral/10/50 rounded flex items-center justify-center hover:fill-sky-600"
					>
						<!-- <Icon src={SiTailwindcss} size="72" /> -->
						<div class="text-[64px]">🤗</div>
						<div>Hugging Face</div>
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="my-20">
		<div class="flex items-center justify-center px-4">
			<div
				class="flex flex-col justify-center gap-2 max-w-3xl border border-neutral/10/50 p-10 rounded shadow-lg w-full items-center"
			>
				<div class="max-w-lg">
					<div class="text-4xl flex justify-center font-bold my-5">Contact</div>
					<div class="text-xl">
						Have a question? Want to learn more? We'd love to hear from you. Send us a message and
						we'll get back to you as soon as possible.
					</div>
					<a
						href="mailto:jc9361@gmail.com"
						target="_blank"
						class="btn btn-primary rounded w-full my-5">Let's Chat</a
					>
				</div>
			</div>
		</div>
	</div>
</div>
