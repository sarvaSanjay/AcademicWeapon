const {config} =require("dotenv");
const fs =require("fs");
const {BlobServiceClient} = require("@azure/storage-blob")

async function uploadPDFToBlobStorage(file) {
    config()
    const string = process.env.connection_string;
    const name = process.env.container_name;
    // Connection string to your Azure Storage account
    const connectionString = string;

    // Name of the container in your Azure Blob Storage account
    const containerName = name;

    // Path to your local PDF file
    const pdfFilePath = file;

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    // Get a reference to the container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Get a reference to the blob


    // Upload the PDF file to the blob
    const fileSize = fs.statSync(pdfFilePath).size;
    const stream = fs.createReadStream(pdfFilePath);
    const blockBlobClient = containerClient.getBlockBlobClient(pdfFilePath);

    await blockBlobClient.uploadStream(stream, fileSize, 4, {
        blobHTTPHeaders: {
            blobContentType: 'application/pdf', // Set the content type of the blob
        },
    });

    console.log('PDF file uploaded to Azure Blob Storage.');
}

// Upload the PDF file to Azure Blob Storage

module.exports={uploadPDFToBlobStorage}