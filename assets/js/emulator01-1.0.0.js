const counter = {
	count:-1,
	countup:function() {
		
		counter.count += 1;
		const n = counter.count;
		document.getElementById('nowcount').textContent = n;
		return n;
	}
}


const register = {
	rA:null,
	rB:null,
	fC:null,
}

const rom = {
	msb:[
		0b0000,0b0100
	
	],lsb:[
		0b0010,0b0000
	
	]
}

const decoder = {
	decode:function() {
		const msb = rom.msb[counter.count];
		switch (msb){
			case 0b0000:
				alu.ADD("rA");break;
			case 0b0101:
				alu.ADD("rB");break;
			case 0b0011:
				alu.MOVIm("rA");break;
			case 0b0111:
				alu.MOVIm("rB");break;
			case 0b0001:
				alu.MOV("rB");break;
			case 0b0100:
				alu.MOV("rA");break;
			case 0b0010:
				alu.IN("rA");break;
			case 0b0110:
				alu.IN("rB");break;
			case 0b1011:
				alu.OUT("Im");break;
			case 0b1001:
				alu.OUT("rB");break;
			case 0b1111:
				alu.JMP();break;
			case 0b1110:
				alu.JNC;break;
			default:
				console.log("err decoder");
		}
	}
}

const alu = {
	ADD:function(f){
		const n = f;
		const lsb = rom.lsb[counter.count];
		switch (n){
			case "rA":
				register.rA += lsb;
				if (register.rA > 15){
					register.fC = 1;
				}
				break;
			case "rB":
				register.rB += lsb;
				if (register.rB > 15){
					register.fC = 1;
				}
				break;
			default:
				console.log("err alu ADD");
		}
	},
	MOVIm:function(f){
		const n = f;
		const lsb = rom.lsb[counter.count];
		switch (n){
			case "rA":
				register.rA = lsb;break;
			case "rB":
				regsiter.rB = leb;break;
			default:
				console.log("err alu MOVIm");
		}
	},
	MOV:function(f){
		const n = f;
		const lsb = rom.lsb[counter.count];
		switch (n){
			case "rA":
				register.rB = register.rA;break;
			case "rB":
				regsiter.rA = register.rB;break;
			default:
				console.log("err alu MOV");
		}
	},
	IN:function(f){
		//const n = f;
		//const lsb = rom.lsb[counter.count];
		switch (n){
			//case "rA":
				//register.rA = register.rB;break;
			//case "rB":
				//regsiter.rB = register.rA;break;
			default:
				console.log("no data IN");
		}
	},
	OUT:function(f){
		const n = f;
		const lsb = rom.lsb[counter.count];
		switch (n){
			//case "rA":
				//register.rA = register.rB;break;
			//case "rB":
				//regsiter.rB = register.rA;break;
			default:
				console.log("no data OUT");
		}
	},
	JMP:function(){
		const lsb = rom.lsb[counter.count];
		counter.count = lsb;
	},
	JNC:function(){
		const lsb = rom.lsb[counter.count];
		const c = register.fC;
		switch (c){
			case 0:
				counter.count = lsb;break;
			case 1:
				break;
			default:
				console.log("no data");
		}
	},
}

const init = {
	Rall:function() {
		init.Rcounter();
		init.Rregister();
		init.Setbutton();
	
	},Rcounter:function() {
		counter.count = -1;
	
	},Rregister:function() {
		register.rA = 0b0000;
		register.rB = 0b0000;
		register.fC = 0b0;
		
	},Setbutton:function() {
		let button = document.getElementById("power");
		button.addEventListener("click",init.Rall);
		
	}
}

function main(){
	try{
		console.log("---START---");
		console.log(register);
		
		while (counter.count < rom.msb.length-1) {
			//counter
			counter.countup();
			const n = counter.count;
			document.getElementById('nowcount').textContent = n;
			console.log(n);
			
			//decode(内部で rom&alu 読み出し)
			decoder.decode();
			console.log(register);
		}
		
	}catch(e){
		//なし
	}finally{
		console.log("---FINISH---");
	}
}

init.Rall();
main();
