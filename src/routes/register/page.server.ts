import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { error } from '@sveltejs/kit';

const prisma = new PrismaClient();
const saltRounds = 10;
const jwtSecret = 'your_jwt_secret';  // You should use an environment variable for this

export const actions = {
  register: async ({ request }) => {
    const { email, password } = await request.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw error(400, 'User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    return new Response(
      JSON.stringify({ token }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
