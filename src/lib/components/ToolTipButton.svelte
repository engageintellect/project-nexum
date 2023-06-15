<script>
	export let btnLabel;
	export let btnTooltip;
	export let btnClass;
</script>

<div class="group relative w-max">
	<button class={btnClass}>{btnLabel}</button>
	<span
		class="pointer-events-none absolute -top-10 left-7 w-max opacity-0 transition-opacity duration-700 badge badge-info p-4 group-hover:opacity-100"
	>
		{btnTooltip}
	</span>
</div>
