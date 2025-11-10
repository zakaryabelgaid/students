// C Code Runner - Client-side execution simulation
// Note: For production, you'd want a backend service to actually compile and run C code

document.addEventListener('DOMContentLoaded', function() {
    const runCodeBtn = document.querySelector('.run-code-btn');
    const codeEditor = document.querySelector('.code-editor');
    const codeOutput = document.getElementById('code-output');
    const clearOutputBtn = document.querySelector('.clear-output-btn');

    if (runCodeBtn && codeEditor && codeOutput) {
        runCodeBtn.addEventListener('click', function() {
            runCode();
        });

        // Allow Ctrl+Enter to run code
        codeEditor.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                runCode();
            }
        });
    }

    if (clearOutputBtn && codeOutput) {
        clearOutputBtn.addEventListener('click', function() {
            codeOutput.textContent = '';
        });
    }
});

function runCode() {
    const codeEditor = document.querySelector('.code-editor');
    const codeOutput = document.getElementById('code-output');
    const runCodeBtn = document.querySelector('.run-code-btn');

    if (!codeEditor || !codeOutput) return;

    const code = codeEditor.value;
    
    // Show loading state
    runCodeBtn.disabled = true;
    runCodeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';
    codeOutput.textContent = 'Running code...\n';

    // Simulate code execution
    // In a real implementation, you would send this to a backend service
    // that compiles and runs the C code safely
    
    setTimeout(() => {
        try {
            // Simple simulation - parse common C patterns
            const output = simulateCodeExecution(code);
            codeOutput.textContent = output;
            codeOutput.style.color = '#2d3748';
        } catch (error) {
            codeOutput.textContent = `Error: ${error.message}`;
            codeOutput.style.color = '#d63031';
        } finally {
            runCodeBtn.disabled = false;
            runCodeBtn.innerHTML = '<i class="fas fa-play"></i> Run Code';
        }
    }, 500);
}

function simulateCodeExecution(code) {
    // This is a simplified simulation for demonstration
    // In production, use a proper backend service like:
    // - Docker container with GCC
    // - Online Judge API
    // - Code execution service (Judge0, Piston, etc.)

    let output = '';

    // Extract printf statements
    const printfMatches = code.match(/printf\s*\([^)]+\)/g);
    if (printfMatches) {
        printfMatches.forEach(match => {
            // Simple printf simulation
            let content = match.replace(/printf\s*\(/, '').replace(/\);?$/, '');
            content = content.replace(/^["']|["']$/g, ''); // Remove quotes
            
            // Handle format specifiers
            content = content.replace(/\\n/g, '\n');
            content = content.replace(/\\t/g, '\t');
            
            // Extract variables (simplified)
            const varMatches = content.match(/%[dfsc]/g);
            if (varMatches) {
                varMatches.forEach(spec => {
                    // Replace with placeholder values
                    if (spec === '%d') content = content.replace(/%d/, '42');
                    if (spec === '%f') content = content.replace(/%f/, '3.14');
                    if (spec === '%c') content = content.replace(/%c/, 'A');
                    if (spec === '%s') content = content.replace(/%s/, 'Hello');
                });
            }
            
            output += content + '\n';
        });
    }

    // Extract variable declarations and assignments
    const intMatches = code.match(/int\s+(\w+)\s*=\s*(\d+)/g);
    if (intMatches) {
        intMatches.forEach(match => {
            const varMatch = match.match(/int\s+(\w+)\s*=\s*(\d+)/);
            if (varMatch) {
                output += `${varMatch[1]} = ${varMatch[2]}\n`;
            }
        });
    }

    // If no output found, show a message
    if (!output.trim()) {
        output = 'Code executed successfully!\n';
        output += 'Note: This is a simulation. For actual C code execution, ';
        output += 'a backend compilation service is required.\n';
        output += '\nTo see real output, compile and run your code locally:\n';
        output += 'gcc program.c -o program\n';
        output += './program\n';
    }

    return output.trim();
}

// Alternative: Use a code execution API (requires backend setup)
async function runCodeWithAPI(code) {
    try {
        const response = await fetch('/api/run-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: 'c',
                code: code
            })
        });

        const data = await response.json();
        return data.output || data.error || 'No output';
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

