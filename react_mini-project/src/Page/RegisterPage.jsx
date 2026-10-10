
import { useEffect, useState } from "react";
import "./RegisterPage.css";

function RegisterPage() {
    const [name, inputName] = useState("");
    const [phone, inputPhone] = useState("");
    const [email, inputEmail] = useState("");

    const [errorname, inputErrorName] = useState(false);
    const [errorphone, inputErrorPhone] = useState(false);
    const [erroremail, inputErrorEmail] = useState("");
    const [emailValid, inputEmailValid] = useState(false);

    const [studentdata, setstudentdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const API_URL = "https://api.elurucoders.online/api/students";

    // Email validation
    const validationEmail = (email) => {
        const regex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(email);
    };

    // Handle email input
    const inputEmailAddress = (e) => {
        const value = e.target.value;
        inputEmail(value);

        if (value.trim() === "") {
            inputErrorEmail("Email is required");
        } else if (!validationEmail(value.trim())) {
            inputErrorEmail("Please enter a valid email address");
        } else {
            inputErrorEmail("");
        }
    };

    // Name validation on blur
    const handlingErrorName = () => {
        inputErrorName(name.trim() === "");
    };

    // Phone validation on blur
    const handlingErrorPhone = () => {
        inputErrorPhone(phone.trim() === "");
    };

    // Email validation on blur
    const handlingErrorEmail = () => {
        inputEmailValid(true);

        if (email.trim() === "") {
            inputErrorEmail("Email is required");
        } else if (!validationEmail(email.trim())) {
            inputErrorEmail("Please enter a valid email address");
        } else {
            inputErrorEmail("");
        }
    };

    // Read API: Get all students
    const getAllStudents = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setstudentdata(data.data || []);
            setApiError("");
        } catch (error) {
            console.error("Failed to fetch student data:", error);
            setApiError("Unable to load student data.");
        }
    };

    // Create API: Submit student
    const submit = async (e) => {
        e.preventDefault();

        inputErrorName(name.trim() === "");
        inputErrorPhone(phone.trim() === "");
        inputEmailValid(true);

        if (name.trim() === "") {
            return;
        }

        if (phone.trim() === "") {
            return;
        }

        if (email.trim() === "") {
            inputErrorEmail("Email is required");
            return;
        }

        if (!validationEmail(email.trim())) {
            inputErrorEmail("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            setApiError("");

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    phone: phone.trim(),
                    email: email.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`
                );
            }

            // Clear form after successful submission
            inputName("");
            inputPhone("");
            inputEmail("");
            inputErrorName(false);
            inputErrorPhone(false);
            inputErrorEmail("");
            inputEmailValid(false);

            // Refresh student table
            await getAllStudents();
        } catch (error) {
            console.error("Failed to register student:", error);
            setApiError(
                "Unable to register student. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Load students when the page opens
    useEffect(() => {
        getAllStudents();
    }, []);

    return (
        <div className="register-container">
            <h2 className="page-title">Student Registration</h2>

            <form className="register-form" onSubmit={submit}>
                {/* Name */}
                <label htmlFor="studentName">
                    Name :
                    <span className="required">*</span>
                </label>

                <input
                    id="studentName"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => inputName(e.target.value)}
                    onBlur={handlingErrorName}
                    className={
                        errorname && name.trim() === ""
                            ? "input-error"
                            : ""
                    }
                />

                {errorname && name.trim() === "" && (
                    <p className="error-message">
                        Name is required
                    </p>
                )}

                {/* Phone */}
                <label htmlFor="studentPhone">
                    Phone no :
                    <span className="required">*</span>
                </label>

                <input
                    id="studentPhone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => inputPhone(e.target.value)}
                    onBlur={handlingErrorPhone}
                    className={
                        errorphone && phone.trim() === ""
                            ? "input-error"
                            : ""
                    }
                />

                {errorphone && phone.trim() === "" && (
                    <p className="error-message">
                        Phone number is required
                    </p>
                )}

                {/* Email */}
                <label htmlFor="studentEmail">
                    Email :
                    <span className="required">*</span>
                </label>

                <input
                    id="studentEmail"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={inputEmailAddress}
                    onBlur={handlingErrorEmail}
                    className={
                        emailValid && erroremail
                            ? "input-error"
                            : ""
                    }
                />

                {emailValid && erroremail && (
                    <p className="error-message">
                        {erroremail}
                    </p>
                )}

                <button
                    id="btnSave"
                    type="submit"
                    disabled={
                        !name.trim() ||
                        !phone.trim() ||
                        !email.trim() ||
                        !validationEmail(email.trim()) ||
                        loading
                    }
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>

            {apiError && (
                <p className="error-message">{apiError}</p>
            )}

            {/* Student Table */}
            <h2 className="table-title">Registered Students</h2>

            <div className="table-wrapper">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {studentdata.length > 0 ? (
                            studentdata.map((student, index) => (
                                <tr key={student._id || index}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="edit-button"
                                            onClick={() => {
                                                inputName(student.name || "");
                                                inputPhone(student.phone || "");
                                                inputEmail(student.email || "");
                                                inputErrorName(false);
                                                inputErrorPhone(false);
                                                inputEmailValid(true);
                                                inputErrorEmail("");
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="empty-message">
                                    No student records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RegisterPage;