const API_BASE_URL = 'http://localhost:3001/api'

export interface Project {
  id?: number
  title: string
  image: string
  categorie: string
  specialite: string
  status: string
  version: string
  description: string
  situation?: string
  tags: string[]
  github?: string | null
  website?: string | null
  screenshots?: Array<{
    src: string
    title: string
    alt: string
  }>
  actions?: Array<{
    description: string
  }>
  resultat?: string
  challenges?: Array<{
    description: string
  }>
  apprentissages?: Array<{
    description: string
  }>
  isVisible?: boolean
  order?: number
  createdAt?: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class ProjectsService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw new Error('Erreur de connexion à l\'API')
    }
  }

  async getProjects(filters?: { categorie?: string; visible?: boolean }): Promise<ApiResponse<Project[]>> {
    const params = new URLSearchParams()
    if (filters?.categorie) params.append('categorie', filters.categorie)
    if (filters?.visible !== undefined) params.append('visible', filters.visible.toString())

    const query = params.toString()
    return this.request<Project[]>(`/projects${query ? `?${query}` : ''}`)
  }

  async getProject(id: number): Promise<ApiResponse<Project>> {
    return this.request<Project>(`/projects/${id}`)
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Project>> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    })
  }

  async updateProject(id: number, project: Partial<Project>): Promise<ApiResponse<Project>> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    })
  }

  async deleteProject(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    })
  }

  async toggleProjectVisibility(id: number): Promise<ApiResponse<Project>> {
    return this.request<Project>(`/projects/${id}/toggle-visibility`, {
      method: 'PATCH',
    })
  }
}

export const projectsService = new ProjectsService()
export default projectsService
