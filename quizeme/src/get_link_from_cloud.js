const {BlobServiceClient} = require('@azure/storage-blob')
const {config} = require('dotenv')
function cloud_link(file) {

        config()
        const string = process.env.connection_string;
        const name = process.env.container_name;

        // Connection string to your Azure Storage account
        const connectionString = string;

        // Name of the container in your Azure Blob Storage account
        const containerName = name;

        // Name of the PDF file you want to get the URL for
        const pdfFileName = file;
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        // Get a reference to the container
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Get a reference to the blob
        const blobClient = containerClient.getBlobClient(pdfFileName);

        // Get the URL of the PDF file
        const url = blobClient.url;
        return url

    }
module.exports={cloud_link}
