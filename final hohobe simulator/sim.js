class DecodedInstruction {
 constructor(filename) {
    this.fileName = filename;
    this.instructionLine = 0;
    this.maxCodeLines = 200;
    this.instructions = new Array(this.maxCodeLines);
 }

 destructor() {
    // Assuming you want to close the file here,
    // but there's no direct equivalent in JavaScript
    // You may want to use File API, Node.js fs module, or AJAX
    delete this.instructions;
 }
 function InstructionType(opcode) {
     if(opcode == "add"||
         opcode == "sub"||
         opcode == "mul"||
         opcode == "and"||
         opcode == "or" )
            return 'r';

     else if(opcode == "addi"||
           opcode == "andi"    ||
           opcode == "ori")
            return 'i';

     else if(opcode == "li")
            return 'v';

     else if(
        opcode == "beq"||
        opcode == "bne"||
        opcode == "bnez" )
            return 'b';

     else if(opcode == "la")
            return 'a';

     else if(
        opcode == "lw"||
        opcode == "sw")
            return 'm';

     else if(
        opcode == "j"||
        opcode == "jal"||
        opcode == "jr")
            return 'j';

     else if(opcode == "mult"||
              opcode == "div")
            return 'q';

     else if( opcode == "syscall")
            return 'y';

     else
        return 'z';

    }
}



