import { toast } from "react-toastify";

export function handleApiError(error) {
  // Si no hay respuesta → error de red o JSON parse
  if (!error.response) {
    toast.error("Error de conexión o datos inválidos", {
      position: "bottom-right",
      className: "scale-up",
    });
    return;
  }

  const status = error.response.status;

  switch (status) {
    case 429:
      toast.error("Demasiadas solicitudes. Intenta de nuevo en unos minutos.", {
        position: "bottom-right",
        className: "scale-up",
      });
      break;

    case 500:
      toast.error("Error interno del servidor. Intenta más tarde.", {
        position: "bottom-right",
        className: "scale-up",
      });
      break;

    case 502:
      toast.error("Puerta de enlace incorrecta. El servidor no respondió bien.", {
        position: "bottom-right",
        className: "scale-up",
      });
      break;

    case 503:
      toast.error("Servicio no disponible. El servidor está en mantenimiento.", {
        position: "bottom-right",
        className: "scale-up",
      });
      break;

    case 504:
      toast.error("Tiempo de espera agotado. El servidor tardó demasiado.", {
        position: "bottom-right",
        className: "scale-up",
      });
      break;

    case 401:
      console.error("Error 401: No autorizado. Revisa tu API key.");
      toast.error("Error desconocido", {
        position: "bottom-right",
        className: "scale-up",
      });
      break;

    case 403:
      console.error("Error 403: Prohibido. No tienes permisos para este recurso.");
      toast.error("Error desconocido", {
        position: "bottom-right",
        className: "scale-up",
      });
      break;

    case 404:
      console.error("Error 404: Recurso no encontrado.");
      toast.error("Error desconocido", {
        position: "bottom-right",
        className: "scale-up",
      });
      break;

    default:
      console.error("Error inesperado:", status, error.response.data);
      toast.error("Error inesperado", {
        position: "bottom-right",
        className: "scale-up",
      });
      break;
  }
}
