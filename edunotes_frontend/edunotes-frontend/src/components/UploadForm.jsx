import axios from "axios";
import { useState } from "react";

function UploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    year: "",
    tags: "",
    is_paid: false,
    pdf_file: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, pdf_file: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subject", formData.subject); // subject = Subject ID
    data.append("year", formData.year); // Just storing for frontend logic
    data.append("tags", formData.tags);
    data.append("is_paid", formData.is_paid);
    data.append("pdf_file", formData.pdf_file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/upload-note/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Uncomment this after adding JWT later:
            // 'Authorization': `Bearer ${token}`
          },
        }
      );
      console.log(res.data);
      setMessage("✅ Note uploaded successfully!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("❌ Upload failed. Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Upload a Note
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
        required
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject ID"
        value={formData.subject}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
        required
      />

      <input
        type="text"
        name="year"
        placeholder="Year (FY/SY/TY)"
        value={formData.year}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
        required
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      <input
        type="file"
        name="pdf_file"
        accept="application/pdf"
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
        required
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="is_paid"
          checked={formData.is_paid}
          onChange={handleChange}
        />
        <span>Paid Note?</span>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Upload Note
      </button>

      {message && (
        <div className="text-center mt-4 font-medium text-green-600">
          {message}
        </div>
      )}
    </form>
  );
}

export default UploadForm;
