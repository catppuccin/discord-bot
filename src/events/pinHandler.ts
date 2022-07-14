import { dirname, importx } from "@discordx/importer";
import { Interaction, Message } from "discord.js";
import { Intents } from "discord.js";
import { Client } from "discordx";
import { PrismaClient } from "@prisma/client";

import { Interface } from "./db";

const prisma = new PrismaClient();

// Implement Pin Handling

// TODO
// Get emoji reactions in any channel
// Fetch array of users allowed to pin for that channel/thread
// Make sure the owner of any thread has permissions to pin.
// Pin any message with the pin reaction and log who did it
// Removeany pin reactions from those who don't have pin permissions
