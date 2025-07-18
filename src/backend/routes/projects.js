import express from 'express';
import Project from '../models/Project.js';
import { Op } from 'sequelize';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { categorie, visible } = req.query;
    let where = {};
    
    if (categorie && categorie !== 'all') {
      where.categorie = categorie;
    }
    
    if (visible !== undefined) {
      where.isVisible = visible === 'true';
    }

    const projects = await Project.findAll({
      where,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des projets',
      error: error.message
    });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du projet',
      error: error.message
    });
  }
});

// POST new project
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
      message: 'Projet créé avec succès'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création du projet',
      error: error.message
    });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Project.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });
    
    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }
    
    const project = await Project.findByPk(req.params.id);
    
    res.json({
      success: true,
      data: project,
      message: 'Projet mis à jour avec succès'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour du projet',
      error: error.message
    });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const deletedRows = await Project.destroy({
      where: { id: req.params.id }
    });
    
    if (deletedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Projet supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du projet',
      error: error.message
    });
  }
});

// PATCH toggle visibility
router.patch('/:id/toggle-visibility', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }
    
    project.isVisible = !project.isVisible;
    await project.save();
    
    res.json({
      success: true,
      data: project,
      message: `Projet ${project.isVisible ? 'rendu visible' : 'masqué'} avec succès`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la modification de la visibilité',
      error: error.message
    });
  }
});

export default router;
