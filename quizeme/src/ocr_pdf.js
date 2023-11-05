const {ocr_azure}=require("./ocr_azure")
const {cloud_link}=require("./get_link_from_cloud")
const {uploadPDFToBlobStorage}=require("./upload_to_cloud")

function pdf_to_ocr(file) {
    uploadPDFToBlobStorage(file).then(_ => {return null})
    const link=cloud_link(file)
    ocr_azure(link).then(text => {
        return text
    })
}
pdf_to_ocr('biology.png')

