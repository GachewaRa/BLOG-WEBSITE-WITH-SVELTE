<script>
    import { postRequest } from "$lib/utils/api";

    let email = "";
    let message = "";
    let loading = false;

    async function resetPassword() {
        loading = true;
        message = "";

        try {
            const response = await postRequest("/auth/users/reset_password/", { email });
            if (response.data) {
                message = "If this email exists, a password reset link has been sent.";
            } else {
                message = "Something went wrong. Please try again.";
            }
        } catch (error) {
            message = "Error connecting to server.";
        }

        loading = false;
    }
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .card {
        width: 90%;
        max-width: 450px;
        background: var(--overlay-dark);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
        text-align: center;
        margin: 1.5rem 0;
        border: 1px solid rgba(255, 215, 0, 0.2);
    }

    h2 {
        margin-bottom: 1rem;
        color: #fff;
    }

    p {
        font-size: 0.9rem;
        color: #fff;
        margin-bottom: 1.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    input {
        width: 100%;
        padding: 12px;
        border: 1px solid #0c0c0c;
        border-radius: 5px;
        font-size: 1rem;
        outline: none;
        color: #000; /* Add dark text color */
        background-color: #fff; /* Ensure white background */
    }

    button {
        width: 100%;
        padding: 12px;
        background: rgba(50, 30, 10, 0.8);
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 5px;
        transition: 0.3s ease;
    }

    button:hover {
        background: #000;
    }

    .message {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: green;
    }

    .error {
        color: red;
    }

    .loading {
        background: #ccc;
        cursor: not-allowed;
    }
</style>

<div class="container">
    <div class="card">
        <h2>Forgot Password?</h2>
        <p>Enter your email below and we’ll send you a password reset link.</p>

        <form class="form-group" on:submit|preventDefault={resetPassword}>
            <input type="email" bind:value={email} required placeholder="Enter your email" />
            <button type="submit" class={loading ? "loading" : ""} disabled={loading}>
                {loading ? "Sending..." : "Reset Password"}
            </button>
        </form>

        {#if message}
            <p class="message">{message}</p>
        {/if}
    </div>
</div>
