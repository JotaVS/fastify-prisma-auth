export async function sendErrorToExternalRoute(error) {
  try {
    const errorPayload = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    };

    console.log("Enviando erro para rota externa:", errorPayload);

    const response = await fetch("http://localhost:3000/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ errorPayload: JSON.stringify(errorPayload) }),
    });

    console.log("Status da resposta:", response.status);
    const responseData = await response.text();
    console.log("Resposta recebida:", responseData);

    if (!response.ok) {
      console.error("Erro ao enviar - Status:", response.status);
    }
  } catch (err) {
    console.error("Falha ao enviar erro para rota externa:", err);
  }
}
