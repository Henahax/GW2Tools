import { pgTable, serial, text, real, timestamp, integer } from 'drizzle-orm/pg-core';
import { sql } from "drizzle-orm";

export const users = pgTable('users', {
	id: serial('id').primaryKey().notNull(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	roleId: integer('role_id').notNull().references(() => roles.id).default(3)
});

export const roles = pgTable('roles', {
	id: serial('id').primaryKey().notNull(),
	name: text('name').notNull().unique(),
	icon: text('icon').notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey().notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type TableSession = typeof sessions.$inferSelect;
export type TableUser = typeof users.$inferSelect;
export type TableRole = typeof roles.$inferSelect;

export type SessionInsert = typeof sessions.$inferInsert;
export type RoleInsert = typeof roles.$inferInsert;
export type UserInsert = typeof users.$inferInsert;
