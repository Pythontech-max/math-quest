import { db } from "../src/lib/db";

async function makeAdmin(email: string) {
    try {
        const user = await db.user.update({
            where: { email },
            data: { role: "ADMIN" }
        });
        console.log(`✅ User ${user.email} is now an ADMIN.`);
    } catch (error) {
        console.error("❌ Failed to update user role:", error);
    } finally {
        await db.$disconnect();
    }
}

const email = process.argv[2];
if (!email) {
    console.log("Please provide an email: npx tsx scripts/make_admin.ts user@example.com");
} else {
    makeAdmin(email);
}
