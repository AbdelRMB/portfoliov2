<template>
    <div class="add-project-container">
        <h1>Ajouter un nouveau projet</h1>
        <form @submit.prevent="submitProject">
            <div class="form-group">
                <label for="title">Titre du projet</label>
                <input type="text" id="title" v-model="project.title" required>
            </div>
            <div class="form-group">
                <label for="image">URL de l'image du projet</label>
                <input type="text" id="image" v-model="project.image">
            </div>
            <div class="form-group">
                <label for="categorie">Catégorie du projet</label>
                <select id="categorie" v-model="project.categorie">
                    <option disabled value="">Sélectionner une catégorie</option>
                    <option>Projet Scolaire</option>
                    <option>Projet Client</option>
                    <option>Projet Perso</option>
                </select>
            </div>
            <div class="form-group">
                <label for="specialite">Spécialité du projet</label>
                <select id="specialite" v-model="project.spécialité">
                    <option disabled value="">Sélectionner une spécialité</option>
                    <option>Web</option>
                    <option>Discord</option>
                    <option>FiveM</option>
                </select>
            </div>
            <div class="form-group">
                <label for="status">Statut du projet</label>
                <select id="status" v-model="project.status">
                    <option disabled value="">Sélectionner un statut</option>
                    <option>En cours</option>
                    <option>Terminé</option>
                </select>
            </div>
            <div class="form-group">
                <label for="version">Version du projet</label>
                <input type="text" id="version" v-model="project.version">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" v-model="project.description" rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="tags">Tags (séparer par des virgules)</label>
                <input type="text" id="tags" v-model="project.tags">
            </div>
            <div class="form-group">
                <label for="github">Lien GitHub</label>
                <input type="text" id="github" v-model="project.github">
            </div>
            <div class="form-group">
                <label for="website">Lien du site web (si applicable)</label>
                <input type="text" id="website" v-model="project.website">
            </div>
            <button type="submit" class="btn-submit">Ajouter Projet</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddProject',
    data() {
        return {
            project: {
                title: '',
                image: '',
                categorie: '',
                spécialité: '',
                status: '',
                version: '',
                description: '',
                tags: '',
                github: '',
                website: ''
            }
        };
    },
    methods: {
        submitProject() {
            // Example method to handle form submission
            console.log('Project submitted:', this.project);
            // Add method to handle actual data submission like API call here
        }
    }
};
</script>

<style scoped>
.add-project-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.btn-submit {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
}

.btn-submit:hover {
    background-color: #45a049;
}
</style>