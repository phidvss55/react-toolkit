const mongoose = require('mongoose')

const GoalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User is required'],
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Goal is required'],
    }
  }, 
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Goal', GoalSchema)