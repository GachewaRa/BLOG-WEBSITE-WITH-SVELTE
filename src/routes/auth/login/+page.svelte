<script>
    import { postRequest } from "$lib/utils/api";

    let email = "";
    let password = "";
    let successMessage = "";

    async function login() {
        successMessage = "";
        try {
            const response = await postRequest("/auth/jwt/create/", {
                email: email,
                password: password,
            });

            if (response.data) {
                successMessage = "Login successful!";
                email = "";
                password = "";
                // You would typically store the token here, e.g., in localStorage
                console.log("Token:", response.data.access);
                console.log("Refresh token:", response.data.refresh);
            } else if (response.error) {
                successMessage = response.error || "Login failed. Please check your credentials.";
            } else {
                successMessage = "Login failed. Please check your credentials.";
            }
        } catch (error) {
            successMessage = "Error connecting to the server.";
            console.error("Login Error:", error);
        }
    }
</script>

<div class="container">
    <div class="login-box">
        <h2>Login</h2>
        <p style="margin-bottom: 1.5rem; opacity: 0.9;">Enter your credentials to log in.</p>

        <form on:submit|preventDefault={login}>
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    bind:value={email}
                    class="input-field"
                    required
                />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    bind:value={password}
                    class="input-field"
                    required
                />
            </div>

            <button type="submit">Login</button>
        </form>

        {#if successMessage}
            <p class="success-message" class:error-message={successMessage.includes("failed")}>
                {successMessage}
            </p>
        {/if}
    </div>
</div>

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
  
    /* Login Styling */
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: radial-gradient(circle, var(--primary-dark), #3A1F00);
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23BE8A44' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
      color: var(--text-light);
      font-family: 'Poppins', sans-serif;
      padding: 2rem 1rem;
    }
  
    .login-box {
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
  
    .login-box:hover {
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
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .success-message {
      color: var(--highlight);
      margin-top: 1rem;
      font-size: 0.9rem;
      opacity: 0.8;
    }
</style>