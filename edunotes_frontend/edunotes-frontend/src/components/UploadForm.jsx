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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // We'll replace this with Axios later
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
    </form>
  );
}

export default UploadForm;
