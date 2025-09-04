import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

//Créer un utilisateur
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

// Vérifier si le username existe déjà
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

// Vérifier si l'email existe déjà
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        username,
        email,
        password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

//Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

//Récupérer un utilisateur par son ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

//Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { username, email, password },
    });
    res.status(200).json({message : "Update successfull", user: user});
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

//Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message : `delete successfull `});
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};