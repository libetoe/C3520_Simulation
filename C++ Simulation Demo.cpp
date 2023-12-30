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
		string address;
		int    immediate;
		int    numberOfRegisters;
		char   instructionType;
		//Default Constructor
		Decoded(){
			
		}
		//R-type constructor
		Decoded(string op, char type, string rs, string rt, string rd){
			opCode = op;
			instructionType = type;
			regSource = rs;
			regTemporary = rt;
			regDestination = rd;
		}
		//I-type one register constructor and immediate or address
		Decoded(string op, char type,string rs, int immed){
			opCode = op;
			instructionType = type;
			regSource = rs;
			immediate = immed;
		}
		//I-type one register constructor and  address
		Decoded(string op, char type, string rs, string addrss){
			opCode = op;
			instructionType = type;
			regSource = rs;
			address = addrss;
		}
		//J-type constructor 
		Decoded(string op, char type, string addrss){
			opCode = op;
			instructionType = type;
			address = addrss;
		}
		
		
};
class DecodedInstruction{
	public:
		Decoded * instructions;
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
			instructions = new Decoded[maxCodeLines];
			fileName = filename;
			//file.open(filename+".txt");
		}
		~DecodedInstruction(){
			file.close();
			delete[] instructions;
		}
		char InstructionType(string opcode){
			
			// R-type instructions uses three registers
			if(opcode == "add"||
			   opcode == "sub"||
			   opcode == "mul"||
			   opcode == "and"||
			   opcode == "or" )
			        return 'r';
			
			// I-type instructions uses two registers and immediate value
			else if(opcode == "addi"||
			    opcode == "andi"    ||
			    opcode == "ori")
			        return 'i';
			        
			// I-type instructions uses one register and immediate 
			else if(opcode == "li")
			        return 'v';
			        
			// Branch instructions (J-type instructions) use two registers and address
			else if(
			    opcode == "beq"||
			    opcode == "bne"||
			    opcode == "bnez" )
			        return 'b';
			        
			// I-type instructions uses one register and address 
			else if(opcode == "la")
			        return 'a';
			
			// Memory instructions(I-type instructions) uses two registers
			else if(
			    opcode == "lw"||
			    opcode == "sw")
			        return 'm';
			
			
			
			// Jump instructions (J-type instructions) use addresses
			else if(
			    opcode == "j"||
			    opcode == "jal"||
				opcode == "jr")
			        return 'j';
			
			// Multiply and Divide instructions
			else if(opcode == "mult"||
			        opcode == "div")
			        return 'q';
			
			// System call
			else if( opcode == "syscall")
			        return 'y';
			
			// Add more cases for other instructions as needed
			else
			    return 'z';
			

    	}
	
		void readFile(){
			string instruction;
			string opCode,regSource,regTemp,regDest,addrss;
			int numberOfRegisters,immed;
			char instructionType;
			
			file.open(fileName+".txt");
			if(file.good()){
				if(file.is_open()){
					while(getline(file,instruction)){
						//cout<<instruction<<endl;
				        stringstream inst(instruction);
				        
				        while(getline(inst,opCode,' ')){
						    cout<<opCode<<endl;
						    char type = InstructionType(opCode);
						    // R-type instructions uses three registers
						    if(type == 'r'){
						    	while(getline(inst,regSource,',') && getline(inst,regTemp, ',') && getline(inst,regDest, ',')){
								     cout<<"\t"<<regSource<<" "<<regTemp<<" "<<regDest<<endl;
								     Decoded temp(opCode,type,regSource,regTemp,regDest);
								     instructions[instructionLine] = temp;
								     instructionLine++;
						        } 
							}
							// I-type instructions uses two registers
							else if(type == 'i'){
						    	while(getline(inst,regSource,',') && getline(inst,regTemp, ',') && getline(inst,regDest, ',')){
								     immed = stoi(regDest);
									 cout<<"\t"<<regSource<<" "<<regTemp<<" "<<immed<<endl;
						        } 
							}
							// I-type instructions using one register and immediate or address
							else if(type == 'v'){
						    	while(getline(inst,regSource,',') && getline(inst,regTemp, ',') ){
						    		immed = stoi(regTemp);
								     cout<<"\t"<<regSource<<" "<<immed<<endl;
						        } 
							}
							// Branch instructions (J-type instructions) use two registers and address
			                else if(type == 'b'){
						    	while(getline(inst,regSource,',') && getline(inst,regTemp, ',') && getline(inst,addrss, ',')){
								     cout<<"\t"<<regSource<<" "<<regTemp<<" "<<addrss<<endl;
						        } 
							}
							
							// Jump instructions (J-type instructions) use addresses
							else if(type == 'j'){
						    	while(getline(inst,addrss, ' ')){
								     cout<<opCode<<" "<<addrss<<endl;
						        } 
							}
						
				        }
					}
				}
				else{
					cout<<"The file is not good!!"<<endl;
				}
			}else{
				cout<<"File not found!!"<<endl;
			}
		}
		
		
};



int main(){
	DecodedInstruction * decode;
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
