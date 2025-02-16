document.addEventListener('DOMContentLoaded', () => {
  const fileList = document.getElementById('file-list');
  const searchBar = document.getElementById('search-bar');
  const categoryButtons = document.querySelectorAll('#category-filter button');
  const darkModeToggle = document.getElementById('dark-mode-toggle'); 
  const fileInput = document.getElementById('file-input');
  const uploadButton = document.getElementById('upload-button');
  const progressBar = document.getElementById('progress-bar');
  const dashboardToggle = document.getElementById('dashboard-toggle');
  const dashboardMenu = document.getElementById('dashboard-menu');

  // List of files (you can manually add or fetch dynamically)
  const files = [
    { name: 'Note 1', path: 'files/note1.pdf', category: 'notes', downloads: 120 },
    { name: 'Note 2', path: 'files/note2.pdf', category: 'notes', downloads: 95 },
    { name: 'Presentation 1', path: 'files/presentation1.pptx', category: 'ppts', downloads: 75 },
    { name: 'Presentation 2', path: 'files/presentation2.pptx', category: 'ppts', downloads: 60 },
  ];

  // Function to render files
  function renderFiles(filteredFiles) {
    fileList.innerHTML = '';
    filteredFiles.forEach(file => {
      const listItem = document.createElement('li');

      // File icon based on category
      const fileIcon = document.createElement('i');
      fileIcon.className = file.category === 'notes' ? 'file-icon fas fa-file-pdf' : 'file-icon fas fa-file-powerpoint';

      // File name and download link
      const fileLink = document.createElement('a');
      fileLink.href = file.path;
      fileLink.download = file.name;
      fileLink.textContent = file.name;

      // Download count
      const downloadCount = document.createElement('span');
      downloadCount.className = 'download-count';
      downloadCount.textContent = `Downloads: ${file.downloads}`;

      // Append elements to list item
      listItem.appendChild(fileIcon);
      listItem.appendChild(fileLink);
      listItem.appendChild(downloadCount);

      // Append list item to file list
      fileList.appendChild(listItem);
    });
  }

  // Initial render
  renderFiles(files);

  // Search functionality
  searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredFiles = files.filter(file => file.name.toLowerCase().includes(searchTerm));
    renderFiles(filteredFiles);
  });
  // Dark mode toggle
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.querySelector('i').classList.toggle('fa-moon');
    darkModeToggle.querySelector('i').classList.toggle('fa-sun');
  });
  // File upload simulation
  uploadButton.addEventListener('click', () => {
    if (fileInput.files.length > 0) {
      progressBar.style.width = '0';
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(interval);
          alert('File uploaded successfully!');
        }
      }, 100);
    } else {
      alert('Please select a file to upload.');
    }
  });
 // Dashboard toggle
  dashboardToggle.addEventListener('click', () => {
    dashboardMenu.style.display = dashboardMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Close dashboard menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!dashboardToggle.contains(event.target) && !dashboardMenu.contains(event.target)) {
      dashboardMenu.style.display = 'none';
    }
  });
  // Category filter functionality
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to the clicked button
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      const filteredFiles = category === 'all' ? files : files.filter(file => file.category === category);
      renderFiles(filteredFiles);
    });
  });
});
