import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Validaciones
  const validators = {
    name: (value) =>
      /^([A-ZÁÉÍÓÚÑ]?[a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚÑ]?[a-záéíóúñ]+)*$/.test(value.trim()),
    email: (value) =>
      /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/.test(value.trim()),
    message: (value) => value.trim().length > 0,
  };

  const errorMessages = {
    name: "El nombre solo puede contener letras y espacios. Ej: Carlos Pérez",
    email:
      "El correo debe ser válido y terminar en @gmail.com, @hotmail.com, @outlook.com o @yahoo.com",
    message: "El mensaje no puede estar vacío",
  };

  const handleBlur = (field) => {
    if (!validators[field](formData[field])) {
      toast.error(errorMessages[field], {
        position: "bottom-right",
        transition: Slide,
        className: "scale-up",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 transition-colors duration-300">
      <div className="bg-zinc-200 p-8 rounded-xl shadow-lg w-full max-w-lg border-4 border-zinc-500">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          Contáctame 📩
        </h2>

        <form
          action="https://formsubmit.co/hadesdev004@gmail.com"
          method="POST"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            required
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            className="w-full p-3 border rounded-lg text-gray-900 placeholder-gray-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            className="w-full p-3 border rounded-lg text-gray-900 placeholder-gray-500"
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje..."
            required
            value={formData.message}
            onChange={handleChange}
            onBlur={() => handleBlur("message")}
            className="w-full p-3 border rounded-lg h-32 text-gray-900 placeholder-gray-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Enviar
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
        >
          ← Volver al Portafolio
        </button>
      </div>

      <ToastContainer
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Contact;
