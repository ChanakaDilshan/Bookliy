module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      tel: String,
      username: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Room = mongoose.model("room", schema);
  return Room;
};