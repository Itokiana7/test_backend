import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Associer une entité à un utilisateur
export const createUserEntity = async (req, res) => {
  try {
    const { userId, entityId } = req.body;
    if (!userId || !entityId) {
      return res.status(400).json({ error: 'userId and entityId are required' });
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Vérifier si l'entité existe
    const entity = await prisma.entity.findUnique({ where: { id: entityId } });
    if (!entity) return res.status(404).json({ error: 'Entity not found' });

    const userEntity = await prisma.userEntity.create({
      data: { userId, entityId },
    });
    res.status(201).json(userEntity);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user-entity association' });
  }
};

//Récupérer toutes les associations
export const getAllUserEntities = async (req, res) => {
  try {
    const userEntities = await prisma.userEntity.findMany({
      include: { user: true, entity: true },
      orderBy: {
        id: 'asc', // Tri par id en ordre croissant
      },
    });
    // const userEntities = await prisma.userEntity.findMany();
    res.status(200).json(userEntities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user-entities' });
  }
};

//Récupérer une association par son ID
export const getUserEntityById = async (req, res) => {
  try {
    const { id } = req.params;
    const userEntity = await prisma.userEntity.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, entity: true },
    });
    if (!userEntity) return res.status(404).json({ error: 'UserEntity not found' });
    res.status(200).json(userEntity);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user-entity' });
  }
};

//Mettre à jour une association
export const updateUserEntity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, entityId } = req.body;
    const userEntity = await prisma.userEntity.update({
      where: { id: parseInt(id) },
      data: { userId, entityId },
    });
    res.status(200).json(userEntity);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user-entity' });
  }
};

//Supprimer une association
export const deleteUserEntity = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.userEntity.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user-entity' });
  }
};