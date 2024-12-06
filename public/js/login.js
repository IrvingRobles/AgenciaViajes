document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Redirigir al usuario dependiendo del rol
            if (data.user.role === 'admin') {
                window.location.href = '/admin/admin-index.html';
            } else {
                window.location.href = '/';
            }
        } else {
            alert('Error: ' + data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
    }
});