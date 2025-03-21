<!-- src/lib/components/ui/Button.svelte -->
<script>
  export let type = "button";
  export let variant = "primary"; // primary, secondary, outline
  export let size = "md"; // sm, md, lg
  export let disabled = false;
  export let fullWidth = false;
  export let href = null; // If provided, renders as <a> instead of button
  
  import { isDarkMode } from '$lib/stores/appStore';
  
  // Compute classes based on props
  $: variantClasses = {
    primary: "bg-black hover:bg-amber-500 text-amber-50 border-transparent dark:bg-amber-800 dark:hover:bg-amber-700",
    secondary: "bg-stone-200 hover:bg-white text-amber-50 border-transparent dark:bg-stone-600 dark:hover:bg-stone-500",
    outline: "bg-black hover:bg-white text-amber-800 border-amber-800 dark:text-amber-100 dark:border-amber-100 dark:hover:bg-amber-100/10",
  }[variant];
  
  $: sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg"
  }[size];
  
  $: widthClass = fullWidth ? "w-full" : "";
  
  // Combine all classes
  $: className = `inline-flex items-center justify-center border rounded-lg transition-colors ${variantClasses} ${sizeClasses} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  // Rest of your Button.svelte component remains the same
</script>

{#if href && !disabled}
  <a {href} class={className}>
    <slot></slot>
  </a>
{:else}
  <button {type} {disabled} class={className} on:click {...$$restProps}>
    <slot></slot>
  </button>
{/if}

<style>
  button, a {
    position: relative;
    overflow: hidden;
  }
  
  button::after, a::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.2) 1%, transparent 1%);
    background-position: 50%;
    background-size: 10000%;
    transition: background 0.5s;
    opacity: 0;
  }
  
  button:active::after, a:active::after {
    background-size: 0%;
    opacity: 1;
    transition: 0s;
  }
</style>