import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users, roles } from './schema';
import { desc, sql } from 'drizzle-orm';

// Load env vars
config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const client = postgres(connectionString);
const db = drizzle(client);

// Seed Data
const seedRoles = [
    { name: 'Administrator', icon: 'fa-solid fa-user-tie' },
    { name: 'Mitglied', icon: 'fa-solid fa-check' },
    { name: 'nicht verifiziert', icon: 'fa-solid fa-xmark' }
];

const seedUsers = [
    {
        username: 'Henahax',
        passwordHash:
            '$argon2id$v=19$m=19456,t=2,p=1$oz7nt4RmGERDhcfJONhfXQ$o0xhN09VyoboDZ+d+BHQM+JSAy2b0zW8ADdfFnTv/aE',
        roleId: 1
    }
];

// Reset sequence helper
const resetSequence = async (table: string, column: string) => {
    const sequenceName = `${table}_${column}_seq`;
    await db.execute(
        sql.raw(
            `SELECT setval('${sequenceName}', (SELECT COALESCE(MAX(${column}), 0) FROM ${table}))`
        )
    );
    console.log(`Sequence reset: ${sequenceName}`);
};

const main = async () => {
    try {
        // Insert or update
        for (const role of seedRoles) {
            await db
                .insert(roles)
                .values(role)
                .onConflictDoUpdate({ target: roles.name, set: role });
            console.log(`✅ Role: ${role.name}`);
        }

        for (const user of seedUsers) {
            await db
                .insert(users)
                .values(user)
                .onConflictDoUpdate({ target: users.username, set: user });
            console.log(`✅ User: ${user.username}`);
        }

        // Reset sequences after seeding
        await Promise.all([
            resetSequence('users', 'id'),
            resetSequence('entries', 'id'),
            resetSequence('roles', 'id'),
            resetSequence('scales', 'id')
        ]);

        console.log('🎉 Seeding complete!');

    } catch (err) {
        console.error('❌ Seeding failed:', err);
        throw err;
    } finally {
        await client.end();
    }
};

main().catch(() => process.exit(1));
