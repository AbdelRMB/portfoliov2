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
                <option value="Projet Scolaire">Projet Scolaire</option>
                <option value="Projet Client">Projet Client</option>
                <option value="Projet Perso">Projet Perso</option>
                <option value="Projet Professionnel">Projet Professionnel</option>
                <option value="Projet Pro">Projet Pro</option>
              </select>
            </div>

            <div class="form-group">
              <label>Spécialité *</label>
              <input v-model="currentProject.specialite" type="text" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Status *</label>
              <select v-model="currentProject.status" required>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En pause">En pause</option>
                <option value="Abandonné">Abandonné</option>
              </select>
            </div>

            <div class="form-group">
              <label>Version *</label>
              <input v-model="currentProject.version" type="text" required>
            </div>
          </div>

          <div class="form-group">
            <label>Image URL *</label>
            <input v-model="currentProject.image" type="text" required>
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
            <label>Tags (séparés par des virgules)</label>
            <input v-model="tagsString" type="text" placeholder="React, Vue.js, TypeScript">
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
      Object.assign(currentProject, {
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
      tagsString,
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
  padding: 20px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.admin-header h1 {
  color: #333;
  margin: 0;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary:hover {
  background: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 0;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.project-form {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.project-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.project-header {
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 15px;
}

.project-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.project-info h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.project-category {
  background: #e9ecef;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 8px;
}

.project-status {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  text-transform: uppercase;
}

.project-status.terminé {
  background: #d4edda;
  color: #155724;
}

.project-status.en-cours {
  background: #fff3cd;
  color: #856404;
}

.project-details {
  padding: 0 15px 15px;
}

.project-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  background: #f8f9fa;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  color: #666;
}

.project-actions {
  display: flex;
  gap: 8px;
  padding: 15px;
  border-top: 1px solid #eee;
}

.btn-edit, .btn-delete, .btn-toggle {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.btn-edit {
  background: #ffc107;
  color: #212529;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-toggle {
  background: #6c757d;
  color: white;
}

.btn-toggle.visible {
  background: #28a745;
}

.loading, .error-message {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error-message {
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
}
</style>
