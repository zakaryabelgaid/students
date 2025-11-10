// Main JavaScript file for Teacher Platform

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s';
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#f5576c';
                } else {
                    field.style.borderColor = '#e0e0e0';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // File input preview
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const files = this.files;
            if (files.length > 0) {
                const fileList = document.createElement('div');
                fileList.className = 'file-list';
                fileList.style.marginTop = '0.5rem';
                
                Array.from(files).forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.style.padding = '0.5rem';
                    fileItem.style.background = '#f0f0f0';
                    fileItem.style.borderRadius = '5px';
                    fileItem.style.marginBottom = '0.5rem';
                    fileItem.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
                    fileList.appendChild(fileItem);
                });

                // Remove existing file list if any
                const existingList = this.parentElement.querySelector('.file-list');
                if (existingList) {
                    existingList.remove();
                }

                this.parentElement.appendChild(fileList);
            }
        });
    });
});

// Loading state for buttons
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    } else {
        button.disabled = false;
    }
}

// Handle form submissions with loading state
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.tagName === 'FORM') {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            setLoadingState(submitButton, true);
        }
    }
});

