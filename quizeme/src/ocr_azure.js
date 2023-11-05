const {AzureKeyCredential,DocumentAnalysisClient} = require("@azure/ai-form-recognizer")
//use your `key` and `endpoint` environment variables

async function ocr_azure(url) {
    const key = process.env['FR_KEY'];
    const endpoint = process.env['FR_ENDPOINT'];

    // sample document
    const documentUrlRead = url



        // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
        const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
        const poller = await client.beginAnalyzeDocument("prebuilt-read", documentUrlRead);
        var file = ''
        const {pages} = await poller.pollUntilDone();

        if (pages.length <= 0) {
            console.log("No pages were extracted from the document.");
        } else {
            for (const page of pages) {
                if (page.lines.length > 0) {
                    for (const line of page.lines) {
                        file = file + line.content + ' ';
                    }
                    return file;
                }
            }
    }
}
module.exports={ocr_azure}
 ocr_azure("https://vcfx.blob.core.windows.net/bread/biology.png").then(text => {
     console.log(text)
 });
