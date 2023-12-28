#include<iostream>
#include<fstream>
#include<string>
#include <sstream>

using namespace std;
/*
  '''
	  Program code by Liau Libetoe;

	  Program Description:Processor Simulation
   '''
*/
class RegisterFile{
	public:
		//Register Zero
		const int $z0 = 0;
		//Reserved Assembler
		int $at;
		//First and Second return values
		int $v0, $v1;
		//First four arguments to functions
		int $a0, $a1, $a2, $a3; 
		//Temporary Registers
		int $t0, $t1, $t2, $t3, $t4, $t5, $t6, $t7, $t8, $t9;
		//Saved Values Registers
		int $s0, $s1, $s2, $s3, $s4, $s5, $s6, $s7;
		//Reserved for Kernel(Operating system)
		int $k0, $k1;
		//Global Pointer
		int $gp;
		//Stack Pointer
		int $sp;
		//Frame pointer
		int $fp;
		//Return Address
		int $ra;
		RegisterFile(){
			$at = $v0 = $v1 = $a0 = $a1 = $a2 = $a3 = 0;
			$t0 = $t1 = $t2 = $t3 = $t4 = $t5 = $t6 = $t7 = $t8 = $t9 = 0;
			$s0 = $s1 = $s2 = $s3 = $s4 = $s5 = $s6 = $s7 = 0;
			$k0 = $k1 = $gp = $sp = $sp = $fp = $ra = 0;
		}
		
		
};
class Decoded{
	public:
		string opCode;
		string regSource;
		string regTemporary;
		string regDestination;
		int numberOfRegisters;
		char instructionType;
};
class DecodedInstruction{
	public:
		Decoded * instuctions;
		int instructionLine;
		int maxCodeLines;
		ifstream file;
		string fileName;
		DecodedInstruction(){
		}
		DecodedInstruction(string filename){
			fileName = filename;
			instructionLine = 0;
			maxCodeLines = 200;
			instuctions = new Decoded[200];
			fileName = filename;
			//file.open(filename+".txt");
		}
		~DecodedInstruction(){
			file.close();
			delete[] instuctions;
		}
		char InstructionType(string opcode){
			switch (opcode) {
			    // R-type instructions
			    case "add":
			    case "sub":
			    case "mul":
			    case "and":
			    case "or":
			    case "xor":
			    case "slt":
			        return 'r';
			        break;
			
			    // I-type instructions
			    case "addi":
			    case "andi":
			    case "ori":
			    case "xori":
			    case "slti":
			    case "li":
			        return 'i';
			        break;
			
			    // Memory instructions
			    case "lw":
			    case "sw":
			        return 'm';
			        break;
			
			    // Branch instructions
			    case "beq":
			    case "bne":
			        return 'b';
			        break;
			
			    // Jump instructions
			    case "j":
			    case "jal":
			        return 'j';
			        break;
			
			    // Load Upper Immediate
			    case "lui":
			        return 'u';
			        break;
			
			    // Shift instructions
			    case "sll":
			    case "srl":
			        return 's';
			        break;
			
			    // Multiply and Divide instructions
			    case "mult":
			    case "div":
			        return 'q';
			        break;
			
			    // System call
			    case "syscall":
			        return 'y';
			        break;
			
			    // Add more cases for other instructions as needed
			
			    default:
			        // Handle default case, if necessary
			        break;
			}

    	}
	
		void readFile(){
			string instruction;
			string opCode,regSource,regTemp,regDest;
			int numberOfRegisters;
			char instructionType;
			
			file.open(fileName+".txt");
			if(file.good()){
				if(file.is_open()){
					while(getline(file,instruction)){
						//cout<<instruction<<endl;
				        stringstream inst(instruction);
				        
				        //The Code to Test Instruction Type
				        string op = getline(inst,opCode,' ');
				        string type = InstructionType(op);
				        
				        while(getline(inst,opCode,' ') && getline(inst,regSource,',') && getline(inst,regTemp, ',') && getline(inst,regDest, ',')){
							cout<<opCode<<" "<<regSource<<" "<<regTemp<<" "<<regDest<<endl;
						}
					}
				}
				else{
					cout<<"The file is not good!!"<<endl;
				}
			}else{
				cout<<"File failed to open"<<endl;
			}
		}
		
		
};



int main(){
	DecodedInstruction * decode;
	/*
	ifstream file("code.txt");
	string output;
	
	if(file.is_open()){
   	  while(getline(file,output)){
   	  	 cout<<output<<endl;
      }
   }
   */
 main:
 	cout<<"Welcome To Processor Simulation"<<endl;
	cout<<"1.Load File"<<endl;
	cout<<"2.Compile And Run"<<endl;
	cout<<"3.Exit"<<endl;
	cout<<"Choose option by index 1 or 2 or 3:";
	int option;
	string filename;
	cin>>option;
	switch(option){
		case 1:
			cout<<"Enter The Name of File to Load: ";
			cin>>filename;
			decode = new DecodedInstruction(filename);
			decode->readFile();
			break;
		case 2:
			cout<<"2.Compile And Run"<<endl;
			break;
		case 3:
			    return 0;
			break;
		default:
			cout<<"Invalid option selected!!!"<<endl;
		   break;
	}
	

	return 0;
}
