document.addEventListener('DOMContentLoaded', function () {
    // Initialize registers
    const registers = {
        "$0": 0x0000,
        "$at": 0x0000,
        "$v0": 0x0000,
        "$v1": 0x0000,
        "$a0": 0x0000,
        "$a1": 0x0000,
        "$a2": 0x0000,
        "$t0": 0x0000,
        "$t1": 0x0000,
        "$t2": 0x0000,
        // Add more registers as needed
    };

    // Update register table after initializing the registers
    updateRegisterTable(registers);

    const executeBtn = document.getElementById('execute-btn');
    const textArea = document.getElementById('text-area');
    const output = document.getElementById('output');

    executeBtn.addEventListener('click', function () {
        executeCode();
    });

    function executeCode() {
        const code = textArea.value;
        const instructions = code.split('\n');

        // Clear console
        output.value = "";

        // Execute each instruction
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i].trim();

            if (instruction !== "") {
                // Parse and execute the MIPS instruction
                const result = executeInstruction(instruction, registers);

                // Display the result in the output textarea
                output.value += `Instruction ${i + 1}: ${instruction}\nResult: ${result}\n\n`;

                // Update the registers based on the executed instruction
                updateRegisters(instruction, result, registers);
            }
        }
    }

    function executeInstruction(instruction, registers) {
        // Split the instruction into parts
        const parts = instruction.split(' ');

        // Determine the instruction type
        const instructionType = parts[0].toUpperCase();

        // Execute the corresponding MIPS instruction
        switch (instructionType) {
            case "ADD":
                return executeADD(parts, registers);
            // Add more cases for other MIPS instructions
            default:
                return "Unsupported Instruction";
        }
    }

    function executeADD(parts, registers) {
        if (parts.length === 4) {
            const destReg = parts[1];
            const reg1 = parts[2];
            const reg2 = parts[3];

            const value1 = registers[reg1];
            const value2 = registers[reg2];

            // Simulate the ADD operation (you may need to handle overflow)
            const result = value1 + value2;

            // Return the result
            return result;
        } else {
            return "Invalid ADD Instruction";
        }
    }

    function updateRegisters(instruction, result, registers) {
        // Extract the destination register(s) from the instruction
        const destRegisters = extractDestinationRegisters(instruction);

        // Update the specified register(s) with the result of the instruction
        destRegisters.forEach(destRegister => {
            registers[destRegister] = result;
        });

        // Update the register table in the sidebar
        updateRegisterTable(registers);
    }

    function extractDestinationRegisters(instruction) {
        const destRegisters = [];
        const parts = instruction.split(' ');

        if (parts.length >= 2) {
            const destPart = parts[1];
            const destRegs = destPart.split(',');

            destRegs.forEach(destReg => {
                destRegisters.push(destReg.trim());
            });
        }

        return destRegisters;
    }

    function updateRegisterTable(registers) {
        const tableBody = document.getElementById('register-table-body');
        // Clear existing rows
        tableBody.innerHTML = "";
        // Add rows for each register
        for (const [register, value] of Object.entries(registers)) {
            const row = document.createElement('tr');
            const registerCell = document.createElement('td');
            const valueCell = document.createElement('td');
            registerCell.textContent = register;
            valueCell.textContent = `0x${value.toString(16).toUpperCase()}`;
            row.appendChild(registerCell);
            row.appendChild(valueCell);
            tableBody.appendChild(row);
        }
    }
});

function compileAndRun() {
    // Implement compile and run functionality
    // This function will be called when the "Compile" button is clicked
    const code = document.getElementById('text-area').value;
    const syntaxErrors = checkSyntaxErrors(code);
    if (syntaxErrors.length > 0) {
        // Display syntax errors in the console
        const errorMessage = `Syntax Error(s):\n${syntaxErrors.join('\n')}`;
        document.getElementById('output').value = errorMessage;
    } else {
        // Proceed with execution
        executeCode();
        // Display success message in the console
        document.getElementById('output').value += "Code compiled successfully!\n";
    }
}

function resetRegisters() {
    // Implement reset functionality
    // This function will be called when the "Reset" button is clicked
    const registers = {
        "$0": 0x0000,
        "$at": 0x0000,
        "$v0": 0x0000,
        "$v1": 0x0000,
        "$a0": 0x0000,
        "$a1": 0x0000,
        "$a2": 0x0000,
        "$t0": 0x0000,
        "$t1": 0x0000,
        "$t2": 0x0000,
        // Add more registers as needed
    };
    // Clear console
    document.getElementById('output').value = "";
    // Update register table
    updateRegisterTable(registers);
}

function checkSyntaxErrors(code) {
    // Implement syntax error checking logic
    // This function should return an array of error messages or an empty array if no errors
    const errors = [];
    // Add your syntax error checking logic here
    // Example: Check if each line has a valid MIPS instruction syntax
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line !== "") {
            const parts = line.split(' ');
            const instructionType = parts[0].toUpperCase();
            if (instructionType !== "ADD" /* Add more valid instructions */) {
                errors.push(`Syntax error in line ${i + 1}: Invalid MIPS instruction`);
            }
        }
    }
    return errors;
}
