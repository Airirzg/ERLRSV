import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.reservation.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.category.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Telecommunications',
        description: 'Advanced research in network technologies, signal processing, and wireless communications systems'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Cloud Computing & AI',
        description: 'Cutting-edge research in machine learning, data analytics, and distributed computing systems'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Multi-Sector Automation',
        description: 'Electronic control systems and automation solutions across various industry sectors'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Systems Engineering',
        description: 'Industrial computing and automation for complex engineering systems and processes'
      }
    })
  ]);

  // Create equipment
  const equipment = await Promise.all([
    // Cloud Computing and AI Equipment
    prisma.equipment.create({
      data: {
        name: 'High-Performance Server',
        description: 'Size : 2U (rack-mount)\nColor : Black\nStorage : 8 TB (HDD), 2 TB (SSD)\nSpeed : 2.8 GHz (Intel Xeon Processor)\nPerformance : 64 cores, 128 threads\nRAM : 512 GB DDR4\nPrice : $15,000 USD',
        categoryId: categories[1].id, // Cloud Computing & AI
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Workstation',
        description: 'Size : Tower (Mid-Tower)\nColor : Gray\nStorage : 2 TB (NVMe SSD)\nSpeed : 3.6 GHz (AMD Ryzen Processor)\nPerformance : 16 cores, 32 threads\nRAM : 128 GB DDR4\nPrice : $3,500 USD',
        categoryId: categories[1].id, // Cloud Computing & AI
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'NAS Storage System',
        description: 'Size : 5 bays\nColor : Black\nStorage : 20 TB (5x 4 TB HDD)\nSpeed : 10 Gbps (Ethernet)\nPerformance : RAID 5, Data Redundancy\nRAM : 8 GB DDR4\nPrice : $2,000 USD',
        categoryId: categories[1].id, // Cloud Computing & AI
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'GPU Server',
        description: 'Size : 4U (rack-mount)\nColor : Silver\nStorage : 1 TB (NVMe SSD)\nSpeed : 2.2 GHz (Intel Xeon Processor)\nPerformance : 8 NVIDIA Tesla V100 GPUs\nRAM : 1 TB DDR4\nPrice : $50,000 USD',
        categoryId: categories[1].id, // Cloud Computing & AI
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    
    // Telecommunications Equipment
    prisma.equipment.create({
      data: {
        name: 'Vector Network Analyzer (VNA)',
        description: 'Size : 19 inches (rack-mount)\nColor : Gray\nStorage : 500 GB (internal)\nSpeed : 10 MHz to 20 GHz\nPerformance : Measures S-parameters\nRAM : 8 GB\nPrice : $25,000 USD',
        categoryId: categories[0].id, // Telecommunications
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Digital Oscilloscope',
        description: 'Size : 12 inches (screen)\nColor : Black\nStorage : 1 TB (internal)\nSpeed : 1 GHz (bandwidth)\nPerformance : 4 channels, 5 GS/s sampling rate\nRAM : 4 GB\nPrice : $15,000 USD',
        categoryId: categories[0].id, // Telecommunications
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'RF Signal Generator',
        description: 'Size : 19 inches (rack-mount)\nColor : Silver\nStorage : 256 GB (internal)\nSpeed : 100 kHz to 6 GHz\nPerformance : Modulation AM/FM/PM, IQ\nRAM : 4 GB\nPrice : $20,000 USD',
        categoryId: categories[0].id, // Telecommunications
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Spectrum Analyzer',
        description: 'Size : 10 inches (screen)\nColor : Blue\nStorage : 512 GB (internal)\nSpeed : 9 kHz to 3 GHz\nPerformance : RF signal analysis\nRAM : 4 GB\nPrice : $18,000 USD',
        categoryId: categories[0].id, // Telecommunications
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Optical Communication System',
        description: 'Size : 19 inches (rack-mount)\nColor : White\nStorage : 1 TB (internal)\nSpeed : 10 Gbps\nPerformance : Optical transmission and reception\nRAM : 8 GB\nPrice : $30,000 USD',
        categoryId: categories[0].id, // Telecommunications
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    
    // Systems Engineering Equipment
    prisma.equipment.create({
      data: {
        name: 'Programmable Logic Controller (PLC)',
        description: 'Size : Compact module (approximately 12 cm x 10 cm)\nColor : Gray\nStorage : 512 KB internal memory\nSpeed : Cycle time of 0.1 ms\nPerformance : 32 inputs/outputs, Ethernet communication\nRAM : 128 KB\nPrice : $1,200 USD',
        categoryId: categories[3].id, // Systems Engineering
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Real-Time Control System',
        description: 'Size : 19 inches (rack-mount)\nColor : Black\nStorage : 256 GB (SSD)\nSpeed : 3.0 GHz (Intel i7 Processor)\nPerformance : Control precision of 1 μs\nRAM : 16 GB DDR4\nPrice : $8,000 USD',
        categoryId: categories[3].id, // Systems Engineering
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Industrial Robot',
        description: 'Size : Robotic arm with a reach of 1.5 meters\nColor : Yellow and black\nStorage : 32 GB internal memory\nSpeed : Movement speed of 2 m/s\nPerformance : Payload capacity of 10 kg\nRAM : 4 GB DDR4\nPrice : $50,000 USD',
        categoryId: categories[3].id, // Systems Engineering
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Industrial Vision System',
        description: 'Size : Compact camera (5 cm x 5 cm)\nColor : Silver\nStorage : 64 GB (internal)\nSpeed : 60 fps (frames per second)\nPerformance : Resolution of 12 MP\nRAM : 2 GB DDR4\nPrice : $7,500 USD',
        categoryId: categories[3].id, // Systems Engineering
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    
    // Multi-Sector Automation Equipment
    prisma.equipment.create({
      data: {
        name: 'Digital Storage Oscilloscope',
        description: 'Size : 12 inches (screen)\nColor : Gray\nStorage : 1 TB (internal)\nSpeed : 1 GHz (bandwidth)\nPerformance : 4 channels, 5 GS/s sampling rate\nRAM : 4 GB\nPrice : $10,000 USD',
        categoryId: categories[2].id, // Multi-Sector Automation
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Arbitrary Waveform Generator (AWG)',
        description: 'Size : 19 inches (rack-mount)\nColor : Black\nStorage : 500 GB (internal)\nSpeed : 100 MHz to 6 GHz\nPerformance : Modulation AM/FM/PM, IQ\nRAM : 2 GB\nPrice : $15,000 USD',
        categoryId: categories[2].id, // Multi-Sector Automation
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    }),
    prisma.equipment.create({
      data: {
        name: 'Precision Digital Multimeter',
        description: 'Size : 7 inches (screen)\nColor : Blue\nStorage : 32 GB (internal)\nSpeed : Measurements from 0.001V to 1000V\nPerformance : Precision of 6.5 digits\nRAM : 1 GB\nPrice : $2,000 USD',
        categoryId: categories[2].id, // Multi-Sector Automation
        status: 'AVAILABLE',
        location: 'ERL',
        availability: true
      }
    })
  ]);

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: adminPassword,
      phoneNumber: '+1234567890',
      role: 'ADMIN'
    }
  });

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: userPassword,
      phoneNumber: '+1987654321'
    }
  });

  // Create team leader
  const leaderPassword = await bcrypt.hash('leader123', 10);
  const teamLeader = await prisma.user.create({
    data: {
      firstName: 'Team',
      lastName: 'Leader',
      email: 'leader@example.com',
      password: leaderPassword,
      phoneNumber: '+1122334455'
    }
  });

  // Create team
  const team = await prisma.team.create({
    data: {
      teamName: 'Research Team Alpha',
      leaderId: teamLeader.id
    }
  });

  // Create team members
  const memberPassword = await bcrypt.hash('member123', 10);
  const teamMembers = await Promise.all([
    prisma.user.create({
      data: {
        firstName: 'Team',
        lastName: 'Member 1',
        email: 'member1@example.com',
        password: memberPassword,
        phoneNumber: '+1234567891'
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'Team',
        lastName: 'Member 2',
        email: 'member2@example.com',
        password: memberPassword,
        phoneNumber: '+1234567892'
      }
    })
  ]);

  // Add members to team
  await Promise.all(teamMembers.map(member =>
    prisma.teamMember.create({
      data: {
        userId: member.id,
        teamId: team.id
      }
    })
  ));

  // Create some reservations
  const now = new Date();
  await Promise.all([
    // Individual reservation
    prisma.reservation.create({
      data: {
        userId: user.id,
        equipmentId: equipment[0].id,
        startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // tomorrow
        endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        status: 'APPROVED'
      }
    }),
    // Team reservation
    prisma.reservation.create({
      data: {
        userId: teamLeader.id, // Adding the required userId field
        teamId: team.id,
        equipmentId: equipment[2].id,
        startDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        endDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        status: 'PENDING'
      }
    })
  ]);

  console.log('Database has been seeded! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
