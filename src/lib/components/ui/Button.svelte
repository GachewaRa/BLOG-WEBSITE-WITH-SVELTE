<script>
    export let type = "button";
    export let variant = "primary"; // primary, secondary, outline
    export let size = "md"; // sm, md, lg
    export let disabled = false;
    export let fullWidth = false;
    export let href = null; // If provided, renders as <a> instead of button
    
    // Compute classes based on props
    $: variantClasses = {
      primary: "bg-black hover:bg-amber-100 text-amber-50 border-transparent",
      secondary: "bg-stone-700 hover:bg-stone-600 text-amber-50 border-transparent",
      outline: "bg-transparent hover:bg-amber-800/10 text-amber-800 border-amber-800",
    }[variant];
    
    $: sizeClasses = {
      sm: "py-1 px-3 text-sm",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-lg"
    }[size];
    
    $: widthClass = fullWidth ? "w-full" : "";
    
    // Combine all classes
    $: className = `inline-flex items-center justify-center border rounded-lg transition-colors ${variantClasses} ${sizeClasses} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
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