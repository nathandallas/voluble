export const getUsersforSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); // Exclude the logged-in user

    res.status(200).json(filteredUsers); // Send the filtered users as a response
  } catch (error) {
    console.log("Error in getUsers controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // Get the user ID from the request parameters
    const myId = req.user._id; // Get the sender's ID from the request object

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params; // Get the receiver's ID from the request parameters
    const senderId = req.user._id; // Get the sender's ID from the request object
    const { text, image } = req.body; // Get the message content from the request body

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url; // Get the secure URL of the uploaded image
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || null, // Use the uploaded image URL or null if no image is provided
      timestamps: new Date(), // Set the timestamp for the message
    });

    await newMessage.save(); // Save the new message to the database

    //todo: Realtime functionality to send the message to the receiver can be added here => socket.io

    res.status(201).json(newMessage); // Send the newly created message as a response
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};