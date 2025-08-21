import React, { useState } from 'react';
import { AiFillMail, AiFillPhone, AiOutlineComment } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, MenuItem, Button } from "@mui/material";
import Box from '@mui/material/Box';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    outlet: "",
    category: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const txtStyle = {
    "& label.Mui-focused": { color: "gray", backgroundColor: "transparent" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray" },
      "&:hover fieldset": { borderColor: "gray" },
      "&.Mui-focused fieldset": { borderColor: "gray" },
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = {};

    if (!formData.name) newErrors.name = "Please fill this!";
    if (!formData.email) newErrors.email = "Please fill this!";
    if (!formData.category) newErrors.category = "Please select a category!";
    if (!formData.message) newErrors.message = "Please fill this!";

    if (formData.phone && !/^[0][0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must start with 0 and be 10 digits long!";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        outlet: "",
        category: "",
        message: ""
      });
    }
  };

  return (
      <div>
        <div className="flex flex-col md:flex-row justify-center items-start p-10 mt-10 mx-20 rounded-lg bg-gray-200 border border-gray-300 shadow-lg shadow-gray-200">
          {/* Left Section */}
          <div className="md:w-1/2 pr-8">
            <h1 className="text-4xl font-bold text-gray-700">We're Ready To Help You!</h1>
            <p className="mt-4 text-gray-500">
              We’re here to help! Fill out the form or reach us via email or phone.
              Our Customer Care Team is available to help you get the best experience.
            </p>
            <div className="mt-6 space-y-4">
              <p className="flex items-center text-gray-500"><AiFillMail className="mr-2" /> littlelanka@gmail.com</p>
              <p className="flex items-center text-gray-500"><AiFillPhone className="mr-2" /> 071 6767670</p>
              <p className="flex items-center text-gray-500"><AiOutlineComment className="mr-2" /> Chat with us</p>
              <p className="flex items-center text-gray-500"><BsFacebook className="mr-2" /> Search us</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 w-full">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  className="!bg-gray-100 !rounded-sm"
                  sx={txtStyle}
                  error={!!errors.name}
                  helperText={errors.name}
              />

              <TextField
                  label="Email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  className="!bg-gray-100 !rounded-sm"
                  sx={txtStyle}
                  error={!!errors.email}
                  helperText={errors.email}
                  type="email"
              />

              <TextField
                  label="Phone Number (optional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  className="!bg-gray-100 !rounded-sm"
                  sx={txtStyle}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 10 }}
                  error={!!errors.phone}
                  helperText={errors.phone}
              />

              <TextField
                  label="Outlet"
                  name="outlet"
                  value={formData.outlet}
                  onChange={handleChange}
                  fullWidth
                  className="!bg-gray-100 !rounded-sm"
                  sx={txtStyle}
              />

              <Box sx={{ minWidth: 120 }} className="!bg-gray-100 !rounded-sm col-span-2">
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel id="category-label">Category *</InputLabel>
                  <Select
                      labelId="category-label"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      label="Category *"
                  >
                    <MenuItem value="suggestion">Suggestion</MenuItem>
                    <MenuItem value="request">Request</MenuItem>
                    <MenuItem value="complain">Complain</MenuItem>
                  </Select>
                  <FormHelperText>{errors.category}</FormHelperText>
                </FormControl>
              </Box>

              <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={4}
                  className="col-span-2 !bg-gray-100 !rounded-sm"
                  sx={txtStyle}
                  error={!!errors.message}
                  helperText={errors.message}
              />

              <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="!bg-orange-400 hover:!bg-orange-500 text-white py-2 col-span-2"
              >
                SUBMIT
              </Button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default ContactUs;