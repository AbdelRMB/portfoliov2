import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categorie: {
    type: DataTypes.ENUM,
    values: ['Projet Scolaire', 'Projet Client', 'Projet Perso', 'Projet Professionnel', 'Projet Pro'],
    allowNull: false
  },
  specialite: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM,
    values: ['En cours', 'Terminé', 'En pause', 'Abandonné'],
    allowNull: false
  },
  version: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  situation: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  github: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  screenshots: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  actions: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  resultat: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  challenges: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  apprentissages: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  isVisible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'projects',
  timestamps: true
});

export default Project;
