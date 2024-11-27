import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    console.log("Starting seed script...");

    console.log("Inserting customers...");
    await prisma.customer.create({
        data: {
            name: 'Meg'
        },
    });
    console.log("Customers inserted.");

    console.log("Inserting drivers...");
    await prisma.driver.createMany({
        data: [{
            name: 'Homer Simpson',
            description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
            car: 'Plymouth Valiant 1973 rosa e enferrujado',
            rating: '2/5 Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
            tax: 2.50,
            minKm: 1
        },{
            name: 'Dominic Toretto',
            description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
            car: 'Dodge Charger R/T 1970 modificado',
            rating: '4/5 Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
            tax: 5.00,
            minKm: 5
        },{
            name: 'James Bond',
            description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
            car: 'Aston Martin DB5 clássico',
            rating: '5/5 Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
            tax: 10.00,
            minKm: 10
        }
    ]
    });
    console.log("Drivers inserted.");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => {await prisma.$disconnect(); });