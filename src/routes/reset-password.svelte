<script>
    import { postRequest } from "$lib/utils/api";
    import { page } from "$app/stores";

    let uid = "";
    let token = "";
    let newPassword = "";
    let message = "";

    $: {
        const params = new URLSearchParams($page.url.search);
        uid = params.get("uid");
        token = params.get("token");
    }

    async function confirmReset() {
        try {
            const response = await postRequest("/auth/users/reset_password_confirm/", {
                uid,
                token,
                new_password: newPassword
            });

            if (response.data) {
                message = "Password reset successful! You can now log in.";
            } else {
                message = "Failed to reset password. Please try again.";
            }
        } catch (error) {
            message = "Error connecting to server.";
        }
    }
</script>

<div class="container">
    <h2>Reset Password</h2>
    <p>Enter a new password for your account.</p>

    <form on:submit|preventDefault={confirmReset}>
        <input type="password" bind:value={newPassword} required placeholder="New Password" />
        <button type="submit">Change Password</button>
    </form>

    {#if message}
        <p class="info-message">{message}</p>
    {/if}
</div>
