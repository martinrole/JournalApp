export const fileUploadHelper = async ( archivo ) => {

    const cloudinary = 'https://api.cloudinary.com/v1_1/martinrole/upload'

    const formData = new FormData()
    formData.append('upload_preset', 'React-Journal')
    formData.append('file', archivo)

    try {
        
        const resp = await fetch( cloudinary, {
            method: 'POST',
            body: formData
        })
        
        // console.log('respHelper: ', resp);

        if ( resp.ok ) {
            const cloudResp = await resp.json()
            return cloudResp.secure_url
        } else {
            return null
        }

    } catch (error) {
        console.log('fileUploadHelper Error: ', error);
        throw error;
        
    }


    // return url de 
}