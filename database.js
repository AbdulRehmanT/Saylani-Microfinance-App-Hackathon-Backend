import mongoose from 'mongoose';

const mongodbUri='mongodb+srv://abdulrehman-admin:YcB6j4JXNhSlEtxx@cluster0.wevik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(mongodbUri);

        console.log(`\n🌿 MongoDB connected ! 🍃\n`);

        mongoose.connection.on(
            "error",
            console.error.bind(console, "Connection error:"),
        );

        process.on("SIGINT", () => {
            // Cleanup code
            mongoose.connection.close();

            console.log("Mongoose connection closed due to application termination");
            process.exit(0);
        });
    } catch (error) {
        console.error("MONGODB connection FAILED ", error);
        process.exit(1); // Exited with error
    }
};



// (async () => {
try {
    await connectDB();

    //       app.listen(PORT, () =>
    //         console.log(`⚙️  Server running at port ==>> ${PORT}`),
    //       );

    //       app.on("error", (err) => console.log("🚀 ~ main file:", err));
} catch (err) {
    console.log("🚀 ~ main file ~ err:", err);
}
//   })();

