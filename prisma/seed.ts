import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const superAdminEmail = process.env.SUPERADMIN_EMAIL;
    const superAdminPassword = process.env.SUPERADMIN_PASSWORD;


    if (!superAdminEmail || !superAdminPassword) {
        throw new Error(
            'Please define SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD in your .env file'
        );
    }

    console.log('Seeding database...');

    const hashedPassword = await bcrypt.hash(superAdminPassword, 12);

    const superAdmin = await prisma.user.upsert({
        where: { email: superAdminEmail },
        update: {},
        create: {
            email: superAdminEmail,
            password: hashedPassword,
            name: 'Super Admin',
            role: Role.SUPERADMIN,
        },
    });

    console.log(`Super admin created/verified: ${superAdmin.email}`);
}

main()
    .catch((e) => {
        console.error('An error occurred during seeding:');
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });