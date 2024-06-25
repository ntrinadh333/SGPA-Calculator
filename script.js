function createInputFields() {
    const n = parseInt(document.getElementById('n-input').value);
    const fieldsContainer = document.getElementById('fields-container');
    fieldsContainer.innerHTML = '';

    if (isNaN(n) || n <= 0) {
        fieldsContainer.innerHTML = 'Please enter a valid number of subjects.';
        return;
    }

    for (let i = 0; i < n; i++) {
        fieldsContainer.innerHTML += `
            <div class="field-item">
                <div>
                    <label for="c-${i}">Credits of subject ${i + 1}:</label>
                    <input type="number" id="c-${i}" step="0.01" placeholder="e.g. 3.0">
                </div>
                <div>
                    <label for="p-${i}">Grade Points of subject ${i + 1}:</label>
                    <input type="number" id="p-${i}" step="0.01" placeholder="e.g. 4.0">
                </div>
            </div>
        `;
    }

    document.getElementById('calculate-button').style.display = 'block';
}

function calculate() {
    const n = parseInt(document.getElementById('n-input').value);
    const c = [];
    const p = [];

    for (let i = 0; i < n; i++) {
        const cValue = parseFloat(document.getElementById(`c-${i}`).value);
        const pValue = parseFloat(document.getElementById(`p-${i}`).value);

        if (isNaN(cValue) || isNaN(pValue)) {
            document.getElementById('result').innerText = `Error: Please enter valid numbers for all credits and points.`;
            return;
        }

        c.push(cValue);
        p.push(pValue);
    }

    const m = c.map((ci, index) => ci * p[index]);

    const sumC = c.reduce((acc, val) => acc + val, 0);
    const sumM = m.reduce((acc, val) => acc + val, 0);

    if (sumC === 0) {
        document.getElementById('result').innerText = "Error: Division by zero (sum of c is zero)";
    } else if (sumM === 0) {
        document.getElementById('result').innerText = "Error: Division by zero (sum of m is zero)";
    } else {
        const k = sumM / sumC;
        document.getElementById('result').innerText = "Result = " + k;
    }
}
