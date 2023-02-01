import React, { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router'
export default function MentorForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    internAt: '',
    currentStatus: '',
    social: {
      linkedin: '',
      twitter: '',
    },
    description: '',
    sessionPrice: '',
    // resume: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSocialChange = e => {
    setFormData({ ...formData, social: { ...formData.social, [e.target.name]: e.target.value } });
  };

  // const handleFileChange = e => {

  //   setFormData({ ...formData, resume: e.target.files[0] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    if (formData.password !== formData.confirmPassword) {
      return setError("Password do not match!")
    }
    try {
      const url = "http://localhost:9090/api/mentors/mentorRegister";
      const { data: res } = await axios.post(url, formData)
      console.log(res.message);
      alert("account has been registered successfully!")
      router.push("/mentors");
    } catch (error) {
      console.log(error)
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);

      }
    }
    // code for handling form submission
  };

  return (
    <div className='mentorFormRegisration'>
      <div className='container'>
        <form className="mentorForm" onSubmit={handleSubmit}>
          <div>
            <label for="name">Name</label>
            <input type="text" name="name" className="mentorFormInput" onChange={(e) => handleChange(e)} placeholder="e.g. Peter Parker" required />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="text" name="email" className="mentorFormInput" onChange={(e) => handleChange(e)} placeholder="e.g. peterparker4321#gmail.com" required />
          </div>
          <div>
            <label for="mobile">Mobile Number</label>
            <input type="text" name="mobile" className="mentorFormInput" onChange={(e) => handleChange(e)} placeholder="62334413XXX" required />
          </div>
          <div>
            <label for="internAt">Intern At</label>
            <input type="text" name="internAt" className="mentorFormInput" onChange={(e) => handleChange(e)} placeholder="e.g. MITACS" required />
          </div>
          <div>
            <label for="currentStatus">Current Status</label>
            <input type="text" name="currentStatus" className="mentorFormInput" onChange={(e) => handleChange(e)} placeholder="e.g. Amazon SDE-I" required />
          </div>
          <div>
            <label for="linkedin">Linkedin</label>
            <input type="text" name="linkedin" className="mentorFormInput" onChange={(e) => handleSocialChange(e)} placeholder="e.g. https://www.linkedin.com/peterparker" required />
          </div>
          <div>
            <label for="twitter">Twitter</label>
            <input type="text" name="twitter" className="mentorFormInput" onChange={(e) => handleSocialChange(e)} placeholder="e.g. https://www.twitter.com/peterparker" />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea cols="10" rows="7" name="description" className="mentorFormInput" onChange={(e) => handleChange(e)} placeholder="I've done myI have been working as SDE-I for past 1 years at microsoft..." required />
          </div>
          <div>
            <label for="sessionPrice">Session Price</label>
            <input type="text" name="sessionPrice" className="mentorFormInput" onChange={(e) => handleChange(e)} placeholder="e.g. $27" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" name="password" className="mentorFormInput" onChange={(e) => handleChange(e)} placeholder="e.g. @abcd@321" required />
          </div>
          <div>
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" className="mentorFormInput" onChange={(e) => handleChange(e)} placeholder="e.g. @abcd@321" required />
          </div>
          <div>
            <label for="resume">Resume/CV</label>
            <input type="file" name="resume" className="mentorFormInput" />
          </div>
          {error && <div style={{ color: "red", gridColumn: "1/3" }}>{error}</div>}
          <button type='submit' className='mentorFormButotn'>Register</button>
          <p>Already have mentor account? <a href="#">Login</a></p>
          <a href="#">Forgot password?</a>
        </form>
      </div>
    </div>
  )
} 