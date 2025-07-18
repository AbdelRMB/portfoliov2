<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>Administration des Projets</h1>
      <button @click="showAddForm = true" class="btn-primary">
        <i class="icon-plus"></i> Nouveau Projet
      </button>
    </div>

    <!-- Formulaire d'ajout/édition -->
    <div v-if="showAddForm || editingProject" class="modal-overlay" @click="closeForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingProject ? 'Modifier' : 'Ajouter' }} un projet</h2>
          <button @click="closeForm" class="btn-close">&times;</button>
        </div>
        
        <form @submit.prevent="saveProject" class="project-form">
          <div class="form-group">
            <label>Titre *</label>
            <input v-model="currentProject.title" type="text" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Catégorie *</label>
              <select v-model="currentProject.categorie" required>
                <option value="">Sélectionner une catégorie</option>
                <option value="Projet Scolaire">🎓 Projet Scolaire</option>
                <option value="Projet Client">💼 Projet Client</option>
                <option value="Projet Perso">🚀 Projet Personnel</option>
                <option value="Projet Professionnel">🏢 Projet Professionnel</option>
                <option value="Projet Pro">⭐ Projet Pro</option>
              </select>
            </div>

          <div class="form-group">
            <label>Spécialité *</label>
            <select v-model="currentProject.specialite" required>
              <option value="">Sélectionner une spécialité</option>
              <option value="Web">Développement Web</option>
              <option value="Mobile">Développement Mobile</option>
              <option value="Desktop">Application Desktop</option>
              <option value="Discord">Bot Discord</option>
              <option value="FiveM">FiveM/GTA RP</option>
              <option value="API">API/Backend</option>
              <option value="DevOps">DevOps/Infrastructure</option>
              <option value="Data">Data Science/BI</option>
              <option value="Réseau">Réseau/Sécurité</option>
              <option value="IA">Intelligence Artificielle</option>
              <option value="Blockchain">Blockchain</option>
              <option value="IoT">Internet des Objets</option>
              <option value="Game">Développement de Jeux</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Status *</label>
              <select v-model="currentProject.status" required>
                <option value="">Sélectionner un statut</option>
                <option value="En cours">🔄 En cours</option>
                <option value="Terminé">✅ Terminé</option>
                <option value="En pause">⏸️ En pause</option>
                <option value="Abandonné">❌ Abandonné</option>
              </select>
            </div>

            <div class="form-group">
              <label>Version *</label>
              <input v-model="currentProject.version" type="text" required>
            </div>
          </div>

          <div class="form-group">
            <label>Image *</label>
            <div class="image-input-group">
              <input v-model="currentProject.image" type="text" required placeholder="/assets/images/mon-projet.png">
              <div class="image-suggestions">
                <button type="button" 
                        v-for="suggestion in imageSuggestions" 
                        :key="suggestion.path"
                        @click="currentProject.image = suggestion.path"
                        class="suggestion-btn">
                  {{ suggestion.name }}
                </button>
              </div>
              <div v-if="currentProject.image" class="image-preview">
                <img :src="currentProject.image" :alt="currentProject.title" @error="imageError = true">
                <span v-if="imageError" class="error-text">⚠️ Image non trouvée</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Description *</label>
            <textarea v-model="currentProject.description" rows="4" required></textarea>
          </div>

          <div class="form-group">
            <label>Situation</label>
            <textarea v-model="currentProject.situation" rows="3"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>GitHub URL</label>
              <input v-model="currentProject.github" type="url">
            </div>

            <div class="form-group">
              <label>Site Web URL</label>
              <input v-model="currentProject.website" type="url">
            </div>
          </div>

          <div class="form-group">
            <label>Tags / Technologies *</label>
            <div class="tags-selector">
              <div class="available-tags">
                <h4>Technologies disponibles :</h4>
                <div class="tag-categories">
                  <div class="tag-category">
                    <h5>Frontend</h5>
                    <div class="tag-list">
                      <button type="button" 
                              v-for="tag in frontendTags" 
                              :key="tag"
                              @click="toggleTag(tag)"
                              :class="['tag-btn', { selected: currentProject.tags.includes(tag) }]">
                        {{ tag }}
                      </button>
                    </div>
                  </div>
                  
                  <div class="tag-category">
                    <h5>Backend</h5>
                    <div class="tag-list">
                      <button type="button" 
                              v-for="tag in backendTags" 
                              :key="tag"
                              @click="toggleTag(tag)"
                              :class="['tag-btn', { selected: currentProject.tags.includes(tag) }]">
                        {{ tag }}
                      </button>
                    </div>
                  </div>
                  
                  <div class="tag-category">
                    <h5>Base de données</h5>
                    <div class="tag-list">
                      <button type="button" 
                              v-for="tag in databaseTags" 
                              :key="tag"
                              @click="toggleTag(tag)"
                              :class="['tag-btn', { selected: currentProject.tags.includes(tag) }]">
                        {{ tag }}
                      </button>
                    </div>
                  </div>
                  
                  <div class="tag-category">
                    <h5>Outils</h5>
                    <div class="tag-list">
                      <button type="button" 
                              v-for="tag in toolsTags" 
                              :key="tag"
                              @click="toggleTag(tag)"
                              :class="['tag-btn', { selected: currentProject.tags.includes(tag) }]">
                        {{ tag }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="selected-tags">
                <h4>Technologies sélectionnées ({{ currentProject.tags.length }}) :</h4>
                <div class="selected-tags-list">
                  <span v-for="tag in currentProject.tags" 
                        :key="tag" 
                        class="selected-tag">
                    {{ tag }}
                    <button type="button" @click="removeTag(tag)" class="remove-tag">×</button>
                  </span>
                </div>
                <div class="custom-tag-input">
                  <input v-model="customTag" 
                         @keyup.enter="addCustomTag"
                         type="text" 
                         placeholder="Ajouter une technologie personnalisée...">
                  <button type="button" @click="addCustomTag" class="btn-add-custom">Ajouter</button>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Résultat</label>
            <textarea v-model="currentProject.resultat" rows="3"></textarea>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeForm" class="btn-secondary">Annuler</button>
            <button type="submit" class="btn-primary" :disabled="saving">
              {{ saving ? 'Sauvegarde...' : 'Sauvegarder' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Liste des projets -->
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-header">
          <img :src="project.image" :alt="project.title" class="project-image">
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <span class="project-category">{{ project.categorie }}</span>
            <span class="project-status" :class="project.status.toLowerCase()">{{ project.status }}</span>
          </div>
        </div>

        <div class="project-details">
          <p class="project-description">{{ project.description.substring(0, 100) }}...</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>

        <div class="project-actions">
          <button @click="editProject(project)" class="btn-edit">
            <i class="icon-edit"></i> Modifier
          </button>
          <button @click="toggleVisibility(project)" class="btn-toggle" 
                  :class="{ 'visible': project.isVisible }">
            <i :class="project.isVisible ? 'icon-eye' : 'icon-eye-off'"></i>
            {{ project.isVisible ? 'Visible' : 'Masqué' }}
          </button>
          <button @click="deleteProject(project)" class="btn-delete">
            <i class="icon-trash"></i> Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- Message de chargement -->
    <div v-if="loading" class="loading">
      <p>Chargement des projets...</p>
    </div>

    <!-- Message d'erreur -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'

export default {
  name: 'AdminProjects',
  setup() {
    const projects = ref([])
    const loading = ref(false)
    const saving = ref(false)
    const error = ref('')
    const showAddForm = ref(false)
    const editingProject = ref(null)
    const customTag = ref('')
    const imageError = ref(false)
    
    // Listes prédéfinies de technologies
    const frontendTags = ref([
      'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 
      'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby', 'Tailwind CSS', 'Bootstrap', 
      'Sass', 'Less', 'jQuery', 'Alpine.js', 'Webpack', 'Vite', 'Parcel'
    ])
    
    const backendTags = ref([
      'Node.js', 'Express', 'Python', 'Django', 'Flask', 'FastAPI', 'PHP', 
      'Laravel', 'Symfony', 'Java', 'Spring', 'C#', '.NET', 'Ruby', 'Rails', 
      'Go', 'Rust', 'C++', 'C', 'Kotlin', 'Scala', 'Lua'
    ])
    
    const databaseTags = ref([
      'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'MariaDB', 
      'Oracle', 'SQL Server', 'Firebase', 'Supabase', 'PlanetScale', 
      'Prisma', 'Sequelize', 'Mongoose', 'TypeORM'
    ])
    
    const toolsTags = ref([
      'Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'AWS', 'Azure', 
      'Google Cloud', 'Vercel', 'Netlify', 'Heroku', 'DigitalOcean', 
      'Linux', 'Ubuntu', 'CentOS', 'nginx', 'Apache', 'Cloudflare', 
      'Jest', 'Cypress', 'Selenium', 'Postman', 'Figma', 'Adobe XD',
      'Discord.js', 'FiveM', 'Lua', 'ESX', 'QBCore', 'Strapi', 'Sanity'
    ])
    
    const imageSuggestions = ref([
      { name: 'Orbit', path: '/assets/images/orbit.png' },
      { name: 'Discord', path: '/assets/images/discord.png' },
      { name: 'WikiGame', path: '/assets/images/wikigame.png' },
      { name: 'Prestiges Paris', path: '/assets/images/prestigesparis.png' },
      { name: 'Still Link', path: '/assets/images/stilllink/still-link.png' },
      { name: 'Bot Discord', path: '/assets/images/bot-discord.png' },
      { name: 'Default', path: '/assets/dev.jpg' },
    ])
    
    const currentProject = reactive({
      title: '',
      image: '',
      categorie: '',
      specialite: '',
      status: '',
      version: '',
      description: '',
      situation: '',
      tags: [],
      github: null,
      website: null,
      resultat: '',
      isVisible: true
    })

    const tagsString = computed({
      get: () => currentProject.tags.join(', '),
      set: (value) => {
        currentProject.tags = value.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
    })

    // Méthodes pour la gestion des tags
    const toggleTag = (tag) => {
      const index = currentProject.tags.indexOf(tag)
      if (index > -1) {
        currentProject.tags.splice(index, 1)
      } else {
        currentProject.tags.push(tag)
      }
    }

    const removeTag = (tag) => {
      const index = currentProject.tags.indexOf(tag)
      if (index > -1) {
        currentProject.tags.splice(index, 1)
      }
    }

    const addCustomTag = () => {
      if (customTag.value.trim() && !currentProject.tags.includes(customTag.value.trim())) {
        currentProject.tags.push(customTag.value.trim())
        customTag.value = ''
      }
    }

    // API calls
    const apiUrl = 'http://localhost:3001/api/projects'

    const fetchProjects = async () => {
      loading.value = true
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data.success) {
          projects.value = data.data
        } else {
          error.value = data.message
        }
      } catch (err) {
        error.value = 'Erreur lors du chargement des projets'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const saveProject = async () => {
      saving.value = true
      try {
        const method = editingProject.value ? 'PUT' : 'POST'
        const url = editingProject.value ? `${apiUrl}/${editingProject.value.id}` : apiUrl
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentProject)
        })

        const data = await response.json()
        if (data.success) {
          await fetchProjects()
          closeForm()
        } else {
          error.value = data.message
        }
      } catch (err) {
        error.value = 'Erreur lors de la sauvegarde'
        console.error(err)
      } finally {
        saving.value = false
      }
    }

    const editProject = (project) => {
      editingProject.value = project
      Object.assign(currentProject, project)
      showAddForm.value = true
    }

    const deleteProject = async (project) => {
      if (!confirm(`Êtes-vous sûr de vouloir supprimer "${project.title}" ?`)) return

      try {
        const response = await fetch(`${apiUrl}/${project.id}`, {
          method: 'DELETE'
        })
        const data = await response.json()
        if (data.success) {
          await fetchProjects()
        } else {
          error.value = data.message
        }
      } catch (err) {
        error.value = 'Erreur lors de la suppression'
        console.error(err)
      }
    }

    const toggleVisibility = async (project) => {
      try {
        const response = await fetch(`${apiUrl}/${project.id}/toggle-visibility`, {
          method: 'PATCH'
        })
        const data = await response.json()
        if (data.success) {
          await fetchProjects()
        } else {
          error.value = data.message
        }
      } catch (err) {
        error.value = 'Erreur lors du changement de visibilité'
        console.error(err)
      }
    }

    const closeForm = () => {
      showAddForm.value = false
      editingProject.value = null
      imageError.value = false
      customTag.value = ''
      Object.assign(currentProject, {
        title: '',
        image: '',
        categorie: '',
        specialite: '',
        status: '',
        version: 'v1.0',
        description: '',
        situation: '',
        tags: [],
        github: null,
        website: null,
        resultat: '',
        isVisible: true
      })
      error.value = ''
    }

    onMounted(fetchProjects)

    return {
      projects,
      loading,
      saving,
      error,
      showAddForm,
      editingProject,
      currentProject,
      customTag,
      imageError,
      frontendTags,
      backendTags,
      databaseTags,
      toolsTags,
      imageSuggestions,
      tagsString,
      toggleTag,
      removeTag,
      addCustomTag,
      fetchProjects,
      saveProject,
      editProject,
      deleteProject,
      toggleVisibility,
      closeForm
    }
  }
}
</script>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.admin-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.btn-primary {
  background: #ffffff;
  color: #667eea;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: #f8f9ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 0;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 2px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 16px 16px 0 0;
}

.modal-header h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.75rem;
  font-weight: 700;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-close:hover {
  background: #e5e7eb;
  color: #374151;
}

.project-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.tags-section {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.tags-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.tag-category {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.tag-category h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tag-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-option {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  background: white;
  color: #374151;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  user-select: none;
}

.tag-option:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.tag-option.selected {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.selected-tags {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-top: 1rem;
}

.selected-tags h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.selected-tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.selected-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.remove-tag {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  line-height: 1;
}

.remove-tag:hover {
  color: #fecaca;
}

.custom-tag-input {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.custom-tag-input input {
  flex: 1;
  margin: 0;
}

.image-section {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.image-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.image-suggestion {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.image-suggestion:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.image-preview {
  margin-top: 1rem;
  text-align: center;
}

.image-preview img {
  max-width: 200px;
  max-height: 150px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
}

.btn-secondary {
  background: #6b7280;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #4b5563;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.project-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
}

.project-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.project-info h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
}

.project-category {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-right: 0.5rem;
}

.project-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.project-status.terminé {
  background: #d1fae5;
  color: #065f46;
}

.project-status.en-cours {
  background: #fef3c7;
  color: #92400e;
}

.project-details {
  padding: 0 1.5rem 1.5rem;
}

.project-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.btn-edit, .btn-delete, .btn-toggle {
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.3s ease;
}

.btn-edit {
  background: #f59e0b;
  color: white;
}

.btn-edit:hover {
  background: #d97706;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

.btn-delete:hover {
  background: #dc2626;
}

.btn-toggle {
  background: #6b7280;
  color: white;
}

.btn-toggle:hover {
  background: #4b5563;
}

.btn-toggle.visible {
  background: #10b981;
}

.btn-toggle.visible:hover {
  background: #059669;
}

.loading, .error-message {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.error-message {
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }
  
  .admin-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .tags-categories {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-actions {
    flex-wrap: wrap;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
