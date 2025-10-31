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
  const validateName = (name) => {
    const regex = /^([A-ZÁÉÍÓÚÑ]?[a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚÑ]?[a-záéíóúñ]+)*$/;
    return regex.test(name.trim());
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/;
    return regex.test(email.trim());
  };

  const validateMessage = (msg) => msg.trim().length > 0;

  // Manejo de blur (cuando el usuario sale del campo)
  const handleBlur = (field) => {
    if (field === "name" && !validateName(formData.name)) {
      toast.error("El nombre solo puede contener letras y espacios. Ej: Carlos Pérez", {
        position: "bottom-right",
        transition: Slide,
        className: "scale-up",
      });
    }
    if (field === "email" && !validateEmail(formData.email)) {
      toast.error("El correo debe ser válido y terminar en @gmail.com, @hotmail.com, @outlook.com o @yahoo.com", {
        position: "bottom-right",
        transition: Slide,
        className: "scale-up",
      });
    }
    if (field === "message" && !validateMessage(formData.message)) {
      toast.error("El mensaje no puede estar vacío", {
        position: "bottom-right",
        transition: Slide,
        className: "scale-up",
      });
    }
  };

  // Manejo de cambios en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-700 p-8">
      <div className="bg-zinc-200 p-8 rounded-xl shadow-lg w-full max-w-lg border-4 border-zinc-500">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          Contáctame 📩
        </h2>

        <form
          action="https://formsubmit.co/TU_CORREO_AQUI"
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

      {/* Contenedor de notificaciones */}
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
