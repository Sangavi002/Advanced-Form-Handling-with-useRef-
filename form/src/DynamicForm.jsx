import {useRef} from 'react';
import './DynamicForm.css'

function DynamicForm(){
    // useRef hook is used to create references to input fields and error messages
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const ageErrorRef = useRef();
    const mobileErrorRef = useRef();
    
    // handleBlur function is triggered when input fields lose focus
    const handleBlur = (event) => {
        const inputRef = event.currentTarget;
        inputRef.style.borderColor = '';
        if (!inputRef.value) {
            inputRef.style.borderColor = 'red';
        }
    };

    // handleAgeBlur function is triggered when age input field loses focus
    const handleAgeBlur = (event) => {
        const inputRef = event.currentTarget;
        inputRef.style.borderColor = '';
        ageErrorRef.current.style.display = 'none';
        
        if (!inputRef.value) {
            inputRef.style.borderColor = 'red';
        }
        const ageValue = Number(inputRef.value);

        // Age validation: Display error if age is less than 18
        if (ageValue < 18) {
            inputRef.style.borderColor = 'red';
            ageErrorRef.current.style.display = 'block';
        }
    };

    // handleMobileBlur function is triggered when age input field loses focus
    const handleMobileBlur = (event) => {
        const inputRef = event.currentTarget;
        inputRef.style.borderColor = '';
        mobileErrorRef.current.style.display = 'none';
        
        if (!inputRef.value) {
            inputRef.style.borderColor = 'red';
        }

        // Mobile number validation: Display error if length is not 10
        if (inputRef.value.length !== 10) {
            inputRef.style.borderColor = 'red';
            mobileErrorRef.current.style.display = 'block';
        }
    };


    // handleSubmit function is triggered when the form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Resetting border color and error messages
        inputRef1.current.style.borderColor = '';
        inputRef2.current.style.borderColor = '';
        inputRef3.current.style.borderColor = '';
        inputRef4.current.style.borderColor = '';
        ageErrorRef.current.style.display = 'none';
        mobileErrorRef.current.style.display = 'none';
    
        // Validating the form fields
        let isValid = true;
    
        if (!inputRef1.current.value) {
            inputRef1.current.style.borderColor = 'red';
            isValid = false;
        }
        if (!inputRef2.current.value) {
            inputRef2.current.style.borderColor = 'red';
            isValid = false;
        }
        if (!inputRef3.current.value || Number(inputRef3.current.value) < 18) {
            inputRef3.current.style.borderColor = 'red';
            ageErrorRef.current.style.display = 'block';
            isValid = false;
        }
        if (!inputRef4.current.value || inputRef4.current.value.length !== 10) {
            inputRef4.current.style.borderColor = 'red';
            mobileErrorRef.current.style.display = 'block';
            isValid = false;
        }
    
         // If all fields are valid, submit the form data
        if (isValid) {
            const formData = {
                fullname: inputRef1.current.value,
                father: inputRef2.current.value,
                age: inputRef3.current.value,
                mobile: inputRef4.current.value
            };
    
            // Making a POST request to a local server to submit form data
            try {
                const response = await fetch('http://localhost:3000/voterList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                console.log(response)
                // Clearing form fields after successful submission
                inputRef1.current.value = '';
                inputRef2.current.value = '';
                inputRef3.current.value = '';
                inputRef4.current.value = '';
                
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    };
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <div className='main-container'>
                    <h1>Voter List</h1>

                    <label htmlFor="fullname">Fullname</label>
                    <input type="text" name="fullname" ref={inputRef1} onBlur={handleBlur}/>
                    
                    <label htmlFor="Father">Father name</label>
                    <input type="text" name="father" ref={inputRef2} onBlur={handleBlur}/>
                    
                    <label htmlFor="age">Age</label>
                    <input type="number" name="age" ref={inputRef3} onBlur={handleAgeBlur}/>
                    <p ref={ageErrorRef} style={{display: 'none'}}>Age should be at least 18 years.</p>
                    
                    <label htmlFor="mobile">Mobile</label>
                    <input type="number" name="mobile" ref={inputRef4} onBlur={handleMobileBlur}/>
                    <p ref={mobileErrorRef} style={{display: 'none'}}>Number should contain 10 digits.</p>
                    
                    <button type='submit'> Submit</button>
                 
                </div>
            </form>
        </>
    )
}

export default DynamicForm