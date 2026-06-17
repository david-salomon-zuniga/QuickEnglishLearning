// scriptIdorAttack.ts
async function runIdorTest() {
    // 1. Sustituye estos valores reales de tu BD/Login
    const USER_A_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjJmNTVkNDRkLTE3MWEtNDMwYy1hMzI0LWVkMzUxYTQ4YjI1MCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL29hamtsZm53a3JjZWZhbnJzZnNwLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkMjJlMmEzZS03Njg3LTQ0ODctYTIxYS03NTUwYTExNzhjMzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzgxMzkyMzM2LCJpYXQiOjE3ODEzODg3MzYsImVtYWlsIjoic2Fsb21vbjExNDI2MDgwMTBAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6InNhbG9tb24xMTQyNjA4MDEwQGdtYWlsLmNvbSIsImVtYWlsX2NvbmZpcm1lZF9hdCI6IjIwMjYtMDYtMTNUMTk6NDU6NDEuNjAzWiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImQyMmUyYTNlLTc2ODctNDQ4Ny1hMjFhLTc1NTBhMTE3OGMzNCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzgxMzg4NzM2fV0sInNlc3Npb25faWQiOiI5NzFmZTQzZi1hYTNlLTQzOWEtYjZlYi1hZTQzOTdkNDY0MWMiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.4e7HVD6y0X7-_AOnw7a2ZDorvbZV4_gJsu_lb9kAOZzxmK_BnQNWRI5tsN_sToyFG7mcc-lbIU0Oeb7VCHjOWw";
    const ID_VICTIMA_USER_B = "81bbd470-047d-4b59-995f-7e7c581cfa98";

    console.log("🚀 Iniciando prueba IDOR...");

    try {
        const response = await fetch(`http://localhost:8080/api/idor-test?id=${ID_VICTIMA_USER_B}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${USER_A_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 403 || response.status === 404) {
            console.log(`✅ TEST PASADO: El servidor respondió ${response.status}. IDOR bloqueado.`);
        } else if (response.ok) {
            const data = await response.json();
            console.log("❌ VULNERABILIDAD: El servidor devolvió datos que no debían ser accesibles:", data);
        }
    } catch (error) {
        console.error("Error al conectar con el backend:", error);
    }
}

runIdorTest();