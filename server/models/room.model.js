module.exports = mongoose => {
    const Room = mongoose.model(
      "room",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Room;
  };