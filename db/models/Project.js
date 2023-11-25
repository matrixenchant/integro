import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    author: String,
    aim: Number,
    current: Number,

    video: String,
    poster: String,
    content: Object,
    awards: {
      type: Array,
      default: []
    },
    reviews: {
      type: Array,
      default: []
    },

    bakers: {
      type: Number,
      default: 0
    },
    donations: {
      type: Number,
      default: 0
    },
    expiredAt: Date,
  },
  { timestamps: true }
);

const Project = model('Project', ProjectSchema);

module.exports = Project;
