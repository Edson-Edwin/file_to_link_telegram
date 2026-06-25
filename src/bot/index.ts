import { Bot } from 'grammy';
import { config } from './config';
import { setupCommands } from './commands';
import { setupCallbacks } from './callbacks';

import { logger } from './middleware/logger';
import { rateLimit } from './middleware/rateLimit';
import { errorHandler } from './middleware/errorHandler';

export const bot = new Bot(config.botToken);

bot.use(logger);
bot.use(rateLimit);

setupCommands(bot);
setupCallbacks(bot);

bot.catch(errorHandler);
