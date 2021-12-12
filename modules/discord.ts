import { CreateRoleOptions, Guild, GuildChannel, GuildMember, MessageOptions } from 'discord.js'
import Utils from './utils.js'

import { Message } from '../global' 

export default class Discord {
  static Embed(Message: Message) {
    const embed: any = Message.embed
    return {
      embeds: [embed],
      content: Message.content,
      files: Message.files
    } as MessageOptions
  }

  static CreateRole(guild: Guild, options: CreateRoleOptions) {
    guild.roles.create(options as CreateRoleOptions)
      .then()
      .catch(Utils.Error)
  }

  static DeleteRole(guild: Guild, finder: string | number) {
    const roleDeleted = guild.roles.cache.find(role => role.name === finder || role.id === finder)
    if (roleDeleted == null) throw Utils.Error(new Error('Role does not exist'))
    roleDeleted.delete()
  }

  static HasRole(member: GuildMember, finder: string | number): Boolean {
    return member.roles.cache.some(role => role.name === finder || role.id === finder)
  }

  static GiveRole(member: GuildMember, guild: Guild, finder: string | number) {
    const role = guild.roles.cache.find(role => role.name === finder || role.id === finder)
    if (role == null) throw Utils.Error(new Error('Role does not exist'))
    return member.roles.add(role)
  }

  static RemoveRole(member: GuildMember, guild: Guild, finder: string | number) {
    const role = guild.roles.cache.find(role => role.name === finder || role.id === finder)
    if (role == null) throw Utils.Error(new Error('Role does not exist'))
    return member.roles.remove(role)
  }

  static CreateChannel(guild: Guild, name: string, options: Object) {
    return guild.channels.create(name, {
      type: 'GUILD_TEXT',
      ...options
    })
  }

  static DeleteChannel(guild: Guild, finder: string | number) {
    return guild.channels.cache.find(c => (c.name === finder || c.id === finder) && c.type == 'GUILD_TEXT').delete()
  }

  static CreateCategory(guild: Guild, name: string, options: Object) {
    return guild.channels.create(name, {
      type: 'GUILD_CATEGORY',
      ...options
    })
  }

  static DeleteCategory(guild: Guild, finder: string | number) {
    guild.channels.cache.find(c => (c.name === finder || c.id === finder) && c.type == 'GUILD_CATEGORY').delete()
  }

  static MoveChannelToCategory(guild: Guild, channel: string | number, category: string | number) {
    let newCategory = guild.channels.cache.find(c => (c.name === category || c.id === category) && c.type == 'GUILD_CATEGORY')
    let newChannel = guild.channels.cache.find(c => (c.name === channel || c.id === channel) && c.type == 'GUILD_TEXT')

    if (!newCategory) throw Utils.Error(new Error('Category channel does not exist'))
    if (!newChannel) throw Utils.Error(new Error('Channel does not exist'))
    ;(newChannel as GuildChannel).setParent(newCategory.id)
  }
}