// =====================================================
// LION SCHOOL - Consumo da API
// Base: https://lion-school-phbo.onrender.com
// =====================================================

const API_BASE_URL = "https://lion-school-phbo.onrender.com";

/**
 * Função genérica de request.
 * Centraliza tratamento de erro pra não repetir try/catch em todo lugar.
 */
async function apiRequest(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Falha ao buscar ${endpoint}:`, error);
    throw error;
  }
}

// ---------- CURSOS ----------

/** Lista todos os cursos disponíveis */
export function getCursos() {
  return apiRequest("/cursos");
}

// ---------- ALUNOS ----------

/** Lista todos os alunos, com filtro opcional por curso_id e/ou status */
export function getAlunos({ cursoId, status } = {}) {
  const params = new URLSearchParams();
  if (cursoId) params.append("curso_id", cursoId);
  if (status) params.append("status", status);

  const query = params.toString() ? `?${params.toString()}` : "";
  return apiRequest(`/alunos${query}`);
}

/** Busca um aluno específico pelo ID */
export function getAlunoPorId(id) {
  return apiRequest(`/alunos/${id}`);
}
