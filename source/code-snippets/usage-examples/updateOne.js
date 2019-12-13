// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // create a filter for a movie to update
    const filter = { title: "Blacksmith Scene" };
    const options = {};
    options.upsert = true; // create a document if no documents match the filter

    const result = await collection.updateOne(
      filter,
      {
        $set: {
          plot:
            "Blacksmith Scene is a silent film directed by William K.L. Dickson",
        },
      },
      options,
    );
    console.log(
      `${result.matchedCount} document matched the filter and ${result.modifiedCount} document was updated`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);