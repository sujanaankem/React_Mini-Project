import { useEffect, useState } from "react";
function RegisterPage() {
    const [name, inputName] = useState("");
    const [phone, inputPhone] = useState("");
    const [email, inputEmail] = useState("");
    const [errorname, inputErrorName] = useState("");
    const [errorphone, inputErrorPhone] = useState("");
    const [erroremail, inputErrorEmail] = useState("");
    const [emailValid, inputEmailValid] = useState(false);
    const [studentdata, setstudentdata] = useState([]);



    const validationEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const inputEmailAddress = (e) => {
        const value = e.target.value;
        inputEmail(value);

        const trimmedValue = value.trim();

        if (trimmedValue === "") {
            inputErrorEmail("Email is required");
        } else if (!validationEmail(trimmedValue)) {
            inputErrorEmail("Please enter a valid email address");
        } else {
            inputErrorEmail("");
        }
    };



    function handlingErrorName() {
        name === "" ? inputErrorName(true) : inputErrorName(false);

    }
    function handlingErrorPhone() {
        phone === "" ? inputErrorPhone(true) : inputErrorPhone(false);

    }
    function handlingErrorEmail() {
        inputEmailValid(true);
    }

    // create api call

    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://api.elurucoders.online/api/students', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
            })
        },
        )
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        await getAllStudents();
    }

    // read api call of all student

    const getAllStudents = async () => {
        try {
            const response = await fetch('https://api.elurucoders.online/api/students');
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            setstudentdata(data.data);
            console.log(data)
        } catch (error) {
            console.error('Failed to fetch student data:', error);
        }
    };
    useEffect(() => {
        getAllStudents();
    }, [])


    return (
        <div>
            <form onSubmit={submit}>
                <label id="Enter your name">Name :<span style={{ color: name === "" ? "red" : "black" }}>*</span></label>
                <input
                    value={name}
                    onChange={(e) => inputName(e.target.value)}
                    onBlur={handlingErrorName}
                />
                {(errorname && name === "") &&
                    <p style={{ color: "red" }}>{"name is required"}</p>

                }
                <label id="phone no">Phone no :<span style={{ color: phone === "" ? "red" : "black" }}>*</span></label>
                <input
                    value={phone}
                    onChange={(e) => inputPhone(e.target.value)}
                    onBlur={handlingErrorPhone}
                />

                {(errorphone && phone === "") &&
                    <p style={{ color: "red" }}>{"Phone no is redquired"}</p>

                }
                <label id="email">Email :<span style={{ color: email === "" ? "red" : "black" }}>*</span></label>
                <input
                    value={email}
                    onChange={inputEmailAddress}
                    onBlur={handlingErrorEmail}
                />

                {(erroremail && emailValid) &&
                    <p style={{ color: "red" }}>{erroremail}</p>

                }
                <div><button id="btnSave" disabled={!name || !phone || !email} >Submit</button></div>
            </form>
            <table border={2}>
                <thead>
                    <tr>
                        <th>s.no</th>
                        <th>name</th>
                        <th>phone</th>
                        <th>email</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {studentdata.map((student, index) => (
                        <tr key={student._id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                            <td>edit</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default RegisterPage;