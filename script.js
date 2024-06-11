const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;
  
  // Simulate form submission (replace with actual logic)
  console.log(`Name: ${name}, Email: ${email}, Role: ${role}`);
  
  // Redirect to next page (replace with actual logic)
  window.location.href = 'document-check.html';
});
