// class dataInstructions{
//     constructor(){}
//     constructor(label, varType, data){
//         this.label =  label;
//         this.varType = varType;
//         this.data = data;

//     }

// }


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
        "$t3": 0x0000,
        "$t4": 0x0000,
        "$t5": 0x0000,
        "$t6": 0x0000,
        "$t7": 0x0000,
        "$s0": 0x0000,
        "$s1": 0x0000,
        "$s2": 0x0000,
        "$s3": 0x0000,
        "$s4": 0x0000,
        "$s5": 0x0000,
        "$s6": 0x0000,
        "$s7": 0x0000,
        "$t8": 0x0000,
        "$t9": 0x0000,
        "$k0": 0x0000,
        "$k1": 0x0000,
        "$gp": 0x0000,
        "$sp": 0x0000,
        "$fp": 0x0000,
        "$ra": 0x0000,
        // Add more registers as needed
    };

    // Update register table after initializing the registers
    updateRegisterTable(registers);
    const executeBtn = document.getElementById('execute-btn');
    const textArea = document.getElementById('text-area');
    const output = document.getElementById('output');
    const step = document.getElementById('step-btn');
    const resetBtn = document.getElementById('reset-btn');
    const runall = document.getElementById('run-all-btn');
    
    let programCounter = 0;
    let currentInstruction;
    let text;
    let data;


    executeBtn.addEventListener('click', function () {
        executeCode();
    });

    resetBtn.addEventListener('click', function () {
        reset();
    });

    runall.addEventListener('click', function () {
        executeCode();
    });
    
    step.addEventListener('click', function () {
        stepExecution();
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
                if(instruction ==".text"){
                    text = true;
                    data = false;
                }
                else if(instruction ==".data"){
                    data = true;
                    text = false;
                }

                if(text){
                   // Parse and execute the MIPS instruction
                    const result = executeInstruction(instruction, registers);

                    // Display the result in the output textarea
                    output.value += `Instruction ${i + 1}: ${instruction}\nResult: ${result}\n\n`;

                    // Update the registers based on the executed instruction
                    updateRegisters(instruction, result, registers); 
                }
                if(data){
                    //console.log(instruction+'\n');
                    //allocateMemory(instruction);
                    output.value += `Instruction ${programCounter + 1}: ${instruction}\n\n`; //Result: ${result} ;
                    
                }
                
            }
        }
        
        output.value += `Code executed successfully!!!!\n`;
                   
    }
    function stepExecution(){
        const code = textArea.value;
        const instructions = code.split('\n');
        const instruction = instructions[programCounter].trim();

        if (instruction !== ""){
            if(programCounter < instructions.length){
                if(instruction ==".text"){
                    text = true;
                    data = false;
                }
                else if(instruction ==".data"){
                    data = true;
                    text = false;
                }
                if(text){
                    // Parse and execute the MIPS instruction
                        const result = executeInstruction(instruction, registers);
                    // Display the result in the output textarea
                        output.value += `Instruction ${programCounter + 1}: ${instruction}\nResult: ${result} \n\n`;
                    // Update the registers based on the executed instruction
                        updateRegisters(instruction, result, registers);
                    
                    currentInstruction = instruction;
                    document.getElementById('ir-value').value = currentInstruction;
                    document.getElementById('pc-value').value = '0x00'+(programCounter+1);
                    programCounter++;
                }
                if(data){
                    
                    //const parts = instructions[programCounter].split(' ');
                    // Display the instruction in the output textarea
                    output.value += `Instruction ${programCounter + 1}: ${instructions[programCounter]}\n\n`; //Result: ${result} ;
                    currentInstruction = instruction;
                    document.getElementById('ir-value').value = currentInstruction;
                    document.getElementById('pc-value').value = '0x00'+(programCounter+1);
                    programCounter++;
                }
            }
            else{
                output.value += `Code executed successfully!!!!\n`;  
            }
              
        }
        
    }

    //Not used yet
    function allocateMemory(instruction){
        // Split the instruction into parts
        const parts = instruction.split(' ');
        return parts;

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
            case "ADDI":
                return executeADDI(parts, registers);
            case "SUB":
                return executeSUB(parts, registers);
            case "LI":
                return executeLI(parts, registers);
            case "JR":
                return executeJR(parts, registers);
            case "SYSCALL":
                // Implement syscall functionality (e.g., handle system calls)
                return executeSyscall(registers);
            // Add more cases for other MIPS instructions
            case ".TEXT":
                return "Code Section";
            case ".DATA":
                return "Data Declarations Section";
            default:
                return "Unsupported Instruction";
        }
    }


    function executeSyscall(registers) {
        // Implement syscall functionality here
        // You can use the value in $v0 register to determine the syscall type
        const syscallType = registers["$v0"];
    
        switch (syscallType) {
            case 10:
                // Exit program syscall
                console.log("Program exit syscall");
                break;
            // Add more cases for other syscalls
            default:
                console.log("Unsupported syscall");
                break;
        }
    
        // Return a message indicating the syscall was executed
        return "Syscall executed";
    }


    function executeJR(parts, registers) {
        if (parts.length === 2) {
            const sourceReg = parts[1];
            const jumpAddress = registers[sourceReg];
    
            // Jump to the address stored in the specified register
            // we'll just log the jump address
            console.log(`Jumping to address: 0x${jumpAddress.toString(16).toUpperCase()}`);
            
            return "Jump instruction executed";
        } else {
            return "Invalid JR Instruction";
        }
    }

    function executeADD(parts, registers) {
        if (parts.length === 4) {
            const destReg = parts[1];
            const reg1 = parts[2];
            const reg2 = parts[3];
    
            const value1 = registers[reg1];
            const value2 = registers[reg2];
    
            // Check if source registers contain NaN values
            if (isNaN(value1) || isNaN(value2)) {
                return "Invalid source register value in ADD instruction";
            }
    
            // Simulate the ADD operation (you may need to handle overflow)
            const result = value1 + value2;
    
            // Return the result
            return result;
        } else {
            return "Invalid ADD Instruction";
        }
    }
    

    function executeADDI(parts, registers) {
        if (parts.length === 4) {
            const destReg = parts[1];
            const sourceReg = parts[2];
            const immediate = parseInt(parts[3], 10); // Parse the immediate value as an integer

            const value1 = registers[sourceReg];

            // Simulate the ADDI operation (you may need to handle overflow)
            const result = value1 + immediate;

            // Return the result
            return result;
        } else {
            return "Invalid ADDI Instruction";
        }
    }

    function executeSUB(parts, registers) {
        if (parts.length === 4) {
            const destReg = parts[1];
            const reg1 = parts[2];
            const reg2 = parts[3];
    
            const value1 = registers[reg1];
            const value2 = registers[reg2];
    
            // Check if source registers contain NaN values
            if (isNaN(value1) || isNaN(value2)) {
                return "Invalid source register value in SUB instruction";
            }
    
            // Simulate the SUB operation (you may need to handle overflow)
            const result = value1 - value2;
    
            // Return the result
            return result;
        } else {
            return "Invalid SUB Instruction";
        }
    }
    

    function executeLI(parts, registers) {
        if (parts.length === 3) {
            const destReg = parts[1];
            const immediate = parseInt(parts[2], 10); // Parse the immediate value as an integer

            // Load immediate value into the destination register
            registers[destReg] = immediate;

            // Return the loaded immediate value
            return immediate;
        } else {
            return "Invalid LI Instruction";
        }
    }

    function updateRegisters(instruction, result, registers) {
        // Extract the destination register(s) from the instruction
        const destRegisters = extractDestinationRegisters(instruction);
    
        // Update the specified register(s) with the result of the instruction
        destRegisters.forEach(destRegister => {
            // Update $ra separately
            if (destRegister === "$ra") {
                registers[destRegister] = result;
            } else {
                registers[destRegister] = result;
            }
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

    reset();
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

/*function resetRegisters() {
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
        "$t3": 0x0000,
        "$t4": 0x0000,
        "$t5": 0x0000,
        "$t6": 0x0000,
        "$t7": 0x0000,
        "$s0": 0x0000,
        "$s1": 0x0000,
        "$s2": 0x0000,
        "$s3": 0x0000,
        "$s4": 0x0000,
        "$s5": 0x0000,
        "$s6": 0x0000,
        "$s7": 0x0000,
        "$t8": 0x0000,
        "$t9": 0x0000,
        "$k0": 0x0000,
        "$k1": 0x0000,
        "$gp": 0x0000,
        "$sp": 0x0000,
        "$fp": 0x0000,
        "$ra": 0x0000,
        // Add more registers as needed
    };
    // Clear console
    document.getElementById('output').value = "";
    // Update register table
    updateRegisterTable(registers);
}*/



function resetRegisters(registers) {
    // Reset each register to its default value
    for (const register in registers) {
        registers[register] = 0x0000;
    }

    // Update the register table in the sidebar
    updateRegisterTable(registers);
}


function reset() {
    // Clear console
    document.getElementById('output').value = "";

    // Pass the existing registers object to resetRegisters
    resetRegisters(registers);
}


function checkSyntaxErrors(code) {
    // Implement syntax error checking logic
    // This function should return an array of error messages or an empty array if no errors
    const errors = [];
    let textSection = false;  // Track if the current section is .text
    // Add your syntax error checking logic here
    // Example: Check if each line has a valid MIPS instruction syntax
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line !== "") {
            const parts = line.split(' ');
            const instructionType = parts[0].toUpperCase();

            if (instructionType === ".TEXT") {
                textSection = true;
            } else if (instructionType === ".DATA") {
                textSection = false;
            }

            if (textSection) {
                switch (instructionType) {
                    case "ADD":
                    case "ADDI":
                    case "SUB":
                    case "LI":
                    case "JR":
                    case "J":
                    case "JAL":
                        // Valid instructions
                        break;

                    case "SW":
                        // Syntax check for SW
                        if (parts.length !== 3 || !parts[1].startsWith("$") || !parts[2].includes("(") || !parts[2].endsWith(")")) {
                            errors.push(`Syntax error in line ${i + 1}: Invalid SW syntax`);
                        }
                        break;

                    case "LW":
                        // Syntax check for LW
                        if (parts.length !== 3 || !parts[1].startsWith("$") || !parts[2].includes("(") || !parts[2].endsWith(")")) {
                            errors.push(`Syntax error in line ${i + 1}: Invalid LW syntax`);
                        }
                        break;

                    default:
                        errors.push(`Syntax error in line ${i + 1}: Invalid MIPS instruction`);
                        break;
                }
            }
        }
    }
    return errors;
}
