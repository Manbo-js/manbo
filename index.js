"use strict";

const Client = require("./lib/Client");

function Manbo(token, options) {
    return new Client(token, options);
}

Manbo.ApplicationCommand = require("./lib/structures/ApplicationCommand");
Manbo.Attachment = require("./lib/structures/Attachment");
Manbo.AutocompleteInteraction = require("./lib/structures/AutocompleteInteraction");
Manbo.Base = require("./lib/structures/Base");
Manbo.Bucket = require("./lib/util/Bucket");
Manbo.CategoryChannel = require("./lib/structures/CategoryChannel");
Manbo.Channel = require("./lib/structures/Channel");
Manbo.CommandInteraction = require("./lib/structures/CommandInteraction");
Manbo.ComponentInteraction = require("./lib/structures/ComponentInteraction");
Manbo.Client = Client;
Manbo.Collection = require("./lib/util/Collection");
Manbo.Command = require("./lib/command/Command");
Manbo.CommandClient = require("./lib/command/CommandClient");
Manbo.Constants = require("./lib/Constants");
Manbo.DiscordHTTPError = require("./lib/errors/DiscordHTTPError");
Manbo.DiscordRESTError = require("./lib/errors/DiscordRESTError");
Manbo.ExtendedUser = require("./lib/structures/ExtendedUser");
Manbo.ForumChannel = require("./lib/structures/ForumChannel");
Manbo.Guild = require("./lib/structures/Guild");
Manbo.GuildChannel = require("./lib/structures/GuildChannel");
Manbo.GuildIntegration = require("./lib/structures/GuildIntegration");
Manbo.GuildPreview = require("./lib/structures/GuildPreview");
Manbo.GuildScheduledEvent = require("./lib/structures/GuildScheduledEvent");
Manbo.GuildTemplate = require("./lib/structures/GuildTemplate");
Manbo.Interaction = require("./lib/structures/Interaction");
Manbo.Invite = require("./lib/structures/Invite");
Manbo.Member = require("./lib/structures/Member");
Manbo.Message = require("./lib/structures/Message");
Manbo.ModalSubmitInteraction = require("./lib/structures/ModalSubmitInteraction.js");
Manbo.NewsChannel = require("./lib/structures/NewsChannel");
Manbo.NewsThreadChannel = require("./lib/structures/NewsThreadChannel");
Manbo.Permission = require("./lib/structures/Permission");
Manbo.PermissionOverwrite = require("./lib/structures/PermissionOverwrite");
Manbo.PingInteraction = require("./lib/structures/PingInteraction");
Manbo.PrivateChannel = require("./lib/structures/PrivateChannel");
Manbo.PrivateThreadChannel = require("./lib/structures/PrivateThreadChannel");
Manbo.PublicThreadChannel = require("./lib/structures/PublicThreadChannel");
Manbo.RequestHandler = require("./lib/rest/RequestHandler");
Manbo.Role = require("./lib/structures/Role");
Manbo.SequentialBucket = require("./lib/util/SequentialBucket");
Manbo.Shard = require("./lib/gateway/Shard");
Manbo.SharedStream = require("./lib/voice/SharedStream");
Manbo.StageChannel = require("./lib/structures/StageChannel");
Manbo.StageInstance = require("./lib/structures/StageInstance");
Manbo.StoreChannel = require("./lib/structures/StoreChannel");
Manbo.TextChannel = require("./lib/structures/TextChannel");
Manbo.TextVoiceChannel = require("./lib/structures/TextVoiceChannel");
Manbo.ThreadChannel = require("./lib/structures/ThreadChannel");
Manbo.ThreadMember = require("./lib/structures/ThreadMember");
Manbo.UnavailableGuild = require("./lib/structures/UnavailableGuild");
Manbo.User = require("./lib/structures/User");
Manbo.VERSION = require("./package.json").version;
Manbo.VoiceChannel = require("./lib/structures/VoiceChannel");
Manbo.VoiceConnection = require("./lib/voice/VoiceConnection");
Manbo.VoiceConnectionManager = require("./lib/voice/VoiceConnectionManager");
Manbo.VoiceState = require("./lib/structures/VoiceState");

module.exports = Manbo;
