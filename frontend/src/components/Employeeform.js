import React from 'react';
import '../styles/dashboard.css';
const EmployeeForm = ({ form, setForm, handleSubmit, isEdit }) => {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 5 * 1024 * 1024) { // Check if file size is larger than 5MB
            alert('File size should be less than 5MB');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm({ ...form, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        let newCourses = form.courses;
        if (checked) {
            newCourses.push(name);
        } else {
            newCourses = newCourses.filter(course => course !== name);
        }
        setForm({ ...form, courses: newCourses });
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required /><br></br>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required /><br></br>
            <label htmlFor="mobile">Mobile No:</label>
            <input type="text" id="mobile" name="mobile" value={form.mobile} onChange={handleChange} required /><br></br>
            <label htmlFor="designation">Designation:</label>
            <input type="text" id="designation" name="designation" value={form.designation} onChange={handleChange} required /><br></br>
            <label>Gender:</label>
            <label htmlFor="male">Male</label>
            <input type="radio" id="male" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} required />
            <label htmlFor="female">Female</label>
            <input type="radio" id="female" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} required /><br></br>
            <label>Courses:</label>
            <label htmlFor="BCA">BCA</label>
            <input type="checkbox" id="BCA" name="BCA" checked={form.courses.includes('BCA')} onChange={handleCheckboxChange} />
            <label htmlFor="MCA">MCA</label>
            <input type="checkbox" id="MCA" name="MCA" checked={form.courses.includes('MCA')} onChange={handleCheckboxChange} />
            <label htmlFor="BSC">BSC</label>
            <input type="checkbox" id="BSC" name="BSC" checked={form.courses.includes('BSC')} onChange={handleCheckboxChange} />
            <label>Image:</label>
            <input type="file" onChange={handleFileChange} required={!isEdit} /><br></br>
            <input type="submit" value={isEdit ? "Update Employee" : "Create Employee"} />
        </form>
        </div>
    );
};

export default EmployeeForm;
