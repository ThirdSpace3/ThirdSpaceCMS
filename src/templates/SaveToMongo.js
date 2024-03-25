// saveToMongoDB.js
const fs = require('fs');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://vinccharles0:Nitrosmp2103@testvincent.i7gxmfm.mongodb.net/?retryWrites=true&w=majority&appName=TestVincent";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function saveTemplatesToMongoDB() {
  try {
    await client.connect();
    const database = client.db('Templates'); // Replace with your database name
    const templatesCollection = database.collection('templates');

    const templatesDir = path.join(__dirname, '');
    const templateFiles = fs.readdirSync(templatesDir);

    for (const file of templateFiles) {
      if (path.extname(file) === '.js') {
        const filePath = path.join(templatesDir, file);
        const templateContent = fs.readFileSync(filePath, 'utf-8');
        const templateName = path.basename(file, '.js');

        await templatesCollection.insertOne({
          name: templateName,
          content: templateContent,
        });

        console.log(`Template "${templateName}" saved to MongoDB.`);
      }
    }
  } catch (error) {
    console.error('Error saving templates to MongoDB:', error);
  } finally {
    await client.close();
  }
}

saveTemplatesToMongoDB();
