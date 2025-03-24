document.addEventListener('DOMContentLoaded', function() {
    // Initialize the project gallery
    initProjectGallery();
    
    // Initialize theme switcher
    initThemeSwitcher();
});

// Initialize the project gallery
function initProjectGallery() {
    const projectNav = document.getElementById('project-nav');
    const projectContent = document.getElementById('project-content');
    const totalProjectsElement = document.getElementById('total-projects');
    
    // Update total projects count
    totalProjectsElement.textContent = projects.length;
    
    // Create navigation links
    projects.forEach(project => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = project.title;
        a.dataset.id = project.id;
        a.addEventListener('click', function(e) {
            e.preventDefault();
            displayProject(project.id);
            
            // Update active link
            document.querySelectorAll('#project-nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
        li.appendChild(a);
        projectNav.appendChild(li);
    });

    // Function to display a project
    function displayProject(id) {
        const project = projects.find(p => p.id === id);
        if (!project) return;
        
        // Different display based on file type
        if (project.fileType === 'html') {
            // For HTML files, use full iframe
            projectContent.innerHTML = `
                <div class="iframe-container" style="width: 100%; height: calc(100vh - 180px);">
                    <iframe src="${project.path}" style="width: 100%; height: 100%; border: none; border-radius: 8px;"></iframe>
                </div>
            `;
        } else if (project.fileType === 'txt') {
            // For text files, provide a direct link
            projectContent.innerHTML = `
                <div class="project-card">
                    <h2>${project.title}</h2>
                    <div class="text-preview">
                        <p>Click below to view the text file:</p>
                        <a href="${project.path}" target="_blank" class="view-btn">View File</a>
                    </div>
                </div>
            `;
        } else if (project.fileType === 'zip') {
            // For zip files, provide a download button
            projectContent.innerHTML = `
                <div class="project-card">
                    <h2>${project.title}</h2>
                    <div class="zip-info">
                        <p>Click below to download the ZIP file:</p>
                        <a href="${project.path}" download class="download-btn">Download File</a>
                    </div>
                </div>
            `;
        }
    }

    // Activate first project by default (if projects exist)
    if (projects.length > 0) {
        const firstProjectLink = document.querySelector('#project-nav a');
        if (firstProjectLink) {
            firstProjectLink.classList.add('active');
            displayProject(parseInt(firstProjectLink.dataset.id));
        }
    }
}

// Initialize theme switcher
function initThemeSwitcher() {
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'dark';
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}