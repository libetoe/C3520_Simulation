document.addEventListener('DOMContentLoaded', function () {
    const executeBtn = document.getElementById('execute-btn');
    const textArea = document.getElementById('text-area');
    const output = document.getElementById('output');

    executeBtn.addEventListener('click', function () {
        executeCode();
    });

    function executeCode() {
        const code = textArea.value;
        const instructions = code.split('\n');

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

        // Execute each instruction
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i].trim();

            if (instruction !== "") {
                // Parse and execute the MIPS instruction
                const result = executeInstruction(instruction, registers);

                // Display the result in the output textarea
                output.value += `Instruction ${i + 1}: ${instruction}\nResult: ${result}\n\n`;

                // Update the registers for the next instruction
                updateRegisters(result, registers);
            }
        }
    }

    function executeInstruction(instruction, registers) {
        // Implement the logic to execute each MIPS instruction
        // For simplicity, let's assume each instruction is an ADD operation
        // You should extend this function to handle various MIPS instructions

        // Example: ADD $t0, $a0, $a1
        const parts = instruction.split(' ');
        if (parts.length === 4 && parts[0].toUpperCase() === "ADD") {
            const destReg = parts[1];
            const reg1 = parts[2];
            const reg2 = parts[3];

            const value1 = registers[reg1];
            const value2 = registers[reg2];

            // Simulate the ADD operation (you may need to handle overflow)
            const result = value1 + value2;

            // Return the result
            return result;
        }

        // If the instruction is not supported, return an error message
        return "Unsupported Instruction";
    }

    function updateRegisters(result, registers) {
        // Update the register values based on the result of the instruction
        // For simplicity, let's assume the result is stored in $t0
        registers["$t0"] = result;
    }
});

function exit() {
    // Implement exit functionality if needed
}
