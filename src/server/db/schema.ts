// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { type InferSelectModel, relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `titipinaja_${name}`);

export const listingStatusEnum = pgEnum("listing_status", [
  "available",
  "fully_booked",
]);

export const listings = createTable("listing", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: varchar("user_id", { length: 255 }).references(() => users.id),
  baggage: integer("baggage").notNull(),
  price: integer("price").notNull(),
  from: varchar("from").notNull(),
  to: varchar("to").notNull(),
  lastReceiveAt: varchar("last_receive_at", { length: 256 }).notNull(),
  departureAt: varchar("departure_at", { length: 256 }).notNull(),
  arriveAt: varchar("arrive_at", { length: 256 }).notNull(),
  termsAndConditions: varchar("terms_and_conditions"),
  status: listingStatusEnum("listing_status").default("available"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const listingsRelations = relations(listings, ({ one }) => ({
  user: one(users, {
    fields: [listings.userId],
    references: [users.id],
  }),
}));

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username"),
  hashedPassword: varchar("hashed_password"),
  image: varchar("image", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  session: varchar("session").references(() => sessions.id),
  picture: varchar("picture", { length: 255 }),
  whatsappNumber: varchar("whatsapp_number", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  session: many(sessions),
  listings: many(listings),
}));

export const sessions = createTable(
  "session",
  {
    id: varchar("session_token", { length: 255 }).notNull().primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const passwordResetToken = createTable("password_reset_token", {
  tokenHash: varchar("token_hash", { length: 255 }).unique(),
  userId: varchar("user", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

export type Listing = InferSelectModel<typeof listings>;
export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;
