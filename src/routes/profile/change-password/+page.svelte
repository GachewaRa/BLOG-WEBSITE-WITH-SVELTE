    <script>
    import { postRequest } from "$lib/utils/api";
    import { goto } from '$app/navigation';

    let email = "";
    let current_password = "";
    let new_password = "";
    let successMessage = "";
    let showPassword = false;
    async function changePassword() {
        successMessage = "";
        try {
            const response = await postRequest("/auth/users/set_password/", {
                email: email,
                current_password: current_password,
                new_password: new_password,
            });

            if (response.data) {
                successMessage = "Password changed successfully! Redirecting to login...";
                // Redirect to login after a short delay
                setTimeout(() => {
                    goto('/login');
                }, 2000); // 2 seconds delay
            } else if (response.error) {
                successMessage = response.error || "Password change failed. Please check your credentials.";
            } else {
                successMessage = "Password change failed. Please check your credentials.";
            }
        } catch (error) {
            successMessage = "Error connecting to the server.";
            console.error("Change Password Error:", error);
        }
    }
</script>

<div class="container">
    <div class="change-password-box">
        <h2>Change Password</h2>
        <p style="margin-bottom: 1.5rem; opacity: 0.9;">Enter your credentials to change your password.</p>

        <form on:submit|preventDefault={changePassword}>
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


            <div class="form-group password-group">
                <label for="current_password">Current Password</label>
                <div class="password-container">
                    <input
                        id="current_password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Current Password"
                        bind:value={current_password}
                        class="input-field"
                        required
                    />
                    <span class="toggle-password" on:click={() => showPassword = !showPassword}>
                        {#if showPassword}
                            👁️ <!-- Eye Open Icon -->
                        {:else}
                            👁️‍🗨️ <!-- Eye Closed Icon -->
                        {/if}
                    </span>
                </div>
            </div>
            

            <div class="form-group password-group">
                <label for="new_password">New Password</label>
                <div class="password-container">
                    <input
                        id="new_password"
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        bind:value={new_password}
                        class="input-field"
                        required
                    />
                    <span class="toggle-password" on:click={() => showPassword = !showPassword}>
                        {#if showPassword}
                            👁️ <!-- Eye Open Icon -->
                        {:else}
                            👁️‍🗨️ <!-- Eye Closed Icon -->
                        {/if}
                    </span>
                </div>
            </div>
            

            <button type="submit">Change Password</button>
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

    /* Change Password Styling */
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

    .change-password-box {
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

    .change-password-box:hover {
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

    /* Password field container */
    .password-container {
        position: relative;
        display: flex;
        align-items: center;
    }

    /* Input field inside the password container */
    .password-container input {
        width: 100%;
        padding-right: 40px; /* Space for the eye icon */
    }

    /* Eye icon styling */
    .toggle-password {
        position: absolute;
        right: 10px;
        cursor: pointer;
        font-size: 1.2rem;
        color: var(--primary-light);
        transition: color 0.3s;
    }

    .toggle-password:hover {
        color: var(--highlight);
    }

</style>