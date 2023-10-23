import { GraphQLScalarType } from "graphql";
import {
  AuthorModel,
  FolderModel,
  NoteModel,
  NotificationModel,
} from "../models/index.js";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: "desc",
      });
      return folders;
    },
    folder: async (_, args) => {
      const folderId = args.folderId;
      return await FolderModel.findById(folderId);
    },
    note: async (_, args) => {
      const noteId = args.noteId;
      return await NoteModel.findById(noteId);
    },
  },
  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      return await AuthorModel.findOne({
        uid: authorId,
      });
    },
    notes: async (parent, _) => {
      return await NoteModel.find({
        folderId: parent.id,
      }).sort({
        updatedAt: "desc",
      });
    },
  },
  Mutation: {
    addNote: async (_, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async (_, args) => {
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },
    addFolder: async (_, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      pubsub.publish("FOLDER_CREATED", {
        folderCreated: {
          message: "A new folder created",
        },
      });
      await newFolder.save();
      return newFolder;
    },
    register: async (_, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });

      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }

      return foundUser;
    },
    pushNotification: async (_, args) => {
      const newNotification = new NotificationModel(args);

      pubsub.publish("PUSH_NOTIFICATION", {
        notification: {
          message: args.content,
        },
      });

      await newNotification.save();
      return { message: "SUCCESS" };
    },
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(["FOLDER_CREATED", "NOTE_CREATED"]),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(["PUSH_NOTIFICATION"]),
    },
  },
};
