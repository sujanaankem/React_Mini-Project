import { useState } from "react";
function RegisterPage() {
    const [name, inputName] = useState("");
    const [phone, inputPhone] = useState("");
    const [email, inputEmail ] = useState("");
    const [errorname, inputErrorName] = useState("");
    const [errorphone,  inputErrorPhone]= useState("");
    const [erroremail, inputErrorEmail] = useState("");
    const [emailValid, inputEmailValid]= useState(false);



    const inputEmailAddress = (e) => {
        const value= e.target.value
        inputEmail(value)
          if (value.trim() === "") {
    inputErrorEmail("Email is required");
    } else if (!validationEmail(value) && emailValid) {
      inputErrorEmail("Please enter a valid email address");
      console.log("Check the mail");
    } else {
      inputErrorEmail(""); // Clear the error if valid
    }
    } 
  const validationEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
     return regex.test(email);
  }

   

    function handlingErrorName() {
        name===""? inputErrorName(true):inputErrorName(false);

    }
    function handlingErrorPhone() {
        phone===""? inputErrorPhone(true):inputErrorPhone(false);

    }
    function handlingErrorEmail() {
        email===""? inputErrorEmail(true):inputErrorEmail(false);
        inputEmailValid(true)
    }

    const submit = async (e) => {
        debugger
        e.preventDefault();
        const response =await fetch('https://api.elurucoders.online/api/students', {
            method: 'POST',
            headers:{
                      'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email
            })
        });
        const data =await response.json();
        console.log(data);
    };

 



return (
    <div>
        <form onSubmit={submit}>
            <label id="Enter your name">Name :<span style={{color: name === "" ? "red":"black"}}>*</span></label>
            <input
            value={name}
                onChange={(e) => inputName(e.target.value)}
                onBlur={handlingErrorName}
            />
            {(errorname && name === "") &&
            <p style={{color:"red"}}>{"name is required"}</p>

}
            <label id="phone no">Phone no :<span style={{color: phone === "" ? "red":"black"}}>*</span></label>
            <input
            value={phone}
                onChange={(e) => inputPhone(e.target.value)}
                onBlur={handlingErrorPhone}
            />

            {errorphone && 
            <p style={{color:"red"}}>{"Phone no is redquired"}</p>

            }
             <label id="email">Email :<span style={{color: email === "" ? "red":"black"}}>*</span></label>
            <input
            value={email}
                onChange={inputEmailAddress}
                onBlur={handlingErrorEmail}
            />

            {erroremail && 
            <p style={{color:"red"}}>{erroremail}</p>

            }
            <div><button id="btnSave" disabled={!name || !phone || !email} >Submit</button></div>
        </form>
    </div>
)
}

export default RegisterPage;