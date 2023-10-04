// Step1: Capture the elements of the website
const name_input = document.querySelector(".name-input");
const message_input = document.querySelector(".message-input");
const submitBtn = document.querySelector(".submit-btn");
const greetResponses = document.querySelector("#greet-responses");

var allGreetings = []; //array h yeh


loadItemsIntially();
//initially load items


function addItem(item){
allGreetings.push(item);
//ek item ko add krdega yeh function
}

	
function saveItems(){
	var json_greetings = JSON.stringify(allGreetings); //yaha pe allGreetings ko json mei convert krgeda aur json_greeting variable mei daal dega
	window.localStorage.setItem("greetings",json_greetings);//yeh us json ko save kr dega
  
}


function deleteall(){
	window.localStorage.clear();// puri localstorage clear;
}


function loadItemsIntially(){
	//page reload hone pe jo items save the unko lake dega
	 allGreetings = JSON.parse(window.localStorage.getItem("greetings")) ?? []; // JSON.parse JSON string ko array mei convert krta h
	 console.log(allGreetings);
	 //loop se har ek greeting ka html code bana ke add krdega
	 
	 allGreetings.forEach(greeting => {
		greetResponses.innerHTML += `
		<div class="card">
			<div class="greet-name"> ${greeting.name} </div>
			<div class="greet-message"> ${greeting.message} </div>
		</div>
	`;
	 });
	 //JSON.stringfy array ko json string mei convert krta h	 
}


// Step2: Setup an Event Listener for Submit Button
submitBtn.addEventListener("click", function () {
	// Step3: Take the data from the captured elements
	const name = name_input.value;
	const message = message_input.value;


	if (name.length > 0 && message.length > 0) {
        
		//json mei eise save ho ga
		//example : {"name":"dev","message":"hi"}

		addItem({"name":name,"message":message});
		saveItems();
		//localstorage mei save ho jayega page reload pe bhi
        
		// haa
		
		// Success Block - Create the black card and insert it to the gree-responses div element
		greetResponses.innerHTML += `
            <div class="card">
                <div class="greet-name"> ${name} </div>
                <div class="greet-message"> ${message} </div>
            </div>
        `;

		// Clear the input boxes
		name_input.value = "";
		message_input.value = "";
	} else {
		// Failure block
		alert("Both are required fields!!");
	}
});

// Clear all cards function
const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", function () {
	greetResponses.innerHTML = "";
	//yaha pe storage ko bhi clear krna hoga na;
	deleteall(); // function call krdia
});
