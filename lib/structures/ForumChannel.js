"use strict";

const Collection = require("../util/Collection");
const GuildChannel = require("./GuildChannel");
const PermissionOverwrite = require("./PermissionOverwrite");

/**
 * Represents a guild forum channel. See GuildChannel for more properties and methods.
 * @extends GuildChannel
 * @prop {Array<Object>} availableTags Available tags for this channel
 * @prop {Number} defaultAutoArchiveDuration The default duration of newly created threads in minutes to automatically archive the thread after inactivity (60, 1440, 4320, 10080)
 * @prop {Object} defaultReactionEmoji The default emoji to show in the add reaction button on a thread
 * @prop {Number} defaultSortOrder The default thread sorting order
 * @prop {Number} defaultThreadRatelimitPerUser The initial ratelimit of the channel to use on newly created threads, in seconds. 0 means no ratelimit is enabled
 * @prop {Number} flags Channel flags for this channel
 * @prop {String} lastThreadID The ID of the last thread in this channel
 * @prop {Boolean} nsfw Whether the channel is an NSFW channel or not
 * @prop {Collection<PermissionOverwrite>} permissionOverwrites Collection of PermissionOverwrites in this channel
 * @prop {Number} position The position of the channel
 * @prop {Number} rateLimitPerUser The ratelimit of the channel, in seconds (0-21600). 0 means no ratelimit is enabled
 * @prop {String?} topic The topic of the channel, shown to the user as post guidelines
 */

class ForumChannel extends GuildChannel {
    constructor(data, client) {
        super(data, client);
        this.availableTags = data.available_tags || [];
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        this.defaultReactionEmoji = data.default_reaction_emoji || null;
        this.defaultSortOrder = data.default_sort_order || null;
        this.defaultThreadRatelimitPerUser = data.default_thread_rate_limit_per_user;
        this.flags = data.flags;
        this.lastThreadID = data.last_message_id || null;
        this.nsfw = data.nsfw;
        this.permissionOverwrites = new Collection(PermissionOverwrite);
        this.position = data.position;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.update(data);
    }

    update(data) {
        super.update(data);
        if(data.available_tags !== undefined) {
            this.availableTags = data.available_tags.map((tag) => ({
                emoji: tag.emoji_id === null && tag.emoji_name === null ? null : {
                    id: tag.emoji_id,
                    name: tag.emoji_name
                },
                id: tag.id,
                moderated: tag.moderated,
                name: tag.name
            }));
        }
        if(data.default_auto_archive_duration !== undefined) {
            this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        }
        if(data.default_reaction_emoji !== undefined) {
            this.defaultReactionEmoji = data.default_reaction_emoji === null || (data.default_reaction_emoji.emoji_id === null && data.default_reaction_emoji.emoji_name === null) ? null : {
                id: data.default_reaction_emoji.emoji_id,
                name: data.default_reaction_emoji.emoji_name
            };
        }
        if(data.default_sort_order !== undefined) {
            this.defaultSortOrder = data.default_sort_order;
        }
        if(data.default_thread_rate_limit_per_user !== undefined) {
            this.defaultThreadRatelimitPerUser = data.default_thread_rate_limit_per_user;
        }
        if(data.flags !== undefined) {
            this.flags = data.flags;
        }
        if(data.last_message_id !== undefined) {
            this.lastThreadID = data.last_message_id;
        }

        if(data.nsfw !== undefined) {
            this.nsfw = data.nsfw;
        }
        if(data.permission_overwrites !== undefined) {
            data.permission_overwrites.forEach((overwrite) => {
                this.permissionOverwrites.add(overwrite);
            });
        }
        if(data.position !== undefined) {
            this.position = data.position;
        }
        if(data.rate_limit_per_user !== undefined) {
            this.rateLimitPerUser = data.rate_limit_per_user;
        }
        if(data.template !== undefined) {
            this.template = data.template;
        }
        if(data.topic !== undefined && data.topic !== null) {
            this.topic = data.topic;
        }
    }

    /**
     * Create an invite for the channel
     * @arg {Object} [options] Invite generation options
     * @arg {Number} [options.maxAge] How long the invite should last in seconds
     * @arg {Number} [options.maxUses] How many uses the invite should last for
     * @arg {Boolean} [options.temporary] Whether the invite grants temporary membership or not
     * @arg {Boolean} [options.unique] Whether the invite is unique or not
     * @arg {String} [reason] The reason to be displayed in audit logs
     * @returns {Promise<Invite>}
     */
    createInvite(options, reason) {
        return this._client.createChannelInvite.call(this._client, this.id, options, reason);
    }

    /**
     * Create a thread in a forum
     * @arg {Object} options The thread create options
     * @arg {Number} [options.autoArchiveDuration] Duration in minutes to automatically archive the thread after recent activity, either 60, 1440, 4320 or 10080
     * @arg {Array<String>} [options.appliedTags] The tags to apply while creating the thread
     * @arg {String} options.name The thread channel name
     * @arg {Number} [options.rateLimitPerUser] The ratelimit of the channel, in seconds. 0 means no ratelimit is enabled
     * @arg {Object} options.message The initial message for the thread
     * @arg {Object} [options.message.allowedMentions] A list of mentions to allow
     * @arg {Boolean} [options.message.allowedMentions.everyone] Whether or not to allow @everyone/@here.
     * @arg {Boolean | Array<String>} [options.message.allowedMentions.roles] Whether or not to allow all role mentions, or an array of specific role mentions to allow.
     * @arg {Boolean | Array<String>} [options.message.allowedMentions.users] Whether or not to allow all user mentions, or an array of specific user mentions to allow.
     * @arg {Boolean} [options.message.allowedMentions.repliedUser] Whether or not to mention the author of the message being replied to.
     * @arg {Array<Object>} [options.message.components] An array of components. See [Discord's Documentation](https://discord.com/developers/docs/interactions/message-components#what-is-a-component) for object structure
     * @arg {String} [options.message.content] A content string
     * @arg {Object} [options.message.embed] An embed object. See [Discord's Documentation](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
     * @arg {Array<Object>} [options.message.embeds] An array of embed objects. See [Discord's Documentation](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
     * @arg {Object | Array<Object>} [options.message.file] A file object (or an Array of them)
     * @arg {Buffer} options.message.file.file A buffer containing file data
     * @arg {String} options.message.file.name What to name the file
     * @arg {Boolean} [options.message.flags] Set the flags for a message
     * @returns {Promise<PublicThreadChannel>}
     */
    createThread(options) {
        return this._client.createGuildForumThread.call(this._client, this.id, options);
    }

    /**
     * Create a channel webhook
     * @arg {Object} options Webhook options
     * @arg {String?} [options.avatar] The default avatar as a base64 data URI. Note: base64 strings alone are not base64 data URI strings
     * @arg {String} options.name The default name
     * @arg {String} [reason] The reason to be displayed in audit logs
     * @returns {Promise<Object>} Resolves with a webhook object
     */
    createWebhook(options, reason) {
        return this._client.createChannelWebhook.call(this._client, this.id, options, reason);
    }

    /**
     * Get all invites in the channel
     * @returns {Promise<Array<Invite>>}
     */
    getInvites() {
        return this._client.getChannelInvites.call(this._client, this.id);
    }

    /**
     * Get all the webhooks in the channel
     * @returns {Promise<Array<Object>>} Resolves with an array of webhook objects
     */
    getWebhooks() {
        return this._client.getChannelWebhooks.call(this._client, this.id);
    }

    toJSON(props = []) {
        return super.toJSON([
            "lastMessageID",
            "messages",
            "nsfw",
            "permissionOverwrites",
            "position",
            "rateLimitPerUser",
            "topic",
            ...props
        ]);
    }
}

module.exports = ForumChannel;
