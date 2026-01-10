import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // 1. Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@mathquest.com' },
        update: {},
        create: {
            email: 'admin@mathquest.com',
            name: 'Admin User',
            role: 'ADMIN',
            studentProfile: {
                create: {
                    xp: 0,
                    level: 99
                }
            }
        },
    })

    // 2. Create Sample Students
    const students = [
        { email: 'alex@example.com', name: 'Alex Johnson', xp: 12500, accuracy: 94, isPaid: true, paymentDate: new Date('2026-01-05') },
        { email: 'sarah@example.com', name: 'Sarah Chen', xp: 11200, accuracy: 91, isPaid: true, paymentDate: new Date('2026-01-03') },
        { email: 'mike@example.com', name: 'Mike Brown', xp: 9800, accuracy: 87, isPaid: false, paymentDate: null },
        { email: 'emily@example.com', name: 'Emily Davis', xp: 8500, accuracy: 89, isPaid: false, paymentDate: null },
        { email: 'james@example.com', name: 'James Wilson', xp: 7200, accuracy: 85, isPaid: true, paymentDate: new Date('2025-12-28') },
        { email: 'lisa@example.com', name: 'Lisa Park', xp: 6500, accuracy: 82, isPaid: false, paymentDate: null },
    ]

    for (const s of students) {
        const user = await prisma.user.upsert({
            where: { email: s.email },
            update: {},
            create: {
                email: s.email,
                name: s.name,
                role: 'STUDENT',
                studentProfile: {
                    create: {
                        xp: s.xp,
                        avgAccuracy: s.accuracy,
                        paymentStatus: s.isPaid ? 'ACTIVE' : 'PENDING',
                        nextPayment: s.paymentDate ? new Date(s.paymentDate.getTime() + 30 * 24 * 60 * 60 * 1000) : null
                    }
                }
            },
        })
        console.log(`Created student: ${user.name}`)
    }

    // 3. Create Sample Questions (Content)
    const operations = ['ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION'] as const;

    // We need to type cast properly if types aren't generated yet, but for now we trust the structure.
    const questions = [
        { text: "5 + 3 = ?", answer: "8", operation: "ADDITION", difficulty: "EASY" },
        { text: "12 + 15 = ?", answer: "27", operation: "ADDITION", difficulty: "MEDIUM" },
        { text: "10 - 4 = ?", answer: "6", operation: "SUBTRACTION", difficulty: "EASY" },
        { text: "5 * 6 = ?", answer: "30", operation: "MULTIPLICATION", difficulty: "MEDIUM" },
        { text: "20 / 4 = ?", answer: "5", operation: "DIVISION", difficulty: "EASY" },
    ];

    for (const q of questions) {
        // Using 'any' as Question delegate might not be in types until we regenerate client
        await (prisma as any).question.create({
            data: {
                ...q,
                status: 'active',
                usageCount: Math.floor(Math.random() * 100)
            }
        });
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
