<script>
	import { onMount } from "svelte";
	import { postRequest } from "$lib/utils/api";
	
	let name = "";
	let email = "";
	let successMessage = "";
	
	// Function to subscribe the user
	async function subscribe() {
		successMessage = "";
		try {
			const response = await postRequest("/accounts/newsletter/subscribe/", {
				name, // Directly pass name and email as payload
				email,
			});

			if (response.data) { // Check if response.data exists (success)
				successMessage = "You have been added to the newsletter. Thank you!";
				name = "";
				email = "";
			} else if (response.error) { // Check if response.error exists (failure)
				successMessage = response.error || "Something went wrong. Try again.";
			} else {
				successMessage = "Something went wrong. Try again.";
			}

		} catch (error) {
			successMessage = "Error connecting to the server.";
			console.error("Subscription Error:", error);
		}
	}
	
	// Detect if the user is on mobile (for phone link)
	let isMobile = false;
	onMount(() => {
	  isMobile = window.innerWidth < 768;
	});
	
	// WhatsApp link (with prefilled message)
	const whatsappNumber = "254105228491"; // Your WhatsApp number
	const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I'm interested in your services!")}`;
  </script>
  
  <style>
	/* African-inspired color palette */
	:root {
	  --primary-dark: #5E2600;     /* Rich brown */
	  --primary-medium: #D2691E;   /* Terracotta/clay */
	  --primary-light: #F5DEB3;    /* Beige/sand */
	  --accent-green: #556B2F;     /* Olive green */
	  --accent-orange: #FF7F00;    /* Sunset orange */
	  --highlight: #FFD700;        /* Gold */
	  --text-light: #F9F5EB;       /* Off-white */
	  --overlay-dark: rgba(50, 30, 10, 0.8); /* Semi-transparent brown */
	}
  
	/* Contact & Newsletter Styling */
	.container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  min-height: 100vh;
	  background: radial-gradient(circle, var(--primary-dark), #3A1F00);
	  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23BE8A44' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
	  color: var(--text-light);
	  font-family: 'Poppins', sans-serif;
	  padding: 2rem 1rem;
	}
  
	.contact-box, .newsletter-box {
	  background: var(--overlay-dark);
	  border-radius: 12px;
	  padding: 2rem;
	  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
	  width: 90%;
	  max-width: 450px;
	  text-align: center;
	  margin: 1.5rem 0;
	  border: 1px solid rgba(255, 215, 0, 0.2);
	}
  
	.contact-box:hover, .newsletter-box:hover {
	  transform: translateY(-5px);
	  box-shadow: 0 12px 40px rgba(255, 215, 0, 0.15);
	}
  
	h2 {
	  color: var(--highlight);
	  margin-bottom: 1.5rem;
	  font-size: 1.8rem;
	  position: relative;
	  display: inline-block;
	}
  
	h2::after {
	  content: '';
	  position: absolute;
	  bottom: -8px;
	  left: 25%;
	  width: 50%;
	  height: 3px;
	  background: linear-gradient(90deg, transparent, var(--primary-medium), transparent);
	}
  
	.contact-item {
	  display: flex;
	  align-items: center;
	  justify-content: flex-start;
	  gap: 15px;
	  margin: 1.2rem 0;
	  padding: 0.8rem;
	  background: rgba(255, 255, 255, 0.05);
	  border-radius: 8px;
	  transition: background 0.3s;
	}
  
	.contact-item:hover {
	  background: rgba(255, 255, 255, 0.1);
	}
  
	.icon {
	  font-size: 1.5rem;
	  color: var(--accent-orange);
	}
  
	a {
	  color: var(--primary-light);
	  text-decoration: none;
	  font-weight: 600;
	  transition: color 0.3s, transform 0.2s;
	  display: inline-block;
	}
  
	a:hover {
	  color: var(--highlight);
	  transform: scale(1.05);
	}
  
	/* Form styling */
	.form-group {
	  margin-bottom: 1.2rem;
	  text-align: left;
	}
  
	label {
	  display: block;
	  margin-bottom: 0.5rem;
	  color: var(--primary-light);
	  font-size: 0.9rem;
	}
  
	.input-field {
	  width: 100%;
	  padding: 0.8rem 1rem;
	  border-radius: 6px;
	  border: 1px solid rgba(255, 215, 0, 0.3);
	  background: rgba(255, 255, 255, 0.1);
	  color: var(--text-light);
	  font-size: 1rem;
	  transition: all 0.3s;
	}
  
	.input-field:focus {
	  outline: none;
	  border-color: var(--highlight);
	  box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
	  background: rgba(255, 255, 255, 0.15);
	}
  
	.input-field::placeholder {
	  color: rgba(255, 255, 255, 0.5);
	}
  
	button {
	  background: linear-gradient(135deg, var(--accent-green), var(--primary-medium));
	  color: var(--text-light);
	  border: none;
	  padding: 0.8rem 1.5rem;
	  border-radius: 8px;
	  cursor: pointer;
	  transition: all 0.3s;
	  font-weight: 600;
	  font-size: 1rem;
	  letter-spacing: 0.5px;
	  margin-top: 0.5rem;
	  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	  width: 100%;
	}
  
	button:hover {
	  background: linear-gradient(135deg, var(--primary-medium), var(--accent-orange));
	  transform: translateY(-2px);
	  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
	}
  
	button:active {
	  transform: translateY(1px);
	}
  
	.whatsapp-button {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  gap: 10px;
	  background: linear-gradient(135deg, #25D366, #128C7E);
	  margin-top: 0.5rem;
	}
  
	.whatsapp-button:hover {
	  background: linear-gradient(135deg, #128C7E, #075E54);
	}
  
	.success-message {
	  margin-top: 1rem;
	  padding: 0.8rem;
	  border-radius: 6px;
	  font-weight: 500;
	  background: rgba(0, 128, 0, 0.2);
	  border-left: 4px solid #00C853;
	}
  
	.error-message {
	  background: rgba(220, 20, 60, 0.2);
	  border-left: 4px solid crimson;
	}
  
	/* African pattern divider */
	.pattern-divider {
	  height: 30px;
	  width: 100%;
	  margin: 1rem 0;
	  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BE8A44' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	  opacity: 0.5;
	}
  
	@media (min-width: 768px) {
	  .container {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	  }
	  
	  .contact-box, .newsletter-box {
		margin: 1rem;
	  }
	}
  </style>
  
  <div class="container">
	<!-- Contact Section -->
	<div class="contact-box">
	  <h2>Connect With Me</h2>
	  
	  <div class="contact-item">
		<span class="icon">📧</span>
		<a href="mailto:gachewaadrian@gmail.com">gachewaadrian@gmail.com</a>
	  </div>
	  
	  {#if isMobile}
		<div class="contact-item">
		  <span class="icon">📞</span>
		  <a href="tel:+254105228491">+254 105 228 491</a>
		</div>
	  {/if}
	  
	  <div class="contact-item">
		<span class="icon">📍</span>
		<span>Nairobi, Kenya</span>
	  </div>
	  
	  <a href={whatsappURL} target="_blank">
		<button class="whatsapp-button">
		  <span class="icon">💬</span> WhatsApp Me
		</button>
	  </a>
	</div>
	
	<div class="pattern-divider"></div>
	
	<!-- Newsletter Section -->
	<div class="newsletter-box">
	  <h2>Join My Newsletter</h2>
	  <p style="margin-bottom: 1.5rem; opacity: 0.9;">Get the latest updates delivered to your inbox twice a month.</p>
	  
	  <form on:submit|preventDefault={subscribe}>
		<div class="form-group">
		  <label for="name">Name</label>
		  <input 
			id="name"
			type="text" 
			placeholder="Your Name" 
			bind:value={name} 
			class="input-field" 
			required
		  />
		</div>
		
		<div class="form-group">
		  <label for="email">Email</label>
		  <input 
			id="email"
			type="email" 
			placeholder="Your Email" 
			bind:value={email} 
			class="input-field" 
			required
		  />
		</div>
		
		<button type="submit">Subscribe</button>
	  </form>
	  
	  {#if successMessage}
		<p class="success-message" class:error-message={successMessage.includes("Error") || successMessage.includes("wrong")}>
		  {successMessage}
		</p>
	  {/if}
	</div>
  </div>