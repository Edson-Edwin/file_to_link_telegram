import { Bot } from 'grammy';
import { setupStart } from './start';
import { setupAdmin } from './admin';
import { setupUploadListener } from './upload';

export function setupCommands(bot: Bot) {
  setupStart(bot);
  setupAdmin(bot);
  setupUploadListener(bot);
}
