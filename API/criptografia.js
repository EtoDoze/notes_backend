import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Erro ao gerar hash:', error);
        throw error;
    }
}

async function comparePassword(password, email) {
    try {
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
        
        const match = await bcrypt.compare(password, user.password);
        return match; // Retorna true se a senha corresponder ao hash
    } catch (error) {
        console.error('Erro ao comparar senhas:', error);
        throw error;
    }
}

export { comparePassword, hashPassword };