<script>
	import { fade } from 'svelte/transition';
  </script>
  
  <svelte:head>
	<title>My Skills - Ra</title>
  </svelte:head>
  
  <section class="container mx-auto py-8">
	<div class="max-w-4xl mx-auto bg-white dark:bg-stone-900 shadow-md rounded-lg p-6">
	  <h1 class="text-3xl font-bold text-stone-900 dark:text-amber-100 mb-4" transition:fade>
		My Skills
	  </h1>
  
	  <!-- Introduction -->
	  <p class="text-stone-700 dark:text-stone-300 mb-6">
		I am a <span class="font-semibold text-amber-700 dark:text-amber-400">full-stack developer</span> specializing in backend development.  
		My work focuses on building scalable, efficient, and well-architected systems.
	  </p>
  
	  <!-- Technical Skills -->
	  <div class="mb-6">
		<h2 class="text-2xl font-semibold text-stone-900 dark:text-amber-100 mb-3">Tech Stack</h2>
		<div class="flex flex-wrap">
		  {#each ['Python', 'Django', 'FastAPI', 'JavaScript', 'NodeJS', 'React', 'Svelte', 'Tailwind', 'C++', 'PostgreSQL'] as tech}
			<span class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 text-sm px-3 py-1 rounded mr-2 mb-2">
			  {tech}
			</span>
		  {/each}
		</div>
	  </div>
  
	  <!-- Additional Topics -->
	  <div class="mb-6">
		<h2 class="text-2xl font-semibold text-stone-900 dark:text-amber-100 mb-3">Learning & Interests</h2>
		<ul class="list-disc list-inside text-stone-700 dark:text-stone-300">
		  <li>Software Architecture</li>
		  <li>Computer Networking</li>
		  <li>Algorithm Design</li>
		  <li>Databases</li>
		  <li>Blockchain</li>
		</ul>
	  </div>
  
	  <!-- Non-Tech Skills & Interests -->
	  <div>
		<h2 class="text-2xl font-semibold text-stone-900 dark:text-amber-100 mb-3">Beyond Tech</h2>
		<p class="text-stone-700 dark:text-stone-300 mb-4">
		  My interests and expertise extend beyond programming into areas that shape our world in deeper ways.
		</p>
		<ul class="list-disc list-inside text-stone-700 dark:text-stone-300">
		  <li>Philosophy & Meaning in Modern Society</li>
		  <li>History, especially African history and ancient civilizations, particularly ancient Egypt</li>
		  <li>Nature, Ecology, and Sustainability</li>
		  <li>Futurism, Technology’s Impact on Society</li>
		  <li>Reading, Research & Writing</li>
		</ul>
	  </div>
	</div>
  </section>
  