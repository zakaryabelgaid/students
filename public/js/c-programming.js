// C Programming Curriculum JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Copy code functionality
    const copyButtons = document.querySelectorAll('.copy-code-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeIndex = this.getAttribute('data-code');
            const codeBlock = document.getElementById(`code-${codeIndex}`);
            if (codeBlock) {
                const code = codeBlock.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    // Show feedback
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    this.style.background = '#48bb78';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = '';
                    }, 2000);
                });
            }
        });
    });

    // Show solution buttons
    const showSolutionButtons = document.querySelectorAll('.show-solution-btn');
    showSolutionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exerciseIndex = this.getAttribute('data-exercise');
            const solution = document.getElementById(`solution-${exerciseIndex}`);
            if (solution) {
                solution.classList.toggle('hidden');
                if (solution.classList.contains('hidden')) {
                    this.innerHTML = '<i class="fas fa-eye"></i> Show Solution';
                } else {
                    this.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Solution';
                }
            }
        });
    });

    // Mark exercise as complete
    const markCompleteButtons = document.querySelectorAll('.mark-complete-btn');
    markCompleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exerciseIndex = this.getAttribute('data-exercise');
            markExerciseComplete(exerciseIndex);
        });
    });

    // Progress tracking
    if (window.lessonData) {
        trackTimeSpent();
        updateProgressOnScroll();
    }

    // Update progress circles
    updateProgressCircles();
});

// Track time spent on lesson
function trackTimeSpent() {
    let startTime = Date.now();
    let timeSpent = window.lessonData.progress.timeSpent || 0;

    // Update every minute
    setInterval(() => {
        const minutesSpent = Math.floor((Date.now() - startTime) / 60000);
        if (minutesSpent > 0) {
            updateProgress({
                lessonId: window.lessonData.lessonId,
                timeSpent: minutesSpent
            });
            startTime = Date.now();
        }
    }, 60000);

    // Update on page unload
    window.addEventListener('beforeunload', () => {
        const minutesSpent = Math.floor((Date.now() - startTime) / 60000);
        if (minutesSpent > 0) {
            navigator.sendBeacon('/c-programming/progress', JSON.stringify({
                lessonId: window.lessonData.lessonId,
                timeSpent: minutesSpent
            }));
        }
    });
}

// Update progress on scroll (mark as in progress)
function updateProgressOnScroll() {
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
        if (!hasScrolled) {
            hasScrolled = true;
            updateProgress({
                lessonId: window.lessonData.lessonId,
                status: 'in_progress'
            });
        }
    });
}

// Mark lesson as completed
function markLessonComplete() {
    updateProgress({
        lessonId: window.lessonData.lessonId,
        status: 'completed'
    }).then(() => {
        // Show success message
        showNotification('Lesson marked as completed!', 'success');
        // Update UI
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '100%';
        }
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = '100% Complete';
        }
    });
}

// Mark exercise as complete
function markExerciseComplete(exerciseIndex) {
    updateProgress({
        lessonId: window.lessonData.lessonId,
        exerciseId: parseInt(exerciseIndex)
    }).then(() => {
        const button = document.querySelector(`[data-exercise="${exerciseIndex}"].mark-complete-btn`);
        if (button) {
            button.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
            button.style.background = '#48bb78';
            button.disabled = true;
        }
    });
}

// Update progress API call
function updateProgress(data) {
    return fetch('/c-programming/progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return data;
        } else {
            throw new Error(data.error || 'Failed to update progress');
        }
    })
    .catch(error => {
        console.error('Error updating progress:', error);
    });
}

// Update progress circles
function updateProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        const progress = circle.getAttribute('data-progress');
        const degrees = (progress / 100) * 360;
        circle.style.background = `conic-gradient(var(--primary) ${degrees}deg, #e0e0e0 ${degrees}deg)`;
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#48bb78' : '#667eea'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

