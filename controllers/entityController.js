import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


//Créer une entité
export const createEntity = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

// Vérifier si le name existe déjà
    const existingEntityName = await prisma.entity.findFirst({
      where: { name },
    });
    if (existingEntityName) {
      return res.status(400).json({ error: 'Name already exists' });
    }

    const entity = await prisma.entity.create({
      data: { name },
    });
    res.status(201).json(entity);
  } catch (error) {
    res.status(500).json({ error: 'Error creating entity' });
  }
};

//Récupérer toutes les entités
export const getAllEntities = async (req, res) => {
  try {
    const entities = await prisma.entity.findMany();
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching entities' });
  }
};

//Récupérer une entité par son ID
export const getEntityById = async (req, res) => {
  try {
    const { id } = req.params;
    const entity = await prisma.entity.findUnique({ where: { id: parseInt(id) } });
    if (!entity) return res.status(404).json({ error: 'Entity not found' });
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching entity' });
  }
};

//Mettre à jour une entité
export const updateEntity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const entity = await prisma.entity.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ error: 'Error updating entity' });
  }
};

//Supprimer une entité
export const deleteEntity = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.entity.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message : "delete successfull" });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting entity' });
  }
};