import { drizzle } from "drizzle-orm/postgres-js";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
}
main();
