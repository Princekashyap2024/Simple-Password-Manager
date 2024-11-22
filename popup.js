document.getElementById('generate').addEventListener('click', () => {
    const password = generatePassword(12);
    document.getElementById('password').value = password;
  });
  
  document.getElementById('save').addEventListener('click', () => {
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (site && username && password) {
      chrome.storage.local.get({ passwords: [] }, (result) => {
        const passwords = result.passwords;
        passwords.push({ site, username, password });
        chrome.storage.local.set({ passwords }, () => alert('Password saved!'));
      });
    } else {
      alert('Please fill all fields.');
    }
  });
  
  chrome.storage.local.get({ passwords: [] }, (result) => {
    const passwordsList = document.getElementById('passwords');
    result.passwords.forEach(({ site, username, password }) => {
      const li = document.createElement('li');
      li.textContent = `${site} - ${username} - ${password}`;
      passwordsList.appendChild(li);
    });
  });
  
  function generatePassword(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }
  