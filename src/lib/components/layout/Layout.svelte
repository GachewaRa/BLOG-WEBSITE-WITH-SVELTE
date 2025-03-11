<script>
    // MainContent.svelte
  </script>
  
  <div class="bg-white p-8 border-8">
    <h2 class="text-center text-2xl font-bold mb-1 font-sans mt-0 pt-16">YOU ARE HOME</h2>
    <div class="flex">
      <!-- Slot for dynamic content -->
      <div class="w-2/3 pr-4">
        <slot name="text-content"></slot>
      </div>
      <div class="w-1/3">
        <slot name="image-content"></slot>
      </div>
    </div>
  </div>
  
  <style>
    /* Additional custom styles that might be hard to achieve with Tailwind alone */
    :global(.text-content p) {
      font-size: 16px;
      font-family: 'Ubuntu', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 3;
      margin-bottom: 1em;
    }
    
    :global(.intro-text) {
      margin-bottom: 16px;
      line-height: 1.75;
    }
    
    :global(.quote) {
      font-style: italic;
      margin-bottom: 16px;
    }
    
    :global(.bold-text) {
      font-weight: bold;
    }
    
    :global(.profile-img) {
      width: 100%;
      border-radius: 0.5rem;
    }
  </style>