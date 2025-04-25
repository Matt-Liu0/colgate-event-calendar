import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
    providers: [PrismaService],
    exports: [PrismaService], // Export PrismaService to be used in other modules
})
export class PrismaModule {}
// This module provides the PrismaService, which is a wrapper around the Prisma Client.